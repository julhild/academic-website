import { FaNewspaper, FaMicroscope, FaHouseUser, FaBook, FaCaretRight, FaEnvelope } from 'react-icons/fa';
import NavLink from './NavLink';

function NavMenu() {
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

            <li className='navbar-item has-dropdown'>
                <NavLink link={'/teaching'} name={'Teaching'} icon={<FaBook />}></NavLink>
                <ul className="dropdown">
                    <li className="navbar-item dropdown-item">
                        <NavLink link={'/teaching'} name={'Summer 2022'} icon={<FaCaretRight />}></NavLink>
                    </li>
                    <li className="navbar-item dropdown-item">
                        <NavLink link={'/teaching'} name={'Winter 2021'} icon={<FaCaretRight />}></NavLink>
                    </li>
                </ul>
            </li>

            <li className='navbar-item'>
                <NavLink link={'/contact'} name={'Contact'} icon={<FaEnvelope />}></NavLink>
            </li>
        </ul>
    )
}

export default NavMenu