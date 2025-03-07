class Context < ApplicationRecord
  # アソシエーション
  belongs_to :user

  # バリデーション
  validates :user_id, presence: true
  validates :context_text, presence: true, length: { maximum: 2000 }
end
