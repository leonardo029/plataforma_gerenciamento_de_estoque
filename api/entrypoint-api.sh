#!/bin/bash
set -e

echo "Buidando o projeto..."
npm run build

echo "Banco disponível! Rodando migrations..."
npx typeorm migration:run -d dist/config/database.config.js

echo "Iniciando aplicação NestJS..."
npm run start:dev