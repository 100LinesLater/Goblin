# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
Stock.destroy_all

User.create(last_name: "Man", first_name: "Money", email: "$Money_Man$@Goblin.com",
    password: "0123456789012345678901", buying_power: 10000)

Stock.create(ticker: "goog");
Stock.create(ticker: "vw");
Stock.create(ticker: "aapl");

