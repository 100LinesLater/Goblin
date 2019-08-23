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

require 'test_helper'

class PortfolioTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
