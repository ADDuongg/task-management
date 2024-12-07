import {
  FormOutlined,
  HomeOutlined,
  MessageOutlined,
  ProjectFilled,
  SettingOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'

export const menuItems = [
  { label: 'Home', icon: HomeOutlined, key: `dashboard` },
  { label: 'Project', icon: ProjectFilled, key: `project` },
  { label: 'Task', icon: FormOutlined, key: `task` },
  { label: 'Members', icon: UsergroupAddOutlined, key: `members` },
  { label: 'Message', icon: MessageOutlined, key: `message` },
  { label: 'Setting', icon: SettingOutlined, key: `setting` },
]
