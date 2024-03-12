"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RedirectGuard = void 0;
var core_1 = require("@angular/core");
var RedirectGuard = /** @class */ (function () {
    function RedirectGuard(tokenService, router) {
        this.tokenService = tokenService;
        this.router = router;
    }
    RedirectGuard.prototype.canActivate = function () {
        var isValidToken = this.tokenService.isValidRefreshToken();
        if (isValidToken) {
            this.router.navigate(['/app']);
        }
        return true;
    };
    RedirectGuard = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], RedirectGuard);
    return RedirectGuard;
}());
exports.RedirectGuard = RedirectGuard;
