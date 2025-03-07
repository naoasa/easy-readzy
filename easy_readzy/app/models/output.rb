class Output < ApplicationRecord
  # アソシエーション
  belongs_to :goal

  # バリデーション
  validates :goal_id, presence: true
  validates :output_text, presence: true, length: { maximum: 5000 }
end
