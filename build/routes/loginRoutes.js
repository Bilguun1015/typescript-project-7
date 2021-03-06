"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
//middleware
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    // forbidden
    res.status(403);
    res.send('Not permitted');
}
var router = express_1.Router();
exports.router = router;
router.get('/login', function (req, res) {
    res.send("\n    <form method=\"POST\">\n      <div>\n        <label>Email</label>\n        <input name=\"email\" />\n      </div>\n      <div>\n        <label>Password</label>\n        <input name=\"password\" type=\"password\">\n      </div>\n      <button>Submit</button>\n    </form>\n  ");
});
router.post('/login', function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (email && password && email === 'test' && password === 'pass') {
        // mark the person as logged in
        req.session = { loggedIn: true };
        // redirect them to the root route
        res.redirect('/');
    }
    else {
        res.send('Invalid email or password');
    }
});
router.get('/', function (req, res) {
    // req.session
    if (req.session && req.session.loggedIn) {
        res.send("\n      <div>\n        <div>\n          You are logged in!\n          <a href=\"/logout\">Logout</a>\n        </div>\n      </div>\n    ");
    }
    else {
        res.send("\n      <div>\n        <div>\n          You are not logged in!\n          <a href=\"/login\">Login</a>\n        </div>\n      </div>\n    ");
    }
});
router.get('/logout', function (req, res) {
    req.session = null;
    res.redirect('/');
});
router.get('/protected', requireAuth, function (req, res) {
    res.send('Welcome to protected route, logged in user');
});
