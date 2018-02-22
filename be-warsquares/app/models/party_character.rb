class PartyCharacter < ApplicationRecord
  belongs_to :party
  belongs_to :character
end
