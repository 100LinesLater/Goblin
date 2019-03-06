json.array! @portfolios do |port| 
    json.extract! port, :id, :user_id, :stock_id, :num_shares
    json.ticker port.stock.ticker
end