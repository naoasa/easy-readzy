require 'rails_helper'

RSpec.describe "Users", type: :request do
  describe "ログインページ" do
    it "未ログイン状態でログインページにアクセスできる" do
      # 未ログインでリクエストを送信(GET /users/sign_in)
      get new_user_session_path

      # レスポンスが成功することを確認
      expect(response).to have_http_status(:ok)

      # レンダリングされたビューが正しいことを確認
      expect(response.body).to include("Easy-Readzyのロゴ")
      expect(response.body).to include("積読、読んどく？学んどく？")
    end

    it "ゲストユーザーとしてログインできる" do
      # ゲストユーザーとしてリクエストを送信(POST /users/guest_sign_in)
      post "/users/guest_sign_in"

      # レスポンスがリダイレクト(302)であることを確認
      expect(response).to have_http_status(302)

      # リダイレクト先がルートURLであることを確認
      expect(response).to redirect_to("/")

      # ログイン後にログインページにアクセスすると、ルートURLにリダイレクトされることを確認
      get "/users/sign_in"
      expect(response).to redirect_to("/")
    end
  end
end
