import { Task, TaskStatus, Priority } from '../types';

export const generateMockTasks = (): Task[] => [
  {
    id: '1',
    title: '设计系统架构图',
    description: '完成项目整体架构设计，包括前端和后端的技术选型',
    assignee: '张三',
    dueDate: '2026-04-10',
    priority: Priority.HIGH,
    status: TaskStatus.DONE,
    createdAt: '2026-03-25'
  },
  {
    id: '2',
    title: '开发登录模块',
    description: '实现用户登录、注册和密码重置功能',
    assignee: '李四',
    dueDate: '2026-04-15',
    priority: Priority.HIGH,
    status: TaskStatus.IN_PROGRESS,
    createdAt: '2026-03-28'
  },
  {
    id: '3',
    title: '编写API文档',
    description: '完成所有接口的Swagger文档编写和示例',
    assignee: '王五',
    dueDate: '2026-04-20',
    priority: Priority.MEDIUM,
    status: TaskStatus.IN_PROGRESS,
    createdAt: '2026-03-30'
  },
  {
    id: '4',
    title: '数据库表设计',
    description: '设计用户、权限、任务等核心业务表结构',
    assignee: '张三',
    dueDate: '2026-04-08',
    priority: Priority.HIGH,
    status: TaskStatus.DONE,
    createdAt: '2026-03-26'
  },
  {
    id: '5',
    title: '单元测试编写',
    description: '为核心业务逻辑编写单元测试用例',
    assignee: '赵六',
    dueDate: '2026-04-25',
    priority: Priority.LOW,
    status: TaskStatus.TODO,
    createdAt: '2026-04-01'
  },
  {
    id: '6',
    title: '性能优化',
    description: '优化前端页面加载速度和响应时间',
    assignee: '李四',
    dueDate: '2026-04-30',
    priority: Priority.MEDIUM,
    status: TaskStatus.TODO,
    createdAt: '2026-04-01'
  },
  {
    id: '7',
    title: '用户反馈修复',
    description: '修复用户反馈的界面显示和交互问题',
    assignee: '王五',
    dueDate: '2026-04-12',
    priority: Priority.HIGH,
    status: TaskStatus.IN_PROGRESS,
    createdAt: '2026-03-31'
  },
  {
    id: '8',
    title: '部署脚本编写',
    description: '编写自动化部署和CI/CD配置文件',
    assignee: '赵六',
    dueDate: '2026-04-18',
    priority: Priority.MEDIUM,
    status: TaskStatus.TODO,
    createdAt: '2026-04-01'
  },
  {
    id: '9',
    title: '代码审查',
    description: '完成第一阶段代码审查和重构建议',
    assignee: '张三',
    dueDate: '2026-04-05',
    priority: Priority.HIGH,
    status: TaskStatus.DONE,
    createdAt: '2026-03-29'
  },
  {
    id: '10',
    title: '产品原型设计',
    description: '完成下个版本的产品原型和交互设计',
    assignee: '赵六',
    dueDate: '2026-05-05',
    priority: Priority.LOW,
    status: TaskStatus.TODO,
    createdAt: '2026-04-01'
  }
];
