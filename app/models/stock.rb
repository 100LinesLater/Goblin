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
end
