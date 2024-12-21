import React from 'react';
import { message, App } from 'antd';
import { useThemeContext } from '../../context/ThemeContext';

const ThemedMessage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useThemeContext();
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <App>
      {contextHolder}
      {children}
    </App>
  );
};

export default ThemedMessage;

export const showMessage = {
  success: (content: string) => message.success(content),
  error: (content: string) => message.error(content),
  warning: (content: string) => message.warning(content),
  info: (content: string) => message.info(content),
};