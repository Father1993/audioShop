// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fake, faker } = require('@faker-js/faker')

const getRandomArrayValue = (arr) => arr[Math.floor(Math.random() * arr.length)]
const collections = ['premium', 'sport', 'classic', 'luxury', 'budget']
const colors = ['black', 'silver', 'red', 'blue', 'white']
const compositions = ['metal', 'plastic', 'carbon-fiber']
const audioTypes = ['passive', 'active']

const images = [
  '/img/subwoofers/accessories-bags-1.png',
  '/img/subwoofers/accessories-bags-2.png',
  '/img/subwoofers/accessories-bags-3.png',
  '/img/subwoofers/accessories-bags-4.png',
  '/img/subwoofers/accessories-headdress.png',
  '/img/subwoofers/accessories-umbrella.png',
]

const subwooferTypes = ['passive', 'active']
const sizes = ['10 inches', '12 inches', '15 inches']
const materials = ['paper', 'kevlar', 'fiberglass']
const powerHandling = ['200W', '400W', '600W', '800W']
const impedance = ['2 ohms', '4 ohms', '8 ohms']
const mountingDepth = ['7 cm', '9 cm', '11 cm']

module.exports = {
  async up(db) {
    return db.collection('subwoofers').insertMany(
      [...Array(50)].map(() => {
        const type = audioTypes[Math.floor(Math.random() * audioTypes.length)]

        const characteristics = [
          {
            type: 'passive',
            color: getRandomArrayValue(colors),
            composition: getRandomArrayValue(compositions),
            collection: getRandomArrayValue(collections),
            subwooferType: subwooferTypes[0],
            size: getRandomArrayValue(sizes),
            material: getRandomArrayValue(materials),
            power: getRandomArrayValue(powerHandling),
            impedances: getRandomArrayValue(impedance),
            mountingSize: getRandomArrayValue(mountingDepth),
          },
          {
            type: 'active',
            color: getRandomArrayValue(colors),
            composition: getRandomArrayValue(compositions),
            collection: getRandomArrayValue(collections),
            subwooferType: subwooferTypes[1],
            size: getRandomArrayValue(sizes),
            material: getRandomArrayValue(materials),
            power: getRandomArrayValue(powerHandling),
            impedances: getRandomArrayValue(impedance),
            mountingSize: getRandomArrayValue(mountingDepth),
          },
        ]

        return {
          category: 'subwoofers',
          type,
          price: +faker.string.numeric(4).replace(/.{0,2}$/, 99),
          name: faker.lorem.sentence(2),
          description: faker.lorem.sentences(10),
          characteristics: characteristics.find((item) => item.type === type),
          images: images.filter((item) => item.includes(type)),
          vendorCode: faker.string.numeric(4),
          inStock: faker.string.numeric(2),
          isBestseller: faker.datatype.boolean(),
          isNew: faker.datatype.boolean(),
          popularity: +faker.string.numeric(3),
        }
      })
    )
  },

  async down(db) {
    return db.collection('subwoofers').updateMany([])
  },
}
