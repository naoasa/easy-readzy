class AddConstraintsToGoals < ActiveRecord::Migration[7.2]
  def change
    # bookshelf_book_idカラムにNOT NULL制約を追加
    change_column_null :goals, :bookshelf_book_id, false
    # goal_textカラムにNOT NULL制約を追加
    change_column_null :goals, :goal_text, false
    # goal_textカラムに文字数制限を追加
    change_column :goals, :goal_text, :string, limit: 500
  end
end
