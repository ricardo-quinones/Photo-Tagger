class Api::PhotoTaggingsController < ApplicationController

  before_filter :owns_photo?, only: [:create]

  def create
    @photo_tagging = PhotoTagging.new(params[:photo_tagging])
    @photo_tagging.save

    if @photo_tagging.persisted?
      render json: @photo_tagging
    else
      # error
    end
  end

  def new

  end

  def index
    @tagged_users = Photo.find(params[:id]).tagged_users
  end

  private

  def owns_photo?
    current_user.id == Photo.find(params[:id]).owner_id
  end
end