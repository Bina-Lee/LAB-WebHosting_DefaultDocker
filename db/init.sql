-- 데이터베이스 생성
CREATE DATABASE IF NOT EXISTS purchaseManage;
USE purchaseManage;

-- unit 테이블 생성
CREATE TABLE IF NOT EXISTS unit (
    startMonth DATE NOT NULL,
    endMonth DATE NOT NULL,
    name VARCHAR(50),
    code VARCHAR(50) NOT NULL,
    PRIMARY KEY (code)  -- 고유 코드
);

-- project 테이블 생성 (복합 기본 키)
CREATE TABLE IF NOT EXISTS project (
    unitCode VARCHAR(50) NOT NULL,                     -- unit 테이블의 code 참조
    name VARCHAR(50) NOT NULL,                         -- 프로젝트 이름
    maxPersonnel INT DEFAULT 0 CHECK (maxPersonnel <= 8),        -- 최대 인원수 (최대 8명)
    budgetType ENUM('perPerson', 'total') NOT NULL,    -- 예산 유형 (개인별, 전체)
    budget INT DEFAULT 0,                              -- 예산
    PRIMARY KEY (unitCode, name),                      -- 복합 기본 키 (unitCode, name)
    FOREIGN KEY (unitCode) REFERENCES unit(code)       -- 외래 키 (unit-code 참조)
);

-- student 테이블 생성 (복합 기본 키)
CREATE TABLE IF NOT EXISTS student (
    unitCode VARCHAR(50) NOT NULL,                     -- unit 테이블의 code 참조
    name VARCHAR(50) NOT NULL,                         -- 학생 이름
    ID INT NOT NULL,                                   -- 학생 ID
    major VARCHAR(50),                                 -- 전공
    PRIMARY KEY (unitCode, ID),                        -- 복합 기본 키 (unitCode, ID)
    FOREIGN KEY (unitCode) REFERENCES unit(code)       -- 외래 키 (unit-code 참조)
);

-- team 테이블 생성
CREATE TABLE IF NOT EXISTS team (
    unitCode VARCHAR(50) NOT NULL,                     -- unit 테이블의 code 참조
    projectName VARCHAR(50) NOT NULL,                  -- project 테이블의 name 참조
    name VARCHAR(50) NOT NULL,                         -- 팀 이름
    code VARCHAR(50) NOT NULL,                         -- 팀 고유 코드 (랜덤 코드)
    personnel INT DEFAULT 0 CHECK (personnel <= 8),    -- 팀 인원수 (project의 maxPersonnel 제한)
    budget INT DEFAULT 0,                              -- 팀 예산
    budgetAfterUse INT DEFAULT 0,                      -- 사용 후 남은 예산
    budgetApproval INT DEFAULT 0,                      -- 예산 승인 금액
    PRIMARY KEY (code),
    FOREIGN KEY (unitCode) REFERENCES unit(code),      -- unit 테이블과 연결
    FOREIGN KEY (unitCode, projectName) REFERENCES project(unitCode, name) -- project 테이블과 연결
);

-- teamMembers 테이블 생성 (복합 기본 키)
CREATE TABLE IF NOT EXISTS teamMembers (
    teamCode VARCHAR(50) NOT NULL,                     -- team 테이블의 code 참조
    studentID INT NOT NULL,                            -- student 테이블의 ID 참조
    PRIMARY KEY (teamCode, studentID),                 -- 복합 기본 키
    FOREIGN KEY (teamCode) REFERENCES team(code),      -- team 테이블과 연결
    FOREIGN KEY (studentID) REFERENCES student(ID)     -- student 테이블과 연결
);

-- purchaseRequest 테이블 생성
CREATE TABLE IF NOT EXISTS purchaseRequest (
    teamCode VARCHAR(50) NOT NULL,                     -- team 테이블의 code 참조
    requestCode VARCHAR(50) NOT NULL,                  -- 요청 코드 (랜덤 코드)
    status ENUM('beforeCheck', 'check', 'checkOut') NOT NULL,   -- 요청 상태
    PRIMARY KEY (requestCode),
    FOREIGN KEY (teamCode) REFERENCES team(code)       -- team 테이블과 연결
);

-- requestItem 테이블 생성
CREATE TABLE IF NOT EXISTS requestItem (
    requestCode VARCHAR(50),                           -- purchaseRequest 테이블의 requestCode 참조
    name VARCHAR(100),                                 -- 아이템 이름
    link VARCHAR(500),                                 -- 구매처 링크
    unitPrice INT,                                     -- 단가
    quantity INT,                                      -- 수량
    option VARCHAR(200),                               -- 옵션
    FOREIGN KEY (requestCode) REFERENCES purchaseRequest(requestCode)  -- purchaseRequest 테이블과 연결
);