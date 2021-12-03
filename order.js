const { DataTypes } = require('sequelize/dist')
const {sequelize, DataType, Model} = require('./db')

//create model for Order in our database
class Order extends Model{}

Order.init({
    menu_item: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    qty: DataTypes.INTEGER
}, {
    sequelize, 
    timestamps: false
})

module.exports = {Order}