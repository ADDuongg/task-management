'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ConfigProvider } from 'antd'
import { Provider as JotaiProvider } from 'jotai'

import { antdConfig } from '@/antd'

const queryClient = new QueryClient()

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider {...antdConfig}>
        <JotaiProvider>
          {children}
          <ReactQueryDevtools initialIsOpen={true} />
        </JotaiProvider>
      </ConfigProvider>
    </QueryClientProvider>
  )
}
