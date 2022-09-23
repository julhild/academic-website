import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { FaCopyright, FaDotCircle } from 'react-icons/fa';
import { fetchLecture } from "../store/teaching/teachingSlice";
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner';

function Lecture() {
    const { lecture } = useSelector(state => state.lectures);
    const dispatch = useDispatch();
    const { lectureId } = useParams();

    useEffect(() => {
        dispatch(fetchLecture(lectureId)).unwrap().catch(toast.error);
    }, [lectureId, dispatch]);

    if (!lecture) {
        return <Spinner/>
    }

    return (
        <div className="flex-column">
            <div className="lecture-info lectures-list">
              <img src={lecture.imageUrl} alt={lecture.name} className='lecture-record-image' />
              <div className="lecture-record-details">
                  <p className="lecture-name">
                      {lecture.lectureName}
                  </p>
                  <p className='institution'>
                      {lecture.institution}
                  </p>

                    <div className='course-info'>

                        <h4>Course Information:</h4>
                        <div className='course-details'>
                            <label className='course-info-label'>Type</label> <span>{lecture.type}</span>
                            <label className='course-info-label'>Number</label> <span>{lecture.courseInfo.number}</span>
                            <label className='course-info-label'>Semester</label> <span>{lecture.courseInfo.semester}</span>
                            <label className='course-info-label'>Year</label> <span>{lecture.courseInfo.year}</span>
                            <label className='course-info-label'>Credit</label> <span>{lecture.courseInfo.credit}</span>
                        </div>

                    </div>

              </div>
            </div>

            <div className='description'>
                <h3>Description: </h3>
                <p className="lecture-description">
                    {lecture.description}
                </p>
            </div>

            <div className='description'>
                <h3>Objectives: </h3>
                <ul>
                    {lecture.objectives.map((obj, index) => (
                        <li key={index}>
                            <FaDotCircle className='dark-blue'/> {obj}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="description">
                <Link
                    to=''
                    onClick={() => window.open(`${lecture.source}`)}
                >
                    <FaCopyright /> Copyright
                </Link>
            </div>
        </div>
    )
}

export default Lecture