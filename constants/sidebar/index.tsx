import {
  BookOutlined,
  HomeOutlined,
  MessageOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'

export const menuItems = [
  { label: 'Home', icon: HomeOutlined, path: '/dashboard' },
  { label: 'Task', icon: BookOutlined, path: '/dashboard/task' },
  { label: 'Members', icon: UsergroupAddOutlined, path: '/dashboard/members' },
  { label: 'Message', icon: MessageOutlined, path: '/dashboard/message' },
  { label: 'Setting', icon: SettingOutlined, path: '/dashboard/setting' },
]
