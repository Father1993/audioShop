import { IAddToCartBtnProps } from '@/types/goods'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AddToCartBtn = ({
  handleAddToCart,
  addToCartSpinner,
  text,
  btnDisabled = false,
  minWidth,
  className,
}: IAddToCartBtnProps) => (
  <button
    className={`btn-reset ${className}`}
    disabled={btnDisabled}
    onClick={handleAddToCart}
    style={addToCartSpinner ? { minWidth, height: 48 } : {}}
  >
    {addToCartSpinner ? (
      <FontAwesomeIcon icon={faSpinner} spin color='#fff' />
    ) : (
      text
    )}
  </button>
)

export default AddToCartBtn
