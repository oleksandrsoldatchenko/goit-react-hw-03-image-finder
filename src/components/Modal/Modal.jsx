import { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Modal.module.css';

export default class Modal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    lgImage: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  };

  // Монтування компонену по кліку
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  // Розмонування компоненту по кліку
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  // Слухає клік на клавішу Escape і закриває модалку
  handleKeyDown = element => {
    if (element.code === 'Escape') {
      this.props.closeModal();
    }
  };

  // Відстеження кліку по Backdrop, та у разі наявності закриття модалки
  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.closeModal();
    }
  };

  // Виведення модалки з Overlay
  render() {
    const { lgImage, tags } = this.props;
    return (
      <div className={style.Overlay} onClick={this.handleBackdropClick}>
        <div className={style.Modal}>
          <img src={lgImage} alt={tags} />
        </div>
      </div>
    );
  }
}
