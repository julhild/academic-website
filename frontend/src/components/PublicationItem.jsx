import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShareSquare, FaFilePdf, FaReceipt } from "react-icons/fa";

function PublicationItem({ article }) {
    const [showAbstract, setShowAbstract] = useState(false);

    return (    
        <div className="publication-item">
            <div className="publication-preview">
                <img src={article.imageUrl} alt=""/>
            </div>
            <div className="publication-info">
                { article.tags &&
                    <div className="categories">
                        {article.tags.map((tag, index) => (
                            <div key={index} className="category">{tag}</div>
                        ))}
                    </div>
                }
                <h4>{article.title}</h4>
                <p>{article.authors?.join(', ')}</p>
                <Link
                    to=''
                    className="publication-link"
                    onClick={() => window.open(`${article.articleUrl}`) }>
                    <FaShareSquare /> {article.journalReference}
                </Link>
                
                <div className="categories">
                    {article.pdfUrl &&
                        <Link
                            to=''
                            className='publication-link'
                            onClick={() => window.open(`${article.pdfUrl}`)}
                        >
                            <FaFilePdf/> PDF
                        </Link>
                    }

                    <div className={showAbstract ? 'abstract-button active' : 'abstract-button'} onClick={() => setShowAbstract(!showAbstract)}>
                        <FaReceipt/> Abstract
                    </div>
                </div>

                {showAbstract && 
                    <div className="abstract-area">
                        {article.abstract}
                    </div>
                }
            </div>
        </div>
    )
}

export default PublicationItem