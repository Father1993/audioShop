// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker')

const getRandomArrayValue = (arr) => arr[Math.floor(Math.random() * arr.length)]

const images = {
  component: [
    '/img/speakers/speaker-component-1.png',
    '/img/speakers/speaker-component-2.png',
  ],
  coaxial: [
    '/img/speakers/speaker-coax-1.png',
    '/img/speakers/speaker-coax-2.png',
  ],
  fullRange: ['/img/speakers/speaker.png', '/img/speakers/speaker-2.png'],
}

const speakersModel = ['DN1710', 'M7700', 'Model A', 'Model D', 'Model E']
const speakersTypes = ['coaxial', 'component', 'fullRange']
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
const speakersPower = ['50W', '100W', '150W', '200W', '300W']
const sizes = [
  '10 см (4″)',
  '13 см (5,25″)',
  '16,5 см (6,5″)',
  '20 см (8″)',
  'Овальные 6x9″',
]

const getImageByType = (type) => {
  const imageArray = images[type]
  if (!imageArray || imageArray.length === 0) {
    throw new Error(`Нет изображений для типа: ${type}`)
  }
  return imageArray[Math.floor(Math.random() * imageArray.length)]
}

const companyName = getRandomArrayValue(companyNames)

module.exports = {
  async up(db) {
    return db.collection('speakers').insertMany(
      [...Array(50)].map(() => {
        const type = getRandomArrayValue(speakersTypes)
        const characteristics = [
          {
            type: 'coaxial',
            speakersPower: getRandomArrayValue(speakersPower),
          },
          {
            type: 'component',
            speakersPower: getRandomArrayValue(speakersPower),
          },
          {
            type: 'fullRange',
            speakersPower: getRandomArrayValue(speakersPower),
          },
        ]
        return {
          category: 'speakers',
          type,
          companyName: companyName,
          model: getRandomArrayValue(speakersModel),
          price: +faker.string.numeric(4).replace(/.{0,2}$/, 99),
          name: 'Динамики ' + companyName + faker.lorem.sentence(1),
          description: faker.lorem.sentences(10),
          characteristics: characteristics.find((item) => item.type === type),
          images: [getImageByType(type), getImageByType(type)],
          vendorCode: faker.string.numeric(4),
          collections: getRandomArrayValue(collections),
          inStock: faker.string.numeric(2),
          isBestseller: faker.datatype.boolean(),
          isNew: faker.datatype.boolean(),
          popularity: +faker.string.numeric(3),
          productSizes: getRandomArrayValue(sizes),
        }
      })
    )
  },

  async down(db) {
    return db.collection('speakers').updateMany([])
  },
}
