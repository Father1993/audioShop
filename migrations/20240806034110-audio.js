// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker')

const getRandomArrayValue = (arr) => arr[Math.floor(Math.random() * arr.length)]

const collections = ['premium', 'sport', 'classic', 'luxury', 'budget']
const audioTypes = ['1din', '2din']
const features = [
  'backlight',
  'Bluetooth',
  'USB',
  'AUX',
  'FLAC support',
  'equalizer',
]
const installationTypes = ['built-in', 'overlay', 'universal']
const sizes = {
  '1din': '178x50mm',
  '2din': '178x100mm',
}

const images = [
  '/img/audio/cloth-amplifiers1.png',
  '/img/audio/cloth-headunits-1.png',
  '/img/audio/cloth-headunits-2.png',
  '/img/audio/cloth-speakers-1.png',
  '/img/audio/cloth-speakers-2.png',
  '/img/audio/cloth-subwoofers-1.png',
  '/img/audio/cloth-subwoofers-2.png',
]

module.exports = {
  async up(db) {
    return db.collection('audio').insertMany(
      [...Array(50)].map(() => {
        const type = getRandomArrayValue(audioTypes)
        const characteristics = [
          {
            type: '1din',
            collection: getRandomArrayValue(collections),
            installationType: getRandomArrayValue(installationTypes),
            features: [
              getRandomArrayValue(features),
              getRandomArrayValue(features),
              getRandomArrayValue(features),
            ],
            size: sizes['1din'],
          },
          {
            type: '2din',
            collection: getRandomArrayValue(collections),
            installationType: getRandomArrayValue(installationTypes),
            features: [
              getRandomArrayValue(features),
              getRandomArrayValue(features),
              getRandomArrayValue(features),
            ],
            size: sizes['2din'],
          },
        ]

        return {
          category: 'audio',
          type,
          price: +faker.string.numeric(4).replace(/.{0,2}$/, 99),
          name: faker.lorem.sentence(2),
          description: faker.lorem.sentences(10),
          characteristics,
          images: getRandomArrayValue(images),
          vendorCode: faker.string.numeric(4),
          inStock: faker.string.numeric(2),
          isBestseller: faker.datatype.boolean(),
          isNew: faker.datatype.boolean(),
          popularity: +faker.string.numeric(3),
          size: getRandomArrayValue(sizes),
        }
      })
    )
  },

  async down(db) {
    return db.collection('audio').updateMany([])
  },
}
