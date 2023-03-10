import React from 'react';
import {Outlet, Link, useNavigate} from 'react-router-dom';
import LoginBox from './LoginBox';
import { nanoid } from 'nanoid';

import '../css/Navbar.css'


const NavigationBar = ({setToken, logInStatus, setLogInStatus}) => {
    // creating log in interface here
    const navigate = useNavigate();
    const[loginInfo, setLoginInfo] = React.useState({account: "", password: ""}); // keeps the login form, the data will be clear if login is good
    const logInOrOut = (value) => {
        // console.log(logInStatus);
        if(value == false){
            setLogInStatus(value); // set login to false
            sessionStorage.clear();
            setLoginInfo({account:"", password:""}); // clear password
            navigate('/');

            window.location.reload(false);  // refresh the page when log out happens
        }
        else{
            document.getElementById('id01').style.display='block';
            document.querySelector('#login_form').reset();
        }
    }
    
    // console.log(logInStatus);
    // console.log(loginInfo);
    // console.log(validPass);
    
    // because there is no session storage so if the page is refresh, login status is lost
    return(
        <>
            <div className='nav-bar'>
                <Link to="/"><div className='nav-home-button'>Home</div></Link>
                <Link to="/search"><div className='nav-search-button'>Search Course</div></Link>
                <Link to="/create_list"> <div className='nav-create-button'>Create My List</div></Link>

                <div className="nav-user-dropdown">
                    <div className ="user-button"> User </div>
                    <div className ="dropdown-content"> 
                        {logInStatus == true && <Link to="/settings"> <div className='user-nav-setting'> Setting</div> </Link>}
                        {logInStatus ? <div onClick={()=>logInOrOut(false)}>Log out</div> 
                            : <div onClick={()=>logInOrOut(true)}>Log in</div>}
                    </div>
                </div>
            </div>
            <LoginBox 
                loginInfo={loginInfo}
                setLoginInfo={setLoginInfo}
                setLogInStatus={setLogInStatus}
                setToken={setToken}
            />
 
            <Outlet />
        </>
    );
};

export default NavigationBar;
