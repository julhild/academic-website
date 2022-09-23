import { useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

function ScrollUpButton() {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        scrolled > 20 ? setVisible(true) : setVisible(false); 
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <>
            {
                visible && 
                <button className='scroll-up-button' onClick={scrollToTop} title='Go to top'>
                        <FaArrowUp/>
                </button>
            }
        </>
    )
}

export default ScrollUpButton