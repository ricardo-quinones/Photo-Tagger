class Api::PhotoTaggingsController < ApplicationController

  before_filter :owns_photo?, only: [:create] #problem with this
  respond_to :json
  respond_to :html, only: [:index]

  def create
    @photo_tagging = PhotoTagging.new(params[:photo_tagging])

    if @photo_tagging.save
      render json: @photo_tagging
    else
      render(json: @photo_tagging.errors.full_messages,
        status: 422)
    end
  end

  def index
    @photo_taggings = PhotoTagging.find_by_photo_id(params[:photo_id])
    render json: @photo_taggings
  end

  private

  def owns_photo?
    current_user.id == Photo.find(params[:photo_tagging][:photo_id]).owner_id
  end
end