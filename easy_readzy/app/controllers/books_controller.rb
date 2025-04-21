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
      maxResults: 4,
      key: ENV["GOOGLE_BOOKS_API_KEY"]
    })

    results = JSON.parse(response.body)
    @books = results["items"] || []
  end

  def new
    @google_books_id = params[:google_books_id]
    @book_info = fetch_book_info(@google_books_id)
  end

  def index
    # ユーザーを取得
    @user = User.find(params[:user_id])

    # 本棚を取得
    @bookshelf = @user.bookshelves.find(params[:bookshelf_id])

    # 本棚の本一覧を取得(preloadを使用)
    @books = @bookshelf.books.preload(:cover_image_attachment)
  end

  private

    # google_books_id をもとに書籍情報を取得して整形して返す
    def fetch_book_info(google_books_id)
      # google_books_idがないときは空のハッシュを返す
      {} if google_books_id.blank?

      url = "#{GOOGLE_BOOKS_ENDPOINT}/#{google_books_id}"
      response = HTTParty.get(
        url,
        query: { key: ENV["GOOGLE_BOOKS_API_KEY"] },
        # リクエスト全体(リクエスト送信, サーバー応答の受信, レスポンスボディの読み込み)の最大許容時間[秒]
        timeout: 5
      )

      # ステータスが正常でない場合は空のハッシュを返す
      {} unless response.code == 200

      data   = JSON.parse(response.body)
      volume = data["volumeInfo"] || {}

      {
        google_books_id: google_books_id,
        title: volume["title"],
        authors: Array(volume["authors"]).join(", "),
        publisher: volume["publisher"],
        published_date: volume["publishedDate"],
        description: volume["description"],
        # イメージURLはhttpsで取得
        image_url: volume.dig("imageLinks", "thumbnail")&.gsub("http://", "https://")
      }
    # エラーハンドリング
    rescue JSON::ParserError, HTTParty::Error, SocketError => e
      Rails.logger.warn("Google Books fetch error: #{e.message}")
      {}
    end
end
