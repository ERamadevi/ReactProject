import React from 'react';
import { Link } from 'react-router-dom';

const Header = () =>{
    return(
<nav className="navbar navbar-expand-sm navbar-dark bg-dark sticky-top p-1">
  <div className="container-fluid">

    <a className="navbar-brand" ><i className='fa fa-shopping-bag fa-lg'> </i> Medical Planet  </a>
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="mynavbar">
      <ul className="navbar-nav mx-auto">
        <li className="navbar-brand">
          <Link  className="nav-link text-white" to="/"> 
          <i className='fa fa-home fa-sm'> </i> Home </Link>
        </li>

        <li className="navbar-brand">
          <Link className="nav-link text-white" to="/cataApi/catagory"> 
          <i className='fa fa-user fa-md'> </i>Catagory </Link>
        </li>

       {/* <li className="navbar-brand">
          <Link className="nav-link text-white" to="/cataApi/category1" >
             <i className='fa fa-lock fa-md'> </i> category1 </Link>
       </li>   */}
        <li className="navbar-brand">
          <Link className="nav-link text-white" to="/cataApi/product"> 
          <i className='fa fa-user fa-md'> </i>Product </Link>
        </li>

      </ul>
    </div>
  </div>
  </nav>
    )
}

export default Header;