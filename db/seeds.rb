# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
Stock.destroy_all
Portfolio.destroy_all
Transaction.destroy_all
Watchlist.destroy_all

user1 = User.create(last_name: "Man", first_name: "Money", email: "$Money_Man$@Goblin.com",
    password: "0123456789012345678901", buying_power: 10000)

stock1 = Stock.create(ticker: "GOOG")
stock2 = Stock.create(ticker: "FB")
stock3 = Stock.create(ticker: "AAPL")
stock4 = Stock.create(ticker: "BABA")

port1 = Portfolio.create(user_id: user1.id, stock_id: stock1.id, num_shares: 5)
port2 = Portfolio.create(user_id: user1.id, stock_id: stock3.id, num_shares: 10)
port3 = Portfolio.create(user_id: user1.id, stock_id: stock2.id, num_shares: 101)
port4 = Portfolio.create(user_id: user1.id, stock_id: stock4.id, num_shares: 13)

tx1 = Transaction.create(user_id: user1.id, stock_id: stock1.id, stock_difference: 5, transaction_date: "2019-02-01")
tx2 = Transaction.create(user_id: user1.id, stock_id: stock3.id, stock_difference: 20, transaction_date: "2019-03-05")
tx3 = Transaction.create(user_id: user1.id, stock_id: stock3.id, stock_difference: -10, transaction_date: "2019-06-01")
tx4 = Transaction.create(user_id: user1.id, stock_id: stock2.id, stock_difference: 101, transaction_date: "2018-09-23")
tx4 = Transaction.create(user_id: user1.id, stock_id: stock4.id, stock_difference: 13, transaction_date: "2019-08-20")

watch1 = Watchlist.create(user_id: user1.id, stock_id: stock1.id)
watch2 = Watchlist.create(user_id: user1.id, stock_id: stock4.id)