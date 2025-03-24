class Bookshelf < ApplicationRecord
  # アソシエーション
  belongs_to :user
  has_many :bookshelf_books, dependent: :destroy # 本棚が消えたら、中間テーブルも消える
  has_many :books, through: :bookshelf_books # 本棚は中間テーブルを媒介に本を持つ

  # バリデーション
  validates :user_id, presence: true
  validates :bookshelf_name, presence: true, length: { maximum: 100 }
end
