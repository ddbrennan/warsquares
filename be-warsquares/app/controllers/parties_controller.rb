class PartiesController < ApplicationController
  before_action :authorize_user!

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

    if party_params
      party.update(party_params)
    end

    if recruit_params
      pc = PartyCharacter.new(recruit_params)
      char = Character.find_by(role: recruit_params[:role])
      pc.party = party
      pc.character = char
      pc.save
    end

    if map_params
      pm = PartyMap.find(map_params[:id])
      pm.update(map_params)
    end

    if params[:item]
      party.equipments << Equipment.find(params[:item][:id])
    end

    render json: party
  end


  def show
    json_return = {}
    party = Party.find_by(user_id: params[:id])

    if party
      serialized_data = ActiveModelSerializers::Adapter::Json.new(PartySerializer.new(party)).serializable_hash

      maps = party.party_maps.map { |map| {map: map.map, info: map} }

      general_info = {characters: Character.all, equipment: Equipment.all, maps: maps}

      json_return = serialized_data.merge(general_info)
    end

    render json: json_return
  end


  def destroy
    party = Party.find(params[:id])
    party.destroy
    render json: {alert: "party deleted"}
  end

  private

    def party_params
      params.require(:party).permit(:gold)
    end

    def recruit_params
      if params[:recruit]
        params.require(:recruit).permit(:name, :role, :health, :max_health, :mana, :armor_color, :armor, :color)
      end
    end

    def map_params
      if params[:map]
        params.require(:map).permit(:current_square, :moves, :complete, :visited, :id)
      end
    end

    # t.string :visited
    # t.boolean :complete, default: false
    # t.integer :moves, default: 0
    # t.string :current_square, default: "00"

end
