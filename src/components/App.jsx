import React, { Component } from "react";
import { fetchImages } from "./Api.js";

import { Button } from "./Button/Button.jsx";
import { ImageGallery } from "./ImageGallery/ImageGallery.jsx";
import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem.jsx";
import { Spinner as Oval } from "./Loader/Loader.jsx";
import { Modal } from "./Modal/Modal.jsx";
import { Searchbar } from "./Searchbar/Searchbar.jsx";

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    showModal: false,
    largeImageURL: '',
    totalHits: 0,
  };

  handleSearchSubmit = async (query) => {
    this.setState({ query, page: 1, images: [], totalHits: 0 });
  };

  fetchImages = async () => {
    const { query, page } = this.state;
    this.setState({ isLoading: true });

    try {
      const { images, totalHits } = await fetchImages(query, page);
      const totalPages = Math.ceil(totalHits / 12);

      this.setState((prevState) => ({
        images: page === 1 ? images : [...prevState.images, ...images],
        isLoading: false,
        totalHits,
        loadMore: prevState.page < totalPages,
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
      this.setState({ isLoading: false });
    }
  };

  componentDidUpdate(prevProps, prevState) {
  if (this.state.query !== prevState.query || this.state.page !== prevState.page) {
    this.fetchImages();
  }
}

  handleImageClick = (largeImageURL) => {
    this.setState({ showModal: true, largeImageURL });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, largeImageURL: '' });
  };

  pageUpdate = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, isLoading, showModal, largeImageURL, loadMore } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery>
          {images.map((image, index) => (
            <ImageGalleryItem
              key={index}
              webformatURL={image.webformatURL}
              largeImageURL={image.largeImageURL}
              onClick={() => this.handleImageClick(image.largeImageURL)}
            />
          ))}
        </ImageGallery>
        {isLoading && <Oval />}
        {images.length > 0 && !isLoading && loadMore && (
          <Button onClick={this.pageUpdate} />
        )}
        {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={this.handleCloseModal} />
        )}
      </div>
    );
  }
}