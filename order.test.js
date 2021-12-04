const {MenuItems, Order, sequelize} = require('./index')

describe('Order table', () => {
    beforeAll(async() => {
        await sequelize.sync({force:true})

        const arrayOfOrders = [
            {menu_item: 'chicken nuggets', price: 4.17, qty: 3 },
            {menu_item: 'large coke', price: 5.97, qty: 3 }
        ]

        const arrayOfMenuItems = [
            {menu_item_name: '1 large Coke', menu_item_price: 1.99},
            {menu_item_name: 'pecan pie', menu_item_price: 2.99},
            {menu_item_name: 'chicken nuggets', menu_item_price: 1.39},
        ]

        await Order.bulkCreate(arrayOfOrders)
        await MenuItems.bulkCreate(arrayOfMenuItems)
    })

    test('order has menu item', async() => {
        const testOrder = await Order.findOne()
        const testMenuItem = await MenuItems.findOne({
            where: {
                menu_item_name: 'chicken nuggets'
            }
        })

        await testMenuItem.addOrder(testOrder)
        console.log(testOrder)
        expect(testOrder.menu_item).toBe('chicken nuggets')
    })
})