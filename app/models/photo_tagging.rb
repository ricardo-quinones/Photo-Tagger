class PhotoTagging < ActiveRecord::Base
  attr_accessible :photo_id, :user_id, :x_pos, :y_pos

  validates :photo_id, :user_id, :x_pos, :y_pos, presence: true
  validates :user_id, uniqueness: { scope: :photo_id }

  belongs_to :photo
  belongs_to :user

end
