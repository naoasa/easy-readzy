class BookshelfBook < ApplicationRecord
  # アソシエーション
  belongs_to :bookshelf
  belongs_to :book
  has_many :goals

  # バリデーション
  validates :bookshelf_id, presence: true
  validates :book_id, presence: true
  validates :location, presence: true, length: { maximum: 100 }
end
