import { FaNewspaper, FaMicroscope, FaHouseUser, FaBook, FaCaretRight, FaEnvelope, FaUsers } from 'react-icons/fa';
import NavLink from './NavLink';
import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase.config';

function NavMenu() {
    const [courses, setCourses] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            const teachingRef = collection(db, 'teaching');

            // create a query
            const q = query(teachingRef, orderBy('name'));

            // execute query
            const querySnap = await getDocs(q);
            let courses = [];

            querySnap.forEach(doc =>
                courses.push({
                    id: doc.id,
                    data: doc.data()
                })
            )

            setCourses(courses);
        }

        fetchCourses();
    }, []);

    return (
        <ul>
            <li className='navbar-item'>
                <NavLink link={'/'} name={'Home'} icon={<FaHouseUser/>}></NavLink>
            </li>
            <li className='navbar-item'>
                <NavLink link={'/research'} name={'Research'} icon={<FaMicroscope/>}></NavLink>
            </li>
            <li className='navbar-item'>
                <NavLink link={'/publications'} name={'Publications'} icon={<FaNewspaper />}></NavLink>
            </li>

            <li className='navbar-item'>
                <NavLink link={'/group-members'} name={'Group Members'} icon={<FaUsers />}></NavLink>
            </li>

            <li className='navbar-item has-dropdown'>
                <NavLink link={'/teaching'} name={'Teaching'} icon={<FaBook />}></NavLink>
                <ul className="dropdown">
                    {/* <li className="navbar-item dropdown-item">
                        <NavLink link={'/teaching'} name={'Summer 2022'} icon={<FaCaretRight />}></NavLink>
                    </li>
                    <li className="navbar-item dropdown-item">
                        <NavLink link={'/teaching'} name={'Winter 2021'} icon={<FaCaretRight />}></NavLink>
                    </li> */}

                    {courses && courses.map((lecture) => (
                        <li key={lecture.id} className="navbar-item dropdown-item">
                        <NavLink link={'/teaching/' + lecture.id} name={lecture.data.name} icon={<FaCaretRight />}></NavLink>
                    </li>
                    ))}
                </ul>
            </li>

            <li className='navbar-item'>
                <NavLink link={'/contact'} name={'Contact'} icon={<FaEnvelope />}></NavLink>
            </li>
        </ul>
    )
}

export default NavMenu