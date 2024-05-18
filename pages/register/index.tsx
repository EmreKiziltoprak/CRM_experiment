import { Box, Button, Card, CircularProgress, TextField } from '@mui/material';
import React, { useState } from 'react';
import Image from "next/image"
import classes from './style.module.scss';
import logo from "../../app/assets/logo/logo-black.svg"
import { useTranslations } from 'next-intl';
import a from "../../messages/en.json"
type Props = { locale: string };

function Register({ locale }: Props) {


  const t = useTranslations('Index');

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API request (replace with actual API call)
    try {
      // Perform registration logic here (e.g., dispatch register action)
      await fakeRegister(formData);
      // Handle success (e.g., redirect, show success message)
      console.log('Registration successful!');
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
        <Image src={logo} width={200} height={150} alt="logo" />
        <h5 className={classes.login__cardHeading}>{t('title')}</h5>
        <form onSubmit={handleSubmit} className={classes.login__cardForm}>
          <TextField
            label={t('email')}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={classes.login__cardInput}
            required
            margin="normal"
          />
          <TextField
            label={t('username')}
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label={t('password')}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : t('register')}
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

export function getStaticProps({ locale = "en" }) {
  return {
    props: {
      messages: {
        ...a
      },
    },
  };
}

export default Register;
