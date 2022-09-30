import { Link } from 'react-router-dom';
import { FaCat, FaCalendarMinus } from 'react-icons/fa';
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
import Spinner from '../components/Spinner';

function Home() {
  const [news, setNews] = useState(null);
  const [lastFetched, setLastFetched] = useState(null);

  // number of listings per page
  const perPage = 4;

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
  }, []);

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

  const getDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString('default', { month: 'long' }) + ' ' + date.getDate() + ', ' + date.getFullYear();
  }

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

      <div className="news-grid">
        {news.map(newsItem => (
          <div key={newsItem.id} className="news-item">
              <div>
                  <h4>{newsItem.data.title}</h4>
                  <p className='news-date'> <FaCalendarMinus/> {getDate(newsItem.data.date)}</p>
                
                  {
                    newsItem.data.imageUrl && 
                      <div> 
                        <img src={newsItem.data.imageUrl} alt={newsItem.data.title} />
                      </div>         
                  }
                  <p>
                    {newsItem.data.content}
                  </p>
              </div>

              {newsItem.data.links &&
                <div className='categories'>
                  {newsItem.data.links.map((link, index) => (
                      <div key={index}>
                        <Link
                          to=''
                          className='news-link'
                          onClick={() => window.open(`${link.url}`)}
                        >
                          {link.title}
                        </Link>
                      <div className='separator'>{ index + 1 < newsItem.data.links.length ? '|' : '' }</div>
                      </div>
                  ))}
                </div>
              }
            </div>
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