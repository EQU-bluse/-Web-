# 团队任务看板

一个基于 React + TypeScript + Vite 构建的团队任务管理看板应用。

## 项目目录结构

```
team-task-kanban/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Header.tsx              # 顶部导航栏组件
│   │   ├── FilterPanel.tsx         # 左侧筛选面板组件
│   │   ├── TaskCard.tsx            # 任务卡片组件
│   │   ├── KanbanColumn.tsx        # 看板列组件
│   │   ├── AddTaskModal.tsx        # 新增任务模态框
│   │   └── StatisticsView.tsx      # 统计视图组件
│   ├── hooks/
│   │   ├── useTasks.ts             # 任务管理 Hook
│   │   └── useFilter.ts            # 筛选搜索 Hook
│   ├── utils/
│   │   ├── taskStatus.ts           # 任务状态流转逻辑
│   │   ├── filter.ts               # 筛选/搜索逻辑
│   │   ├── storage.ts              # 本地存储工具
│   │   └── mockData.ts             # Mock 数据
│   ├── types/
│   │   └── index.ts                # TypeScript 类型定义
│   ├── App.tsx                     # 主应用组件
│   ├── App.css                     # 全局样式
│   └── main.tsx                    # 应用入口
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## 本地运行步骤

1. **安装依赖**
```bash
npm install
```

2. **启动开发服务器**
```bash
npm run dev
```

3. **在浏览器中打开**
```
http://localhost:3000
```

4. **构建生产版本**
```bash
npm run build
```

5. **预览生产构建**
```bash
npm run preview
```

## 关键设计说明

1. **分层模块化架构**：采用 components、hooks、utils、types 四层结构，职责分离，便于维护和扩展。

2. **纯 React 状态管理**：使用 React 内置的 useState 和 useEffect，结合自定义 Hooks，不引入任何外部状态管理库。

3. **逻辑分离**：任务状态流转逻辑与筛选搜索逻辑分别放在独立的工具文件中，遵循单一职责原则。

4. **本地持久化**：使用 localStorage 自动保存任务数据，刷新页面后数据不丢失。

5. **搜索筛选联动**：搜索关键词和多维度筛选（负责人、优先级、状态）同时生效，结果实时更新。

6. **类型安全**：完整的 TypeScript 类型定义，包括枚举类型、接口定义，提供良好的开发体验。

7. **响应式设计**：适配不同屏幕尺寸，在移动端也能正常使用。

8. **组件化设计**：每个组件功能单一，可复用性强，便于后续功能扩展和维护。
