class GoalsController < ApplicationController
  before_action :authenticate_user!

  def create
    @user = User.find(params[:user_id])
    @bookshelf = @user.bookshelves.find(params[:bookshelf_id])
    @book = @bookshelf.books.find(params[:book_id])
    @shelf_book = @bookshelf.bookshelf_books.find_by(book_id: @book.id)

    @goal = @shelf_book.goals.build(goal_params)

    if @goal.save
      redirect_to user_bookshelf_book_path(@user, @bookshelf, @book), notice: "目標を追加しました"
    else
      redirect_to user_bookshelf_book_path(@user, @bookshelf, @book), alert: "目標の追加に失敗しました"
    end
  end

  private

    def goal_params
      params.require(:goal).permit(:goal_text)
    end
end
