import { AnimatePresence, motion } from 'framer-motion'
import { $favorites, $favoritesFormLS } from '@/context/favorites'
import { basePropsForMotion } from '@/constants/motion'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import styles from '@/styles/favorites/index.module.scss'
import FavoritesListItem from './FavoritesListItem'

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