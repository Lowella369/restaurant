const {MenuItems, Menu, Restaurant, sequelize} = require('./index')

describe('Menu Items table', () => {
    beforeAll(async() => {
        await sequelize.sync({force:true})

        const arrayOfMenuItems = [
            {menu_item_name: '1 large Coke', menu_item_price: 1.99},
            {menu_item_name: 'pecan pie', menu_item_price: 2.99},
            {menu_item_name: 'chicken nuggets', menu_item_price: 1.39},
        ]

        const arrayOfMenus = [
            {menu_name: 'Meals'},
            {menu_name: 'A La Carte'},
            {menu_name: 'Desserts'},
            {menu_name: 'Beverages'},
            {menu_name: 'Jr Meals'}
        ]
        await Menu.bulkCreate(arrayOfMenus)
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

    test('menu can be added to a menu item', async() => {
        const testMenuItems = await MenuItems.findAll({
            where: {
                menu_item_name: 'chicken nuggets'
            }
        })

        const testMenu = await Menu.findOne({
            where: {
                menu_name: 'Meals'
            }
        })

        
        testMenu.addMenuItems(testMenuItems)
        const testMenuItems1 = await MenuItems.findOne({
            where: {
                menu_item_name: 'chicken nuggets'
            }
        })

        expect(testMenuItems1.getDataValue("MenuId")).toBe(1)
        
    })

})