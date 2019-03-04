class Api::StocksController < ApplicationController
    def show
        @stock = Stock.find_by(ticker: params[:ticker])
    end

    def create
        @stock = Stock.new(params[:stock][:ticker])
        if @stock.save
            render :show
        end
    end
end
