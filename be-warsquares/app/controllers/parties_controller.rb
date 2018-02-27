class PartiesController < ApplicationController

  def create
    party = Party.create(name: params[:party][:name], user_id: params[:party][:user_id], gold: 1000)
    char = Character.find_by(role: params[:member][:role])
    PartyCharacter.create(party_id: party.id, character_id: char.id, color: params[:member][:color], armor_color: params[:member][:armor_color], name: params[:member][:name], role: params[:member][:role], health: char.health, max_health: char.health)

    serialized_data = ActiveModelSerializers::Adapter::Json.new(PartySerializer.new(party)).serializable_hash
    general_info = {characters: Character.all, equipment: Equipment.all}

    render json: serialized_data.merge(general_info)
  end

  def update
    party = Party.find(params[:id])

    party[:gold] -= params[:item][:amount]
    party.equipments << Equipment.find(params[:item][:id])
    party.party_characters << params[:member]

    party.save
    render json: party
  end

  def show
    party = Party.find_by(user_id: params[:id])

    serialized_data = ActiveModelSerializers::Adapter::Json.new(PartySerializer.new(party)).serializable_hash
    general_info = {characters: Character.all, equipment: Equipment.all}

    render json: serialized_data.merge(general_info)
  end

  def destroy
    party = Party.find(params[:id])
    party.destroy
    render json: {alert: "party deleted"}
  end

end
