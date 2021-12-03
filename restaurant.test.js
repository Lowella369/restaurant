const {sequelize} = require('./db')
const {Restaurant} = require('./restaurant')

describe('Restaurant Database', () => {
    beforeAll(async() => {
        await sequelize.sync({force:true})
    })

    test('can create a restaurant', async() => {
        const testRestaurant =  await Restaurant.create({restaurant_name: "Burger King"})
        expect(testRestaurant.restaurant_name).toBe('Burger King')
    })

})