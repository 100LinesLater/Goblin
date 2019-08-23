# == Schema Information
#
# Table name: watchlists
#
#  id         :bigint(8)        not null, primary key
#  user_id    :integer          not null
#  stock_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Watchlist < ApplicationRecord
  validates: user_id, stock_id, presence: true;

  belongs_to :user,
    foreign_key: :user_id,
    class_name: :User

  belongs_to :stock,
    foreign_key: :stock_id,
    class_name: :Stock 
    
end
