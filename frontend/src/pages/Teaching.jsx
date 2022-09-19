import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLectures } from "../store/teaching/teachingSlice";
import "../styles/teaching.css";
import LectureItem from "../components/LectureItem";
import Spinner from '../components/Spinner';

function Teaching() {
  const { lectures } = useSelector(state => state.lectures);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLectures());
  }, [dispatch]);

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
          <LectureItem key={lecture.id} lecture={lecture} />
        ))}
      </ul>
    </>
  )
}

export default Teaching