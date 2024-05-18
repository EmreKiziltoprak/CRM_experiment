import { RootState } from '@/app/store/store';
import { NextIntlClientProvider } from 'next-intl';
import React, { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface LanguageProviderProps {
  children: ReactNode;
  messages: Record<string, any>;
}

const LanguageProvider: React.FC<LanguageProviderProps> = ({ children, messages }) => {
  const language = useSelector((state: RootState) => state.language.language);
  const [messagesState, setMessages] = useState<any>(messages);
  console.log("language");

  console.log("language", language);
  useEffect(() => {
    debugger;

    import(`../../../messages/${language}.json`).then((messages) => {
        setMessages(messages)
    });
  }, [language]);

  return (
    <NextIntlClientProvider locale={language} messages={messagesState}>
      {children}
    </NextIntlClientProvider>
  );
};

export default LanguageProvider;
