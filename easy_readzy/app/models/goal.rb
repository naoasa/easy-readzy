class Goal < ApplicationRecord
  # アソシエーション
  belongs_to :bookshelf_book
  has_one :output, dependent: :destroy # 目的が消えたら、アウトプットも消える

  # バリデーション
  validates :bookshelf_book_id, presence: true
  validates :goal_text, presence: true, length: { maximum: 500 }
end
