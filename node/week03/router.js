const http = require('http')
const url = require('url')

class Router extends Map {
  constructor(notFoundFn) {
    if (typeof notFoundFn !== 'function') throw new Error('notFoundFn must be function')

    super()
    this.notFoundFn = notFoundFn
  }

  get(path, fn) {
    if (typeof path !== 'string') throw new Error('path must be string')
    if (typeof fn !== 'function') throw new Error('fn must be function')

    //We set a key including the http method.
    const requestData = { 'method': 'GET', 'path': path };
    super.set(JSON.stringify(requestData), fn);

  }
  post(path, fn) {
    if (typeof path !== 'string') throw new Error('path must be string')
    if (typeof fn !== 'function') throw new Error('fn must be function')

    //We set a key including the http method.
    const requestData = { 'method': 'POST', 'path': path };
    super.set(JSON.stringify(requestData), fn);
  }

  dispatch(req, res) {
    if (!(req instanceof http.IncomingMessage)) throw new Error('req must be IncomingMessage');
    if (!(res instanceof http.ServerResponse)) throw new Error('req must be ServerReponse');

    const reqUrl = url.parse(req.url, true);

    //And now we make a including the method and path so we can look for it in the Router
    const methodValidator = { 'method': req.method, 'path': reqUrl.pathname };
    const methodValidatorString = JSON.stringify(methodValidator);
    
    if (super.has(methodValidatorString)) {
      console.log('working');
      var handlerFn = super.get(methodValidatorString);
      handlerFn(req, res);
      return
    }
    else {
      this.notFoundFn(req, res)
    }
  }
}

module.exports = Router
