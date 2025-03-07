class CreateBooks < ActiveRecord::Migration[7.2]
  def change
    create_table :books do |t|
      t.string :google_book_id
      t.string :title
      t.string :cover_image_url
      t.string :author
      t.string :publisher
      t.string :published_date
      t.string :description
      t.string :summary

      t.timestamps
    end
  end
end
