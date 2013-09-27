class Api::PhotosController < ApplicationController

  def create
    @photo = Photo.new(params[:photo])
    @photo.owner_id = current_user.id
    if @photo.save
      flash.now[:success] = "You did it!!"
      render json: @photo
    else
      head :ok
    end
  end

  def new

  end

  def index
    @photos = User.find(params[:user_id]).photos
    respond_to do |format|
      format.html do
        render :index
      end
      format.json do
        render json: @photos
      end
    end
  end
end
