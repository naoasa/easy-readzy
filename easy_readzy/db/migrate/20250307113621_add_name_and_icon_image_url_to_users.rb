class AddNameAndIconImageUrlToUsers < ActiveRecord::Migration[7.2]
  def change
    add_column :users, :name, :string, limit: 114, null: false # usersテーブルにnameカラムを追加
    add_column :users, :icon_image_url, :string, limit: 2500 # usersテーブルにicon_image_urlカラムを追加
  end
end
