import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  collection,
  getDocs,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase.config';
import "../styles/teaching.css";
import LectureItem from "../components/single-items/LectureItem";
import Spinner from '../components/utils/Spinner';

function Teaching() {
  const [lectures, setLectures] = useState(null);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const teachingRef = collection(db, 'teaching');
        const q = query(teachingRef, orderBy('name'));

        // execute query
        const querySnap = await getDocs(q);
        let lectures = [];

        querySnap.forEach(doc =>
          lectures.push({
            id: doc.id,
            data: doc.data()
          })
        )
      
        setLectures(lectures);
      } catch (error) {
        toast.error("Cannot fetch courses");
      }
    }

    fetchLectures();
  }, []);

  if (!lectures) {
    return <Spinner/>
  }

  return (
    <>
      <div className="page-header">
        <h1>
          Teaching
        </h1>
      </div>
      <ul className="lectures-list">
        {lectures.map(lecture => (
          <LectureItem key={lecture.id} lecture={{ id: lecture.id, data: lecture.data }} />
        ))}
      </ul>
    </>
  )
}

export default Teaching