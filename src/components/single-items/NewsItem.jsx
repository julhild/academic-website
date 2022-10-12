import React from 'react'
import { FaCalendarMinus, FaTrashAlt, FaPen } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { db } from '../../firebase.config';
import { updateDoc, doc, deleteDoc } from 'firebase/firestore';


function NewsItem({ newsItem, onPostDelete }) {

    const editPost = (postId) => {

    }

    const deletePost = async (postId) => {
        // react-dialog-confirm 
        if (window.confirm('Are you sure you want to delete this post?')) {
            const listingRef = doc(db, 'news', postId);
            await deleteDoc(listingRef);

            onPostDelete(postId);
        }
    }
    
    const getDate = (timestamp) => {
        const date = new Date(timestamp.seconds * 1000);
        return date.toLocaleString('default', { month: 'long' }) + ' ' + date.getDate() + ', ' + date.getFullYear();
    }
    return (
        <div className="news-item">
            <div>
                <h4>{newsItem.data.title}</h4>
                <p className='news-date'> <FaCalendarMinus/> {getDate(newsItem.data.date)}</p>
            
                { newsItem.data.imageUrl && 
                    <div> 
                    <img src={newsItem.data.imageUrl} alt={newsItem.data.title} />
                    </div>         
                }
            
                { newsItem.data.tags && newsItem.data.tags.length > 0 &&
                        <div className='categories'>
                        {newsItem.data.tags.map((tag, index) => (
                            <div key={index} className="category">{tag}</div>
                        ))
                        }
                        </div>
                }
                <p>
                    {newsItem.data.content}
                </p>
            </div>
        
            <div className="news-item-footer">
                <div className='categories'>
                    {newsItem.data.links && newsItem.data.links.length > 0 &&
                            newsItem.data.links.map((link, index) => (
                                <div key={index}>
                                    <Link
                                        to=''
                                        className='news-link'
                                        onClick={() => window.open(`${link.url}`)}
                                    >
                                        {link.title}
                                    </Link>
                                <div className='separator'>{index + 1 < newsItem.data.links.length ? '|' : ''}
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className="control-buttons">
                    <FaPen className='dark-blue pointer' onClick={() => editPost(newsItem.id)} />                                    
                    <FaTrashAlt className='red pointer' onClick={() => deletePost(newsItem.id)} />                                    
                </div>
            </div>
                    
        </div>
    )
}

export default NewsItem