// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker')

const getRandomArrayValue = (arr) => arr[Math.floor(Math.random() * arr.length)]

const collections = ['premium', 'sport', 'classic', 'luxury', 'budget']
const colors = ['black', 'silver', 'red', 'blue', 'white']
const compositions = ['metal', 'plastic', 'carbon-fiber']
const audioTypes = ['speakers', 'subwoofers', 'amplifiers', 'headunits']

const images = [
  '/img/audio/cloth-amplifiers1.png',
  '/img/audio/cloth-headunits-1.png',
  '/img/audio/cloth-headunits-2.png',
  '/img/audio/cloth-speakers-1.png',
  '/img/audio/cloth-speakers-2.png',
  '/img/audio/cloth-subwoofers-1.png',
  '/img/audio/cloth-subwoofers-2.png',
]

const lineImages = [
  '/img/black-t.png',
  '/img/violet-t.png',
  '/img/orange-t.png',
]

const materialTypes = ['metal', 'plastic', 'wood', 'carbon', 'fabric']
const features = [
  'backlight',
  'Bluetooth',
  'USB',
  'AUX',
  'FLAC support',
  'equalizer',
]
const installationTypes = ['built-in', 'overlay', 'universal']
const powerTypes = ['active', 'passive']
const sizes = ['6.5 inches', '8 inches', '10 inches', '12 inches']
const upperMaterials = ['black', 'gray', 'blue', 'red']

module.exports = {
  async up(db) {
    return db.collection('audio').insertMany([
      ...Array(50).map(() => {
        const type = audioTypes[Math.floor(Math.random() * audioTypes.length)]
        const characteristics = [
          {
            type: 'speakers',
            color: getRandomArrayValue(colors),
            installationType: getRandomArrayValue(installationTypes),
            composition: getRandomArrayValue(compositions),
            size: getRandomArrayValue(sizes),
            upperMaterial: getRandomArrayValue(upperMaterials),
            collection:
              collections[Math.floor(Math.random() * collections.length)],
          },
          {
            type: 'subwoofers',
            color: getRandomArrayValue(colors),
            installationType: getRandomArrayValue(installationTypes),
            composition: getRandomArrayValue(compositions),
            size: getRandomArrayValue(sizes),
            upperMaterial: getRandomArrayValue(upperMaterials),
            powerType: getRandomArrayValue(powerTypes),
            collection:
              collections[Math.floor(Math.random() * collections.length)],
          },
          {
            type: 'amplifiers',
            color: getRandomArrayValue(colors),
            powerType: getRandomArrayValue(powerTypes),
            composition: getRandomArrayValue(compositions),
            upperMaterial: getRandomArrayValue(upperMaterials),
            installationType: getRandomArrayValue(installationTypes),
          },
          {
            type: 'headunits',
            color: getRandomArrayValue(colors),
            feature: getRandomArrayValue(features),
            size: getRandomArrayValue(sizes),
            installationType: getRandomArrayValue(installationTypes),
            collection:
              collections[Math.floor(Math.random() * collections.length)],
          },
        ]
        const currentCharacteristics = characteristics.find(
          (item) => item.type === type
        )

        return {
          category: 'audio',
          type,
          price: +faker.string.numeric(4).replace(/.{0,2}$/, 99),
          name: faker.lorem.sentence(2),
          description: faker.lorem.sentences(10),
          characteristics: currentCharacteristics,
          images: faker.image.business(),
          vendorCode: faker.string.numeric(4),
          inStock: faker.string.numeric(2),
          isBestseller: faker.datatype.boolean(),
          isNew: faker.datatype.boolean(),
          popularity: +faker.string.numeric(3),
          sizes: {
            s: faker.datatype.boolean(),
            l: faker.datatype.boolean(),
            m: faker.datatype.boolean(),
            xl: faker.datatype.boolean(),
            xxl: faker.datatype.boolean(),
          },
        }
      }),
    ])
  },

  async down(db) {
    return db.collection('audio').updateMany([])
  },
}
