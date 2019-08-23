# == Schema Information
#
# Table name: portfolios
#
#  id         :bigint(8)        not null, primary key
#  num_shares :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  stock_id   :integer          not null
#  user_id    :integer          not null
#

class Portfolio < ApplicationRecord
    validates :user_id, :stock_id, :num_shares, presence: true

    belongs_to :user, 
        foreign_key: :user_id,
        class_name: :User 

    belongs_to :stock,
        foreign_key: :stock_id,
        class_name: :Stock

    has_many :transactions, 
        through: :stock, 
        source: :transactions
end
