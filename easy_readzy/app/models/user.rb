class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  # ↓ deviseが自動生成したもの
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  # アソシエーション(モデルの関連付け)
  has_many :contexts, dependent: :destroy # ユーザーが消えたら、コンテキストも消える
  has_many :book_shelves, dependent: :destroy # ユーザーが消えたら、本棚も消える
end
