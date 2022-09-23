import { FaCat } from 'react-icons/fa';


function Footer() {
  return (
      <div className='footer'>
            <div className="footer-icon">
                <FaCat/>
            </div>
            
            <h1>
                <span className='text-primary'>cat</span>science
            </h1>
          
            <div className="footer-icon">
                <FaCat className='inverted-cat'/>
            </div>
      </div>
  )
}

export default Footer