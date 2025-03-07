class AddConstraintsToBookshelfBooks < ActiveRecord::Migration[7.2]
  def change
    # bookshelf_idカラムにNOT NULL制約を追加
    change_column_null :bookshelf_books, :bookshelf_id, false
    # book_idカラムにNOT NULL制約を追加
    change_column_null :bookshelf_books, :book_id, false
    # locationカラムにNOT NULL制約を追加
    change_column_null :bookshelf_books, :location, false
    # locationカラムに文字数制限を追加
    change_column :bookshelf_books, :location, :string, limit: 100
  end
end
