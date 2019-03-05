class Api::StocksController < ApplicationController
    def show
        @stock = Stock.find_by(ticker: params[:id])
    end

    def create
        @stock = Stock.new(ticker: params[:stock][:ticker].upcase)
        if @stock.save
            render :show
        end
    end
end
