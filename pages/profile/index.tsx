import { useEffect, useState } from 'react'
import { TextField, Button } from '@mui/material'
import styles from './style.module.scss'
import { IUserProfile } from './interface'
import { useGetUserProfileQuery } from '@/app/store/api/apiSlice'
import { useSession } from 'next-auth/react'

const UserProfile = () => {
  const { data: session } = useSession()

  const { data: getUserProfile } = useGetUserProfileQuery()
  const [userData, setUserData] = useState<IUserProfile | null>(null)

  useEffect(() => {
    console.table(session)
    if (getUserProfile) {
      setUserData(getUserProfile.data)
    }
  }, [getUserProfile, session])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (userData) {
      setUserData((prevData) => ({
        ...prevData!,
        [name]: value,
      }))
    }
  }

  const handleSave = () => {
    console.log('Saving user profile:', userData)
  }

  return (
    <div className={styles.profile}>
      <div className={styles.profile__card}>
        <h2 className={styles['profile__heading']}>User Profile</h2>
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
          <TextField
            label="Phone Number"
            variant="outlined"
            name="phoneNumber"
            value={userData?.phoneNumber}
            onChange={handleChange}
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
  )
}

export default UserProfile
