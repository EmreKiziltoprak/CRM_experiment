import { LanguageService } from '@/app/services/LanguageService'
import { setLanguage } from '@/app/store/slices/languageSlice'
import { RootState } from '@/app/store/store'
import { container } from '@/inversify.config'
import { TYPES } from '@/types'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const LanguageSelector: React.FC = () => {
  const dispatch = useDispatch()
  const languageService = container.get<LanguageService>(TYPES.LanguageService)
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language,
  )
  const availableLanguages = languageService.getAvailableLanguages()

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedLanguage = event.target.value
    dispatch(setLanguage(selectedLanguage))
    languageService.setLanguage(selectedLanguage)
  }

  useEffect(() => {
    const savedLanguage = languageService.getLanguage()
    dispatch(setLanguage(savedLanguage))
  }, [dispatch, languageService])

  return (
    <select value={currentLanguage} onChange={handleLanguageChange}>
      {availableLanguages.map((lang: string) => (
        <option key={lang} value={lang}>
          {lang}
        </option>
      ))}
    </select>
  )
}

export default LanguageSelector
