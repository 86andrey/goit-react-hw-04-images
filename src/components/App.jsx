import Searchbar from "./Searchbar";
import fetchImage from '../services/image-api'
import ImageGallery from "./ImageGallery";
import Button from "./Button";
import Modal from "./Modal";
import s from './App.module.css';
import { ToastContainer } from 'react-toastify';
import Loader from "./Loader";
import { useEffect, useState } from "react";
// import { toast } from 'react-toastify';



export default function App() {
  const [imageSearch, setImageSearch] = useState ('');
  const [images, setImages] = useState ([]);
    const [page, setPage] = useState (1);
    // const [error, setError] = useState (null);
    const [status, setStatus] = useState ('idle');
    const [largeImage, setLargeImage] = useState ('');
    const [tags, setTags] = useState(null);
    const [showModal, setShowModal] = useState (false);
    const [showBtn, setShowBtn] = useState (false);
    const [loaderActive, setLoaderActive] = useState (false);

  
  const loadMore = () => {
    setPage(prevPage => prevPage + 1)
  };

  // это приходит из формы при submit
  const handleFormSubmit = imageSearch => {
    setImageSearch(imageSearch);
    setPage(1);
    setImages([]);
  };

  useEffect(() => {
    if (!imageSearch) return;

    setLoaderActive(true);

    const getData = async () => {
      try {
        const imagesData = await fetchImage(imageSearch, page);
        
        if (page === 1) {
          setImages([...imagesData.hits]);
        } else {
          setImages(prevImages => [...prevImages, ...imagesData.hits]);        
        };

        setStatus('resolved');
        setShowBtn(true);

        if (imagesData.total === 0) {
          setStatus('rejected');
          setImages([]);
          setShowBtn(false);
        };
        
        if (imagesData.total > 0 && imagesData.hits.length < 12) {
          setShowBtn(false);
        };
      }
      catch (error) {
        console.log('oops')
        setStatus('rejected');
      } finally {
        setLoaderActive(false);
      }
    };
    getData();    
  }, [page, imageSearch]);

  
  
  const toggleModal = (largeImage, tags) => {
    setShowModal(!showModal);
    setLargeImage(largeImage);
    setTags(tags);
  };
    
return (
  <div className={s.app}>
    {/* передача ссылки на ф-цию в виде пропса */}
    <Searchbar onSubmit={handleFormSubmit} />

    {status === 'idle' && (
      <h2 className={s.h2}>Type something...</h2>
    )}

    {loaderActive && (
      <Loader />
    )}

    {status === 'rejected' && (
      <h2 className={s.h2}>{'Not found...'}</h2>
    )}

    {status === 'resolved' && (
      <ImageGallery images={images} openModal={toggleModal} />
    )}
      
    {showBtn && <Button onClick={loadMore} />}
          
        
    {showModal && <Modal
      onClose={toggleModal}
      largePicture={largeImage}
      tags={tags}
    />}

    <ToastContainer position="top-center" theme="colored" />
  </div>
);
  }
