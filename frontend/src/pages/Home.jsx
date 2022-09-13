import { Link } from 'react-router-dom';
import { FaCat, FaCalendarMinus } from 'react-icons/fa';
import '../styles/news.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNews } from "../store/news/newsSlice";
import Spinner from '../components/Spinner';

function Home() {
  const { news, isMoreNews } = useSelector(state => state.news);
  const [pageNumber, setPageNumber] = useState(1);

  const dispatch = useDispatch();
  // number of listings per page
  const perPage = 4;

  useEffect(() => {
    dispatch(getNews({perPage, pageNumber}));
  }, [dispatch, pageNumber]);

  const getDate = (stringDate) => {
    const date = new Date(stringDate);
    return date.toLocaleString('default', { month: 'long' }) + ' ' + date.getDay() + ', ' + date.getFullYear();
  }

  const fetchMoreNews = (e) => {
    e.preventDefault();
    setPageNumber(pageNumber + 1);
    dispatch(getNews({ perPage, pageNumber}));
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
                  <h4>{newsItem.title}</h4>
                  <p className='news-date'> <FaCalendarMinus/> {getDate(newsItem.date)}</p>
                
                  {
                    newsItem.imageUrl && 
                      <div> 
                        <img src={newsItem.imageUrl} alt={newsItem.title} />
                      </div>         
                  }
                  <p>
                    {newsItem.content}
                  </p>
              </div>

              {newsItem.links &&
                <div className='categories'>
                  {newsItem.links.map((link, index) => (
                      <div key={index}>
                        <Link
                          to=''
                          
                          className='news-link'
                          onClick={() => window.open(`${link.url}`)}
                        >
                          {link.title}
                        </Link>
                      <div className='separator'>{ index + 1 < newsItem.links.length ? '|' : '' }</div>
                      </div>
                  ))}
                </div>
              }
            </div>
          ))}
      </div>

      <div className='heading'>
        {isMoreNews && 
          <button className='btn' onClick={fetchMoreNews}>Load More</button>
        }
      </div>
    </>
  )
}

export default Home