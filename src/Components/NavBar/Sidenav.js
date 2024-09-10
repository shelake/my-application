import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Sidenav.css';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MenuIcon from '@mui/icons-material/Menu';

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

import NotificationPanel from '../Notifications/NotificationPanel';
import UserProfile from '../Profile/UserProfile';
import Mode from '../Mode/Mode';
import NavScrollExample from './NavBar';
import axios from 'axios';
import image from './VibleeLogo.jpg'





// import React, { useEffect, useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import './Sidenav.css';
// import HomeIcon from '@mui/icons-material/Home';
// import SearchIcon from '@mui/icons-material/Search';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import GroupsIcon from '@mui/icons-material/Groups';
// import ChatIcon from '@mui/icons-material/Chat';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
// import axios from 'axios';
// import NotificationPanel from '../Notifications/NotificationPanel';

const Sidenav = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsCount, setNotificationCount] = useState(8);
  const currentUser = JSON.parse(localStorage.getItem('User'));
  const userId = currentUser.userid;

  useEffect(() => {
    // Function to fetch notifications
    const fetchNotifications = async () => {
      try {
        // Make GET request to fetch notifications
        const response = await axios.get(`http://localhost:8086/api/v1/users/${userId}/notifications`);
        // Set notifications in state
        setNotificationCount(response.data.length);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    // Call fetchNotifications function when component mounts
    fetchNotifications();
  }, []);

  const toggleNotifications = () => {
    // Check if badge count is greater than 0
    if (notificationsCount > 0) {
      // Set badge count to 0 when notification icon is clicked
      setNotificationCount(0);
    }
    setShowNotifications(!showNotifications);
  };

  return (
    <div>
      <div className="sidenav" >
        <div className="sidenav__buttons" >
        <div className='sidenav__logo' style={{marginLeft:'-20px', marginTop: '0px', position: 'fixed', top: '0', left: '0'}}>
    <img src={image} style={{width:'130px', height:'120px'}}/>
</div>
        <div style={{paddingTop:"200%", paddingBottom:'200%'}}>
          <NavLink exact to="/home" className="sidenav__button" activeClassName="active" title='Home' >
            <HomeIcon style={{ color: '#8E7AB5',width:'30px',height:'30px' }} />
          </NavLink>
          <NavLink to="/profile" className="sidenav__button" activeClassName="active"  title='Profile'>
            <AccountCircleIcon  style={{ color: '#3377FF',width:'30px',height:'30px'  }}/>
          </NavLink>
          <NavLink to="/message" className="sidenav__button" activeClassName="active"  title='Message'>
            <ChatIcon style={{ color: '#C81472',width:'30px',height:'30px' }} />
          </NavLink>
          <div  style={{width:'30px',height:'30px'}}> 
          <NavLink 
            className="sidenav_button relative"
            activeClassName="active"
            onClick={toggleNotifications}
            title="Notifications"
          >
            <div className='badge-container'>
              {notificationsCount > 0 && (
                <span className='notification-badge'>{notificationsCount}</span>
              )}
            </div >
            <div style={{width:'50px',height:'50px'}}>
            <NotificationsIcon style={{ fontSize: '80px', color: "#ffbf00", paddingLeft:'5px', width:'30px',height:'30px'}} />

            <span className='visually-hidden'>Notifications</span>
            </div>
          </NavLink>
          </div>
          <NavLink to="/friends" className="sidenav__button" activeClassName="active"  title='Friends'>
            <PeopleAltIcon style={{ color: '#7D0A9F' ,width:'30px',height:'30px'}} />
          </NavLink>
          <NavLink to="/group" className="sidenav__button" activeClassName="active"  title='Group'>
            <GroupsIcon style={{ color: '#09D007',width:'30px',height:'30px' }}  />
          </NavLink>
          <NavLink to="/createPost" className="sidenav__button" activeClassName="active"  title='Create'>
            <AddCircleOutlineIcon style={{ color: '#FF9800' ,width:'30px',height:'30px'}}/>
          </NavLink>
          <div>
          <Mode />
          </div>
          
        </div>
        </div>
        <div className="sidenav__more">
          <button className="sidenav__button" activeClassName="active"  title='SignOuts'>
            <PowerSettingsNewIcon style={{ color: '#FF0000' }}/>
          </button>
        </div>
        <NotificationPanel
          isOpen={showNotifications}
          toggleNotifications={toggleNotifications}
        />
      </div>
    </div>
  );
};
 
export default Sidenav;
