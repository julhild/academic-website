import { FaNewspaper, FaMicroscope, FaHouseUser } from 'react-icons/fa';
import NavLink from './NavLink';

function NavMenu() {
    return (
        <ul>
            <NavLink link={'/'} name={'Home'} icon={<FaHouseUser/>}></NavLink>
            <NavLink link={'/research'} name={'Research'} icon={<FaMicroscope/>}></NavLink>
            <NavLink link={'/publications'} name={'Publications'} icon={<FaNewspaper/>}></NavLink>
        </ul>
    )
}

export default NavMenu