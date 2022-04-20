import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-primary ftco-navbar-light mb-5" id="ftco-navbar">
	    <div className="container">
            <Link to={'/'} className='text-light'>User Application</Link>
	    	<form action="#" className="searchform order-sm-start order-lg-last">
                <div className="form-group d-flex">
                    <input type="text" className="form-control pl-3" placeholder="Search"/>
                    {/* <button type="submit" placeholder="" className="form-control search"><span className="fa fa-search"></span></button> */}
                </div>
            </form>
	      <div className="collapse navbar-collapse" id="ftco-nav">
	        <ul className="navbar-nav m-auto">
	        	<li className="nav-item active"><a href="#" className="nav-link">Add User</a></li>
	        </ul>
	      </div>
	    </div>
	  </nav>
    </>
  )
}

export default Header;
