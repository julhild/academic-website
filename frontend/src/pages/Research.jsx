import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getResearch } from "../store/research/researchSlice";
import { FaShareSquare } from 'react-icons/fa';
import Spinner from '../components/Spinner';
import "../styles/research.css";

function Research() {
    const { research } = useSelector(state => state.research);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getResearch())
    }, [dispatch]);

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



      </>
    )
}

export default Research