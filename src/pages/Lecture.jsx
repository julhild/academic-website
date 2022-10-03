import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaCopyright, FaDotCircle } from 'react-icons/fa';
import { db } from '../firebase.config';
import { getDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import Spinner from '../components/utils/Spinner';

function Lecture() {
    const [lecture, setLecture] = useState(null);
    const { lectureId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLecture = async () => {
            try {
                const docRef = doc(db, 'teaching', lectureId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setLecture(docSnap.data());
                }
            } catch (error) {
                toast.error(error);
            }
        }

        fetchLecture();
    }, [lectureId, navigate]);

    if (!lecture) {
        return <Spinner/>
    }

    return (
        <div className="flex-column">
            <div className="lecture-info lectures-list">
              <img src={lecture.imageUrl} alt={lecture.name} className='lecture-record-image' />
              <div className="lecture-record-details">
                  <p className="lecture-name">
                      {lecture.name}
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