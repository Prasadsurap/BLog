import React, { useState } from "react";

const ProfileEdit = ({ user, handleProfileUpdate }) => {
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [profilePic, setProfilePic] = useState(null);

  const handleNameChange = (e) => {
    setDisplayName(e.target.value);
  };

  const handlePicChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Assuming handleProfileUpdate is a function passed as a prop
    handleProfileUpdate(displayName, profilePic);
  };

  return (
    <div className="container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="displayName" className="form-label">Display Name</label>
          <input
            type="text"
            className="form-control"
            id="displayName"
            value={displayName}
            onChange={handleNameChange}
          />
        </div>
        {/* <div className="mb-3">
          <label htmlFor="profilePic" className="form-label">Profile Picture</label>
          <input
            type="file"
            className="form-control"
            id="profilePic"
            onChange={handlePicChange}
          />
        </div> */}
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default ProfileEdit;
