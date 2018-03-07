class PartiesController < ApplicationController
  before_action :authorize_user!

  def index
    party = Party.find_by(user_id: @current_user.id)

    if party
      serialized_data = ActiveModelSerializers::Adapter::Json.new(PartySerializer.new(party)).serializable_hash

      maps = party.party_maps.map { |map| {map: map.map, info: map} }

      general_info = {characters: Character.all, equipment: Equipment.all, maps: maps}

      json_return = serialized_data.merge(general_info)
    end

    render json: json_return
  end

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
      if map_params[:delete]
        pm.destroy
      else
        pm.update(map_params)
      end
    end

    if item_params
      if item_params[:update]
        # find one with old owner id, reset it
        oldEquip = PartyEquipment.find_by(owner_id: item_params[:owner_id], party_id: item_params[:party_id])
        if oldEquip
          oldEquip.owner_id = 0
          oldEquip.save
        end
        # find current equip, switch owner id
        if item_params[:id] > 0
          newEquip = PartyEquipment.find(item_params[:id])
          newEquip.owner_id = item_params[:owner_id]
          newEquip.save
        end
      else
        party.equipments << Equipment.find(item_params[:equipment_id])
      end
    end

    maps = party.party_maps.map { |map| {map: map.map, info: map} }

    serialized_data = ActiveModelSerializers::Adapter::Json.new(PartySerializer.new(party)).serializable_hash

    general_info = {characters: Character.all, equipment: Equipment.all, maps: maps}

    json_return = serialized_data.merge(general_info)

    render json: json_return
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
      params.require(:party).permit(:gold, :name)
    end

    def recruit_params
      if params[:recruit]
        params.require(:recruit).permit(:name, :role, :health, :max_health, :mana, :armor_color, :armor, :color)
      end
    end

    def map_params
      if params[:map]
        params.require(:map).permit(:current_square, :moves, :complete, :visited, :id, :delete)
      end
    end

    def item_params
      if params[:item]
        params.require(:item).permit(:id, :owner_id, :equipment_id, :update, :party_id)
      end
    end

    # t.string :visited
    # t.boolean :complete, default: false
    # t.integer :moves, default: 0
    # t.string :current_square, default: "00"

end
