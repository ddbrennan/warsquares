class Party < ApplicationRecord
  has_many :party_characters
  has_many :party_maps
  has_many :party_equipments
  has_many :maps, through: :party_maps
  has_many :characters, through: :party_characters
  has_many :equipments, through: :party_equipments
  belongs_to :user
end
