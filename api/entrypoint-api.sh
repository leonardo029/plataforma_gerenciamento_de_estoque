#!/bin/bash
set -e

npm install
npm run build
npm run start:dev
