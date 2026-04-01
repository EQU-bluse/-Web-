# 团队任务看板

一个使用 React + TypeScript + Vite 构建的团队任务看板应用。

## 项目目录结构树

```
team-task-board/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx              # 顶部导航栏组件
│   │   ├── FilterPanel.tsx         # 左侧筛选面板组件
│   │   ├── TaskCard.tsx            # 任务卡片组件
│   │   ├── BoardColumn.tsx         # 看板列组件
│   │   ├── BoardView.tsx           # 看板视图组件
│   │   ├── StatsView.tsx           # 统计视图组件
│   │   └── AddTaskModal.tsx        # 新增任务弹窗组件
│   ├── hooks/
│   │   ├── useTaskManager.ts       # 任务管理 Hook
│   │   └── useFilters.ts           # 筛选逻辑 Hook
│   ├── utils/
│   │   ├── types/
│   │   │   └── index.ts             # TypeScript 类型定义
│   │   ├── mockData.ts              # Mock 任务数据
│   │   ├── taskUtils.ts             # 任务状态流转工具函数
│   │   └── filterUtils.ts           # 筛选/搜索工具函数
│   ├── App.tsx                      # 主应用组件
│   ├── App.css                      # 全局样式
│   ├── main.tsx                     # 应用入口
│   └── vite-env.d.ts                # Vite 环境声明
├── index.html                       # HTML 模板
├── package.json                     # 项目配置
├── tsconfig.json                    # TypeScript 配置
├── tsconfig.node.json               # Node TypeScript 配置
├── vite.config.ts                   # Vite 配置
└── README.md                        # 项目说明
```

## 本地运行步骤

### 前置要求

- Node.js >= 16.x
- npm 或 yarn 或 pnpm

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

打开浏览器访问 `http://localhost:5173` 即可查看应用。

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 关键设计说明

1. **分层模块化架构**：项目采用清晰的分层结构，将代码分为 components（组件层）、hooks（逻辑层）、utils（工具层）、types（类型层），便于维护和扩展。

2. **React 内置状态管理**：仅使用 `useState`、`useEffect` 和自定义 Hooks 进行状态管理，不依赖任何第三方状态管理库。

3. **状态流转与筛选逻辑分离**：任务状态流转逻辑位于 `utils/taskUtils.ts`，筛选/搜索逻辑位于 `utils/filterUtils.ts`，职责清晰，易于测试。

4. **自定义 Hooks 封装业务逻辑**：`useTaskManager` 封装任务的增删改查和持久化，`useFilters` 封装筛选和搜索逻辑，组件只负责 UI 渲染。

5. **LocalStorage 数据持久化**：使用 localStorage 存储任务数据，刷新页面后数据不会丢失。

6. **10条 Mock 数据**：预置了 10 条任务数据，涵盖不同负责人、优先级和状态，直接展示在看板中。

7. **搜索与筛选联动**：搜索框和筛选面板的条件可以同时生效，实现精确的任务过滤。

8. **响应式设计**：适配不同屏幕尺寸，在移动端和桌面端都有良好的展示效果。

## 功能特性

- ✅ 看板视图（Todo / In Progress / Done 三列）
- ✅ 统计视图（状态分布、优先级分布）
- ✅ 新增任务（标题、描述、负责人、截止日期、优先级）
- ✅ 任务状态移动（在三列间流转）
- ✅ 删除任务
- ✅ 按负责人筛选
- ✅ 按优先级筛选
- ✅ 按状态筛选
- ✅ 按标题和描述搜索
- ✅ 搜索与筛选联动
- ✅ 数据持久化（刷新不丢失）
- ✅ 响应式设计
