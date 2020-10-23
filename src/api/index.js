import Router from '@koa/router';

const api = new Router();


import apiCtrl from './api.controller';

api.get('/thread/:pagenum', apiCtrl.thread);
api.post('/write', apiCtrl.write);
api.get('/many', apiCtrl.many);
api.get('/rate/:like/:num', apiCtrl.rate);
api.get('/view/:num', apiCtrl.view);


module.exports = api;