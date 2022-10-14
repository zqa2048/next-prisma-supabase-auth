
## 依赖说明
* Next 服务端渲染
* Prisma ORM
* supabase 数据存储方案 
  * postgresql 用户数据
  * bucket 媒体数据

* next-auth 提供auth2认证



## 安装

### 1. 克隆仓库然后下载依赖

```
git clone https://github.com/zqa2048/next-prisma-supabase-auth.git
cd next-prisma-supabase-auth
npm install
```

### 2. 配置本地环境变量

 将`.env.example` 替换 `.env`(记得忽略git提交):

```
cp .env.local.example .env.local
```
然后填入你自己的变量 


### 3. 运行



```
npm run dev
```

或者

```
npm run build
npm run start
```

## License
暂无
