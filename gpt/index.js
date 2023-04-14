import { ChatGPTAPI, ChatGPTUnofficialProxyAPI } from "chatgpt";
import express from 'express';
import bodyParser from 'body-parser';


const apiKey = "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";


const app = express()
const port = 3002
app.use(bodyParser.json());// 添加json解析
app.use(bodyParser.urlencoded({ extended: false }));
//设置跨域访问
// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Content-Type", "application/json;charset=utf-8");
//   next();
// });

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  if (req.method == "OPTIONS") res.send(200);/*让options请求快速返回*/
  else next();
});

const chatGPTApi = new ChatGPTAPI({
  apiKey,
});

app.post('/api/v1/sendMsg', async (req, res) => {
  let result = await chatGPTApi.sendMessage(req.body.msg)
  console.log('res==>', result)
  res.send(`${result.text}`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})