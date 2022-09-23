import { FaGraduationCap, FaPaw } from 'react-icons/fa';
import "../styles/group-members.css";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGroupMembers } from "../store/people/peopleSlice";
import Spinner from '../components/Spinner';
import GroupMember from '../components/GroupMember';


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
          <GroupMember  key={person.id} groupMember={person} />
        ))}

        <div className="member-category">
          <FaPaw/> Remarkable Cats
        </div>

        {groupMembers.filter(el => el.category === "remarkable cat").map(person => (
          <GroupMember  key={person.id} groupMember={person} />
        ))}
        

      </div>
    </>
  )
}

export default GroupMembers