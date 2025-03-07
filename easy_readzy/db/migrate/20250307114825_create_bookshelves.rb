class CreateBookshelves < ActiveRecord::Migration[7.2]
  def change
    create_table :bookshelves do |t|
      t.integer :user_id
      t.string :bookshelf_name

      t.timestamps
    end
  end
end
