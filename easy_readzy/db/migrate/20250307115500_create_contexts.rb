class CreateContexts < ActiveRecord::Migration[7.2]
  def change
    create_table :contexts do |t|
      t.integer :user_id
      t.string :context_text

      t.timestamps
    end
  end
end
