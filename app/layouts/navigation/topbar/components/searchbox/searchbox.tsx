// components/SearchBox.tsx

import React, { ChangeEvent, useEffect, useState } from 'react'
import classes from './style.module.scss'
import SearchIcon from '@mui/icons-material/Search'

interface SearchBoxProps {
  onChange: (value: string) => void
  value?: string // Optional initial value
}

const SearchBox: React.FC<SearchBoxProps> = ({
  onChange,
  value: initialValue = '',
}) => {
  const [value, setValue] = useState<string>(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setValue(newValue)
    onChange(newValue)
  }

  return (
    <div className={classes.searchbox__container}>
      <input
        type="text"
        className={classes.searchbox}
        placeholder="Search..."
        value={value}
        onChange={handleChange}
      />
      <SearchIcon className={classes.searchbox__icon} />
    </div>
  )
}

export default SearchBox
