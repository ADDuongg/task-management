import {
  BookOutlined,
  HomeOutlined,
  MessageOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'

export const menuItems = [
  { label: 'Home', icon: HomeOutlined, key: `dashboard` },
  { label: 'Task', icon: BookOutlined, key: `task` },
  { label: 'Members', icon: UsergroupAddOutlined, key: `members` },
  { label: 'Message', icon: MessageOutlined, key: `message` },
  { label: 'Setting', icon: SettingOutlined, key: `setting` },
]
