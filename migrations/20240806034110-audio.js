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

const audioTypes = ['1din', '2din']

const sizes = {
  '1din': '178x50mm',
  '2din': '178x100mm',
}
const features = [
  'Bluetooth',
  'USB',
  'AUX',
  'FLAC support',
  'Equalizer',
  'Mp3',
  'CD',
  'IPhone',
  'CarPlay',
  'Apple',
  'Android',
]
const installationTypes = [
  'Универсальный',
  'Toyota',
  'Nissan',
  'Mazda',
  'Honda',
  'MMC',
  'Subaru',
  'Suzuki',
  'Daihatsu',
  'Lexus',
  'Infiniti',
  'Isuzu',
  'Acura',
]

const images = {
  '1din': [
    '/img/audio/audio-1din.png',
    '/img/audio/audio-1din_2.png',
    '/img/audio/audio-1din_3.png',
    '/img/audio/audio-1din_4.png',
    '/img/audio/audio-1din_5.png',
    '/img/audio/audio-1din_6.png',
  ],
  '2din': [
    '/img/audio/audio-2din.png',
    '/img/audio/audio-2din_2.png',
    '/img/audio/audio-2din_3.png',
    '/img/audio/audio-2din_4.png',
    '/img/audio/audio-2din_5.png',
    '/img/audio/audio-2din_6.png',
  ],
}

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
              getRandomArrayValue(features) + ' ',
              getRandomArrayValue(features) + ' ',
              getRandomArrayValue(features),
            ],
            sizes: sizes['1din'],
          },
          {
            type: '2din',
            collection: getRandomArrayValue(collections),
            installationType: getRandomArrayValue(installationTypes),
            features: [
              getRandomArrayValue(features) + ' ',
              getRandomArrayValue(features) + ' ',
              getRandomArrayValue(features),
            ],
            sizes: sizes['2din'],
          },
        ]

        return {
          category: 'audio',
          type,
          price: +faker.string.numeric(4).replace(/.{0,2}$/, 99),
          name:
            'Плеер ' +
            getRandomArrayValue(companyNames) +
            ' ' +
            faker.lorem.sentence(2),
          description: faker.lorem.sentences(10),
          characteristics: characteristics.find((item) => item.type === type),
          images: getRandomImages(images[type]),
          vendorCode: faker.string.numeric(4),
          inStock: faker.string.numeric(2),
          isBestseller: faker.datatype.boolean(),
          isNew: faker.datatype.boolean(),
          popularity: +faker.string.numeric(3),
          sizes: characteristics.find((item) => item.type === type).sizes,
        }
      })
    )
  },

  async down(db) {
    return db.collection('audio').updateMany([])
  },
}
