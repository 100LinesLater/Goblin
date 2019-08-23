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

require 'test_helper'

class TransactionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
