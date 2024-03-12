"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TokenService = void 0;
var core_1 = require("@angular/core");
var jwt_decode_1 = require("jwt-decode");
var typescript_cookie_1 = require("typescript-cookie");
var TokenService = /** @class */ (function () {
    function TokenService() {
    }
    TokenService.prototype.saveToken = function (token) {
        //localStorage.setItem('token', token);
        typescript_cookie_1.setCookie('token-trello', token, { expires: 365, path: '/' });
    };
    TokenService.prototype.getToken = function () {
        //return localStorage.getItem('token');
        return typescript_cookie_1.getCookie('token-trello');
    };
    TokenService.prototype.removeToken = function () {
        //localStorage.removeItem('token');
        typescript_cookie_1.removeCookie('token-trello');
    };
    TokenService.prototype.isValidToken = function () {
        var token = this.getToken();
        if (!token) {
            return false;
        }
        var decodeToken = jwt_decode_1["default"](token);
        if (decodeToken && (decodeToken === null || decodeToken === void 0 ? void 0 : decodeToken.exp)) {
            var tokenDate = new Date(0);
            tokenDate.setUTCSeconds(decodeToken.exp);
            var today = new Date();
            return tokenDate.getTime() > today.getTime();
        }
        return false;
    };
    TokenService.prototype.isValidRefreshToken = function () {
        var token = this.getRefreshToken();
        if (!token) {
            return false;
        }
        var decodeToken = jwt_decode_1["default"](token);
        if (decodeToken && (decodeToken === null || decodeToken === void 0 ? void 0 : decodeToken.exp)) {
            var tokenDate = new Date(0);
            tokenDate.setUTCSeconds(decodeToken.exp);
            var today = new Date();
            return tokenDate.getTime() > today.getTime();
        }
        return false;
    };
    TokenService.prototype.saveRefreshToken = function (token) {
        //localStorage.setItem('token', token);
        typescript_cookie_1.setCookie('refresh-token-trello', token, { expires: 365, path: '/' });
    };
    TokenService.prototype.getRefreshToken = function () {
        //return localStorage.getItem('token');
        return typescript_cookie_1.getCookie('refresh-token-trello');
    };
    TokenService.prototype.removeRefreshToken = function () {
        //localStorage.removeItem('token');
        typescript_cookie_1.removeCookie('refresh-token-trello');
    };
    TokenService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], TokenService);
    return TokenService;
}());
exports.TokenService = TokenService;
