// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Card from 'react-bootstrap/Card';
// import ListGroup from 'react-bootstrap/ListGroup';
// import profile10 from './profile10.jpg';
// // import './HomePageUser.css';
// import ListOfFriends from '../Profile/ListOfFriends';
// import SuggestedFriends from './SuggestedFriends';

 
// const HomePageUser=()=> {
//   const [profileData, setProfileData] = useState({});
//   const [groups, setGroups] = useState([]);
//   const [userPosts, setUserPosts] = useState([]);
//   const currentUser = JSON.parse(localStorage.getItem('User'));
//   const userId = currentUser.userid; // Extract user ID from the current user object
// useEffect(() => {
 
// axios.get(`http://localhost:8086/api/v1/users/${currentUser.userid}/groups`).then(response2=>{
//   setGroups(response2.data);
// })
 

//     // Fetch profile data from the backend
    
//     axios.get(`http://localhost:8086/api/v1/users/${currentUser.userid}`) // Assuming user ID is 1
//       .then(response => {
//         setProfileData(response.data);
    
//         // Fetch user's posts
//         return axios.get(`http://localhost:8086/api/v1/users/posts/${currentUser.userid}`);
//       })
//       .then(postsResponse => {
//         setUserPosts(postsResponse.data);
       
//       })
//      .catch(error => {
//         console.error('Error fetching profile data:', error);
//       });
     
//   }, [userId]);
//   return (
//     <div style={{marginLeft:'-500px',marginTop:'0px', marginBottom:'400px'}}>
//     <Card style={{ width: '10rem',height: '20rem',marginTop:'700%',marginLeft:'90px', textAlign: 'center', backgroundColor: '#eff3f5', borderRadius: '20px', boxShadow: '0 10px 10px rgba(127, 99, 240, 0.3)' }}>
//     <Card.Img variant="top" src={profileData.profile_picture} style={{width:'50px', height:'50px' ,borderRadius:'50%'}} />
//     <Card.Title style={{ fontFamily: 'cursive' }}>{profileData.username}</Card.Title>
//     <div className="list-group-item" style={{ fontFamily: 'cursive' }}>
//       <ListOfFriends /><br />
//       <small>Friends</small><br />
//       {groups.length}<br />
//       <small>Groups</small>
//     </div>
    
//   </Card>
//   <SuggestedFriends/>
//   </div>
//     // <Card className="user-profile-card" >
//     //   <Card.Img variant="top" src={profileData.profile_picture} width="245" height="245" />
     
//     //     <Card.Title>{profileData.username}<br></br></Card.Title>
//     //     <div className="list-group-item">
//     //     <Card.Text style={{fontFamily:"cursive"}}><ListOfFriends/><br></br><small>Friends<br></br></small>{groups.length}<br></br><small>Groups</small></Card.Text>
//     //     </div>
        
      
//     // </Card>
//   );
// }
 
// export default HomePageUser;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import ListOfFriends from '../Profile/ListOfFriends';
import SuggestedFriends from './SuggestedFriends';
import './HomePageUser.css'

const HomePageUser = () => {
  const [profileData, setProfileData] = useState({});
  const [groups, setGroups] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('User'));
  const userId = currentUser.userid;

  useEffect(() => {
    // Fetch groups data
    axios.get(`http://localhost:8086/api/v1/users/${currentUser.userid}/groups`).then(response => {
      setGroups(response.data);
    });

    // Fetch profile data and user posts
    axios.get(`http://localhost:8086/api/v1/users/${currentUser.userid}`)
      .then(response => {
        setProfileData(response.data);
      })
      .catch(error => {
        console.error('Error fetching profile data:', error);
      });
  }, [currentUser.userid]);

  return (
    <div>
      <Card className="user-profile-card" style={{backgroundColor:'#eff3f5',width:'80%',marginLeft:'-160%', marginTop:'-20%',borderRadius:'20px',boxShadow: '0 10px 10px 0 rgba(127, 99, 240, 0.3)'}}>
        <Card.Img variant="top" src={profileData.profile_picture} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
        <Card.Title style={{ fontFamily: 'cursive' }}>{profileData.username}</Card.Title>
        <div className="list-group-item" style={{ fontFamily: 'cursive' }}>
          <ListOfFriends /><br />
          <small>Friends</small><br />
          {groups.length}<br />
          <small>Groups</small>
        </div>
      </Card>
      
    </div>
  );
};

export default HomePageUser;
