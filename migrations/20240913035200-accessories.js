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

const collections = [
  'Premium',
  'Sport',
  'Classic',
  'Luxury',
  'Бюджетный',
  'Из Японии',
]

const companyNames = [
  'Sony',
  'Panasonic',
  'Mitsubishi',
  'Alpine',
  'Pioneer',
  'Kenwood',
  'Sony',
  'JBL',
  'Bose',
  'Harman Kardon',
  'Infinity',
  'Rockford Fosgate',
  'Focal',
  'Kicker',
  'Clarion',
  'JVC',
  'Audison',
  'Hertz',
  'Polk Audio',
  'Memphis Audio',
  'MTX Audio',
  'Morel',
  'Dynaudio',
  'Bang & Olufsen (B&O)',
  'Blaupunkt',
  'Nakamichi',
  'Soundstream',
]

const voltage = ['12v', '24v', '12-24v']

const model = ['DN1710', 'M7700', 'Model A', 'Model D', 'Model E']

const companyName = getRandomArrayValue(companyNames)

module.exports = {
  async up(db) {
    return db.collection('accessories').insertMany(
      [...Array(50)].map(() => {
        const type = getRandomArrayValue(accessoriesTypes)

        const characteristics = [
          {
            type: 'video-recorder',
            voltage: getRandomArrayValue(voltage),
          },
          {
            type: 'charger',
            voltage: getRandomArrayValue(voltage),
          },
          {
            type: 'fastening',
            voltage: getRandomArrayValue(voltage),
          },
        ]

        return {
          category: 'accessories',
          type,
          companyName: companyName,
          model: getRandomArrayValue(model),
          price: +faker.string.numeric(4).replace(/.{0,2}$/, 99),
          name: `${names[type]} ${faker.lorem.words(2)}`,
          description: faker.lorem.sentences(10),
          characteristics: characteristics.find((item) => item.type === type),
          collections: getRandomArrayValue(collections),
          images: getRandomImages(images),
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
    return db.collection('accessories').updateMany([])
  },
}
