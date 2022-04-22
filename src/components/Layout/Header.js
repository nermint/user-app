import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-primary ftco-navbar-light mb-5">
        <div className="container">
          <Link to={'/'} className='text-light'>User Application</Link>
          <form action="#" className="searchform order-start">
            <div className="form-group d-flex align-items-center position-relative">
              <input type="text" className="form-control pl-3" placeholder="Search" />
              <FontAwesomeIcon color='gray' size='lg' icon={faSearch} className="position-absolute end-0 px-2"/>
              {/* <button type="submit" placeholder="" className="form-control search"><span className="fa fa-search"></span></button> */}
            </div>
          </form>
          <div>
            <ul className="navbar-nav m-auto">
              <li className="nav-item active"><Link to={'/add'} className="text-light">Add User</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header;
