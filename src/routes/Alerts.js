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
var express_1 = require("express");
var App_1 = require("./App");
var aws_sdk_1 = require("aws-sdk");
var notifications_1 = require("../notifications");
var serviceConfigOptions = {
    region: 'us-west-2',
    endpoint: 'http://localhost:8000'
};
// AWS.config.update({
//   region: 'us-west-2',
//   endpoint: 'http://localhost:9000',
// });
var docClient = new aws_sdk_1["default"].DynamoDB.DocumentClient({
    region: 'us-west-2',
    endpoint: 'http://localhost:8000',
    convertEmptyValues: true
});
var router = express_1.Router();
router.get('/alerts', App_1.checkAuth(), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var params;
    return __generator(this, function (_a) {
        console.log('getAlerts');
        params = {
            TableName: 'Alerts'
        };
        docClient.scan(params, function (e, data) {
            if (e) {
                console.error('Unable to read item. Error JSON:', JSON.stringify(e, null, 2));
                res.status(500).send({ error: 'something blew up' });
            }
            else {
                console.log('Scan succeeded:', JSON.stringify(data, null, 2));
                res.send(data);
            }
        });
        return [2 /*return*/];
    });
}); });
router.post('/alerts', App_1.checkAuth(), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var date, createdAt, params;
    return __generator(this, function (_a) {
        date = new Date();
        createdAt = date.toISOString();
        params = {
            TableName: 'Alerts',
            Item: {
                ticker: req.body.ticker,
                low: req.body.low,
                high: req.body.high,
                mid: req.body.mid,
                createdAt: createdAt,
                id: req.body.id
            }
        };
        console.log({ params: params });
        console.log('Adding a new item...');
        docClient.put(params, function (err, data) {
            if (err) {
                console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
            }
            else {
                console.log('Added item:', JSON.stringify(data, null, 2));
                notifications_1.sendEmail({
                    subject: "Successful alert created for " + params.Item.ticker + ": " + params.Item.low + " / " + params.Item.high,
                    text: "Successful alert created for " + params.Item.ticker + ": " + params.Item.low + " / " + params.Item.high
                });
                res.send(params.Item);
            }
        });
        return [2 /*return*/];
    });
}); });
router["delete"]('/alerts/:id', App_1.checkAuth(), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, params;
    return __generator(this, function (_a) {
        id = req.params.id;
        console.log(req.params);
        params = {
            TableName: 'Alerts',
            Key: {
                id: req.params.id,
                ticker: 'AAPL'
            }
        };
        console.log({ params: params });
        console.log('Deleting item...');
        docClient["delete"](params, function (err, data) {
            if (err) {
                console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
            }
            else {
                console.log('Deleted item:', JSON.stringify(id, null, 2));
                res.send(id);
            }
        });
        return [2 /*return*/];
    });
}); });
// router.get('/createAlerts', checkAuth(), async (req: Request, res: Response) => {
//   var dynamodb = new AWS.DynamoDB();
//   var params = {
//     TableName: 'Alerts',
//     KeySchema: [
//       { AttributeName: 'createdAt', KeyType: 'HASH' }, //Partition key
//       { AttributeName: 'ticker', KeyType: 'RANGE' }, //Sort key
//     ],
//     AttributeDefinitions: [
//       { AttributeName: 'createdAt', AttributeType: 'N' },
//       { AttributeName: 'ticker', AttributeType: 'S' },
//     ],
//     ProvisionedThroughput: {
//       ReadCapacityUnits: 10,
//       WriteCapacityUnits: 10,
//     },
//   };
//   dynamodb.createTable(params, function (err, data) {
//     if (err) {
//       console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2));
//     } else {
//       console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
//     }
//   });
// });
/******************************************************************************
 *                                 Export Router
 ******************************************************************************/
exports["default"] = router;
