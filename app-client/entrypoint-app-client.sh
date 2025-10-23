#!/bin/sh
echo "Iniciando container do app-client..."

# Instala dependências (caso não estejam instaladas)
echo "Instalando dependências..."
npm install

# Executa o build
echo "Gerando o build..."
npm run build

# Servindo os arquivos estáticos
echo "Servindo aplicação Vue na porta 8080..."
npm run dev -- --host 0.0.0.0 --port 8080
