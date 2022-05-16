"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var basicAuth = require('basic-auth');

var auth = function auth(req, res, next) {
  var user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }

  if (user.name === 'safee' && user.pass === '12345') {
    next();
  } else {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
};
/* GET users listing. */


router.get('/', auth, function (req, res, next) {
  res.send("auth page accessed");
});
module.exports = router;