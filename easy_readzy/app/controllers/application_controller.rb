class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  # 404エラーをキャッチしてカスタムビューを表示
  rescue_from ActionController::RoutingError, with: :render_not_found
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

  # Deviseのafter_sign_in_path_forメソッドをオーバーライド
  def after_sign_in_path_for(resource)
    # ログインユーザーの最小の本棚IDを取得
    first_bookshelf_id = resource.bookshelves.minimum(:id)

    # 本棚が存在する場合は、その本棚の本一覧ページにリダイレクト
    if first_bookshelf_id
      user_bookshelf_books_path(user_id: resource.id, bookshelf_id: first_bookshelf_id)
    else
      # 本棚が存在しない場合はルートURLにリダイレクト
      root_path
    end
  end

  # Deviseのログアウト後のメソッドをオーバーライド
  def after_sign_out_path_for(resource_or_scope)
    new_user_session_path
  end

  private

  def render_not_found
    render "errors/not_found", status: :not_found, layout: "application"
  end
end
