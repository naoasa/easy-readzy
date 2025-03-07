class Bookshelf < ApplicationRecord
  # アソシエーション
  belongs_to :user
  has_many :bookshelf_books, dependent: :destroy # 本棚が消えたら、中間テーブルも消える
end
