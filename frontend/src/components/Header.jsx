import { FaAtom } from 'react-icons/fa';
import NavMenu from './NavMenu';
import "../styles/header.css";


function Header() {                       

    return (
        <header id="navbar">
            <div className="navbar">
                <div className="logo">
                    {/* SIDE MENU */}
                    <div className="menu-button">
                        <input type="checkbox" className="toggler" />
                        <div className="hamburger">
                            <div></div>
                        </div>
                        <div className="side-menu">
                            <div>
                                <NavMenu/>
                            </div>
                        </div>
                    </div>

                    <FaAtom className='icon'/>
                    <h1><span className="text-primary"> Research </span>Group</h1>
                </div>

                <nav>
                    <NavMenu/>
                </nav>

            </div>
        </header>
    )
}

export default Header