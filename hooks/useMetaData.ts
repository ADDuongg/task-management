import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Định nghĩa cấu trúc dữ liệu cho metadata
interface MetaData {
  title: string
  description: string
}

// Định nghĩa dữ liệu tiêu đề và mô tả cho từng path
const metaDataMap: Record<string, MetaData> = {
  '/': {
    title: 'Home Page',
    description: 'Welcome to the home page',
  },
  '/dashboard/task': {
    title: 'Task',
    description: 'Explore Task',
  },
  '/dashboard/members': {
    title: 'Members',
    description: 'Explore Members',
  },
  '/dashboard/message': {
    title: 'Message',
    description: 'Message',
  },
  '/dashboard/setting': {
    title: 'Setting',
    description: 'Setting',
  },
}

const useMetaData = () => {
  const pathname = usePathname()

  useEffect(() => {
    const metaData = metaDataMap[pathname] || metaDataMap['/'] 

    document.title = metaData.title
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', metaData.description)
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = metaData.description
      document.head.appendChild(meta)
    }
  }, [pathname])

  return {
    title: metaDataMap[pathname]?.title || metaDataMap['/'].title,
    description: metaDataMap[pathname]?.description || metaDataMap['/'].description,
  }
}

export default useMetaData
