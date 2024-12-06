import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import router from "./src/routers/index.js";


//라우터 기본 설정
const app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});

app.use(express.static(path.join(__dirname, 'public'))); //폴더명+public path를 얻기 위함
app.use(express.json()); //json 요청 받을 수 있게함
app.use(express.urlencoded({ extended: false })); //form 요청 받을 수 있게함
app.use(cookieParser(process.env.COOKIE_SECRET)); //쿠키 전송하는거 처리
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const sessionOption = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false, //개발 시에는 https를 안쓰기 때문에 false
  },
};

app.use(session(sessionOption));

// 라우터 연결
app.use('/', router);

export default app;