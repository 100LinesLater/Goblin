class Api::TransactionsController < ApplicationController
    def index
        @transactions = Transaction.all
    end

    def create
        @transaction = Transaction.new(transaction_params)
        if @transaction.save
            render :index
        else
            render json: @transaction.errors.full_messages, status: 401
        end
    end

    def transaction_params
        params.require(:transaction).permit(:user_id, :stock_id, :stock_difference, :transaction_date)
    end
end
