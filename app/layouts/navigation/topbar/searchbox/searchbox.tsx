// components/SearchBox.tsx

import React, { ChangeEvent, useEffect, useState } from 'react';

interface SearchBoxProps {
  onChange: (value: string) => void;
  value?: string; // Optional initial value
}

const SearchBox: React.FC<SearchBoxProps> = ({ onChange, value: initialValue = '' }) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBox;
