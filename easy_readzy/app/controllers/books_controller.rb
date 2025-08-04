class BooksController < ApplicationController
  require "httparty"

  # Deviseのヘルパーメソッドでログインユーザーのみがコントローラーのアクションを実行できるようにする
  before_action :authenticate_user!

  # よく使うURL
  GOOGLE_BOOKS_ENDPOINT = "https://www.googleapis.com/books/v1/volumes".freeze

  def search
    @user = current_user
    first_bookshelf = @user.bookshelves.minimum(:id)
    @bookshelf = first_bookshelf
    @query = params[:query]

    # HTTPartyを利用してGoogle Books APIを呼び出す
    response = HTTParty.get(GOOGLE_BOOKS_ENDPOINT,
    query: {
      q: @query,
      maxResults: 20,
      key: ENV["GOOGLE_BOOKS_API_KEY"],
      langRestrict: "ja",
      country: "JP"
    })

    results = JSON.parse(response.body)
    @books = results["items"] || []
  end

  def new
    @user = current_user
    @bookshelf = @user.bookshelves.find(params[:bookshelf_id])
    @google_books_id = params[:google_books_id]
    @book_info = fetch_book_info(@google_books_id)
  end

  def create
    # URLから「ユーザー」と「本棚」と「google_books_id」を取得
    @user = current_user
    @bookshelf = @user.bookshelves.find(params[:bookshelf_id])
    google_id = params[:google_books_id]

    # Bookを作成または取得
    book = Book.find_or_initialize_by(google_book_id: google_id)

    # 書籍情報は常に取得
    info = fetch_book_info(google_id)

    # 新規の時は属性をセット
    if book.new_record?
      book.title = info[:title]
      book.author = info[:authors]
      book.publisher = info[:publisher]
      book.published_date = info[:published_date]
      book.description = info[:description].to_s.slice(0, 1000) # 1000文字を超える場合は切り捨てる

      # サムネイルを取得してアタッチ
      if info[:image_url].present? && !book.cover_image.attached?
        response = HTTParty.get(info[:image_url], stream_body: true) # バイナリ取得
        if response.success?
          io = StringIO.new(response.body)
          book.cover_image.attach(
            io: io,
            filename: "#{google_id}.jpg",
            content_type: response.headers["content-type"] || "image/jpeg"
          )
        else
          Rails.logger.warn("Cover image download failed: #{response.code}")
        end
      end

      # サムネイルがない場合は差し替え画像をアタッチ
      unless book.cover_image.attached?
        book.cover_image.attach(
          io: File.open(Rails.root.join("app/assets/images/no_image.jpg")),
          filename: "no_image.jpg",
          content_type: "image/jpeg"
        )
      end

      book.save!
    end

    # BookshelfBookを作成
    shelf_book = @bookshelf.bookshelf_books.build(book: book, location: params[:location])
    shelf_book.save!

    # Goalを作成
    (params[:goals] || []).each do |text|
      shelf_book.goals.create!(goal_text: text)
    end

    # マイ本棚にリダイレクト
    redirect_to user_bookshelf_books_path(@user, @bookshelf), notice: "保存が完了しました"
  end

  def index
    if params[:user_id].present? && params[:bookshelf_id].present?
      # ユーザーを取得
      @user = User.find(params[:user_id])
      # 本棚を取得
      @bookshelf = @user.bookshelves.find(params[:bookshelf_id])
    else
      # ルート "/" からアクセスされた場合
      @user = current_user
      @bookshelf = @user.bookshelves.first # 最初の本棚を取得
    end

    # 本棚の本一覧を取得(preloadを使用)
    # @books = @bookshelf.books.preload(:cover_image_attachment) # kaminari 導入前
    @books = @bookshelf.books.preload(:cover_image_attachment).page(params[:page]).per(25) # 5 * 5 = 25件 / ページ
  end

  def show
    @user = User.find(params[:user_id])
    @bookshelf = @user.bookshelves.find(params[:bookshelf_id])
    @book = @bookshelf.books.find(params[:id])
    @shelf_book = @bookshelf.bookshelf_books.preload(goals: :output).find_by(book_id: @book.id)
  end

  def destroy
    @user = User.find(params[:user_id]) # ユーザーを取得
    @bookshelf = @user.bookshelves.find(params[:bookshelf_id]) # 本棚を取得
    @shelf_book = @bookshelf.bookshelf_books.find_by(book_id: params[:id]) # 中間テーブルを取得

    if @shelf_book&.destroy
      redirect_to user_bookshelf_books_path(@user, @bookshelf), notice: "本を削除しました"
    else
      redirect_to user_bookshelf_book_path(@user, @bookshelf, params[:id]), alert: "本の削除に失敗しました"
    end
  end

  private

    # google_books_id をもとに書籍情報を取得して整形して返す
    def fetch_book_info(google_books_id)
      # google_books_idがないときは空のハッシュを返す
      return {} if google_books_id.blank?

      url = "#{GOOGLE_BOOKS_ENDPOINT}/#{google_books_id}"
      response = HTTParty.get(
        url,
        query: { key: ENV["GOOGLE_BOOKS_API_KEY"] },
        # リクエスト全体(リクエスト送信, サーバー応答の受信, レスポンスボディの読み込み)の最大許容時間[秒]
        timeout: 5
      )
      # ステータスが正常でない場合は空のハッシュを返す
      return {} unless response.code == 200

      data   = JSON.parse(response.body)
      volume = data["volumeInfo"] || {}

      {
        google_books_id: google_books_id,
        title: volume["title"],
        authors: Array(volume["authors"]).join(", ").presence || "-", # 空文字になった場合は"-"を返す
        publisher: volume["publisher"] || "-",
        published_date: volume["publishedDate"] || "-",
        description: volume["description"] || "-",
        # イメージURLはhttpsで取得
        image_url: volume.dig("imageLinks", "thumbnail")&.gsub("http://", "https://")
      }
    # エラーハンドリング
    rescue JSON::ParserError, HTTParty::Error, SocketError => e
      Rails.logger.warn("Google Books fetch error: #{e.message}")
      {}
    end
end
