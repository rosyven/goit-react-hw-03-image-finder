// import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39038614-58edd7163b037e81b257e6c14';

export const fetchImages = async (query, page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    const data = await response.json();
    const { hits, totalHits } = data;
    return { images: hits, totalHits };
  } catch (error) {
    throw error;
  }
};
