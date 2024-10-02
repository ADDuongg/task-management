import React from 'react'

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className="w-full h-screen verflow-y-auto flex justify-center items-center">
      <div className="w-full h-full overflow-y-auto flex justify-center items-center">
        {children}
      </div>
    </div>
  )
}

export default Layout
