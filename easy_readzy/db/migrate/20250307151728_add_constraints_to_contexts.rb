class AddConstraintsToContexts < ActiveRecord::Migration[7.2]
  def change
    # user_idカラムにNOT NULL制約を追加
    change_column_null :contexts, :user_id, false
    # context_textカラムにNOT NULL制約を追加
    change_column_null :contexts, :context_text, false
    # context_textカラムに文字数制限を追加
    change_column :contexts, :context_text, :string, limit: 2000
  end
end
