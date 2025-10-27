## https://hub.docker.com/_/node
FROM node:22-slim

## Configuração do Timezone
ENV TZ=America/Sao_Paulo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /var/www/app

RUN npm install -g vite

EXPOSE 8080