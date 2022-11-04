"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseType = exports.Collections = void 0;
var Collections;
(function (Collections) {
    Collections["Registers"] = "registers";
    Collections["Stats"] = "stats";
})(Collections = exports.Collections || (exports.Collections = {}));
var ResponseType;
(function (ResponseType) {
    ResponseType["InternalError"] = "internal_error";
    ResponseType["Error"] = "error";
    ResponseType["Success"] = "success";
})(ResponseType = exports.ResponseType || (exports.ResponseType = {}));
