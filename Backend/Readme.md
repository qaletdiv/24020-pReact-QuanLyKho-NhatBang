npm init -y && npm i express dotenv && npm i -D typescript @types/node @types/express tsx nodemon

npx tsc --init

New-Item -ItemType Directory -Path "src/controllers", "src/models", "src/routes", "src/middlewares", "src/config", "src/services"

// cai prisma
npm i @prisma/client && npm i -D prisma
npx prisma init

npx prisma migrate dev --name tao_he_thong_quan_ly_kho

npx prisma generate