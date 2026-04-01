# 团队任务看板 - 项目说明文档

## 1. 项目目录结构树

```
team-task-kanban/
├── src/
│   ├── components/               # UI 组件层
│   │   ├── Header.tsx            # 顶部导航栏组件
│   │   ├── FilterPanel.tsx       # 左侧筛选面板组件
│   │   ├── TaskCard.tsx          # 任务卡片组件
│   │   ├── KanbanColumn.tsx      # 看板列组件
│   │   └── AddTaskModal.tsx      # 新增任务模态框
│   ├── hooks/                    # 自定义 Hooks 层
│   │   ├── useLocalStorage.ts    # 本地存储 Hook
│   │   ├── useTasks.ts           # 任务状态管理 Hook
│   │   └── useFilters.ts         # 筛选搜索逻辑 Hook
│   ├── utils/                    # 工具函数层
│   │   ├── taskUtils.ts          # 任务状态流转逻辑
│   │   └── filterUtils.ts        # 筛选/搜索逻辑
│   ├── types/                    # 类型定义层
│   │   └── index.ts              # TypeScript 类型定义
│   ├── data/                     # 数据层
│   │   └── mockTasks.ts          # Mock 任务数据
│   ├── views/                    # 页面视图层
│   │   ├── KanbanView.tsx        # 看板视图
│   │   └── StatsView.tsx         # 统计视图
│   ├── App.tsx                   # 应用入口组件
│   ├── App.css                   # 全局样式
│   ├── main.tsx                  # 应用启动入口
│   ├── index.css                 # 基础样式
│   └── vite-env.d.ts             # Vite 环境类型
├── index.html                    # HTML 入口
├── package.json                  # 项目依赖
├── tsconfig.json                 # TypeScript 配置
├── tsconfig.node.json            # TypeScript Node 配置
├── vite.config.ts                # Vite 配置
├── eslint.config.js              # ESLint 配置
├── .gitignore                    # Git 忽略配置
└── PROJECT.md                    # 项目说明文档
```

## 2. 本地运行步骤

### 前置要求
- Node.js 18+ 版本
- npm 或 yarn 包管理器

### 安装依赖
```bash
npm install
# 或
yarn install
```

### 启动开发服务器
```bash
npm run dev
# 或
yarn dev
```

启动后，访问 `http://localhost:5173` 即可查看应用。

### 构建生产版本
```bash
npm run build
# 或
yarn build
```

### 预览生产构建
```bash
npm run preview
# 或
yarn preview
```

### 代码检查
```bash
npm run lint
# 或
yarn lint
```

## 3. 关键设计说明

### 3.1 分层模块化架构
采用清晰的四层架构设计：
- **组件层 (components)**：纯 UI 展示组件，无业务逻辑
- **Hooks 层 (hooks)**：状态管理和副作用逻辑，使用 React 内置能力
- **工具层 (utils)**：纯函数工具，包括任务流转、筛选逻辑
- **类型层 (types)**：统一的 TypeScript 类型定义

### 3.2 状态管理策略
- 使用 React Context + useReducer 的替代方案：自定义 Hooks
- `useTasks` 管理任务状态，`useFilters` 管理筛选状态
- 状态逻辑与 UI 完全解耦，便于测试和复用

### 3.3 任务状态流转与筛选逻辑分离
- **taskUtils.ts**：专注任务 CRUD 和状态变更
- **filterUtils.ts**：专注筛选搜索算法
- 两个文件完全独立，符合单一职责原则

### 3.4 本地持久化实现
- 使用 `useLocalStorage` 自定义 Hook
- 自动同步任务状态到 localStorage
- 页面刷新后数据不丢失，支持离线使用

### 3.5 搜索与筛选联动
- 搜索和多维度筛选（负责人、优先级、状态）同时生效
- 使用 `useMemo` 优化过滤性能，避免不必要的计算
- 筛选条件变更实时更新结果

### 3.6 原生拖拽实现
- 基于 HTML5 Drag & Drop API 实现看板拖拽
- 不依赖第三方拖拽库，减少包体积
- 拖拽过程中有视觉反馈（高亮、半透明效果）

### 3.7 数据可视化
- 使用 Recharts 库实现统计图表
- 柱状图展示各状态任务数量分布
- 饼图展示各优先级任务数量分布
- 核心指标卡片直观展示项目进度

### 3.8 TypeScript 类型安全
- 所有组件和函数都有完整的类型定义
- 使用枚举约束状态和优先级取值
- 编译时捕获潜在错误，提升代码质量
