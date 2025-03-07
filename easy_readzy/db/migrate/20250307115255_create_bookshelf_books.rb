class CreateBookshelfBooks < ActiveRecord::Migration[7.2]
  def change
    create_table :bookshelf_books do |t|
      t.integer :bookshelf_id
      t.integer :book_id
      t.string :location

      t.timestamps
    end
  end
end
