import { FaGraduationCap, FaPaw } from 'react-icons/fa';
import "../styles/group-members.css";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  collection,
  getDocs,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase.config';
import Spinner from '../components/Spinner';
import GroupMember from '../components/GroupMember';


function GroupMembers() {
  const [groupMembers, setGroupMembers] = useState(null);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const peopleRef = collection(db, 'group-members');
        const q = query(peopleRef, orderBy('name'));
        const querySnap = await getDocs(q);

        let people = [];

        querySnap.forEach(doc =>
          people.push({
            id: doc.id,
            data: doc.data()
          })
        );

        setGroupMembers(people);
      } catch (error) {
        toast.error(error);
      }
    }

    fetchPeople();
  }, []);

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
        {groupMembers.filter(el => el.data.category === "researcher").map(person => (
          <GroupMember  key={person.id} groupMember={person.data} />
        ))}

        <div className="member-category">
          <FaPaw/> Remarkable Cats
        </div>

        {groupMembers.filter(el => el.data.category === "remarkable cat").map(person => (
          <GroupMember  key={person.id} groupMember={person.data} />
        ))}
        

      </div>
    </>
  )
}

export default GroupMembers