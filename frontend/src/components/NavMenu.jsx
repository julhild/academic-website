import { FaNewspaper, FaMicroscope, FaHouseUser, FaBook, FaCaretRight } from 'react-icons/fa';
import NavLink from './NavLink';

function NavMenu() {
    return (
        <ul>
            <li>
                <NavLink link={'/'} name={'Home'} icon={<FaHouseUser/>}></NavLink>
            </li>
            <li>
                <NavLink link={'/research'} name={'Research'} icon={<FaMicroscope/>}></NavLink>
            </li>
            <li>
                <NavLink link={'/publications'} name={'Publications'} icon={<FaNewspaper />}></NavLink>
            </li>

            <li className='has-dropdown'>
                <NavLink link={'/teaching'} name={'Teaching'} icon={<FaBook />}></NavLink>
                <ul className="dropdown">
                    <li className="dropdown-item">
                        <NavLink link={'/teaching'} name={'Summer 2022'} icon={<FaCaretRight />}></NavLink>
                    </li>
                    <li className="dropdown-item">
                        <NavLink link={'/teaching'} name={'Winter 2021'} icon={<FaCaretRight />}></NavLink>
                    </li>
                </ul>
            </li>
        </ul>
    )
}

export default NavMenu