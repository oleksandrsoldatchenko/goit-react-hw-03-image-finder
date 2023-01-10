import PropTypes from 'prop-types';
import style from './Button.module.css';

// Побудова кнопки Load more
const Button = ({ loadMore }) => {
  return (
    <button type="button" onClick={loadMore} className={style.Button}>
      Load more
    </button>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};

export default Button;
