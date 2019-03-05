json.array! @transactions do |tx|
    json.extract! tx, :id, :user_id, :stock_id, :stock_difference, :transaction_date
end