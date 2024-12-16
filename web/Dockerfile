# Node.js 이미지 사용
FROM node:latest

# 작업 디렉터리 설정
WORKDIR /app

# package.json과 package-lock.json을 복사하고 종속성 설치
COPY package.json .
RUN npm install

# 소스 코드 복사
COPY . .

# 서버 포트 (예: 3000) 노출
EXPOSE 8082

# 서버 시작 명령
CMD ["node", "server.js"]
