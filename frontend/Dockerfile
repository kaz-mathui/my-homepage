# Stage 1: Build the React app
FROM node:14-alpine as build
WORKDIR /src
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

# Stage 2: Serve the React app
FROM nginx:alpine

# NGINXの設定ファイルをコピー
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /src/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
