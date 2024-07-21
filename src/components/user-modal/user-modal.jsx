import React from 'react';

const UserModal = ({ user, onClose }) => {
  console.log('User data:', user);
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>{`${user.firstName} ${user.lastName}`}</h2>
        <p>Age: {user.age}</p>
        <p>
          Address: {user.address.city}, {user.address.address}
        </p>
        <p>Height: {user.height}</p>
        <p>Weight: {user.weight}</p>
        <p>Phone: {user.phone}</p>
        <p>Email: {user.email}</p>
      </div>
    </div>
  );
};

export default UserModal;
