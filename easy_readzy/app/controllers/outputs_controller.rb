class OutputsController < ApplicationController
  before_action :authenticate_user!

  def create
    goal = Goal.find(params[:goal_id])
    # 既にアウトプットが存在する場合は上書き、存在しなければ新規作成
    if goal.output.present?
      if goal.output.update(output_params)
        redirect_to request.referer, notice: "アウトプットが保存されました"
      else
        redirect_to request.referer, alert: "アウトプットの保存に失敗しました"
      end
    else
      output = goal.build_output(output_text: output_params[:output_text])
      if output.save
        redirect_to request.referer, notice: "アウトプットが保存されました"
      else
        redirect_to request.referer, alert: "アウトプットの保存に失敗しました"
      end
    end
  end

  def edit
    @goal = Goal.find(params[:goal_id])
    @output = @goal.output
    @bookshelf_book = @goal.bookshelf_book
    @book = @bookshelf_book.book
    @bookshelf = @bookshelf_book.bookshelf
    @user = @bookshelf.user
  end

  def update
    goal = Goal.find(params[:goal_id])
    output = goal.output
    bookshelf_book = goal.bookshelf_book
    bookshelf = bookshelf_book.bookshelf
    user = bookshelf.user
    book = bookshelf_book.book

    if output.update(output_params)
      redirect_to user_bookshelf_book_path(user, bookshelf, book), notice: "アウトプットを更新しました"
    else
      flash.now[:alert] = "更新に失敗しました"
      @goal = goal
      @output = output
      @bookshelf_book = bookshelf_book
      @book = book
      @bookshelf = bookshelf
      @user = user
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    goal = Goal.find(params[:goal_id])
    output = goal.output
    bookshelf_book = goal.bookshelf_book
    bookshelf = bookshelf_book.bookshelf
    user = bookshelf.user
    book = bookshelf_book.book

    output.destroy if output.present?
    redirect_to user_bookshelf_book_path(user, bookshelf, book), notice: "アウトプットを削除しました"
  end

  private

    def output_params
      params.require(:output).permit(:output_text)
    end
end
