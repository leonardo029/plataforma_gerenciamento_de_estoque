## https://hub.docker.com/_/node
FROM node:22-slim

## Configuração do Timezone
ENV TZ=America/Sao_Paulo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN npm install -g http-server

WORKDIR /var/www/app

EXPOSE 8080