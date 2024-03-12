"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("@environments/environment");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var token_interceptor_1 = require("../interceptor/token.interceptor");
var AuthService = /** @class */ (function () {
    function AuthService(http, tokenService) {
        this.http = http;
        this.tokenService = tokenService;
        this.apiUrl = environment_1.environment.API_URL;
        this.user$ = new rxjs_1.BehaviorSubject(null);
    }
    AuthService.prototype.logIn = function (email, password) {
        var _this = this;
        return this.http
            .post(this.apiUrl + "/api/v1/auth/login", {
            email: email,
            password: password
        })
            .pipe(operators_1.tap(function (response) {
            _this.tokenService.saveToken(response.access_token);
            _this.tokenService.saveRefreshToken(response.access_token);
        }));
    };
    AuthService.prototype.refreshToken = function (refreshToken) {
        var _this = this;
        return this.http
            .post(this.apiUrl + "/api/v1/auth/refresh-token", {
            refreshToken: refreshToken
        })
            .pipe(operators_1.tap(function (response) {
            _this.tokenService.saveToken(response.access_token);
            _this.tokenService.saveRefreshToken(response.access_token);
        }));
    };
    AuthService.prototype.register = function (name, password, email) {
        console.log('llega aqui', email, name, password);
        return this.http.post(this.apiUrl + "/api/v1/auth/register", {
            email: email,
            name: name,
            password: password
        });
    };
    AuthService.prototype.registerAndLogin = function (name, password, email) {
        var _this = this;
        return this.register(name, password, email).pipe(operators_1.switchMap(function () { return _this.logIn(email, password); }));
    };
    AuthService.prototype.isAvailable = function (email) {
        console.log('el correo es=>', email);
        return this.http.post(this.apiUrl + "/api/v1/auth/is-available", {
            email: email
        });
    };
    AuthService.prototype.recovery = function (email) {
        return this.http.post(this.apiUrl + "/api/v1/auth/recovery", {
            email: email
        });
    };
    AuthService.prototype.getProfile = function () {
        var _this = this;
        var token = this.tokenService.getToken();
        return this.http
            .get(this.apiUrl + "/api/v1/auth/profile", {
            context: token_interceptor_1.checkToken()
        })
            .pipe(operators_1.tap(function (user) {
            _this.user$.next(user);
        }));
    };
    AuthService.prototype.changePassword = function (token, newPassword) {
        return this.http.post(this.apiUrl + "/api/v1/auth/change-password", {
            token: token,
            newPassword: newPassword
        });
    };
    AuthService.prototype.logout = function () {
        this.tokenService.removeToken();
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
