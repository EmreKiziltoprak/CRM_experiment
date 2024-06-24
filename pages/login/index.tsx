import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './style.module.scss';
import Image from 'next/image';
import logo from "../../app/assets/logo/logo-no-background.svg";
import { ApiResponse, useCreateUserMutation, useLoginUserMutation } from '@/app/store/api/apiSlice';
import { signIn, useSession } from 'next-auth/react';
import { ILoginError, ILoginSuccess } from '@/app/store/interface/auth';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const Login: React.FC = () => {

  
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const router = useRouter();


  const {data: session} = useSession();
  
  const handleSubmit = async (e: React.FormEvent) => {
    
    e.preventDefault()
    
    try {

      const result: any = await loginUser({
        email: email,
        password: password
      });

      if (result.hasOwnProperty("error")) {

        let tempResult = result.error as ApiResponse<ILoginError>

        setLoginError(tempResult.data!.message ?? "an error occured");

      }
      else {

        let tempResult = result.data as ApiResponse<ILoginSuccess>

        Cookies.set('session', tempResult!.data!.token);

        router.push("/");
      }
    } catch (error) {

      console.error("error at login", error);
      
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__card}>
        <Image src={logo} width={200} height={200} alt="logo" />
        <h6 className={styles.login__cardHeading}>Login</h6>
        <form onSubmit={handleSubmit} className={styles.login__cardForm}>
          <div>
            <TextField
              label="Email"
              type='email'
              name='email'
              required
              variant="outlined"
              className={styles.login__cardInput}
              value={email}
              onChange={(e) => {
                e.preventDefault();
                setEmail(e.target.value)
              }}
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              name='password'
              required
              className={styles.login__cardInput}
              value={password}
              onChange={(e) => { e.preventDefault(); setPassword(e.target.value) }}
              fullWidth
            />
          </div>
          {loginError && <p className={styles.login__error}>{loginError}</p>}
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
