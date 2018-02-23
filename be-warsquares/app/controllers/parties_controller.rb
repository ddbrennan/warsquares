class PartiesController < ApplicationController

  def create
    party = Party.find_or_create_by(user_id: params[:id])
    render json: party
  end

end
