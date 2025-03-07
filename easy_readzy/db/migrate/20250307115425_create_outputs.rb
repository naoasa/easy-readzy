class CreateOutputs < ActiveRecord::Migration[7.2]
  def change
    create_table :outputs do |t|
      t.integer :goal_id
      t.string :output_text

      t.timestamps
    end
  end
end
