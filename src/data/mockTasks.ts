import { Task, TaskStatus, Priority } from '../types';

export const mockTasks: Task[] = [
  {
    id: '1',
    title: '完成用户界面设计',
    description: '设计登录页、仪表盘和用户管理页面的UI原型和高保真设计稿',
    assignee: '张三',
    dueDate: '2026-04-10',
    priority: Priority.HIGH,
    status: TaskStatus.TODO,
    createdAt: '2026-04-01'
  },
  {
    id: '2',
    title: 'API接口开发',
    description: '开发用户认证和权限管理的后端API接口',
    assignee: '李四',
    dueDate: '2026-04-15',
    priority: Priority.HIGH,
    status: TaskStatus.IN_PROGRESS,
    createdAt: '2026-04-01'
  },
  {
    id: '3',
    title: '编写单元测试',
    description: '为核心业务逻辑编写单元测试用例，确保代码覆盖率达到80%以上',
    assignee: '王五',
    dueDate: '2026-04-08',
    priority: Priority.MEDIUM,
    status: TaskStatus.TODO,
    createdAt: '2026-04-01'
  },
  {
    id: '4',
    title: '项目文档整理',
    description: '整理项目需求文档和技术架构文档',
    assignee: '张三',
    dueDate: '2026-04-05',
    priority: Priority.LOW,
    status: TaskStatus.DONE,
    createdAt: '2026-04-01'
  },
  {
    id: '5',
    title: '数据库优化',
    description: '优化慢查询，建立必要的索引，提升系统性能',
    assignee: '李四',
    dueDate: '2026-04-12',
    priority: Priority.HIGH,
    status: TaskStatus.IN_PROGRESS,
    createdAt: '2026-04-01'
  },
  {
    id: '6',
    title: '前端组件封装',
    description: '封装通用的表单组件和表格组件供项目使用',
    assignee: '赵六',
    dueDate: '2026-04-18',
    priority: Priority.MEDIUM,
    status: TaskStatus.TODO,
    createdAt: '2026-04-01'
  },
  {
    id: '7',
    title: '代码审查',
    description: '审查团队成员提交的代码，确保代码质量符合规范',
    assignee: '王五',
    dueDate: '2026-04-03',
    priority: Priority.LOW,
    status: TaskStatus.DONE,
    createdAt: '2026-04-01'
  },
  {
    id: '8',
    title: '部署环境配置',
    description: '配置测试环境和生产环境的CI/CD流水线',
    assignee: '赵六',
    dueDate: '2026-04-20',
    priority: Priority.MEDIUM,
    status: TaskStatus.IN_PROGRESS,
    createdAt: '2026-04-01'
  },
  {
    id: '9',
    title: '性能测试',
    description: '进行系统负载测试和压力测试，找出性能瓶颈',
    assignee: '张三',
    dueDate: '2026-04-25',
    priority: Priority.MEDIUM,
    status: TaskStatus.TODO,
    createdAt: '2026-04-01'
  },
  {
    id: '10',
    title: '需求评审会议',
    description: '组织并召开新版本需求评审会议',
    assignee: '李四',
    dueDate: '2026-04-04',
    priority: Priority.LOW,
    status: TaskStatus.DONE,
    createdAt: '2026-04-01'
  }
];

export const assignees = ['张三', '李四', '王五', '赵六'];
