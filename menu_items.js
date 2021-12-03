const {sequelize, DataTypes, Model} = require('./db')

//create model for menu in our database
class MenuItems extends Model{
    //add query  methods here
}

//create attributes for model using init method
MenuItems.init({
    menu_item_name: DataTypes.STRING,
    menu_item_price: DataTypes.DECIMAL
}, {
    sequelize, //specifies what database our model is stored
    timestamps: false 
})

module.exports = {MenuItems}