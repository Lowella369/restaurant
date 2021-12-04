const {sequelize, DataTypes, Model} = require('./db')

//create model for menu in our database
class Customer extends Model{
    //add query  methods here
}

//create attributes for model using init method
Customer.init({
    cust_name: DataTypes.STRING
}, {
    sequelize, //specifies what database our model is stored
    timestamps: false 
})

module.exports = {Customer}