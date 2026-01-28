#!/bin/bash
# 첫 번째 인자를 REGISTRY로 받음
if [ -z "$1" ]; then
    echo "사용법: $0 <registry>"
    echo "예시: $0 example.com"
    exit 1
fi

REGISTRY=$1

# package.json에서 버전 읽기
VERSION=$(node -p "require('./package.json').version")
export VERSION

echo "Building version: $VERSION"

nvm use

bun i

bun run build

docker-compose build --no-cache

if [ ! -z "$1" ]; then
    docker push $REGISTRY/ever-blog:$VERSION
fi