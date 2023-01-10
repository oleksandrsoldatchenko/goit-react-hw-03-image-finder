import PropTypes from 'prop-types';
import style from './ImageGalleryItem.module.css';

// Побудова і li img і експорт картки в галерею
const ImageGalleryItem = ({ smImage, tags, onClick }) => {
  return (
    <li className={style.ImageGalleryItem}>
      <img
        className={style.ImageGalleryItem_image}
        src={smImage}
        alt={tags}
        onClick={onClick}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
  smImage: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
