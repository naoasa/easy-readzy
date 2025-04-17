class BooksController < ApplicationController
  require "google/apis/books_v1"

  # Deviseのヘルパーメソッドでログインユーザーのみがコントローラーのアクションを実行できるようにする
  before_action :authenticate_user!

  def search
    @query = params[:query]
    books = Google::Apis::BooksV1::BooksService.new
    books.key = ENV["GOOGLE_BOOKS_API_KEY"]

    @results = books.list_volumes(@query, max_results: 4)
    @books = @results.items || []
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
