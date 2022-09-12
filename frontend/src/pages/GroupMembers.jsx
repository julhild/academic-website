import { FaGraduationCap, FaLandmark, FaPaw, FaUser, FaWikipediaW } from 'react-icons/fa';
import "../styles/group-members.css";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getGroupMembers } from "../store/people/peopleSlice";
import Spinner from '../components/Spinner';


function GroupMembers() {
  const { groupMembers } = useSelector(state => state.groupMembers);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGroupMembers())
  }, [dispatch]);

  if (!groupMembers) {
    return <Spinner/>
  }


  return (
    <>
      <div className="page-header">
        <h1>Our team</h1>
        <p>Current and former members of the cat group</p>
      </div>
      <div className="flex-column">
        <div className="member-category">
          <FaGraduationCap/> Researchers
        </div>
        {groupMembers.filter(el => el.category === "researcher").map(person => (
          <div key={person.id} className='group-member-record'>
            <img src={person.photoUrl} alt={person.name} />
            <div className="group-member-info">
              <div className="contact">
                <h3>{person.name}</h3>

                <div className="contact-info">
                  <p>
                    <FaLandmark className="dark-blue"/> {person.location}
                  </p>
                  {
                    person.website &&
                    <p>
                      <FaUser/> Website: {person.website}
                    </p>
                  }

                  <div className="social">
                    {person.wikipedia && 
                    <Link to=""> <FaWikipediaW/> </Link>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="member-category">
          <FaPaw/> Remarkable Cats
        </div>

        {/* Here come amazing cats */}
        

      </div>
    </>
  )
}

export default GroupMembers