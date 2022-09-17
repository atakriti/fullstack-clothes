import React from 'react'
import "./footer.scss"
function Footer() {
  return (
      <footer>
         <div className='left'>
              <h2>Developed by Anwar</h2>
              <a target={"_blank"} href="https://www.anwar-dev.com">Official website</a>
          </div>
          <hr />
         <div className='right'>
              <div className="android">
                  <h5>Get this website as App on andorid</h5>
                  {/* <a href=""></a> */}
              </div>
              <hr />
              <div className="window">
              <h5>Get this website as App on Window</h5>
              {/* <a href=""></a> */}
              </div>
         </div>
    </footer>
  )
}

export default Footer