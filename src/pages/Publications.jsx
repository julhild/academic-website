import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase.config';
import "../styles/publications.css";
import { FaBookmark } from "react-icons/fa";
import PublicationItem from '../components/single-items/PublicationItem';
import ScrollUpButton from '../components/utils/ScrollUpButton';
import Spinner from '../components/utils/Spinner';
import { toast } from 'react-toastify';

function Publications() {
  const [publications, setPublications] = useState(null);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        // get a reference
        const pubsRef = collection(db, 'publications');
        // create a query
        const q = query(pubsRef, orderBy('date', 'desc'));
        // execute query
        const querySnap = await getDocs(q);
        let pubs = [];

        querySnap.forEach(doc => {
          const docYear = doc.data().year;
          const pubYear = pubs.find(pub => pub.year === docYear);

          if (pubYear) {
            pubYear.articles.push({
              id: doc.id,
              data: doc.data()
            })
          } else {
            pubs.push({
              year: docYear, articles: [{
                id: doc.id,
                data: doc.data()
              }]
            })
          }
        })

        setPublications(pubs)
      } catch (error) {
        console.log(error);
        toast.error('Could not get publications');
      }
    }

    fetchPublications();
  }, []);

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
              <PublicationItem key={article.id} article={article.data} />
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

export default Publications