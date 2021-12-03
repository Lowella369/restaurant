const {sequelize, DataTypes, Model} = require('./db')

//import models
const {MenuItems} = require('./menu_items')
const {Menu} = require('./menu')
const { Restaurant } = require('./restaurant')
const { Order } = require('./order')



//association models
MenuItems.belongsTo(Menu) //adds foreign key to musician instance to a specific band
Menu.hasMany(MenuItems) //gives us sequelize methods for a one to many relationship
Menu.belongsTo(Restaurant)
Restaurant.hasMany(Menu)
MenuItems.belongsTo(Order)
Order.hasMany(MenuItems)


//export models with added associations
module.exports = {MenuItems, Menu, Restaurant, sequelize}