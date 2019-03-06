class Api::StocksController < ApplicationController
    def index
        @stocks = Stock.all
    end

    def create
        @stock = Stock.new(ticker: params[:stock][:ticker].upcase)
        if @stock.save
            render :index
        end
    end
end
