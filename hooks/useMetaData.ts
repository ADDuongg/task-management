import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useAtom, useAtomValue } from 'jotai'
import { userRoleState } from '@/states/users'

interface MetaData {
  title: string
  description: string
}


const useMetaData = () => {
  const pathname = usePathname()
  const role = useAtomValue(userRoleState)
  console.log('pathname', pathname)
  
  const metaDataMap: Record<string, MetaData> = {
    '/': {
      title: 'Home Page',
      description: 'Welcome to the home page',
    },
    [`/dashboard/${role}/task`]: {
      title: 'Task',
      description: 'Explore Task',
    },
    [`/dashboard/${role}/members`]: {
      title: 'Members',
      description: 'Explore Members',
    },
    [`/dashboard/${role}/project`]: {
      title: 'Project',
      description: 'Explore Project',
    },
    [`/dashboard/${role}/profile`]: {
      title: 'Profile',
      description: 'Explore Profile',
    },
    [`/dashboard/${role}/message`]: {
      title: 'Message',
      description: 'Message',
    },
    [`/dashboard/${role}/setting`]: {
      title: 'Setting',
      description: 'Setting',
    },
  }
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
