// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker')

const getRandomArrayValue = (arr) => arr[Math.floor(Math.random() * arr.length)]

const images = [
  '/img/accessories/accessories-1.jpg',
  '/img/accessories/accessories-2.jpg',
  '/img/accessories/accessories-3.jpg',
  '/img/accessories/accessories-4.jpg',
]

const accessoriesTypes = ['video-recorder', 'charger', 'fastening']

module.exports = {
  async up(db) {
    return db.collection('accessories').insertMany(
      [...Array(50)].map(() => {
        const type = getRandomArrayValue(accessoriesTypes)

        const characteristics = [
          {
            type: 'video-recorder',
          },
          {
            type: 'charger',
          },
          {
            type: 'fastening',
          },
        ]

        return {
          category: 'accessories',
          type,
          price: +faker.string.numeric(4).replace(/.{0,2}$/, 99),
          name: faker.lorem.sentence(2),
          description: faker.lorem.sentences(10),
          characteristics: characteristics.find((item) => item.type === type),
          images: getRandomArrayValue(images),
          vendorCode: faker.string.numeric(4),
          inStock: faker.string.numeric(2),
          isBestseller: faker.datatype.boolean(),
          isNew: faker.datatype.boolean(),
          popularity: +faker.string.numeric(3),
          size: {},
        }
      })
    )
  },

  async down(db) {
    return db.collection('accessories').updateMany([])
  },
}
