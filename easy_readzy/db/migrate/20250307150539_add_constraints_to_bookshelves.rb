class AddConstraintsToBookshelves < ActiveRecord::Migration[7.2]
  def change
    # user_idカラムにNOT NULL制約を追加
    change_column_null :bookshelves, :user_id, false
    # bookshelf_nameカラムにNOT NULL制約を追加
    change_column_null :bookshelves, :bookshelf_name, false
    # bookshelf_nameカラムに文字数制限を追加
    change_column :bookshelves, :bookshelf_name, :string, limit: 100
  end
end
