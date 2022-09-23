import { FaNewspaper, FaMicroscope, FaHouseUser, FaBook, FaCaretRight, FaEnvelope, FaUsers } from 'react-icons/fa';
import NavLink from './NavLink';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLectures } from "../store/teaching/teachingSlice";

function NavMenu() {
    const { lectures } = useSelector(state => state.lectures);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLectures());
    }, [dispatch]);


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

                    {lectures && lectures.map((lecture) => (
                        <li key={lecture.id} className="navbar-item dropdown-item">
                        <NavLink link={'/teaching/' + lecture.id} name={lecture.lectureName} icon={<FaCaretRight />}></NavLink>
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