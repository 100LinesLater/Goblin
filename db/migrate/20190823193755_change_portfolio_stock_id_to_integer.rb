class ChangePortfolioStockIdToInteger < ActiveRecord::Migration[5.2]
  def change
    change_column :portfolios, :stock_id, 'integer USING CAST(stock_id AS integer)'
  end
end
