import { Link } from 'react-router-dom';

function LectureItem({lecture}) {
  return (
    <li className='lecture-record'>
          <Link to={`/teaching/${lecture.id}`} className='lecture-record-link'>
              <img src={lecture.data.imageUrl} alt={lecture.data.name} className='lecture-record-image' />
              <div className="lecture-record-details">
                  <p className="lecture-name">
                      {lecture.data.name}
                  </p>
                  <p className='institution'>
                      {lecture.data.institution}
                  </p>
                  <p className="lecture-description">
                      {lecture.data.description}
                  </p>
              </div>
          </Link>
    </li>
  )
}

export default LectureItem