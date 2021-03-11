const createProxyMiddleware = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware(["/login", "/callback", "/logout", "/checkAuth"], {
      target: `http://localhost:3001`,
      changeOrigin: true,
      logLevel: "debug",
    })
  );
};
