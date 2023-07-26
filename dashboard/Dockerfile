FROM node:14.21.2 as build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:alpine
COPY --from=build /app/dist/ncert /usr/share/nginx/html
