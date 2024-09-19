// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker')

const getRandomArrayValue = (arr) => arr[Math.floor(Math.random() * arr.length)]
const getRandomImages = (imgArr) => {
  if (imgArr.length < 2) {
    throw new Error('В массиве должно быть минимум 2 изображения')
  }

  const shuffled = [...imgArr]

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return shuffled.slice(0, 2)
}
const collections = ['premium', 'sport', 'classic', 'luxury', 'budget']
const colors = ['black', 'silver', 'red', 'blue', 'white']
const compositions = ['metal', 'plastic', 'carbon-fiber']
const audioTypes = ['passive', 'active']

const images = [
  '/img/subwoofers/subwoofers-bags-1.png',
  '/img/subwoofers/subwoofers-bags-2.png',
  '/img/subwoofers/subwoofers-bags-3.png',
  '/img/subwoofers/subwoofers-bags-4.png',
  '/img/subwoofers/subwoofers-headdress.png',
  '/img/subwoofers/subwoofers-umbrella.png',
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
          images: getRandomImages(images),
          vendorCode: faker.string.numeric(4),
          inStock: faker.string.numeric(2),
          isBestseller: faker.datatype.boolean(),
          isNew: faker.datatype.boolean(),
          popularity: +faker.string.numeric(3),
          sizes: getRandomArrayValue(sizes),
        }
      })
    )
  },

  async down(db) {
    return db.collection('subwoofers').updateMany([])
  },
}
