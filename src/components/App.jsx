import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { fetchImages } from 'components/services/fetchImages';

export default class App extends Component {

  // Запис state первинного стану
  state = {
    searchRequest: '',
    images: [],
    galleryPage: 1,
    error: null,
    isLoading: false,
    showModal: null,
  };

  // Виклик методу оновлення компоненту
  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevState.searchRequest;
    const currentSearch = this.state.searchRequest;
    const prevGalleryPage = prevState.galleryPage;
    const currentGalleryPage = this.state.galleryPage;

    // Умова перевіряє, якщо currentSearch не дорівнює prevSearch то сторінка буде оновлюватися з новим запросом
    if (
      prevSearch !== currentSearch ||
      prevGalleryPage !== currentGalleryPage
    ) {
      this.updateImages();
    }
  }

  updateImages() {
    const { searchRequest, galleryPage } = this.state;
    this.setState({ isLoading: true });
    setTimeout(() => {
      try {
        fetchImages(searchRequest, galleryPage).then(data => {
          // Перевірка, якщо запит не має результату пошуку - виводить оповіщення щодо помилки через toast
          if (!data.data.hits.length) {
            return toast.error(
              'There is no images found with that search request'
            );
          }

          // В разі наявності рузультатів пошуку map рузультатів
          const mappedImages = data.data.hits.map(
            ({ id, webformatURL, tags, largeImageURL }) => ({
              id,
              webformatURL,
              tags,
              largeImageURL,
            })
          );

          // Запис в state результатів пошуку
          this.setState({
            images: [...this.state.images, ...mappedImages],
          });
        });

      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }, 1000);
  }

  handleSearchSubmit = searchRequest => {
    this.setState({
      searchRequest,
      images: [],
      galleryPage: 1,
    });
  };

  // Довантаження додаткової сторінки до вже завантаженої галареї
  loadMore = () => {
    this.setState(prevState => ({
      galleryPage: prevState.galleryPage + 1,
    }));
  };

  // Завантаження у модальне вікно великого зображення
  showModalImage = id => {
    const image = this.state.images.find(image => image.id === id);
    this.setState({
      showModal: {
        largeImageURL: image.largeImageURL,
        tags: image.tags,
      },
    });
  };

  // Пропс закриття модального вікна
  closeModalImage = () => {
    this.setState({ showModal: null });
  };

  // Метод відображення на екрані результатів
  render() {
    const { images, isLoading, error, showModal } = this.state;
    return (
      <>
        <Searchbar onSearch={this.handleSearchSubmit} />
        {error && toast.error(`Whoops, something went wrong: ${error.message}`)}
        {isLoading && <Loader color={'#3f51b5'} size={64} />}
        {images.length > 0 && (
          <>
            <ImageGallery images={images} handlePreview={this.showModalImage} />
            <Button loadMore={this.loadMore} />
          </>
        )}
        {showModal && (
          <Modal
            lgImage={showModal.largeImageURL}
            tags={showModal.tags}
            closeModal={this.closeModalImage}
          />
        )}
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}
