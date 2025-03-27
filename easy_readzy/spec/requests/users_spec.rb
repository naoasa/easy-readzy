require 'rails_helper'

RSpec.describe "Users", type: :request do
  describe "GET /users/sign_in" do
    context "not logged in" do
      it "renders the sign-in page" do
        # 未ログインでリクエストを送信(/users/sign_in)
        get new_user_session_path

        # レスポンスが成功することを確認
        expect(response).to have_http_status(:ok)

        # レンダリングされたビューが正しいことを確認
        expect(response.body).to include("Easy-Readzyのロゴ")
        expect(response.body).to include("積読、読んどく？学んどく？")
      end
    end

    context "logged in" do
      # ログインの処理を書く

      it "redirects to the home page" do
        # ログイン
        sign_in user

        # サインインページにアクセス
        get new_user_session_path

        # ログイン済みの場合はリダイレクトされることを確認
        exprect(response).to redirect_to(root_path)
      end
    end
  end
end
