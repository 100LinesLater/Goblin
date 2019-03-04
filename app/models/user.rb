# == Schema Information
#
# Table name: users
#
#  id              :bigint(8)        not null, primary key
#  first_name      :string
#  last_name       :string
#  email           :string           not null
#  session_token   :string           not null
#  password_digest :string           not null
#  buying_power    :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
    validates :email, :session_token, :password_digest, :buying_power, :first_name, :last_name, presence: true
    validates :email, :session_token, uniqueness: true
    validates :password, length: {minimum: 6, allow_nil: true}
    attr_reader :password

    after_initialize :ensure_session_token

    has_many :portfolio_stocks,
        foreign_key: :user_id, 
        class_name: :Portfolio

    has_many :watchlist_stocks,
        foreign_key: :user_id, 
        class_name: :Watchlist

    has_many :transactions, 
        foreign_key: :user_id,
        class_name: :Transaction 

    has_many :stocks,
        through: :portfolio_stocks,
        source: :stocks 

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        user && user.is_password?(password) ? user : nil
    end

    def is_password?(pass)
        BCrypt::Password.new(self.password_digest).is_password?(pass)
    end

    def password=(pass)
        @password = pass 
        self.password_digest = BCrypt::Password.create(pass)
    end

    def reset_session_token!
        self.session_token = SecureRandom.urlsafe_base64(16)
        self.save!
        self.session_token
    end

    def ensure_session_token
        self.session_token ||= SecureRandom.urlsafe_base64(16)
    end

end
