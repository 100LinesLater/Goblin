json.array! @watchlists do |watch| 
    json.extract! watch, :id, :user_id, :stock_id
    json.ticker watch.stock.ticker
end