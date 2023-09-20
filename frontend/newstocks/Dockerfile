# 1. Node.js 환경을 기반으로 하는 이미지를 선택합니다.
FROM node:lts

# 2. 작업 디렉토리를 생성하고 설정합니다.
WORKDIR /app

# 3. package.json과 package-lock.json 파일을 복사하여 종속성 설치를 진행합니다.
COPY package*.json ./
RUN npm install
RUN npm run build

# 4. 소스 코드를 컨테이너로 복사합니다.
COPY . .

# 5. 프로덕션용 빌드를 생성합니다.
# RUN npm run build

# 6. 애플리케이션을 실행합니다.
CMD ["npm", "start"]
