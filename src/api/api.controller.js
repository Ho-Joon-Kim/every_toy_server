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
  const { pagenum } = ctx.params;
  const { sort } = ctx.request.body;
  const { category } = ctx.request.body;
  const start = (20 * pagenum);
  let sql,rows,status,body,option = '';

  if(category != 0){ option = `WHERE category = ${category}` }

  const thread = async() => {
    sql = `SELECT num,title,date,\`like\`,dislike FROM thread ${option} ORDER BY \`${sort}\` DESC LIMIT ${start}, 20;`;
    rows = await connection.query(sql,() =>{connection.release();});

    if(rows[0]){
      status = 200;
      body = {"contents" : rows};
    }else{
      status = 404;
      body = {"message" : "api 요청이 잘못됬거나 더 이상 페이지가 없어요!!"};
    }
  };

  await thread();
  ctx.status = status;
  ctx.body = body;
});

// 체크 완료
exports.write = (async (ctx,next) => {
  const { title } = ctx.request.body;
  const { content } = ctx.request.body;
  const { category } = ctx.request.body;
  let sql;

  sql = `INSERT thread(category,title,content) VALUES(${category},'${title}','${content}');`;
  await connection.query(sql,() =>{connection.release();});

  ctx.status = 201;
});

// 체크 완료
exports.many = (async (ctx,next) => {
  let sql,status,body,rows;

  const many = async() => {
    sql = `(SELECT COUNT(category) AS 'output' FROM thread)UNION
    (SELECT COUNT(category) FROM thread WHERE category = 1)UNION
    (SELECT COUNT(category) FROM thread WHERE category = 2)UNION
    (SELECT COUNT(category) FROM thread WHERE category = 3)UNION
    (SELECT COUNT(category) FROM thread WHERE category = 4);`;
    rows = await connection.query(sql,() =>{connection.release();});
    status = 200;
    body = {
      "all" : rows[0]['output'],
      "web" : rows[1]['output'],
      "app" : rows[2]['output'],
      "guitar" : rows[3]['output']
    };
  };


  await many();
  ctx.status = status;
  ctx.body = body;
});

// 체크 완료
exports.rate = (async (ctx,next) => {
  const { like } = ctx.params;
  const { num } = ctx.params;
  let sql,rows,status,body,insert;

  const rate = async() => {
    sql = `UPDATE thread SET \`${like}\` = \`like\` + 1 WHERE num = ${num};`;
    rows = await connection.query(sql,() =>{connection.release();});

    if(rows['affectedRows']){
      status = 201;
      body = {};
    }else{
      status = 404;
      body = {"message" : "유효한 번호가 아니에요"};
    }
  };

  await rate();
  ctx.status = status;
  ctx.body = body;
});

// 체크 완료
exports.view = (async (ctx,next) => {
  const { num } = ctx.params;
  let sql,status,body;

  sql = `SELECT thread WHERE num = ${num};`;
  await connection.query(sql,(err, rows) =>{
    if(err){
      status = 404;
      body = {"message" : "유효한 번호가 아니에요"};
    }else{
      status = 201;
      body = rows;
    }
    connection.release();
  });

  ctx.status = status;
  ctx.body = body;
});
