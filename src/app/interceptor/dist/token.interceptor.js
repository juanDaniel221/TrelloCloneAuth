"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TokenInterceptor = exports.checkToken = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var CHECK_TOKEN = new http_1.HttpContextToken(function () { return false; });
function checkToken() {
    return new http_1.HttpContext().set(CHECK_TOKEN, true);
}
exports.checkToken = checkToken;
var TokenInterceptor = /** @class */ (function () {
    function TokenInterceptor(tokenService, authService) {
        this.tokenService = tokenService;
        this.authService = authService;
    }
    TokenInterceptor.prototype.intercept = function (request, next) {
        if (request.context.get(CHECK_TOKEN)) {
            var isValidToken = this.tokenService.isValidToken();
            if (isValidToken) {
                return this.addToken(request, next);
            }
            else {
                return this.updateAccessTokenAndRefreshToken(request, next);
            }
        }
        return next.handle(request);
    };
    TokenInterceptor.prototype.addToken = function (request, next) {
        var access_token = this.tokenService.getToken();
        if (access_token) {
            var authRequest = request.clone({
                headers: request.headers.set('Authorization', "Bearer " + access_token)
            });
            return next.handle(authRequest);
        }
        return next.handle(request);
    };
    TokenInterceptor.prototype.updateAccessTokenAndRefreshToken = function (request, next) {
        var _this = this;
        var refreshToken = this.tokenService.getRefreshToken();
        var isValidRefreshToken = this.tokenService.isValidRefreshToken();
        if (refreshToken && isValidRefreshToken) {
            return this.authService
                .refreshToken(refreshToken)
                .pipe(rxjs_1.switchMap(function () { return _this.addToken(request, next); }));
        }
        return next.handle(request);
    };
    TokenInterceptor = __decorate([
        core_1.Injectable()
    ], TokenInterceptor);
    return TokenInterceptor;
}());
exports.TokenInterceptor = TokenInterceptor;
