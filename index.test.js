const { Customer } = require('./customer')
const {MenuItems, Menu, Restaurant, sequelize} = require('./index')
const { Order } = require('./order')


describe('Restaurant Database', () => {
    beforeAll(async() => {
        await sequelize.sync({force:true})

        //create instance of restaurant model
        await Restaurant.create({restaurant_name: 'Burger King'})

        //create array of customers that will be added to the customer table
        const arrayOfCustomers = [
            {cust_name: 'Jessica'},
            {cust_name: 'Tristan'},
            {cust_name: 'Melissa'}
        ]

        //create array of Menus that will be added to the menu table
        const arrayOfMenus = [
            {menu_name: 'Meals'},
            {menu_name: 'A La Carte'},
            {menu_name: 'Desserts'},
            {menu_name: 'Beverages'},
            {menu_name: 'Jr Meals'}
        ]

        //create array of Menu Items that will be added to the menu item model
        const arrayOfMenuItems = [
            {menu_item_name: 'large Coke', menu_item_price: 1.99},
            {menu_item_name: 'pecan pie', menu_item_price: 2.99},
            {menu_item_name: 'chicken nuggets', menu_item_price: 1.39},
        ]

        //create instance of order model
        await Order.create({menu_item: 'chicken nuggets', price: 4.17, qty: 3 })

        //added arrays to the db
        await Customer.bulkCreate(arrayOfCustomers)
        await Menu.bulkCreate(arrayOfMenus)
        await MenuItems.bulkCreate(arrayOfMenuItems)  
        
    })

    //test cases for Restaurant model
    test('can create restaurant', async() => {
        //read restaurant instance from db
        const restaurantList = await Restaurant.findAll()

        //assert that lenght of restaurant is 1
        expect(restaurantList.length).toBe(1)
    })

    test('restaurant has name', async() => {
        //read restaurant instance from db
        const restaurantList = await Restaurant.findAll()

        //assert that restaurant name is burger king
        expect(restaurantList[0].restaurant_name).toBe('Burger King')
    })

    test('restaurant has id', async() => {
        //read restaurant instance from db
        const restaurantList = await Restaurant.findAll()

        //assert that id is 1
        expect(restaurantList[0].id).toBe(1)
    })
    //end here

    //test cases for menu model
    test('can create menu', async() => {
        //read menu instance from db
        const menuList = await Menu.findAll()

        //assert that lenght is 5
        expect(menuList.length).toBe(5)
    })

    test('menu has name', async() => {
        //read menu instance from db that has specific id 1
        const menuList = await Menu.findOne({
            where: {
                id: 1
            }
        })

        //assert that menu name of id 1 is Meals
        expect(menuList.menu_name).toBe('Meals')
    })

    test('restaurant can have many menus', async() => {
        //read restaurant instance from db
        const restaurantList = await Restaurant.findOne({
            where: {
                restaurant_name: "Burger King"
            }
        });

        //read menu instance from db
        const menuList = await Menu.findAll()

        //add all menus to restaurant
        await restaurantList.addMenu(menuList)

        //retrieve list of menus in this restaurant
        const allMenus = await restaurantList.getMenus()

        //assert that lenght is 5
        expect(allMenus.length).toBe(5)
    })

    test('check that menu does not have null value for restaurant id', async() => {
        //read restaurant instance from db
        const restaurantList = await Restaurant.findOne({
            where: {
                restaurant_name: "Burger King"
            }
        });

        //read menu instance from db
        const menuList = await Menu.findAll()

        //add all menus to restaurant
        await restaurantList.addMenu(menuList)

        //read menu instance that has null value for restaurant id
        const nullRestaurantId = await Menu.findAll({
            where: {
                RestaurantId: null
            }
        })

        expect(nullRestaurantId.length).toBe(0)
    })
    //end test cases for Menu

    //test cases for menu items
    test('menu item can have name', async() => {
        const menuItemList = await MenuItems.findOne({
            where: {
                id: 1
            }
        });

        //assert that menu item name is large coke
        expect(menuItemList.menu_item_name).toBe('large Coke')
    })

    test('menu item can have an id', async() => {
        const testMenuItem = await MenuItems.findOne({
            where: {
                menu_item_name: 'pecan pie'
            }
        });

        //assert that id is 2
        expect(testMenuItem.id).toBe(2)
    })

    test('menu can be added to menu item', async() => {
        const menuItemList = await MenuItems.findOne({
            where: {
                menu_item_name: 'chicken nuggets'
            }
        })

        const menuList = await Menu.findOne({
            where: {
                menu_name: 'Meals'
            }
        })

        //add menu items to menu
        menuList.addMenuItems(menuItemList)

        const getMenuItem = await MenuItems.findOne({
            where: {
                menu_item_name: 'chicken nuggets'
            }
        })

        //assert that menu id is 1
        //which is the menu id that i want to be inserted to chicken nuggets menu item
        expect(getMenuItem.getDataValue("MenuId")).toBe(1)
    })

    //test cases for Customer model
    test('can create customer', async() => {
        //read customer instance from db
        const customerList = await Customer.findAll()

        //assert that lenght of restaurant is 1
        expect(customerList.length).toBe(3)
    })

    test('customer has name', async() => {
        //read customer instance from db
        const customerList = await Customer.findAll()

        //assert that customer name is Jessica
        expect(customerList[0].cust_name).toBe('Jessica')
    })

    test('customer has id', async() => {
        //read customer instance from db
        const customerList = await Customer.findAll()

        //assert that id is 1
        expect(customerList[0].id).toBe(1)
    })
    //end here

    //test cases for order model
    test('customer can order', async() => {
        const customer = await Customer.findOne({
            where: {
                cust_name: 'Jessica'
            }
        })

        const orderList = await Order.findOne({
            where: {
                menu_item: 'chicken nuggets'
            }
        })

        //add order to the customer
        customer.addOrder(orderList)

        //retrieve order in this customer
        const getOrderlist = await customer.getOrders()

        //assert that customer id is 1
        expect(getOrderlist[0].CustomerId).toBe(1)
    })

    test('order has menu item', async() => {
        //I didn't put a where or condition inside the findOne function since i only have 1 test data in my instance
        const orderList = await Order.findOne()
        const menuItemList = await MenuItems.findOne({
            where: {
                menu_item_name: 'chicken nuggets'
            }
        })

        //add menu item to the order
        orderList.addMenuItems(menuItemList)
        
        //retrieve menu item in this order
        const getMenuItem = await orderList.getMenuItems()

        //assert that menu item name is chicken nuggets in this order
        expect(getMenuItem[0].menu_item_name).toBe('chicken nuggets')
    })

    //still have to create more test cases for order model

})