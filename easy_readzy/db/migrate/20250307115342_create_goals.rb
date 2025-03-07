class CreateGoals < ActiveRecord::Migration[7.2]
  def change
    create_table :goals do |t|
      t.integer :bookshelf_book_id
      t.string :goal_text

      t.timestamps
    end
  end
end
