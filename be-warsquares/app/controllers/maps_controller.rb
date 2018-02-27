class MapsController < ApplicationController

  def create
    map = Map.create(map_params)
    party = Party.find(params[:party_id])
    PartyMap.create(visited: params[:visited], party_id: party.id, map_id: map.id)

    serialized_data = ActiveModelSerializers::Adapter::Json.new(PartySerializer.new(party)).serializable_hash

    maps = party.party_maps.map { |map| {map: map.map, info: map} }

    general_info = {characters: Character.all, equipment: Equipment.all, maps: maps}

    json_return = serialized_data.merge(general_info)

    render json: json_return
  end

  private

    def map_params
      params.require(:map).permit(:name, :layout)
    end
end
