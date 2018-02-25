class PartiesController < ApplicationController

  def create
    party = Party.find_or_create_by(user_id: params[:id])
    serialized_data = ActiveModelSerializers::Adapter::Json.new(PartySerializer.new(party)).serializable_hash
    general_info = {characters: Character.all, equipment: Equipment.all}
    render json: serialized_data.merge(general_info)
  end

end
