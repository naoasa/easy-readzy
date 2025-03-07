class AddConstraintsToBooks < ActiveRecord::Migration[7.2]
  def change
    # google_book_idカラムにNOT NULL制約を追加
    change_column_null :books, :google_book_id, false
    # google_book_idカラムにUNIQUE制約を追加
    add_index :books, :google_book_id, unique: true
    # google_book_idカラムに文字数制限を追加
    change_column :books, :google_book_id, :string, limit: 100
    # titleカラムにNOT NULL制約を追加
    change_column_null :books, :title, false
    # titleカラムに文字数制限を追加
    change_column :books, :title, :string, limit: 500
    # cover_image_urlカラムに文字数制限を追加
    change_column :books, :cover_image_url, :string, limit: 2500
    # authorカラムに文字数制限を追加
    change_column :books, :author, :string, limit: 100
    # publisherカラムに文字数制限を追加
    change_column :books, :publisher, :string, limit: 100
    # published_dateカラムに文字数制限を追加
    change_column :books, :published_date, :string, limit: 100
    # descriptionカラムに文字数制限を追加
    change_column :books, :description, :string, limit: 1000
    # summaryカラムに文字数制限を追加
    change_column :books, :summary, :string, limit: 300
  end
end
