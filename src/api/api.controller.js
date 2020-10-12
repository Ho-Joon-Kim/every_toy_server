import mariadb from 'mariadb';//mariadb 사용 모듈
import dotenv from 'dotenv';//환경변수를 코드에서 제거하기 위한 모듈
dotenv.config();

const connection = mariadb.createPool({//db 연결용 변수, 내부 변수는 환경변수로 설정.
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
});
 
exports.thread = (async (ctx,next) => {
  let sql,rows,status,body,token;


  ctx.status = status;
  ctx.body = body;
});

exports.thread = (async (ctx,next) => {
  let sql,rows,status,body,token;


  ctx.status = status;
  ctx.body = body;
});

exports.write = (async (ctx,next) => {
  let sql,rows,status,body,token;


  ctx.status = status;
  ctx.body = body;
});

exports.many = (async (ctx,next) => {
  let sql,rows,status,body,token;


  ctx.status = status;
  ctx.body = body;
});

exports.rate = (async (ctx,next) => {
  let sql,rows,status,body,token;


  ctx.status = status;
  ctx.body = body;
});

exports.view = (async (ctx,next) => {
  let sql,rows,status,body,token;


  ctx.status = status;
  ctx.body = body;
});
