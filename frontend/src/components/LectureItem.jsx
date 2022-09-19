import { Link } from 'react-router-dom';


function LectureItem({lecture}) {
  return (
    <li className='lecture-record'>
          <Link to={`/teaching/${lecture.id}`} className='lecture-record-link'>
              <img src={lecture.imageUrl} alt={lecture.name} className='lecture-record-image' />
              <div className="lecture-record-details">
                  <p className="lecture-name">
                      {lecture.lectureName}
                  </p>
                  <p className='institution'>
                      {lecture.institution}
                  </p>
                  <p className="lecture-description">
                      {lecture.description}
                  </p>
              </div>
          </Link>
    </li>
  )
}

export default LectureItem