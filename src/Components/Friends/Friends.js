
import React, { useState, useEffect } from 'react';
import './Friends.css';
import { useNavigate } from 'react-router-dom';
import { AiOutlineMessage, AiOutlineDelete } from 'react-icons/ai';
import { BsPersonFillAdd } from 'react-icons/bs';
import { BiSolidUserCheck } from 'react-icons/bi';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Profile from '../Profile/Profile';

function Friend({ name, profilePic, userId, friendId, onClick }) {
  const handleRemoveFriend = () => {
    axios.delete(`http://localhost:8086/api/v1/users/${userId}/friends/${friendId}`)
      .then(response => console.log(response.data))
      .catch(error => console.error('Error removing friend:', error));
  };

  return (
    <div className="card" onClick={onClick}>
      <img src={profilePic} alt={`${name}'s profile`} />
      <h3>{name}</h3>
      <div className="button mt-2">
        <NavLink to={`/message`} className="btn btn-info">
          <AiOutlineMessage />
        </NavLink>
        <button onClick={handleRemoveFriend} className="btn btn-danger">
          <AiOutlineDelete />
        </button>
      </div>
    </div>
  );
}

function PendingRequest({ name, profilePic, userId, otherUserId, friendshipId }) {
  const [status, setStatus] = useState(null);

  const handleResponse = (accept) => {
    const url = accept
      ? `http://localhost:8086/api/v1/users/${otherUserId}/friends/${friendshipId}/${userId}`
      : `http://localhost:8086/api/v1/users/${otherUserId}/friends/${userId}`;
    const method = accept ? axios.put : axios.delete;

    method(url)
      .then(response => console.log(response.data))
      .catch(error => console.error('Error handling friend request:', error));

    setStatus(accept ? 'accepted' : 'declined');
  };

  return (
    <div className="card">
      <img src={profilePic} alt={`${name}'s profile`} />
      <h3>{name}</h3>
      <div className="button mt-2">
        <button onClick={() => handleResponse(true)} className={`btn ${status === 'accepted' ? 'btn-success' : 'btn-outline-primary'}`}>
          Accept
        </button>
        <button onClick={() => handleResponse(false)} className={`btn ${status === 'declined' ? 'btn-success' : 'btn-danger'}`}>
          Decline
        </button>
      </div>
    </div>
  );
}

function FriendSuggestion({ name, profilePic, userId, otherUserId, currentUsername, onAddFriend }) {
  const [requestSent, setRequestSent] = useState(false);

  const handleRequest = () => {
    const url = requestSent
      ? `http://localhost:8086/api/v1/users/${userId}/friends/${otherUserId}`
      : `http://localhost:8086/api/v1/users/${userId}/friendrequest/send/${otherUserId}`;
    const method = requestSent ? axios.delete : axios.post;

    method(url)
      .then(response => {
        console.log(response.data);
        setRequestSent(!requestSent);

        if (!requestSent) {
          axios.post(`http://localhost:8086/api/v1/users/${otherUserId}/notifications`, `User ${currentUsername} sent you a friend request.`)
            .catch(error => console.error('Error sending friend request notification:', error));
        }

        // Update friends in parent component
        onAddFriend({ userid: otherUserId, username: name, profile_picture: profilePic });
      })
      .catch(error => console.error('Error handling friend request:', error));
  };

  return (
    <div className="card">
      <img src={profilePic} alt={`${name}'s profile`} />
      <h3>{name}</h3>
      <div className="button mt-2">
        <button onClick={handleRequest} className={`btn ${requestSent ? 'btn-success' : 'btn-primary'}`}>
          {requestSent ? <BiSolidUserCheck /> : <BsPersonFillAdd />}
        </button>
      </div>
    </div>
  );
}

function FriendList() {
  const [selectedFriendId, setSelectedFriendId] = useState(null);
  const [friends, setFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [friendSuggestions, setFriendSuggestions] = useState([]);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('User'));
  const userId = currentUser.userid;

  useEffect(() => {
    axios.get(`http://localhost:8086/api/v1/users/${userId}/friends`)
      .then(response => {
        const allFriends = response.data;
        // Filter friends based on status
        const filteredFriends = allFriends.filter(friend => friend.status === 1 &&
          (friend.userID1.userid === userId || friend.userID2.userid === userId));
        setFriends(filteredFriends);
      })
      .catch(error => console.error('Error fetching friends:', error));

    axios.get(`http://localhost:8086/api/v1/users/${userId}/friendrequest/pending`)
      .then(response => setPendingRequests(response.data))
      .catch(error => console.error('Error fetching pending requests:', error));

    axios.get(`http://localhost:8086/api/v1/users/all`)
      .then(response => {
        setAllUsers(response.data);
        // Filter out friends from all users to get friend suggestions
        const friendIds = friends.flatMap(friend =>
          friend.userID1.userid === userId ? friend.userID2.userid : friend.userID1.userid
        );
        const suggestions = response.data.filter(user => !friendIds.includes(user.userid) && user.userid !== userId);
        setFriendSuggestions(suggestions);
      })
      .catch(error => console.error('Error fetching all users:', error));
  }, [userId, friends]);

  const handleSelectFriend = (friendId) => {
    setSelectedFriendId(friendId);
    navigate(`/profile/${friendId}`);
  };

  const addFriend = (newFriend) => {
    setFriends(prevFriends => [...prevFriends, newFriend]);
    setFriendSuggestions(prevSuggestions => 
      prevSuggestions.filter(suggestion => suggestion.userid !== newFriend.userid)
    );
  };

  return (
    <div className="friend-list">
      <Carousel showThumbs={false}>
        <div className="friends-container">
          <h2>Friends</h2>
          <div className="friends">
            {friends.map((friend) => (
              <Friend
                key={friend.userID1.userid === userId ? friend.userID2.userid : friend.userID1.userid}
                name={friend.userID1.userid === userId ? friend.userID2.username : friend.userID1.username}
                profilePic={friend.userID1.userid === userId ? friend.userID2.profile_picture : friend.userID1.profile_picture}
                userId={userId}
                friendId={friend.userID1.userid === userId ? friend.userID2.userid : friend.userID1.userid}
                onClick={() => handleSelectFriend(friend.userID1.userid === userId ? friend.userID2.userid : friend.userID1.userid)}
              />
            ))}
          </div>
        </div>
        <div className="pending-requests-container">
          <h2>Pending Requests</h2>
          <div className="pending-requests">
            {pendingRequests.map((request) => (
              <PendingRequest
                key={request.friendshipid}
                name={request.user1name}
                profilePic={request.user1Profile}
                userId={userId}
                otherUserId={request.userid1}
                friendshipId={request.friendshipid}
              />
            ))}
          </div>
        </div>
        <div className="friend-suggestions-container">
          <h2>Friend Suggestions</h2>
          <div className="friend-suggestions">
            {friendSuggestions.map((suggestion) => (
              <FriendSuggestion
                key={suggestion.userid}
                name={suggestion.username}
                profilePic={suggestion.profile_picture}
                userId={userId}
                otherUserId={suggestion.userid}
                currentUsername={currentUser.username}
                onAddFriend={addFriend}
              />
            ))}
          </div>
        </div>
      </Carousel>
      {selectedFriendId && <Profile friendId={selectedFriendId} />}
    </div>
  );
}

export default FriendList;

