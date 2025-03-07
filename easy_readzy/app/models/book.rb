class Book < ApplicationRecord
  # アソシエーション
  has_many :bookshelf_books
end
