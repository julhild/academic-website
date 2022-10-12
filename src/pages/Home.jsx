import { FaCat, FaPlusCircle } from 'react-icons/fa';
import '../styles/news.css';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter
} from 'firebase/firestore';
import { db } from '../firebase.config';
import Spinner from '../components/utils/Spinner';
import AddNewsModal from "../components/modals/AddNewsModal";
import NewsItem from '../components/single-items/NewsItem';

function Home() {
  const [news, setNews] = useState(null);
  const [lastFetched, setLastFetched] = useState(null);
  const [isModalOpen, setIsOpen] = useState(false);

  // number of listings per page
  const perPage = 4;

  const onPostDelete = (postId) => {
    const updatedPosts = news.filter(post => post.id !== postId);
    setNews(updatedPosts);

    toast.success('The post was deleted');
  }

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // get a reference
        const newsRef = collection(db, 'news');
        // create a query
        const q = query(newsRef, orderBy('date', 'desc'), limit(perPage + 1));
        // execute query
        const querySnap = await getDocs(q);
        setLastFetched(querySnap.docs[perPage] ? querySnap.docs[querySnap.docs.length - 2] : null);

        let news = [];

        querySnap.forEach(doc =>
          news.push({
            id: doc.id,
            data: doc.data()
          })
        )

        querySnap.docs.length > perPage && news.pop();
        setNews(news);
      } catch (error) {
        toast.error('Could not fetch more news');
      }
    }

    fetchNews()
  }, [isModalOpen]);

  const onFetchMoreNews = async () => {
    try {
      // get a reference
      const newsRef = collection(db, 'news');

      // create a query
      const q = query(
        newsRef,
        orderBy('date', 'desc'),
        startAfter(lastFetched),
        limit(perPage + 1));

      // execute query
      const querySnap = await getDocs(q);

      setLastFetched(
          querySnap.docs[perPage]
              ? querySnap.docs[querySnap.docs.length - 2]
              : null
      );
 
      const news = [];

      querySnap.forEach(doc => {
          return news.push({
              id: doc.id,
              data: doc.data(),
          });
      });

      querySnap.docs.length > perPage && news.pop();
      setNews(prevState => [...prevState, ...news]);
    } catch (error) {
        toast.error('Could not fetch more news');
      }
  }

  const closeModal = () => { setIsOpen(false) };

  if (!news) {
    return <Spinner/>
  }

  return (
    <>
      <div className='heading'>
        <div className='cat-icons'>
          <FaCat/><FaCat className='inverted-cat'/>
        </div>
        <div>
          <h1>
            Welcome to Cat Science!
          </h1>
        </div>
      </div>

      <span className="add-modal">
        <h4>Add another news</h4> <FaPlusCircle onClick={() => setIsOpen(true)}/>
      </span>
      <AddNewsModal isOpen={isModalOpen} closeModal={closeModal}/>

      <div className="news-grid">
        {news.map(newsItem => (
          <NewsItem key={newsItem.id} newsItem={newsItem} onPostDelete={onPostDelete} />
          ))}
      </div>

      <div className='heading'>
        {lastFetched && 
          <button className='btn' onClick={onFetchMoreNews}>Load More</button>
        }
      </div>
    </>
  )
}

export default Home