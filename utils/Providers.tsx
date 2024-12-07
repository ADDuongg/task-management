'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ConfigProvider, theme as antdTheme } from 'antd'
import { Provider as JotaiProvider } from 'jotai'
import { ThemeProvider, useTheme } from 'next-themes'

const queryClient = new QueryClient()

const CustomConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme()

  return (
    <ConfigProvider
      theme={{
        algorithm:
          theme === 'dark'
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  )
}

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <CustomConfigProvider>
          <JotaiProvider>
            {children}
            <ReactQueryDevtools initialIsOpen={true} />
          </JotaiProvider>
        </CustomConfigProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
