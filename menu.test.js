const {sequelize} = require('./db')
const {Menu} = require('./menu')

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

    test('menu can have name', async() => {
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

})