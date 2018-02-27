class PartiesController < ApplicationController

  def create
    party = Party.find_or_create_by(user_id: params[:id])
    serialized_data = ActiveModelSerializers::Adapter::Json.new(PartySerializer.new(party)).serializable_hash
    general_info = {characters: Character.all, equipment: Equipment.all}

    render json: serialized_data.merge(general_info)
  end

  def update
    party = Party.find(params[:id])
    party[:gold] -= params[:item][:amount]
    party.equipments << Equipment.find(params[:item][:id])
    party.save
    render json: party
  end

end
