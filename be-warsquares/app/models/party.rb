class Party < ApplicationRecord
  has_many :party_characters
  has_many :party_maps
  has_many :maps, through: :party_maps
  has_many :characters, through: :party_characters
  belongs_to :user
end
