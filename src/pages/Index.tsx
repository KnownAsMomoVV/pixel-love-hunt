
import React from 'react';
import { DesktopProvider } from '../contexts/DesktopContext';
import MacDesktop from '../components/MacDesktop';

const Index: React.FC = () => {
  return (
    <DesktopProvider>
      <MacDesktop />
    </DesktopProvider>
  );
};

export default Index;
