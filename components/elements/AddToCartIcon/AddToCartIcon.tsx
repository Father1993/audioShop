import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { IAddToCartIconProps } from '@/types/elements'

const AddToCartIcon = ({
  isProductInCart,
  addToCartSpinner,
  addedClassName,
  className,
  callback,
}: IAddToCartIconProps) => (
  <>
    {isProductInCart ? (
      <span className={`${className} ${addedClassName}`} />
    ) : (
      <button className={`btn-reset ${className}`} onClick={callback}>
        {addToCartSpinner ? (
          <FontAwesomeIcon icon={faSpinner} spin color='#fff' />
        ) : (
          <span />
        )}
      </button>
    )}
  </>
)
export default AddToCartIcon
