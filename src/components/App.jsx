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
    this.setState({ query, page: 1, images: [], totalHits: 0 }, this.fetchImages);
  };

  fetchImages = async () => {
    const { query, page } = this.state;
    this.setState({ isLoading: true });

    try {
      const { images, totalHits } = await fetchImages(query, page);
      console.log(images);
      console.log(totalHits);
      const totalPages = Math.ceil(totalHits / 12);

      this.setState((prevState) => ({
        images: images ? [...prevState.images, ...images] : prevState.images,
        page: prevState.page + 1,
        isLoading: false,
        totalHits,
        loadMore: prevState.page < totalPages,
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
      this.setState({ isLoading: false });
    }
  };

  handleImageClick = (largeImageURL) => {
    this.setState({ showModal: true, largeImageURL });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, largeImageURL: '' });
  };

  render() {
    const { images, isLoading, showModal, largeImageURL, loadMore } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              webformatURL={image.webformatURL}
              largeImageURL={image.largeImageURL}
              onClick={() => this.handleImageClick(image.largeImageURL)}
            />
          ))}
        </ImageGallery>
        {isLoading && <Oval />}
        {images.length > 0 && !isLoading && loadMore && (
          <Button onClick={this.fetchImages} />
        )}
        {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={this.handleCloseModal} />
        )}
      </div>
    );
  }
}