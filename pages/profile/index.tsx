import React, { useEffect, useState, useRef } from "react";
import { TextField, Button, Avatar, IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import styles from "./style.module.scss";
import { IUserProfile } from "./interface";
import { useGetUserProfileQuery } from "@/app/store/api/apiSlice";
import { useSession } from "next-auth/react";

const UserProfile = () => {

  
  const { sessionData: session } = useSession();
  const { data: getUserProfile } = useGetUserProfileQuery();
  const [userData, setUserData] = useState<IUserProfile | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
      if (getUserProfile) {
          setUserData(getUserProfile.data);
      }
  }, [getUserProfile]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      if (userData) {
        setUserData((prevData) => ({
          ...prevData!,
          [name]: value,
        }));
      }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          setProfileImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
  
    const handleImageClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    const handleSave = () => {
      console.log('Saving user profile:', userData);
    };

    const handlePhoneChange = (value: string) => {
      if (userData) {
        setUserData((prevData) => ({
          ...prevData!,
          phoneNumber: value,
        }));
      }
    };
  
    return (
      <div className={styles.profile}>
        <div className={styles.profile__card}>
          <h2 className={styles['profile__heading']}>User Profile</h2>
          <div className={styles.profile__image__container}>
          <Avatar
            src={profileImage || '/default-profile.png'}
            alt="Profile"
            className={styles.profile__image}
            onClick={handleImageClick}
            style={{ cursor: 'pointer', width: '100px', height: '100px' }}
          />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
          <div className={styles.profile__card__form}>
            <TextField
              label="First Name"
              name="firstName"
              value={userData?.firstName}
              onChange={handleChange}
              required
              margin="none"
            />
       
            <TextField
              label="Last Name"
              variant="outlined"
              name="lastName"
              value={userData?.lastName}
              onChange={handleChange}
            />
            <TextField
              label="Language"
              variant="outlined"
              name="language"
              value={userData?.language}
              onChange={handleChange}
            />
            <TextField
              label="Date Format"
              variant="outlined"
              name="dateFormat"
              value={userData?.dateFormat}
              onChange={handleChange}
            />
            <MuiTelInput
              label="Phone Number"
              variant="outlined"
              name="phoneNumber"
              value={userData?.phoneNumber}
              onChange={handlePhoneChange}
            />
            <TextField
              label="Username"
              variant="outlined"
              name="username"
              value={userData?.username}
              onChange={handleChange}
            />
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              value={userData?.email}
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
  const [avatar, setAvatar] = useState<string | null>(null); // State to store the avatar image URL
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref to the file input element


  
  useEffect(() => {

    debugger
    console.table(session);
    if (getUserProfile) {
      setUserData(getUserProfile.data);
    }
  }, [getUserProfile, session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (userData) {
      setUserData((prevData) => ({
        ...prevData!,
        [name]: value,
      }));
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the first file from the input
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger click event on file input
    }
  };

  const handleSave = () => {
    console.log("Saving user profile:", userData);
    // You can include avatar URL along with other user data when saving
  };

  return (
    <div className={styles.profile}>
      <div className={styles.profile__card}>
        <h2 className={styles["profile__heading"]}>User Profile</h2>

        <div className={styles.imageContainer} onClick={handleAvatarClick}>
          <Avatar alt="User Avatar" src={avatar} className={styles.image} />
          <input
            accept="image/*"
            id="avatar-upload"
            type="file"
            onChange={handleAvatarChange}
            style={{ display: "none" }}
            ref={fileInputRef}
          />
   
        </div>

        <div className={styles.profile__card__form}>
          <TextField
            label="First Name"
            name="firstName"
            value={userData?.firstName || ""}
            onChange={handleChange}
            required
            margin="none"
          />
          <TextField
            label="Last Name"
            variant="outlined"
            name="lastName"
            value={userData?.lastName || ""}
            onChange={handleChange}
          />
          <TextField
            label="Language"
            variant="outlined"
            name="language"
            value={userData?.language || ""}
            onChange={handleChange}
          />
          <TextField
            label="Date Format"
            variant="outlined"
            name="dateFormat"
            value={userData?.dateFormat || ""}
            onChange={handleChange}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            name="phoneNumber"
            value={userData?.phoneNumber || ""}
            onChange={handleChange}
          />
          <TextField
            label="Username"
            variant="outlined"
            name="username"
            value={userData?.username || ""}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            value={userData?.email || ""}
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
