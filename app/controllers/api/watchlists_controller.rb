class Api::WatchlistsController < ApplicationController
  def index
      @watchlists = Watchlist.all
  end

  def create
      @watchlist = Watchlist.new(watchlist_params)
      if @watchlist.save
          render :index
      else 
          render json: @watchlist.errors.full_messages, status: 401
      end
  end

  def destroy
      @watchlist = Watchlist.find_by(user_id: params[:watchlist][:user_id], stock_id: params[:watchlist][:stock_id])
      if @watchlist.destroy(watchlist_params)
          render :index
      else
          render json: @watchlist.errors.full_messages, status: 401
      end
  end

  def watchlist_params
      params.require(:watchlist).permit(:user_id, :stock_id)
  end
end
