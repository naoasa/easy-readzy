class AddConstraintsToOutputs < ActiveRecord::Migration[7.2]
  def change
    # goal_idカラムにNOT NULL制約を追加
    change_column_null :outputs, :goal_id, false
    # output_textカラムにNOT NULL制約を追加
    change_column_null :outputs, :output_text, false
    # output_textカラムに文字数制限を追加
    change_column :outputs, :output_text, :string, limit: 5000
  end
end
