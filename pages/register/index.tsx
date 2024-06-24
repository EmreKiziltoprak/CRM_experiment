import React, { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CircularProgress,
  TextField,
  Alert,
} from '@mui/material'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useCreateUserMutation } from '@/app/store/api/apiSlice'
import { RegisterUserDTO } from '@/app/store/slices/registerSlice'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react' // Import signIn
import logo from '../../app/assets/logo/logo-no-background.svg'
import classes from './style.module.scss'

interface Props {
  locale: string
}

const Register: React.FC<Props> = ({ locale }) => {
  const t = useTranslations('Index')
  const router = useRouter()

  const [formData, setFormData] = useState<RegisterUserDTO>({
    email: '',
    username: '',
    password: '',
  })

  const [createUser, { isLoading, error }] = useCreateUserMutation()
  const [registerError, setRegisterError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const result: any = await createUser(formData)

      console.log('error', result)

      if (!('error' in result)) {
        signIn('credentials', {
          token: result.data.data.token,
          redirect: false,
        }).then(() => {
          router.push('/')
        })
      } else {
        setRegisterError(result.error.data?.data.reason)
      }
    } catch (err) {
      console.error('An unexpected error occurred:', err)
      setRegisterError('An unexpected error occurred.')
    }
  }

  return (
    <Box className={classes.login}>
      <Card className={classes.login__card}>
        <Image src={logo} width={200} height={200} alt="logo" />
        <h6 className={classes.login__cardHeading}>{t('title')}</h6>

        {registerError && (
          <Alert severity="error" onClose={() => setRegisterError(null)}>
            {registerError}
          </Alert>
        )}

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
          <Button
            sx={{ textTransform: 'none' }}
            className={classes.login__cardSubmit}
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <h6>{t('register')}</h6>
            )}
          </Button>
        </form>
      </Card>
    </Box>
  )
}

export default Register
