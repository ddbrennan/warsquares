Rails.application.routes.draw do

  post "/auth", to: "auth#create"
  get "current_user", to: "auth#show"

  resources :users
  resources :parties

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
