import { SelfBuildingSquareSpinner } from 'react-epic-spinners';
import style from './Loader.module.css';
import PropTypes from 'prop-types';

const Loader = ({ color, size }) => {
  return (
    <div className={style.Loader}>
      <SelfBuildingSquareSpinner color={color} size={size} />
    </div>
  );
};

Loader.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

export default Loader;
