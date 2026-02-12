import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-slate-900 dark:text-slate-100">
      <main className="flex-1 px-5 pt-8 pb-32">
        {children}
      </main>
    </div>
  )
}

export default Layout
