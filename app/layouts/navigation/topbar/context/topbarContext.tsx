'use client'


import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of your context state
interface TopBarContextType {
  isTopBarOpen: boolean;
  toggleTopBar: () => void;
  activeButtonIndex: number | null;
  setActiveButtonIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

// Create a context with initial values
const initialContext: TopBarContextType = {
  isTopBarOpen: false,
  toggleTopBar: () => {},
  activeButtonIndex: null,
  setActiveButtonIndex: () => {}
};

export const TopBarContext = createContext<TopBarContextType>(initialContext);

interface TopBarProviderProps {
  children: ReactNode;
}

export const TopBarProvider: React.FC<TopBarProviderProps> = ({ children }) => {
  const [isTopBarOpen, setIsTopBarOpen] = useState<boolean>(false);
  const [activeButtonIndex, setActiveButtonIndex] = useState<number | null>(null);

  const toggleTopBar = () => {
    setIsTopBarOpen(prevState => !prevState);
  };

  // Value object to be provided by the context
  const contextValue: TopBarContextType = {
    isTopBarOpen,
    toggleTopBar,
    activeButtonIndex,
    setActiveButtonIndex
  };

  return (
    <TopBarContext.Provider value={contextValue}>
      {children}
    </TopBarContext.Provider>
  );
};

