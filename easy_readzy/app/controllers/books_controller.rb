class BooksController < ApplicationController
  # Deviseのヘルパーメソッドでログインユーザーのみがコントローラーのアクションを実行できるようにする
  before_action :authenticate_user!
  def index
    # ユーザーを取得
    @user = User.find(params[:user_id])

    # 本棚を取得
    @bookshelf = @user.bookshelves.find(params[:bookshelf_id])

    # 本棚の本一覧を取得
    @books = @bookshelf.books
  end
end
