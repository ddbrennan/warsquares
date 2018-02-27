class Party < ApplicationRecord
  has_many :party_characters, dependent: :destroy
  has_many :party_maps, dependent: :destroy
  has_many :party_equipments, dependent: :destroy
  has_many :maps, through: :party_maps
  has_many :characters, through: :party_characters
  has_many :equipments, through: :party_equipments
  belongs_to :user
end
