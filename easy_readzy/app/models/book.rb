class Book < ApplicationRecord
  # Active Storage
  has_one_attached :cover_image

  # アソシエーション
  has_many :bookshelf_books

  # バリデーション
  validates :google_book_id, presence: true, uniqueness: true, length: { maximum: 100 }
  validates :title, presence: true, length: { maximum: 500 }
  validates :author, length: { maximum: 500 }
  validates :publisher, length: { maximum: 100 }
  validates :published_date, length: { maximum: 100 }
  validates :description, length: { maximum: 1000 }
  validates :summary, length: { maximum: 300 }
end
