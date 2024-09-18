import React from 'react';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      this is auth layout
      {children}
    </div>
  );
};

export default Layout;
