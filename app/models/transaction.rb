# == Schema Information
#
# Table name: transactions
#
#  id               :bigint(8)        not null, primary key
#  stock_difference :integer          not null
#  transaction_date :string           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  stock_id         :integer          not null
#  user_id          :integer          not null
#

class Transaction < ApplicationRecord
    validates :user_id, :stock_id, :stock_difference, :transaction_date, presence: true

    belongs_to :user,
        foreign_key: :user_id, 
        class_name: :User 

    belongs_to :stock,
        foreign_key: :stock_id, 
        class_name: :Stock 

    has_many :portfolios, 
        through: :stock, 
        source: :portfolios
end
