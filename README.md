# 2024-6 database project
## webservice for manage Creative Design purchase

## Database Name : purchaseManage

## Entities
### unit
- startMonth - date
- endMonth - date
- name - string(max:50)
- code - string(max:50) - primary
### project
- unitCode - reference: unit-code
- name - string(max:50)
- maxPersonnel - number(integer/maximumvalue is 8)
- budgetType - enum{perPerson, total}
- budget - number(integer)
- CompositePrimaryKey - unitCode, projectName
### student
- unitCode - reference: unit-code
- name - string(max:50)
- ID - number(integer)
- major - string(max:50)
- CompositePrimaryKey - unitCode, ID
### team
- unitCode - reference: unit-code
- project - reference: project-name
- name - string(max:50)
- code - randomCode - primary
- personnel - number(integer/maximumvalue is project-maxPersonnel)
- budget - number(integer)
- budgetAfterUse - number(integer)
- budgetApproval - number(integer)
### teamMembers
- teamCode - reference: team-code
- studentID -reference: student-ID
- CompositePrimaryKey - teamCode, studentID
### purchaseRequest
- team - reference: team-code
- requestCode - randomCode - primary
- status - enum{beforeCheck, check, checkOut}
### requestItem
- requestCode - reference: purchaseRequest-requestCode
- name - string(max:100)
- link - string(max:500)
- unitPrice - number(integer)
- quantity - number(integer)
- Option - string(max:200)



### from WCL-INU/LAB-WebHosting_DefaultDocker
- This Repository's original is docker image for WCL Web Hosting Service
### Fork and Edit, and use for Web Hosting

### Required Edit
- app/Dockerfile
- app/server.js
- docker-compose.yml

### Required Edit
### - workspace/nginx

- use .gitignore for .env

### docker command

```
docker ps
sudo docker-compose down
sudo docker-compose up --build
sudo docker-compose up --build -d
```

## Directory
```
project/
├── public/                   # 정적 파일 (HTML, CSS, JavaScript)
├── src/                      # 서버 코드
│   ├── controllers/          # 비즈니스 로직 담당
│   ├── dao/                  # 데이터베이스 접근 계층
│   ├── routers/              # 라우터 모듈
│   ├── utils/                # 유틸리티 함수
│   ├── config/               # 설정 파일
│   ├── views/                # 동적 View 파일 (HTML, EJS 등)
│   └── app.js                # Express 애플리케이션 설정
├── .env                      # 환경 변수 파일
├── package.json              # npm 설정
└── server.js                 # 서버 시작점
```
