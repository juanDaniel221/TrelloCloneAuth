"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NavbarComponent = void 0;
var core_1 = require("@angular/core");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(authService, router, tokenService) {
        this.authService = authService;
        this.router = router;
        this.tokenService = tokenService;
        this.faBell = free_solid_svg_icons_1.faBell;
        this.faInfoCircle = free_solid_svg_icons_1.faInfoCircle;
        this.faClose = free_solid_svg_icons_1.faClose;
        this.faAngleDown = free_solid_svg_icons_1.faAngleDown;
        this.isOpenOverlayAvatar = false;
        this.isOpenOverlayBoards = false;
        this.user$ = this.authService.user$;
    }
    NavbarComponent.prototype.logoutUser = function () {
        console.log('esta haciendo el logout');
        this.authService.logout();
        this.router.navigate(['/login']);
    };
    NavbarComponent.prototype.isValidToken = function () {
        this.tokenService;
    };
    NavbarComponent = __decorate([
        core_1.Component({
            selector: 'app-navbar',
            templateUrl: './navbar.component.html'
        })
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;
