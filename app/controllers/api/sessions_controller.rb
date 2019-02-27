class Api::SessionsController < ApplicationController
    def create
        @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
        if login(@user)
            render '/api/users/user'
        else
            render json: ["Email / Password does not exist"], status: 401
        end
    end

    def destroy
        user = User.find_by(params[:id])
        if user.delete
            render json: {}
        else
            render json: ["User must be logged in to perform this action"], status: 404
        end
    end
end