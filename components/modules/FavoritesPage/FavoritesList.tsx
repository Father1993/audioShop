import { AnimatePresence, motion } from 'framer-motion'
import { basePropsForMotion } from '@/constants/motion'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import FavoritesListItem from './FavoritesListItem'
import { $favorites, $favoritesFormLS } from '@/context/favorites/state'
import styles from '@/styles/favorites/index.module.scss'

const FavoritesList = () => {
  const currentFavoriteByAuth = useGoodsByAuth($favorites, $favoritesFormLS)

  return (
    <div>
      <AnimatePresence>
        {currentFavoriteByAuth.map((item) => (
          <motion.li
            {...basePropsForMotion}
            key={item._id || item.clientId}
            className={styles.favorites__list__item}
          >
            <FavoritesListItem item={item} />
          </motion.li>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default FavoritesList
