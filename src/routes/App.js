"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.checkAuth = void 0;
var express_1 = require("express");
var http_status_codes_1 = require("http-status-codes");
var constants_1 = require("@shared/constants");
var axios_1 = require("axios");
var config_1 = require("../config");
var router = express_1.Router();
exports.checkAuth = function () {
    return function (req, res, next) {
        var jwt = req.signedCookies[constants_1.cookieProps.key];
        if (!jwt) {
            res.status(http_status_codes_1.UNAUTHORIZED).send('Unauthorized Request I am afraid');
        }
        else {
            next();
        }
    };
};
/******************************************************************************
 *                      Account - "GET /api/account"
 ******************************************************************************/
router.get('/account', exports.checkAuth(), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log('getAccount');
        axios_1["default"].get(config_1.apiRoot + "/v2/account", { headers: config_1.headers }).then(function (response) {
            try {
                res.send(response.data);
            }
            catch (e) {
                console.log('ERROR', e);
                res.status(500).send({ error: 'something blew up' });
            }
        });
        return [2 /*return*/];
    });
}); });
/******************************************************************************
 *                      Account - "GET /api/historicaldata"
 ******************************************************************************/
router.get('/historicalData', exports.checkAuth(), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var params;
    return __generator(this, function (_a) {
        console.log('getHistoricalData', req.query);
        params = {
            before: req.query.before,
            limit: req.query.limit,
            symbols: req.query.symbols
        };
        axios_1["default"]
            .get("https://data.alpaca.markets/v1/bars/" + req.query.timeframe, { headers: config_1.headers, params: params })
            .then(function (response) {
            try {
                res.send(response.data);
            }
            catch (e) {
                console.log('ERROR', e);
                res.status(500).send({ error: 'something blew up' });
            }
        });
        return [2 /*return*/];
    });
}); });
/******************************************************************************
 *                      Orders - "GET/POST/DELETE /api/orders"
 ******************************************************************************/
router.get('/orders', exports.checkAuth(), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log('getOrders', req.query);
        axios_1["default"].get(config_1.apiRoot + "/v2/orders", { headers: config_1.headers, params: req.query }).then(function (response) {
            try {
                res.send(response.data);
            }
            catch (e) {
                console.log('ERROR', e);
                res.status(500).send({ error: 'something blew up' });
            }
        });
        return [2 /*return*/];
    });
}); });
router.post('/orders', exports.checkAuth(), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log('Post Orders', req.body);
        axios_1["default"].post(config_1.apiRoot + "/v2/orders", req.body, { headers: config_1.headers }).then(function (response) {
            try {
                res.send(response.data);
            }
            catch (e) {
                console.log('ERROR', e);
                res.status(500).send({ error: 'something blew up' });
            }
        });
        return [2 /*return*/];
    });
}); });
router["delete"]('/orders', exports.checkAuth(), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log('Delete Order', req.body, req.params, req.query);
        axios_1["default"]["delete"](config_1.apiRoot + "/v2/orders/" + req.query.id, { headers: config_1.headers }).then(function (response) {
            try {
                res.send(response.data);
            }
            catch (e) {
                console.log('ERROR', e);
                res.status(500).send({ error: 'something blew up' });
            }
        });
        return [2 /*return*/];
    });
}); });
/******************************************************************************
 *                      Positions - "GET /api/positions"
 ******************************************************************************/
router.get('/positions', exports.checkAuth(), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log('getPositions');
        axios_1["default"].get(config_1.apiRoot + "/v2/positions", { headers: config_1.headers }).then(function (response) {
            try {
                res.send(response.data);
            }
            catch (e) {
                console.log('ERROR', e);
                res.status(500).send({ error: 'something blew up' });
            }
        });
        return [2 /*return*/];
    });
}); });
/******************************************************************************
 *                      Assets - "GET /api/assets"
 ******************************************************************************/
router.get('/assets', exports.checkAuth(), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log('assets');
        axios_1["default"].get(config_1.apiRoot + "/v2/assets", { headers: config_1.headers }).then(function (response) {
            try {
                res.send(response.data);
            }
            catch (e) {
                console.log('ERROR', e);
                res.status(500).send({ error: 'something blew up' });
            }
        });
        return [2 /*return*/];
    });
}); });
/******************************************************************************
 *                      Clock - "GET /api/clock"
 ******************************************************************************/
router.get('/clock', exports.checkAuth(), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log('clock');
        axios_1["default"].get(config_1.apiRoot + "/v2/clock", { headers: config_1.headers }).then(function (response) {
            try {
                res.send(response.data);
            }
            catch (e) {
                console.log('ERROR', e);
                res.status(500).send({ error: 'something blew up' });
            }
        });
        return [2 /*return*/];
    });
}); });
/******************************************************************************
 *                                 Export Router
 ******************************************************************************/
exports["default"] = router;
