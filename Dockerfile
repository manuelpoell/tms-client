FROM node:18.12.1-alpine3.15 AS builder
WORKDIR /opt/app
RUN npm install -g @angular/cli@15.0.2
COPY package*.json ./
RUN npm install
COPY . .
RUN ng build

FROM nginx:1.23.1-alpine AS runner
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /opt/app/dist/tms-client /usr/share/nginx/html
