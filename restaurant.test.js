const {sequelize} = require('./db')
const {Restaurant} = require('./restaurant')

describe('Restaurant Database', () => {
    beforeAll(async() => {
        await sequelize.sync({force:true})

        //create instance of restaurant model
        await Restaurant.create({restaurant_name: "Burger King"})
    })

    test('can create restaurant', async() => {
        
        const restaurantList = await Restaurant.findAll()
        expect(restaurantList.length).toBe(1)
    })

    test('restaurant has name', async() => {
        const restaurantList = await Restaurant.findAll()
        expect(restaurantList[0].restaurant_name).toBe('Burger King')
    })

    test('restaurant has id', async() => {
        const restaurantList = await Restaurant.findAll()
        expect(restaurantList[0].id).toBe(1)
    })

})