class Book < ApplicationRecord
  # アソシエーション
  has_many :bookshelf_books

  # バリデーション
  validates :google_book_id, presence: true, uniqueness: true, length: { maximum: 100 }
  validates :title, presence: true, length: { maximum: 500 }
  validates :cover_image_url, length: { maximum: 2500 }
  validates :author, length: { maximum: 100 }
  validates :publisher, length: { maximum: 100 }
  validates :published_date, length: { maximum: 100 }
  validates :description, length: { maximum: 1000 }
  validates :summary, length: { maximum: 300 }
end
