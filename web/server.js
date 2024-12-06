const app = require('./src/app');
const port = process.env.PORT || 3000;

app.listen(app.get('port'), () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
