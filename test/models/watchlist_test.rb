# == Schema Information
#
# Table name: watchlists
#
#  id         :bigint(8)        not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  stock_id   :integer          not null
#  user_id    :integer          not null
#
# Indexes
#
#  index_watchlists_on_user_id_and_stock_id  (user_id,stock_id) UNIQUE
#

require 'test_helper'

class WatchlistTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
