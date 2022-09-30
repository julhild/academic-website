import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import {
  collection,
  getDocs,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { FaShareSquare } from 'react-icons/fa';
import "../styles/research.css";
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';

function Research() {
  const [research, setResearch] = useState(null);

    useEffect(() => {
      const fetchResearch = async () => {
        try {
        const researchRef = collection(db, 'research');
        // create a query
          const q = query(researchRef, orderBy('title', 'desc'));
        // execute query
        const querySnap = await getDocs(q);
          let research = [];
          
          querySnap.forEach(doc => {
            research.push(doc.data())
          })

          setResearch(research);
        } catch (error) {
                  console.log(error);
        toast.error('Could not get publications');
        }
      }

      fetchResearch();
    }, []);

    if (!research) {
      return <Spinner/>
    }
  
    return (
      <>
        <div className="research-title">
          <h1>
            Research Interests
          </h1>
        </div>

        <div className="research-content">

          {research.map((item, itemIndex) => (
            <article key={itemIndex} className={ itemIndex % 2 ? "flex-columns" : "flex-columns flex-reverse"}>
              <div className="row">
                
                <div className="column">
                  <div className="column-1">
                    <img src={item.imageUrl} alt={item.title} />
                  </div>
                </div>
              
                <div className="column">
                  <div className={"column-2" + (itemIndex % 2 ? " bg-light": " bg-dark")}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>

                    {item.links &&
                      <ul>
                        {item.links.map((link, linkIndex) => (
                          <li key={linkIndex} className="research-link">
                            <Link
                              to=''
                              className={"link-btn" + (itemIndex % 2 ? " btn-dark" : " btn-light")}
                              onClick={() => window.open(`${link.url}`)}>
                              {link.title} <FaShareSquare />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    }
                  </div>
                </div>
              </div>
            </article>
          ))}

        </div>
      </>
    )
}

export default Research