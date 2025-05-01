class ChangeAuthorLimitInBooks < ActiveRecord::Migration[7.2]
  def up
    # authorカラムの上限を 100 => 500 に
    change_column :books, :author, :string, limit: 500
  end

  def down
    # authorカラムの上限を 100 に戻したい時用に
    change_column :books, :author, :string, limit: 100
  end
end
