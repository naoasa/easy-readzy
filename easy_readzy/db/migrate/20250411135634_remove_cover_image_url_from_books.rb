class RemoveCoverImageUrlFromBooks < ActiveRecord::Migration[7.2]
  def change
    remove_column :books, :cover_image_url, :string
  end
end
