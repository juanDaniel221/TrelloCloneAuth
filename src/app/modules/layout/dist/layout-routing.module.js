"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LayoutRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_guard_1 = require("@guards/auth.guard");
var layout_component_1 = require("./components/layout/layout.component");
var routes = [
    {
        path: '',
        component: layout_component_1.LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'boards',
                pathMatch: 'full'
            },
            {
                path: 'boards',
                canActivate: [auth_guard_1.AuthGuard],
                loadChildren: function () {
                    return Promise.resolve().then(function () { return require('../boards/boards.module'); }).then(function (m) { return m.BoardsModule; });
                }
            },
            {
                path: 'profile',
                canActivate: [auth_guard_1.AuthGuard],
                loadChildren: function () {
                    return Promise.resolve().then(function () { return require('../profile/profile.module'); }).then(function (m) { return m.ProfileModule; });
                }
            },
            {
                path: 'users',
                canActivate: [auth_guard_1.AuthGuard],
                loadChildren: function () {
                    return Promise.resolve().then(function () { return require('../users/users.module'); }).then(function (m) { return m.UsersModule; });
                }
            },
        ]
    },
];
var LayoutRoutingModule = /** @class */ (function () {
    function LayoutRoutingModule() {
    }
    LayoutRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], LayoutRoutingModule);
    return LayoutRoutingModule;
}());
exports.LayoutRoutingModule = LayoutRoutingModule;
