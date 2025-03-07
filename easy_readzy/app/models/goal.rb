class Goal < ApplicationRecord
  # アソシエーション
  belongs_to :bookshelf_book
  has_one :output, dependent: :destroy # 目的が消えたら、アウトプットも消える
end
