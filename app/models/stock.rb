# == Schema Information
#
# Table name: stocks
#
#  id         :bigint(8)        not null, primary key
#  ticker     :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Stock < ApplicationRecord
    validates :ticker, presence: true, uniqueness: true

    has_many :transactions, 
        foreign_key: :stock_id,
        class_name: :Transaction

    has_many :portfolios, 
        foreign_key: :stock_id,
        class_name: :Portfolio

    has_many :watchlists, 
        foreign_key: :stock_id,
        class_name: :Watchlist

    has_many :users, 
        through: :portfolios, 
        source: :Portfolio
end
