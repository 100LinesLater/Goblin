
    @stocks.each do |stock|
        json.set! stock.id do 
            json.id stock.id
            json.ticker stock.ticker
        end
    end
