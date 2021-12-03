const {sequelize} = require('./db')
const {MenuItems} = require('./menu_items')

describe('Menu Items table', () => {
    beforeAll(async() => {
        await sequelize.sync({force:true})

        const arrayOfMenuItems = [
            {menu_id: 3, menu_item_name: '1 large Coke', menu_item_price: 1.99},
            {menu_id: 2, menu_item_name: 'pecan pie', menu_item_price: 2.99},
            {menu_id: 4, menu_item_name: 'chicken nuggets', menu_item_price: 1.39},
        ]
        await MenuItems.bulkCreate(arrayOfMenuItems)
    })

    test('menu item can have name', async() => {
        const testMenuItem = await MenuItems.findOne({
            where: {
                id: 1
            }
        });
        expect(testMenuItem.menu_item_name).toBe('1 large Coke')
    })

    test('menu item can have an id', async() => {
        const testMenuItem = await MenuItems.findOne({
            where: {
                menu_item_name: 'pecan pie'
            }
        });
        expect(testMenuItem.id).toBe(2)
    })

})