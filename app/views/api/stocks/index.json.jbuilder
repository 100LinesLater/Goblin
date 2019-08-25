
    @stocks.each do |stock|
        json.set! stock.ticker do 
            json.id stock.id
            json.ticker stock.ticker
        end
    end
