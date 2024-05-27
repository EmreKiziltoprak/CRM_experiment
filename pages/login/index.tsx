import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './style.module.scss';
import Image from 'next/image';
import logo from "../../app/assets/logo/logo-no-background.svg";

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    try {
      // ... your API call for authentication
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__card}>
        <Image src={logo} width={200} height={200} alt="logo" />
        <h6 className={styles.login__cardHeading}>Login</h6>
        <form onSubmit={handleSubmit} className={styles.login__cardForm}>
          <TextField
            label="Username"
            variant="outlined"
            className={styles.login__cardInput}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            className={styles.login__cardInput}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          {error && <p className={styles.login__error}>{error}</p>}
          <Button
            type="submit"
            variant="contained"
            className={styles.login__cardSubmit}
            fullWidth
          >
            <h6>Login</h6>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
