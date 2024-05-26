import { Box, Button, Card, CircularProgress, TextField } from '@mui/material';
import React, { useState } from 'react';
import Image from "next/image"
import classes from './style.module.scss';
import logo from "../../app/assets/logo/logo-no-background.svg"
import { useTranslations } from 'next-intl';
import a from "../../messages/en.json"
import { useCreateUserMutation } from '@/app/store/api/apiSlice';
import { RegisterUserDTO, User } from '@/app/store/slices/registerSlice';
type Props = { locale: string };

function Register({ locale }: Props) {


  const t = useTranslations('Index');

  const [formData, setFormData] = useState<RegisterUserDTO>({
    email: '',
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [createUser, { isLoading, error }] = useCreateUserMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault;

    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    setLoading(true);
    // Simulate API request (replace with actual API call)
    try {
      const response = await createUser(formData);

      console.log("response", response);
      setFormData({
        email: '',
        username: '',
        password: '',
      });

    } catch (error) {
      // Handle error (e.g., display error message)
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className={classes.login}>
      <Card className={classes.login__card}>
        <Image src={logo} width={200} height={200} alt="logo" />
        <h6 className={classes.login__cardHeading}>{t('title')}</h6>
        <form onSubmit={handleSubmit} className={classes.login__cardForm}>
          <TextField
            label={t('email')}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={classes.login__cardInput}
            required
            margin="none"
          />
          <TextField
            label={t('username')}
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            fullWidth
            className={classes.login__cardInput}

            required
            margin="none"
          />
          <TextField
            label={t('password')}
            type="password"
            className={classes.login__cardInput}

            name="password"
            value={formData.password}
            onChange={handleInputChange}
            fullWidth
            required
            margin="none"
          />
          <Button sx={{textTransform: "none"}} className={classes.login__cardSubmit} type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : <h6>{t('register')}</h6>}
          </Button>
        </form>
      </Card>
    </Box>
  );
}

// Mock registration function (replace with actual registration logic)
const fakeRegister = async (formData: { email: string; username: string; password: string }) => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      // Simulate successful registration
      resolve();
    }, 1000);
  });
};

export default Register;
