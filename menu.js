const {sequelize, DataTypes, Model} = require('./db')

//create model for menu in our database
class Menu extends Model{
    //add query  methods here
}

//create attributes for model using init method
Menu.init({
    //menu_id: DataTypes.INTEGER,
    menu_name: DataTypes.STRING
}, {
    sequelize, //specifies what database our model is stored
    timestamps: false 
})

module.exports = {Menu}