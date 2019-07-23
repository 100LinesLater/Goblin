class ChangeStockToBeTickerSymbolInPortfolios < ActiveRecord::Migration[5.2]
  def change
    change_column :portfolios, :stock_id, :string
  end
end
