const {MenuItems, Menu, Restaurant, sequelize} = require('./index')

describe('Menu table', () => {
    beforeAll(async() => {
        await sequelize.sync({force:true})

        const arrayOfMenus = [
            {menu_name: 'Meals'},
            {menu_name: 'A La Carte'},
            {menu_name: 'Desserts'},
            {menu_name: 'Beverages'},
            {menu_name: 'Jr Meals'}
        ]
        await Menu.bulkCreate(arrayOfMenus)
    })

    test('menu can have a name', async() => {
        const testMenu = await Menu.findOne({
            where: {
                id: 1
            }
        });
        expect(testMenu.menu_name).toBe('Meals')
    })

    test('menu can have id', async() => {
        const testMenu = await Menu.findOne({
            where: {
                menu_name: 'Desserts'
            }
        });
        expect(testMenu.id).toBe(3)
    })

    test('restaurant id can be added to the menu table', async() => {
        const insertRestaurant =  await Restaurant.create({restaurant_name: "Burger King"})
        const testRestaurant = await Restaurant.findOne({
            where: {
                restaurant_name: 'Burger King'
            }
        })

        const testMenu = await Menu.findAll()
        await testRestaurant.addMenu(testMenu)

        const menuList = await Menu.findAll()
        expect(menuList[0].RestaurantId).toBe(1)
    })

})