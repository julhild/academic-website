import { Link } from 'react-router-dom';
import { FaCat, FaCalendarMinus } from 'react-icons/fa';
import '../styles/news.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNews } from "../store/news/newsSlice";
import Spinner from '../components/Spinner';


function Home() {
  const { news } = useSelector(state => state.news);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  const getDate = (stringDate) => {
    const date = new Date(stringDate);

    return date.toLocaleString('default', { month: 'long' }) + ' ' + date.getDay() + ', ' + date.getFullYear();
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
                    <img src={newsItem.imageUrl} alt={newsItem.title} />
                  }
                  <span>
                    {newsItem.content}
                  </span>
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
    </>
  )
}

export default Home