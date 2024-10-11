import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full py-10 space-y-5 h-full">{children}</div>
}

export default Layout
