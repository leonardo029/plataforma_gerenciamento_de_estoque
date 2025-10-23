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
http-server dist -p 8080
