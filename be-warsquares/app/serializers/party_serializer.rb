class PartySerializer < ActiveModel::Serializer
  attributes :id, :name, :gold
  has_many :party_equipments
  has_many :party_characters
  has_many :party_maps
  has_many :maps, through: :party_maps
end
