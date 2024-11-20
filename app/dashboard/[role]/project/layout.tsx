import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full h-full py-10 space-y-5 ">{children}</div>
}

export default Layout
