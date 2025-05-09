FROM node:lts-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY package-lock.json ./

RUN if [ -f yarn.lock ]; then yarn install --frozen-lockfile; else npm install --frozen-lockfile; fi

COPY . .

RUN npm run build

FROM nginx:stable-alpine

EXPOSE 80

COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]