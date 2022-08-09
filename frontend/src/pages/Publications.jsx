import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPublications } from "../store/publications/pubSlice";


function Publications() {
  const { publications } = useSelector(state => state.publications);

  const dispatch = useDispatch();

  // spinner...

  useEffect(() => {
    dispatch(getPublications())
  }, [dispatch]);

  return (
    <div>Publications</div>
  )
}

export default Publications