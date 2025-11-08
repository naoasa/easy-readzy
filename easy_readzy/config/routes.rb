Rails.application.routes.draw do
  get "books/index"
  get "static_pages/home"
  root "books#index"

  devise_for :users, controllers: { sessions: "users/sessions" }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # ゲストログイン用のルーティング
  devise_scope :user do
    post "users/guest_sign_in", to: "users/sessions#guest_sign_in"
  end

  # ユーザーの本棚の本一覧ページのルーティング
  resources :users do
    resources :bookshelves do
      resources :books, only: [ :index, :new, :create, :show, :destroy ] do
        resources :goals, only: [ :create ]
      end
    end
  end

  # 本の検索のためのルーティング(/books/search)
  resources :books do
    collection do
      get "search"
    end
  end

  # アウトプット作成のためのルーティング
  resources :goals, only: [] do
    resource :output, only: [ :create, :edit, :update, :destroy ]
  end

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/*
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest

  # Defines the root path route ("/")
  # root "posts#index"
end
