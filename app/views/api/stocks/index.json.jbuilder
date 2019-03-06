json.array! @stocks do |stock|
    stock.id do 
        json.id stock.id
        json.ticker stock.ticker
    end
end