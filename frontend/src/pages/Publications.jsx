import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPublications } from "../store/publications/pubSlice";
import "../styles/publications.css";
import { FaBookmark } from "react-icons/fa";
import PublicationItem from '../components/PublicationItem';
import ScrollUpButton from '../components/ScrollUpButton';
import Spinner from '../components/Spinner';

function Publications() {

  const { publications } = useSelector(state => state.publications);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPublications())
  }, [dispatch]);

  if (!publications) {
    return <Spinner/>
  }

  return (
    <>
      <ScrollUpButton></ScrollUpButton>
      <div className="flex-column">
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
    </>
  )
}

export default Publications