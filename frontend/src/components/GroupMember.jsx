import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FaLandmark, FaUser, FaUserCircle, FaWikipediaW, FaYoutube, FaTwitter, FaLinkedinIn,
    FaResearchgate, FaInstagram, FaMicroscope, FaArrowRight
} from "react-icons/fa";

function GroupMember({ groupMember }) {
    const [showResearch, setShowResearch] = useState(true);
    const [showCV, setShowCV] = useState(false);

    const photoStyle = {
        background: `url('${groupMember.photoUrl}') no-repeat center center/cover`,
        height: "200px",
        width: "200px",
        borderRadius: "50%"
    };

    const showResearchArea = () => {
        setShowCV(false);
        setShowResearch(true);
    }

    const showCVArea = () => {
        setShowResearch(false);
        setShowCV(true);
    }

    return (
        <div className='group-member-record'>
            <div className="group-member-info">
                <div style={photoStyle}></div>

                <div className="contact">
                    <h3>{groupMember.name}</h3>

                    <p>
                        <FaLandmark className="dark-blue"/> {groupMember.location}
                    </p>

                    {groupMember.website &&
                        <p>
                            <Link
                                to=''
                                className='website-link'
                                onClick={() => window.open(`${groupMember.website}`)}
                            >
                                <FaUser/> Website
                            </Link>
                        </p>
                        }

                    <div className="social">

                        {groupMember.wikipedia && 
                        <Link
                            to=''
                            className='social-link'
                            onClick={() => window.open(`${groupMember.wikipedia}`)}
                        >
                            <FaWikipediaW/> 
                        </Link>
                        }

                        {groupMember.linkin && 
                        <Link to="" className='social-link'
                            onClick={() => window.open(`${groupMember.linkin}`)}> <FaLinkedinIn/>
                        </Link>
                        }
                        
                        {groupMember.researchGate && 
                            <Link to=""
                                className='social-link'
                                onClick={() => window.open(`${groupMember.researchGate}`)}
                            >
                                <FaResearchgate />
                        </Link>
                        }
                        
                        {groupMember.youtube && 
                            <Link to="" className='social-link'
                                onClick={() => window.open(`${groupMember.youtube}`)}
                            >
                                <FaYoutube/>
                            </Link>
                        }

                        {groupMember.twitter && 
                        <Link to="" className='social-link'
                            onClick={() => window.open(`${groupMember.twitter}`)}> <FaTwitter/>
                        </Link>
                        }

                        {groupMember.instagram && 
                        <Link to="" className='social-link'
                            onClick={() => window.open(`${groupMember.instagram}`)}> <FaInstagram/>
                        </Link>
                        }

                    </div>
                </div>

                <div>
                    <div className="group-member-buttons">
                        <button className='expand-button' onClick={showResearchArea}>
                            <FaMicroscope/> Research
                        </button>

                        <button className='expand-button' onClick={showCVArea}>
                            <FaUserCircle/> Curriculum vitae
                        </button>
                    </div>

                    {showResearch &&
                        <div className="expand-area">
                            <ul>
                                {groupMember.research.map((el, index) => (
                                    <li key={index}>
                                        <FaArrowRight /> {el}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    }

                    {showCV &&
                        <div className="expand-area">
                            <table className='cv-table'>
                                {groupMember.research.map((el, index) => (
                                    <tr key={index}>
                                        <td className="year">{el.duration}</td>
                                        <td>
                                            <p>{el.institution}</p>
                                            {el.description}
                                        </td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default GroupMember