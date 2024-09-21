/* eslint-disable prettier/prettier */
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

const images = [
  '/img/accessories/accessories-1.png',
  '/img/accessories/accessories-2.png',
  '/img/accessories/accessories-3.png',
  '/img/accessories/accessories-4.png',
  '/img/accessories/accessories-5.png',
]

const accessoriesTypes = ['video-recorder', 'charger', 'fastening']

const names = {
  'video-recorder': 'Видеорегистратор',
  charger: 'Зарядное устройство',
  fastening: 'Устройство крепления',
}

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
          name: `${names[type]} ${faker.lorem.words(2)}`,
          description: faker.lorem.sentences(10),
          characteristics: characteristics.find((item) => item.type === type),
          images: getRandomImages(images),
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
