import { useState } from "react";
import { TextField, Button } from "@mui/material";
import styles from  "./style.module.scss";

const UserProfile = () => {

    const [userData, setUserData] = useState({
      firstName: '',
      lastName: '',
      language: '',
      dateFormat: '',
      phoneNumber: '',
      username: 'emre1',
      email: 'emre1@gmail.com',
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSave = () => {
      // Here you can add logic to save the updated user profile data
      console.log('Saving user profile:', userData);
    };
  
    return (
      <div className={styles.profile}>
        <div className={styles.profile__card}>
          <h2 className={styles['profile__heading']}>User Profile</h2>
          <div className={styles.profile__card__form}>
            <TextField
              label="First Name"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              required
              margin="none"
            />
       
            <TextField
              label="Last Name"
              variant="outlined"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
            />
            <TextField
              label="Language"
              variant="outlined"
              name="language"
              value={userData.language}
              onChange={handleChange}
            />
            <TextField
              label="Date Format"
              variant="outlined"
              name="dateFormat"
              value={userData.dateFormat}
              onChange={handleChange}
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleChange}
            />
            <TextField
              label="Username"
              variant="outlined"
              name="username"
              value={userData.username}
              onChange={handleChange}
            />
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </div>
    );
  };
  
  export default UserProfile;
