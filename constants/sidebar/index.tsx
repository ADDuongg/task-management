import {
  ClockCircleOutlined,
  FormOutlined,
  HomeOutlined,
  MessageOutlined,
  ProjectOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'

export const menuItems = [
  { label: 'Home', icon: HomeOutlined, key: `dashboard` },
  { label: 'Project', icon: ProjectOutlined, key: `project` },
  { label: 'Task', icon: FormOutlined, key: `task` },
  { label: 'WorkTime', icon: ClockCircleOutlined, key: `worktime` },
  { label: 'Members', icon: UsergroupAddOutlined, key: `members` },
  { label: 'Message', icon: MessageOutlined, key: `message` },
  { label: 'Setting', icon: SettingOutlined, key: `setting` },
]
