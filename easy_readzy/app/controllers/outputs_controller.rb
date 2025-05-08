class OutputsController < ApplicationController
  before_action :authenticate_user!

  def create
    goal = Goal.find(params[:goal_id])
    # 既にアウトプットが存在する場合は上書き、存在しなければ新規作成
    if goal.output.present?
      goal.output.update(output_text: output_params[:output_text])
    else
      goal.create_output(output_text: output_params[:output_text])
    end
    redirect_to request.referer, notice: "アウトプットが保存されました"
  end

  private

    def output_params
      params.require(:output).permit(:output_text)
    end
end
