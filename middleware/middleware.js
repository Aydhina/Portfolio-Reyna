function middleware1(req, res, next){
    console.log("ini middleware1");
    next();
}

module.exports = middleware1