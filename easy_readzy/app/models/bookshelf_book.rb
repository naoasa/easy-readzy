class BookshelfBook < ApplicationRecord
  belongs_to :bookshelf
  belongs_to :book
  has_many :goals
end
