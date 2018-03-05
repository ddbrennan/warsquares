class UsersController < ApplicationController

  def create
    user = User.new(user_params)
    if user.save
      created_jwt = issue_token({id: user.id})
      render json: {username: user.username, id: user.id, jwt: created_jwt}
    else
      render json: {error: user.errors.first}
    end
  end

  private

    def user_params
      params.permit(:username, :password)
    end

end
