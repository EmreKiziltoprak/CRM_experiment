export const TYPES = {
  LanguageService: Symbol.for('LanguageService'),
}

import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      accessToken?: string | null // <-- Add accessToken property
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    } & DefaultSession['user']
  }
}
