import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-white">
      <main className="flex-1 flex flex-col overflow-x-hidden">
        {children}
      </main>
    </div>
  )
}

export default Layout
