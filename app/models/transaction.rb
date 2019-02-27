# == Schema Information
#
# Table name: transactions
#
#  id               :bigint(8)        not null, primary key
#  user_id          :integer          not null
#  stock_id         :integer          not null
#  stock_difference :integer          not null
#  transaction_date :date             not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class Transaction < ApplicationRecord
end
