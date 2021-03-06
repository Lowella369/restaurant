const {sequelize, DataTypes, Model} = require('./db')

//create model for restaurant in our database
class Restaurant extends Model{}

//create attributes for model using init method
Restaurant.init({
    restaurant_name: DataTypes.STRING
}, {
    sequelize, //specifies what database our model is stored
    timestamps: false 
})

module.exports = {Restaurant}