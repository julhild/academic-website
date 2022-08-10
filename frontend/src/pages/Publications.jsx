import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPublications } from "../store/publications/pubSlice";
import "../styles/publications.css";
import { FaBookmark } from "react-icons/fa";
import PublicationItem from '../components/PublicationItem';


function Publications() {

  const { publications } = useSelector(state => state.publications);

  const dispatch = useDispatch();

  // spinner...

  // button scroll back

  useEffect(() => {
    dispatch(getPublications())
  }, [dispatch]);

  if (!publications) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="publication-page">
        {/* <div id="google-scholar" class="publication-year">
          <p>
              A list of published articles can also be found on
              
              <a href="https://scholar.google.com" target="_blank">
                  <i class="fa-brands fa-google"></i> Scholar</a>

                profile.
          </p>
        </div> */}
      
      {publications.map(publicationYear => (
        <div key={publicationYear.year} className='publication-year'>
          <h1> <FaBookmark /> {publicationYear.year}</h1>
          {publicationYear.articles.map(article => (
            <PublicationItem key={article.id} article={article} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Publications