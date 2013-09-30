class Api::PhotosController < ApplicationController
  respond_to :json
  respond_to :html, only: [:index]

  def create
    @photo = Photo.new(params[:photo])
    @photo.owner_id = current_user.id

    if @photo.save
      render json: @photo
    else
      render json: @photo.errors, status: 422
    end
  end

  def index
    @photos = User.find(params[:user_id]).photos
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @photos }
    end
  end
end
