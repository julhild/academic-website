import { Link, useLocation } from 'react-router-dom';

function NavLink({ link, name, icon }) {
    const location = useLocation();
    const isRouteActive = link === location.pathname;

    return (
        <Link to={link} className={isRouteActive ? 'navbar-link current' : 'navbar-link'}>
            {icon} {name}
        </Link>
    )
}

export default NavLink