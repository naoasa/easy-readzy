class AddConstraintsToUsers < ActiveRecord::Migration[7.2]
  def change
    # nameカラムにNOT NULL制約を追加
    change_column_null :users, :name, false
    # nameカラムに文字数制限を追加
    change_column :users, :name, :string, limit: 114
    # icon_image_urlカラムに文字数制限を追加
    change_column :users, :icon_image_url, :string, limit: 2500
  end
end
