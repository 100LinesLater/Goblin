class Api::UsersController < ApplicationController
    def create
        @user = User.new(user_params)
        if @user.save
            render :show
        else
            render json: @user.errors.full_messages, status: 401
        end
    end

    def update
        @user = User.find(params[:id])
        if @user.update(update_user_params)
            render :show
        else
            render json: @user.errors.full_messages, status: 401
        end
    end

    def user_params
        params.require(:user).permit(:email, :password, :first_name, :last_name, :buying_power)
    end

    def update_user_params
        params.require(:user).permit(:email, :password_digest, :first_name, :last_name, 
            :buying_power, :session_token)
    end
end
