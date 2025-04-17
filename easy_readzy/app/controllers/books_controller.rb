class BooksController < ApplicationController
  require "httparty"

  # Deviseのヘルパーメソッドでログインユーザーのみがコントローラーのアクションを実行できるようにする
  before_action :authenticate_user!

  def search
    @query = params[:query]

    # HTTPartyを利用してGoogle Books APIを呼び出す
    response = HTTParty.get("https://www.googleapis.com/books/v1/volumes",
    query: {
      q: @query,
      maxResults: 4,
      key: ENV["GOOGLE_BOOKS_API_KEY"]
    })

    results = JSON.parse(response.body)
    @books = results["items"] || []
  end

  def index
    # ユーザーを取得
    @user = User.find(params[:user_id])

    # 本棚を取得
    @bookshelf = @user.bookshelves.find(params[:bookshelf_id])

    # 本棚の本一覧を取得
    @books = @bookshelf.books
  end
end
