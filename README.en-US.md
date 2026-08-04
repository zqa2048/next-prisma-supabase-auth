## Dependencies
* Next.js server-side rendering
* Prisma ORM for object-relational mapping
* Supabase as the data storage solution
  * PostgreSQL for relational data
  * Bucket for media storage

* next-auth for OAuth2 authentication
* Tailwind CSS for responsive layouts

### [Preview Address](https://firday.cn)


## Installation

### 1. Clone the repository and install dependencies

```
git clone https://github.com/zqa2048/next-prisma-supabase-auth.git
cd next-prisma-supabase-auth
npm install
```

### 2. Configure local environment variables

 Replace `.env.example` with `.env` (don't forget to ignore it in git):

```
cp .env.local.example .env.local
```
Then fill in your own variables 

[If you encounter difficulties, feel free to email me](mailto:2603682659@qq.com/)

### 3. Run the application


```
npm run dev
```

Or for deployment:

```
npm run build
npm run start
```


## License
None
