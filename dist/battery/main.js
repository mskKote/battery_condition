(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _server_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./server.service */ "./src/app/server.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./header/header.component */ "./src/app/header/header.component.ts");
/* harmony import */ var _swimlane_ngx_charts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @swimlane/ngx-charts */ "./node_modules/@swimlane/ngx-charts/__ivy_ngcc__/fesm2015/swimlane-ngx-charts.js");






const _c0 = function () { return ["#00ff00"]; };
const _c1 = function (a0) { return { domain: a0 }; };
class AppComponent {
    constructor(server) {
        this.server = server;
        this.view = undefined;
        //multi: any[];
        // Главный график
        this.yAxisTicksArr = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]; //this.getArrY(1.75, 2.8, 0.05);
        this.showXAxis = true;
        this.showYAxis = true;
        this.gradient = true;
        this.showLegend = true;
        this.showXAxisLabel = true;
        this.showYAxisLabel = true;
        this.xAxisLabel = 'Пары батарей';
        this.yAxisLabel = '% Заряда';
        this.animations = false;
        this.showDataLabel = true;
        this.showGridLines = false;
        this.roundDomains = true;
        this.noBarWhenZero = true;
        this.rotateXAxisTicks = false;
        //Линиии
        this.xAxis = true;
        this.yAxis = true;
        this.timeline = true;
        this.colorScheme = {
            domain: ['#ff0000', '#ffaf00', '#f9ff00', '#b0ff00', '#00ff00'],
        };
        this.schemeType = 'linear';
        this.single = [
            {
                name: 'Заряд батареи',
                value: 50,
            },
        ];
        this.contractor = true;
        this.switcher = false;
        //this.genData();
        //setInterval( () => {this.genData();}, 4000);
    }
    onSelect(data) {
        //console.log('Item clicked', JSON.parse(JSON.stringify(data)));
        //this.genData();
    }
    onActivate(data) {
        //console.log('Activate', JSON.parse(JSON.stringify(data)));
    }
    onDeactivate(data) {
        // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
    }
    genData() {
        try {
            console.log(_server_service__WEBPACK_IMPORTED_MODULE_0__["ServerService"].end.getTime());
            console.log(_server_service__WEBPACK_IMPORTED_MODULE_0__["ServerService"].start.getTime());
            const bn = this.server.getDataQuery(_server_service__WEBPACK_IMPORTED_MODULE_0__["ServerService"].start.getTime().toString(), _server_service__WEBPACK_IMPORTED_MODULE_0__["ServerService"].end.getTime().toString());
            bn.then(b => console.log(b));
        }
        catch (_a) { }
        this.multi = [];
        for (let i = 0; i < 15; i++) {
            this.multi.push({
                name: i + 1,
                series: [
                    {
                        "name": "",
                        "value": (Math.random() * 100).toFixed(2)
                    },
                    {
                        "name": ".",
                        "value": (Math.random() * 100).toFixed(2)
                    }
                ]
            });
        }
    }
    ngOnInit() {
        this.request();
        setInterval(() => { this.request(); }, 1000);
    }
    request() {
        this.server.getDataQuery()
            .then((data) => {
            this.multi = [];
            this.single = [];
            let total_voltage_value = 0;
            let lastObj = data[data.length - 1];
            let lastDataset = lastObj.data[lastObj.data.length - 1];
            console.groupCollapsed('data from server -- app.component');
            console.log('lastDataset :>> ', lastDataset);
            // Графикс c 30 батареями и total_voltage
            for (let j = 0; j < lastDataset.voltages.length; j += 2) {
                const battery1 = lastDataset.voltages[j]; // 1 батарейка
                const battery2 = lastDataset.voltages[j + 1]; // 2 батарейка
                this.multi.push({
                    "name": j / 2 + 1,
                    "series": [
                        {
                            "name": "",
                            "value": battery1.value / 2.8 * 100
                        }, {
                            "name": ".",
                            "value": battery2.value / 2.8 * 100
                        }
                    ]
                });
                total_voltage_value += battery1.value + battery2.value;
            }
            this.single.push({
                name: 'Заряд батареи',
                value: total_voltage_value / (1.05 * lastDataset.voltages.length) * 100
            });
            console.groupEnd();
        });
    }
    getArrY(min, max, dist) {
        let arr = [];
        for (let i = 0, l = (max - min) / dist; i < l; i++) {
            arr.push(min + i * dist);
        }
        arr.push(max);
        return arr;
    }
    randomSeries() {
        let arr = [];
        for (let i = 0; i < 15; i++) {
            arr.push((1.75 + Math.random() * (2.8 - 1.75)).toFixed(2));
        }
        return arr;
    }
    clickContractor() {
        // this.genData();
        this.contractor = !this.contractor;
    }
    clickSwitcher() {
        // this.genData();
        this.switcher = !this.switcher;
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_server_service__WEBPACK_IMPORTED_MODULE_0__["ServerService"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 24, vars: 41, consts: [[1, "grid"], [1, "item", 2, "max-height", "83vh"], [3, "trimYAxisTicks", "scheme", "schemeType", "noBarWhenZero", "barPadding", "groupPadding", "results", "gradient", "xAxis", "yAxis", "yAxisTicks", "showXAxisLabel", "showYAxisLabel", "showDataLabel", "showGridLines", "roundDomains", "xAxisLabel", "yAxisLabel", "rotateXAxisTicks", "select", "activate", "deactivate"], [1, "item", 2, "max-height", "33vh"], [3, "scheme", "startAngle", "angleSpan", "results", "min", "max", "units", "select", "activate", "deactivate"], [1, "item"], [3, "scheme", "showXAxisLabel", "showYAxisLabel", "xAxis", "yAxis", "results", "select", "activate", "deactivate"], [1, "box"], [1, "toggle"], ["type", "checkbox", "id", "toggle-switcher "], ["for", "toggle-switcher "], ["type", "checkbox", "id", "toggle-contractor "], ["for", "toggle-contractor "]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "app-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "ngx-charts-bar-vertical-2d", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("select", function AppComponent_Template_ngx_charts_bar_vertical_2d_select_3_listener($event) { return ctx.onSelect($event); })("activate", function AppComponent_Template_ngx_charts_bar_vertical_2d_activate_3_listener($event) { return ctx.onActivate($event); })("deactivate", function AppComponent_Template_ngx_charts_bar_vertical_2d_deactivate_3_listener($event) { return ctx.onDeactivate($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "ngx-charts-gauge", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("select", function AppComponent_Template_ngx_charts_gauge_select_5_listener($event) { return ctx.onSelect($event); })("activate", function AppComponent_Template_ngx_charts_gauge_activate_5_listener($event) { return ctx.onActivate($event); })("deactivate", function AppComponent_Template_ngx_charts_gauge_deactivate_5_listener($event) { return ctx.onDeactivate($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "ngx-charts-line-chart", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("select", function AppComponent_Template_ngx_charts_line_chart_select_7_listener($event) { return ctx.onSelect($event); })("activate", function AppComponent_Template_ngx_charts_line_chart_activate_7_listener($event) { return ctx.onActivate($event); })("deactivate", function AppComponent_Template_ngx_charts_line_chart_deactivate_7_listener($event) { return ctx.onDeactivate($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "ngx-charts-line-chart", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("select", function AppComponent_Template_ngx_charts_line_chart_select_9_listener($event) { return ctx.onSelect($event); })("activate", function AppComponent_Template_ngx_charts_line_chart_activate_9_listener($event) { return ctx.onActivate($event); })("deactivate", function AppComponent_Template_ngx_charts_line_chart_deactivate_9_listener($event) { return ctx.onDeactivate($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "\u0411\u0430\u043B\u0430\u043D\u0441\u0438\u0440\u043E\u0432\u043A\u0430");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](15, "input", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](16, "label", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21, "\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u043E\u0440");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](22, "input", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](23, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("trimYAxisTicks", false)("scheme", ctx.colorScheme)("schemeType", ctx.schemeType)("noBarWhenZero", ctx.noBarWhenZero)("barPadding", 2)("groupPadding", 8)("results", ctx.multi)("gradient", ctx.gradient)("xAxis", ctx.showXAxis)("yAxis", ctx.showYAxis)("yAxisTicks", ctx.yAxisTicksArr)("showXAxisLabel", ctx.showXAxisLabel)("showYAxisLabel", ctx.showYAxisLabel)("showDataLabel", ctx.showDataLabel)("showGridLines", ctx.showGridLines)("roundDomains", ctx.roundDomains)("xAxisLabel", ctx.xAxisLabel)("yAxisLabel", ctx.yAxisLabel)("rotateXAxisTicks", ctx.rotateXAxisTicks);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("scheme", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](39, _c1, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](38, _c0)))("startAngle", 0 - 120)("angleSpan", 240)("results", ctx.single)("min", 0)("max", 100)("units", "% \u0417\u0430\u0440\u044F\u0434\u0430 \u0431\u0430\u0442\u0430\u0440\u0435\u0438");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("scheme", ctx.colorScheme)("showXAxisLabel", ctx.showXAxisLabel)("showYAxisLabel", ctx.showYAxisLabel)("xAxis", ctx.xAxis)("yAxis", ctx.yAxis)("results", ctx.multi);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("scheme", ctx.colorScheme)("showXAxisLabel", ctx.showXAxisLabel)("showYAxisLabel", ctx.showYAxisLabel)("xAxis", ctx.xAxis)("yAxis", ctx.yAxis)("results", ctx.multi);
    } }, directives: [_header_header_component__WEBPACK_IMPORTED_MODULE_2__["HeaderComponent"], _swimlane_ngx_charts__WEBPACK_IMPORTED_MODULE_3__["BarVertical2DComponent"], _swimlane_ngx_charts__WEBPACK_IMPORTED_MODULE_3__["GaugeComponent"], _swimlane_ngx_charts__WEBPACK_IMPORTED_MODULE_3__["LineChartComponent"]], styles: ["@supports (display: grid) {\n  .grid[_ngcontent-%COMP%] {\n    display: grid;\n    grid-gap: 1.5vw;\n    min-height: 100vh;\n    padding: 1.5vw;\n  }\n\n  .grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n    grid-template-rows: auto;\n    grid-template-areas: \"box2 box2\" \"box1 box1\" \"box1 box1\" \"box5 box5\" \"box6 box6\" \"box3 box3\" \"box3 box3\" \"box4 box4\" \"box4 box4\";\n  }\n\n  @media screen and (min-width: 1500px) {\n    .grid[_ngcontent-%COMP%] {\n      grid-template-columns: repeat(6, 1fr);\n      grid-template-rows: auto;\n      grid-template-areas: \"box1 box1 box1 box1 box2 box2\" \"box1 box1 box1 box1 box2 box2\" \"box1 box1 box1 box1 box2 box2\" \"box1 box1 box1 box1 box5 box6\" \"box3 box3 box3 box4 box4 box4\" \"box3 box3 box3 box4 box4 box4\" \"box3 box3 box3 box4 box4 box4\";\n    }\n  }\n  .grid[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:nth-child(1) {\n    grid-area: box1;\n  }\n\n  .grid[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:nth-child(2) {\n    grid-area: box2;\n  }\n\n  .grid[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:nth-child(3) {\n    grid-area: box3;\n  }\n\n  .grid[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:nth-child(4) {\n    grid-area: box4;\n  }\n\n  .grid[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:nth-child(5) {\n    grid-area: box5;\n  }\n\n  .grid[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:nth-child(6) {\n    grid-area: box6;\n  }\n}\n@supports not (display: grid) {\n  .grid[_ngcontent-%COMP%] {\n    display: flex;\n    flex-flow: row wrap;\n    min-height: 100vh;\n    padding: 0.75vw;\n  }\n\n  .grid[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%] {\n    min-height: 20vh;\n    margin: 0.75vw;\n  }\n\n  .grid[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:nth-child(1) {\n    flex: 0 1 calc(60% - 1.5vw);\n  }\n\n  .grid[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:nth-child(2) {\n    flex: 0 1 calc(60% - 1.5vw);\n  }\n\n  .grid[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:nth-child(3) {\n    flex: 0 1 calc(50% - 1.5vw);\n  }\n\n  .grid[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:nth-child(4) {\n    flex: 0 1 calc(50% - 1.5vw);\n  }\n\n  .grid[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:nth-child(5) {\n    flex: 0 1 calc(30% - 1.5vw);\n  }\n\n  .grid[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:nth-child(6) {\n    flex: 0 1 calc(30% - 1.5vw);\n  }\n\n  @media screen and (min-width: 1500px) {\n    .grid[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:nth-child(1) {\n      flex: 0 1 calc(60% - 1.5vw);\n    }\n\n    .grid[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:nth-child(2) {\n      flex: 0 1 calc(50% - 1.5vw);\n    }\n\n    .grid[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:nth-child(3) {\n      flex: 0 1 calc(50% - 1.5vw);\n    }\n\n    .grid[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:nth-child(4) {\n      flex: 0 1 calc(50% - 1.5vw);\n    }\n\n    .grid[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:nth-child(5) {\n      flex: 0 1 calc(25% - 1.5vw);\n    }\n\n    .grid[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:nth-child(6) {\n      flex: 0 1 calc(25% - 1.5vw);\n    }\n  }\n}\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\nbody[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n  background: #29343d;\n}\n@supports not (display: grid) {\n  body[_ngcontent-%COMP%]:before {\n    content: \"Sorry, seems like your browser doesn't support display: grid. Below is the flexbox fallback.\";\n    display: block;\n    padding: 2rem 2rem 0;\n    color: #ffffff;\n    text-align: center;\n  }\n}\n.item[_ngcontent-%COMP%] {\n  border-radius: 10px;\n  box-shadow: -15px 15px 15px 0 lightgray;\n  background-color: white;\n}\n.grid[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:nth-child(1) {\n  min-height: 80vh;\n  height: auto;\n}\n.grid[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:nth-child(2) {\n  min-height: 50vh;\n  height: auto;\n  border: solid 2px grey;\n  box-shadow: 0px 0px 10px 3px grey;\n}\n.grid[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:nth-child(3) {\n  min-height: 50vh;\n  height: auto;\n}\n.grid[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:nth-child(4) {\n  min-height: 50vh;\n  height: auto;\n}\n.grid[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:nth-child(5) {\n  min-height: 30vh;\n  height: auto;\n}\n.grid[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:nth-child(6) {\n  min-height: 30vh;\n  height: auto;\n}\n*[_ngcontent-%COMP%], [_ngcontent-%COMP%]:after, [_ngcontent-%COMP%]:before {\n  box-sizing: border-box;\n}\nbody[_ngcontent-%COMP%] {\n  margin: 60px auto;\n  text-align: center;\n  background-color: #ff9295;\n  transition: background-color 0.2s cubic-bezier(0, -1.85, 0.27, 1.75);\n}\n.item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  position: relative;\n}\n.toggle[_ngcontent-%COMP%] {\n  position: relative;\n  margin: auto;\n  width: 9.5vw;\n  height: 20vh;\n}\n.toggle[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  position: relative;\n  left: 40px;\n  display: inline-block;\n  margin: auto;\n  width: 90px;\n  height: 90px;\n  background-color: #ff6164;\n  border-radius: 50px;\n  cursor: pointer;\n  box-shadow: inset 0 0 2px 1px rgba(0, 0, 0, 0.1), 0px 9px 15px 0px #ef4247;\n  -webkit-tap-highlight-color: transparent;\n}\n.toggle[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]:before {\n  content: \"\";\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  transition: width 0.2s cubic-bezier(0, -1.85, 0.27, 1.75);\n  height: 42px;\n  width: 42px;\n  background-color: #ff6164;\n  border-radius: 46px;\n  box-shadow: inset 0px 0px 0px 8px #fff;\n}\n.toggle[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  display: none;\n}\n.toggle[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked    + label[_ngcontent-%COMP%] {\n  background-color: #7aeb90;\n  box-shadow: inset 0 0 2px 1px rgba(0, 0, 0, 0.1), 0px 9px 15px 0px rgba(3, 132, 28, 0.5411764706);\n}\n.toggle[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked    + label[_ngcontent-%COMP%]:before {\n  width: 10px;\n  background-color: #fff;\n}\n.on[_ngcontent-%COMP%] {\n  background-color: #6fc57c;\n}\n.on[_ngcontent-%COMP%]   .toggle[_ngcontent-%COMP%]:before {\n  color: rgba(62, 160, 81, 0.89);\n}\n.on[_ngcontent-%COMP%]   .toggle[_ngcontent-%COMP%]:after {\n  color: #fff;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0U7SUFDRSxhQUFBO0lBQ0EsZUFBQTtJQUNBLGlCQUFBO0lBQ0EsY0FBQTtFQUNGOztFQUVBO0lBQ0UscUNBQUE7SUFDQSx3QkFBQTtJQUNBLGdJQUNFO0VBQUo7O0VBeUJBO0lBQ0U7TUFDRSxxQ0FBQTtNQUNBLHdCQUFBO01BQ0Esb1BBQ0E7SUF2QkY7RUFDRjtFQWdDQTtJQUNFLGVBQUE7RUE5QkY7O0VBZ0NBO0lBQ0UsZUFBQTtFQTdCRjs7RUErQkE7SUFDRSxlQUFBO0VBNUJGOztFQThCQTtJQUNFLGVBQUE7RUEzQkY7O0VBNkJBO0lBQ0UsZUFBQTtFQTFCRjs7RUE0QkE7SUFDRSxlQUFBO0VBekJGO0FBQ0Y7QUE0QkE7RUFDRTtJQUNFLGFBQUE7SUFDQSxtQkFBQTtJQUNBLGlCQUFBO0lBQ0EsZUFBQTtFQTFCRjs7RUE2QkE7SUFDRSxnQkFBQTtJQUNBLGNBQUE7RUExQkY7O0VBNkJBO0lBQ0UsMkJBQUE7RUExQkY7O0VBNEJBO0lBQ0UsMkJBQUE7RUF6QkY7O0VBMkJBO0lBQ0UsMkJBQUE7RUF4QkY7O0VBMEJBO0lBQ0UsMkJBQUE7RUF2QkY7O0VBeUJBO0lBQ0UsMkJBQUE7RUF0QkY7O0VBd0JBO0lBQ0UsMkJBQUE7RUFyQkY7O0VBd0JBO0lBQ0U7TUFDRSwyQkFBQTtJQXJCRjs7SUF1QkE7TUFDRSwyQkFBQTtJQXBCRjs7SUFzQkE7TUFDRSwyQkFBQTtJQW5CRjs7SUFxQkE7TUFDRSwyQkFBQTtJQWxCRjs7SUFvQkE7TUFDRSwyQkFBQTtJQWpCRjs7SUFtQkE7TUFDRSwyQkFBQTtJQWhCRjtFQUNGO0FBQ0Y7QUFtQkE7RUFDRSxzQkFBQTtBQWpCRjtBQW9CQTtFQUNFLFNBQUE7RUFDQSwwSkFBQTtFQUVBLG1CQUFBO0FBbEJGO0FBcUJBO0VBQ0U7SUFDRSx1R0FBQTtJQUNBLGNBQUE7SUFDQSxvQkFBQTtJQUNBLGNBQUE7SUFDQSxrQkFBQTtFQWxCRjtBQUNGO0FBcUJBO0VBQ0UsbUJBQUE7RUFDQSx1Q0FBQTtFQUNBLHVCQUFBO0FBbkJGO0FBcUJBO0VBQ0UsZ0JBQUE7RUFDQSxZQUFBO0FBbEJGO0FBb0JBO0VBQ0UsZ0JBQUE7RUFDQSxZQUFBO0VBQ0Esc0JBQUE7RUFDQSxpQ0FBQTtBQWpCRjtBQW1CQTtFQUNFLGdCQUFBO0VBQ0EsWUFBQTtBQWhCRjtBQWtCQTtFQUNFLGdCQUFBO0VBQ0EsWUFBQTtBQWZGO0FBaUJBO0VBQ0UsZ0JBQUE7RUFDQSxZQUFBO0FBZEY7QUFnQkE7RUFDRSxnQkFBQTtFQUNBLFlBQUE7QUFiRjtBQWlCQTs7O0VBR0Usc0JBQUE7QUFkRjtBQWlCQTtFQUNFLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSx5QkFBQTtFQUNBLG9FQUFBO0FBZEY7QUFnQkE7RUFDRSxrQkFBQTtBQWJGO0FBZUE7RUFDRSxrQkFBQTtFQUNBLFlBQUE7RUFFQSxZQUFBO0VBQ0EsWUFBQTtBQWJGO0FBZUU7RUFDRSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxxQkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLHlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0EsMEVBQUE7RUFDQSx3Q0FBQTtBQWJKO0FBZUk7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLGdDQUFBO0VBQ0EseURBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLHlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQ0FBQTtBQWJOO0FBaUJFO0VBQ0UsYUFBQTtBQWZKO0FBaUJJO0VBQ0UseUJBQUE7RUFDQSxpR0FBQTtBQWZOO0FBa0JNO0VBQ0UsV0FBQTtFQUNBLHNCQUFBO0FBaEJSO0FBc0JBO0VBQ0UseUJBQUE7QUFuQkY7QUFxQkk7RUFDRSw4QkFBQTtBQW5CTjtBQXFCSTtFQUNFLFdBQUE7QUFuQk4iLCJmaWxlIjoic3JjL2FwcC9hcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAc3VwcG9ydHMgKGRpc3BsYXk6IGdyaWQpIHtcclxuICAuZ3JpZCB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC1nYXA6IDEuNXZ3O1xyXG4gICAgbWluLWhlaWdodDogMTAwdmg7XHJcbiAgICBwYWRkaW5nOiAxLjV2dztcclxuICB9XHJcblxyXG4gIC5ncmlkIHtcclxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIDFmcik7XHJcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG87XHJcbiAgICBncmlkLXRlbXBsYXRlLWFyZWFzOlxyXG4gICAgICBcImJveDIgYm94MlwiXHJcbiAgICAgIFwiYm94MSBib3gxXCJcclxuICAgICAgXCJib3gxIGJveDFcIlxyXG4gICAgICBcImJveDUgYm94NVwiXHJcbiAgICAgIFwiYm94NiBib3g2XCJcclxuICAgICAgXCJib3gzIGJveDNcIlxyXG4gICAgICBcImJveDMgYm94M1wiXHJcbiAgICAgIFwiYm94NCBib3g0XCJcclxuICAgICAgXCJib3g0IGJveDRcIjtcclxuICB9XHJcblxyXG4gIC8vIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDgwMHB4KSB7XHJcbiAgLy8gICAuZ3JpZCB7XHJcbiAgLy8gICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDUsIDFmcik7XHJcbiAgLy8gICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0bztcclxuICAvLyAgICAgZ3JpZC10ZW1wbGF0ZS1hcmVhczpcclxuICAvLyAgICAgICBcImJveDEgYm94MSBib3gxIGJveDIgYm94MlwiXHJcbiAgLy8gICAgICAgXCJib3gxIGJveDEgYm94MSBib3gyIGJveDJcIlxyXG4gIC8vICAgICAgIFwiYm94MSBib3gxIGJveDEgYm94MiBib3gyXCJcclxuICAvLyAgICAgICBcImJveDUgYm94NSBib3g2IGJveDYgLlwiXHJcbiAgLy8gICAgICAgXCJib3gzIGJveDMgYm94NCBib3g0IC5cIlxyXG4gIC8vICAgICAgIFwiYm94MyBib3gzIGJveDQgYm94NCAuXCI7XHJcbiAgLy8gICB9XHJcbiAgLy8gfVxyXG5cclxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxNTAwcHgpIHtcclxuICAgIC5ncmlkIHtcclxuICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNiwgMWZyKTtcclxuICAgICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvO1xyXG4gICAgICBncmlkLXRlbXBsYXRlLWFyZWFzOlxyXG4gICAgICBcImJveDEgYm94MSBib3gxIGJveDEgYm94MiBib3gyXCJcclxuICAgICAgXCJib3gxIGJveDEgYm94MSBib3gxIGJveDIgYm94MlwiXHJcbiAgICAgIFwiYm94MSBib3gxIGJveDEgYm94MSBib3gyIGJveDJcIlxyXG4gICAgICBcImJveDEgYm94MSBib3gxIGJveDEgYm94NSBib3g2XCJcclxuICAgICAgXCJib3gzIGJveDMgYm94MyBib3g0IGJveDQgYm94NFwiXHJcbiAgICAgIFwiYm94MyBib3gzIGJveDMgYm94NCBib3g0IGJveDRcIlxyXG4gICAgICBcImJveDMgYm94MyBib3gzIGJveDQgYm94NCBib3g0XCI7XHJcbiAgICB9ICAgICBcclxuICB9XHJcblxyXG4gIC5ncmlkIC5pdGVtOm50aC1jaGlsZCgxKSB7XHJcbiAgICBncmlkLWFyZWE6IGJveDE7XHJcbiAgfVxyXG4gIC5ncmlkIC5pdGVtOm50aC1jaGlsZCgyKSB7XHJcbiAgICBncmlkLWFyZWE6IGJveDI7XHJcbiAgfVxyXG4gIC5ncmlkIC5pdGVtOm50aC1jaGlsZCgzKSB7XHJcbiAgICBncmlkLWFyZWE6IGJveDM7XHJcbiAgfVxyXG4gIC5ncmlkIC5pdGVtOm50aC1jaGlsZCg0KSB7XHJcbiAgICBncmlkLWFyZWE6IGJveDQ7XHJcbiAgfVxyXG4gIC5ncmlkIC5pdGVtOm50aC1jaGlsZCg1KSB7XHJcbiAgICBncmlkLWFyZWE6IGJveDU7XHJcbiAgfVxyXG4gIC5ncmlkIC5pdGVtOm50aC1jaGlsZCg2KSB7XHJcbiAgICBncmlkLWFyZWE6IGJveDY7XHJcbiAgfVxyXG59XHJcblxyXG5Ac3VwcG9ydHMgbm90IChkaXNwbGF5OiBncmlkKSB7XHJcbiAgLmdyaWQge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZmxvdzogcm93IHdyYXA7XHJcbiAgICBtaW4taGVpZ2h0OiAxMDB2aDtcclxuICAgIHBhZGRpbmc6IDAuNzV2dztcclxuICB9XHJcblxyXG4gIC5ncmlkIC5pdGVtIHtcclxuICAgIG1pbi1oZWlnaHQ6IDIwdmg7XHJcbiAgICBtYXJnaW46IDAuNzV2dztcclxuICB9XHJcblxyXG4gIC5ncmlkIC5pdGVtOm50aC1jaGlsZCgxKSB7XHJcbiAgICBmbGV4OiAwIDEgY2FsYyg2MCUgLSAxLjV2dyk7XHJcbiAgfVxyXG4gIC5ncmlkIC5pdGVtOm50aC1jaGlsZCgyKSB7XHJcbiAgICBmbGV4OiAwIDEgY2FsYyg2MCUgLSAxLjV2dyk7XHJcbiAgfVxyXG4gIC5ncmlkIC5pdGVtOm50aC1jaGlsZCgzKSB7XHJcbiAgICBmbGV4OiAwIDEgY2FsYyg1MCUgLSAxLjV2dyk7XHJcbiAgfVxyXG4gIC5ncmlkIC5pdGVtOm50aC1jaGlsZCg0KSB7XHJcbiAgICBmbGV4OiAwIDEgY2FsYyg1MCUgLSAxLjV2dyk7XHJcbiAgfVxyXG4gIC5ncmlkIC5pdGVtOm50aC1jaGlsZCg1KSB7XHJcbiAgICBmbGV4OiAwIDEgY2FsYygzMCUgLSAxLjV2dyk7XHJcbiAgfVxyXG4gIC5ncmlkIC5pdGVtOm50aC1jaGlsZCg2KSB7XHJcbiAgICBmbGV4OiAwIDEgY2FsYygzMCUgLSAxLjV2dyk7XHJcbiAgfVxyXG5cclxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxNTAwcHgpIHtcclxuICAgIC5ncmlkIC5pdGVtOm50aC1jaGlsZCgxKSB7XHJcbiAgICAgIGZsZXg6IDAgMSBjYWxjKDYwJSAtIDEuNXZ3KTtcclxuICAgIH1cclxuICAgIC5ncmlkIC5pdGVtOm50aC1jaGlsZCgyKSB7XHJcbiAgICAgIGZsZXg6IDAgMSBjYWxjKDUwJSAtIDEuNXZ3KTtcclxuICAgIH1cclxuICAgIC5ncmlkIC5pdGVtOm50aC1jaGlsZCgzKSB7XHJcbiAgICAgIGZsZXg6IDAgMSBjYWxjKDUwJSAtIDEuNXZ3KTtcclxuICAgIH1cclxuICAgIC5ncmlkIC5pdGVtOm50aC1jaGlsZCg0KSB7XHJcbiAgICAgIGZsZXg6IDAgMSBjYWxjKDUwJSAtIDEuNXZ3KTtcclxuICAgIH1cclxuICAgIC5ncmlkIC5pdGVtOm50aC1jaGlsZCg1KSB7XHJcbiAgICAgIGZsZXg6IDAgMSBjYWxjKDI1JSAtIDEuNXZ3KTtcclxuICAgIH1cclxuICAgIC5ncmlkIC5pdGVtOm50aC1jaGlsZCg2KSB7XHJcbiAgICAgIGZsZXg6IDAgMSBjYWxjKDI1JSAtIDEuNXZ3KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbioge1xyXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbn1cclxuXHJcbmJvZHkge1xyXG4gIG1hcmdpbjogMDtcclxuICBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBcIlNlZ29lIFVJXCIsIFJvYm90bywgSGVsdmV0aWNhLFxyXG4gICAgQXJpYWwsIHNhbnMtc2VyaWYsIFwiQXBwbGUgQ29sb3IgRW1vamlcIiwgXCJTZWdvZSBVSSBFbW9qaVwiLCBcIlNlZ29lIFVJIFN5bWJvbFwiO1xyXG4gIGJhY2tncm91bmQ6ICMyOTM0M2Q7XHJcbn1cclxuXHJcbkBzdXBwb3J0cyBub3QgKGRpc3BsYXk6IGdyaWQpIHtcclxuICBib2R5OmJlZm9yZSB7XHJcbiAgICBjb250ZW50OiBcIlNvcnJ5LCBzZWVtcyBsaWtlIHlvdXIgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgZGlzcGxheTogZ3JpZC4gQmVsb3cgaXMgdGhlIGZsZXhib3ggZmFsbGJhY2suXCI7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIHBhZGRpbmc6IDJyZW0gMnJlbSAwO1xyXG4gICAgY29sb3I6ICNmZmZmZmY7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgfVxyXG59XHJcblxyXG4uaXRlbSB7XHJcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICBib3gtc2hhZG93OiAtMTVweCAxNXB4IDE1cHggMCBsaWdodGdyYXk7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSwgMjU1LCAyNTUpO1xyXG59XHJcbi5ncmlkIC5pdGVtOm50aC1jaGlsZCgxKSB7XHJcbiAgbWluLWhlaWdodDogODB2aDtcclxuICBoZWlnaHQ6IGF1dG87XHJcbn1cclxuLmdyaWQgLml0ZW06bnRoLWNoaWxkKDIpIHtcclxuICBtaW4taGVpZ2h0OiA1MHZoO1xyXG4gIGhlaWdodDogYXV0bztcclxuICBib3JkZXI6IHNvbGlkIDJweCBncmV5O1xyXG4gIGJveC1zaGFkb3c6IDBweCAwcHggMTBweCAzcHggZ3JleTtcclxufVxyXG4uZ3JpZCAuaXRlbTpudGgtY2hpbGQoMykge1xyXG4gIG1pbi1oZWlnaHQ6IDUwdmg7XHJcbiAgaGVpZ2h0OiBhdXRvO1xyXG59XHJcbi5ncmlkIC5pdGVtOm50aC1jaGlsZCg0KSB7XHJcbiAgbWluLWhlaWdodDogNTB2aDtcclxuICBoZWlnaHQ6IGF1dG87XHJcbn1cclxuLmdyaWQgLml0ZW06bnRoLWNoaWxkKDUpIHtcclxuICBtaW4taGVpZ2h0OiAzMHZoO1xyXG4gIGhlaWdodDogYXV0bztcclxufVxyXG4uZ3JpZCAuaXRlbTpudGgtY2hpbGQoNikge1xyXG4gIG1pbi1oZWlnaHQ6IDMwdmg7XHJcbiAgaGVpZ2h0OiBhdXRvO1xyXG59XHJcblxyXG5cclxuKixcclxuOmFmdGVyLFxyXG46YmVmb3JlIHtcclxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG59XHJcblxyXG5ib2R5IHtcclxuICBtYXJnaW46IDYwcHggYXV0bztcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmOTI5NTtcclxuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuMnMgY3ViaWMtYmV6aWVyKDAsIC0xLjg1LCAwLjI3LCAxLjc1KTtcclxufVxyXG4uaXRlbSBwIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuLnRvZ2dsZSB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIG1hcmdpbjogYXV0bztcclxuXHJcbiAgd2lkdGg6IDkuNXZ3O1xyXG4gIGhlaWdodDogMjB2aDtcclxuXHJcbiAgbGFiZWwge1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgbGVmdDogNDBweDtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIG1hcmdpbjogYXV0bztcclxuICAgIHdpZHRoOiA5MHB4O1xyXG4gICAgaGVpZ2h0OiA5MHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmNjE2NDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwcHg7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgMnB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMSksIDBweCA5cHggMTVweCAwcHggI2VmNDI0NztcclxuICAgIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcblxyXG4gICAgJjpiZWZvcmUge1xyXG4gICAgICBjb250ZW50OiBcIlwiO1xyXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgIHRvcDogNTAlO1xyXG4gICAgICBsZWZ0OiA1MCU7XHJcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xyXG4gICAgICB0cmFuc2l0aW9uOiB3aWR0aCAwLjJzIGN1YmljLWJlemllcigwLCAtMS44NSwgMC4yNywgMS43NSk7XHJcbiAgICAgIGhlaWdodDogNDJweDtcclxuICAgICAgd2lkdGg6IDQycHg7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZjYxNjQ7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDQ2cHg7XHJcbiAgICAgIGJveC1zaGFkb3c6IGluc2V0IDBweCAwcHggMHB4IDhweCAjZmZmO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaW5wdXQge1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxuXHJcbiAgICAmOmNoZWNrZWQgKyBsYWJlbCB7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICM3YWViOTA7XHJcbiAgICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCAycHggMXB4IHJnYmEoMCwgMCwgMCwgMC4xKSxcclxuICAgICAgICAwcHggOXB4IDE1cHggMHB4IHJnYmEoMywgMTMyLCAyOCwgMC41NDExNzY0NzA1ODgyMzUzKTtcclxuXHJcbiAgICAgICY6YmVmb3JlIHtcclxuICAgICAgICB3aWR0aDogMTBweDtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4ub24ge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICM2ZmM1N2M7XHJcbiAgLnRvZ2dsZSB7XHJcbiAgICAmOmJlZm9yZSB7XHJcbiAgICAgIGNvbG9yOiByZ2JhKDYyLCAxNjAsIDgxLCAwLjg5KTtcclxuICAgIH1cclxuICAgICY6YWZ0ZXIge1xyXG4gICAgICBjb2xvcjogI2ZmZjtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIC5zd2l0Y2hCdXR0b24ge1xyXG4vLyAgIGJhY2tncm91bmQtY29sb3I6ICNEQzE0M0M7XHJcbi8vICAgYm9yZGVyOiAwcHg7XHJcbi8vICAgZm9udC1zaXplOiAyOHB4O1xyXG4vLyAgIGNvbG9yOiB3aGl0ZTtcclxuLy8gICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4vLyAgIHdpZHRoOiAxMDAlO1xyXG4vLyAgIGhlaWdodDogMjB2aDtcclxuLy8gICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbi8vICAgLXdlYmtpdC10cmFuc2l0aW9uLWR1cmF0aW9uOiAwLjRzO1xyXG4vLyAgIHRyYW5zaXRpb24tZHVyYXRpb246IDAuNHM7XHJcbi8vICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4vLyAgIG92ZXJmbG93OiBoaWRkZW47XHJcbi8vICAgY3Vyc29yOiBwb2ludGVyO1xyXG4vLyAgIGRpc3BsYXk6IGJsb2NrO1xyXG4vLyAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4vLyAgIG91dGxpbmU6bm9uZTtcclxuLy8gfVxyXG5cclxuLy8gLnN3aXRjaEJ1dHRvbjpob3ZlciB7XHJcbi8vICAgYm94LXNoYWRvdzogMCAxMnB4IDE2cHggMCByZ2JhKDAsIDAsIDAsIDAuMjQpLFxyXG4vLyAgICAgMCAxN3B4IDUwcHggMCByZ2JhKDAsIDAsIDAsIDAuMTkpO1xyXG4vLyB9XHJcblxyXG4vLyAuc3dpdGNoZWQge1xyXG4vLyAgIGJhY2tncm91bmQtY29sb3I6ICM3Q0ZDMDA7XHJcbi8vICAgY29sb3I6IGJsYWNrO1xyXG4vLyAgIGZvbnQtd2VpZ2h0OiBib2xkZXIgNjAwO1xyXG4vLyB9XHJcblxyXG4vLyAuc3dpdGNoZWQge1xyXG4vLyAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbi8vIH1cclxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.scss'],
            }]
    }], function () { return [{ type: _server_service__WEBPACK_IMPORTED_MODULE_0__["ServerService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _server_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./server.service */ "./src/app/server.service.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var ng_apexcharts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng-apexcharts */ "./node_modules/ng-apexcharts/__ivy_ngcc__/fesm2015/ng-apexcharts.js");
/* harmony import */ var _charts_chart1_chart1_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./charts/chart1/chart1.component */ "./src/app/charts/chart1/chart1.component.ts");
/* harmony import */ var _charts_chart2_chart2_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./charts/chart2/chart2.component */ "./src/app/charts/chart2/chart2.component.ts");
/* harmony import */ var _charts_chart3_chart3_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./charts/chart3/chart3.component */ "./src/app/charts/chart3/chart3.component.ts");
/* harmony import */ var _charts_chart4_chart4_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./charts/chart4/chart4.component */ "./src/app/charts/chart4/chart4.component.ts");
/* harmony import */ var _charts_chart5_chart5_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./charts/chart5/chart5.component */ "./src/app/charts/chart5/chart5.component.ts");
/* harmony import */ var _charts_chart6_chart6_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./charts/chart6/chart6.component */ "./src/app/charts/chart6/chart6.component.ts");
/* harmony import */ var _charts_chart7_chart7_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./charts/chart7/chart7.component */ "./src/app/charts/chart7/chart7.component.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./header/header.component */ "./src/app/header/header.component.ts");
/* harmony import */ var _uiowa_date_range_picker__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @uiowa/date-range-picker */ "./node_modules/@uiowa/date-range-picker/__ivy_ngcc__/fesm2015/uiowa-date-range-picker.js");
/* harmony import */ var _charts_chart3_series_pipe__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./charts/chart3/series.pipe */ "./src/app/charts/chart3/series.pipe.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _swimlane_ngx_charts__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @swimlane/ngx-charts */ "./node_modules/@swimlane/ngx-charts/__ivy_ngcc__/fesm2015/swimlane-ngx-charts.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/animations.js");





















class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_11__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [_server_service__WEBPACK_IMPORTED_MODULE_0__["ServerService"]], imports: [[
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_19__["BrowserAnimationsModule"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_13__["HttpClientModule"],
            ng_apexcharts__WEBPACK_IMPORTED_MODULE_3__["NgApexchartsModule"],
            _uiowa_date_range_picker__WEBPACK_IMPORTED_MODULE_15__["DateRangePickerModule"],
            _swimlane_ngx_charts__WEBPACK_IMPORTED_MODULE_18__["NgxChartsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_17__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_17__["ReactiveFormsModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_12__["NgbModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_11__["AppComponent"],
        _charts_chart1_chart1_component__WEBPACK_IMPORTED_MODULE_4__["Chart1Component"],
        _charts_chart2_chart2_component__WEBPACK_IMPORTED_MODULE_5__["Chart2Component"],
        _charts_chart3_chart3_component__WEBPACK_IMPORTED_MODULE_6__["Chart3Component"],
        _charts_chart4_chart4_component__WEBPACK_IMPORTED_MODULE_7__["Chart4Component"],
        _charts_chart5_chart5_component__WEBPACK_IMPORTED_MODULE_8__["Chart5Component"],
        _charts_chart6_chart6_component__WEBPACK_IMPORTED_MODULE_9__["Chart6Component"],
        _charts_chart7_chart7_component__WEBPACK_IMPORTED_MODULE_10__["Chart7Component"],
        _header_header_component__WEBPACK_IMPORTED_MODULE_14__["HeaderComponent"],
        _charts_chart3_series_pipe__WEBPACK_IMPORTED_MODULE_16__["SeriesPipe"]], imports: [_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_19__["BrowserAnimationsModule"],
        _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_13__["HttpClientModule"],
        ng_apexcharts__WEBPACK_IMPORTED_MODULE_3__["NgApexchartsModule"],
        _uiowa_date_range_picker__WEBPACK_IMPORTED_MODULE_15__["DateRangePickerModule"],
        _swimlane_ngx_charts__WEBPACK_IMPORTED_MODULE_18__["NgxChartsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_17__["FormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_17__["ReactiveFormsModule"],
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_12__["NgbModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_11__["AppComponent"],
                    _charts_chart1_chart1_component__WEBPACK_IMPORTED_MODULE_4__["Chart1Component"],
                    _charts_chart2_chart2_component__WEBPACK_IMPORTED_MODULE_5__["Chart2Component"],
                    _charts_chart3_chart3_component__WEBPACK_IMPORTED_MODULE_6__["Chart3Component"],
                    _charts_chart4_chart4_component__WEBPACK_IMPORTED_MODULE_7__["Chart4Component"],
                    _charts_chart5_chart5_component__WEBPACK_IMPORTED_MODULE_8__["Chart5Component"],
                    _charts_chart6_chart6_component__WEBPACK_IMPORTED_MODULE_9__["Chart6Component"],
                    _charts_chart7_chart7_component__WEBPACK_IMPORTED_MODULE_10__["Chart7Component"],
                    _header_header_component__WEBPACK_IMPORTED_MODULE_14__["HeaderComponent"],
                    _charts_chart3_series_pipe__WEBPACK_IMPORTED_MODULE_16__["SeriesPipe"]
                ],
                imports: [
                    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_19__["BrowserAnimationsModule"],
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                    _angular_common_http__WEBPACK_IMPORTED_MODULE_13__["HttpClientModule"],
                    ng_apexcharts__WEBPACK_IMPORTED_MODULE_3__["NgApexchartsModule"],
                    _uiowa_date_range_picker__WEBPACK_IMPORTED_MODULE_15__["DateRangePickerModule"],
                    _swimlane_ngx_charts__WEBPACK_IMPORTED_MODULE_18__["NgxChartsModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_17__["FormsModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_17__["ReactiveFormsModule"],
                    _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_12__["NgbModule"],
                ],
                providers: [_server_service__WEBPACK_IMPORTED_MODULE_0__["ServerService"]],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_11__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/charts/chart1/chart1.component.ts":
/*!***************************************************!*\
  !*** ./src/app/charts/chart1/chart1.component.ts ***!
  \***************************************************/
/*! exports provided: Chart1Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Chart1Component", function() { return Chart1Component; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_server_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/server.service */ "./src/app/server.service.ts");
/* harmony import */ var _swimlane_ngx_charts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @swimlane/ngx-charts */ "./node_modules/@swimlane/ngx-charts/__ivy_ngcc__/fesm2015/swimlane-ngx-charts.js");




// export type ChartOptions = {
//   series: ApexAxisChartSeries;
//   chart: ApexChart;
//   yaxis: ApexYAxis;
//   xaxis: ApexXAxis;
//   title: ApexTitleSubtitle;
//   stroke: ApexStroke;
//   grid: ApexGrid;
//   markers: ApexMarkers;
//   tooltip: ApexTooltip;
//   plotOptions: ApexPlotOptions;
//   responsive: ApexResponsive;
//   dataLabels: ApexDataLabels;
//   legend: ApexLegend;
//   fill: ApexFill;
// };
class Chart1Component {
    constructor(server) {
        this.server = server;
        // options
        // yAxisTicks: any[] = this.getArrY(175, 280, 5);
        this.yAxisTicks = this.getArrY(1.75, 2.8, 0.05);
        // yAxisTicks: any[] = [1.75, 1.8, 4, 5];
        this.showXAxis = true;
        this.showYAxis = true;
        this.gradient = true;
        this.showLegend = true;
        this.showXAxisLabel = true;
        this.xAxisLabel = 'Country';
        this.showYAxisLabel = true;
        this.yAxisLabel = 'Population';
        this.legendTitle = 'Заряд От Всех Батареек';
        this.animations = false;
        this.roundDomains = false;
        this.colorScheme = {
            domain: ['#6391ef', 'deeppink']
        };
        this.genData();
        setInterval(() => { this.genData(); }, 1000);
    }
    onSelect(data) {
        // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
        this.genData();
    }
    onActivate(data) {
        // console.log('Activate', JSON.parse(JSON.stringify(data)));
    }
    onDeactivate(data) {
        // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
    }
    genData() {
        this.multi = [];
        for (let i = 0; i < 15; i++) {
            this.multi.push({
                name: 'USA' + i,
                series: [
                    {
                        name: '2010',
                        value: 1.75 + Math.random() * 1.05
                    },
                    {
                        name: '2011',
                        value: 1.75 + Math.random() * 1.05
                    }
                ]
            });
        }
    }
    getArrY(min, max, dist) {
        let arr = [];
        for (let i = 0, l = (max - min) / dist; i < l; i++) {
            arr.push(min + i * dist);
        }
        arr.push(max);
        console.log(arr);
        return arr;
    }
    randomSeries() {
        let arr = [];
        for (let i = 0; i < 15; i++) {
            let val = (1.75 + Math.random() * (2.8 - 1.75)).toFixed(2);
            arr.push(val);
        }
        return arr;
    }
}
Chart1Component.ɵfac = function Chart1Component_Factory(t) { return new (t || Chart1Component)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_server_service__WEBPACK_IMPORTED_MODULE_1__["ServerService"])); };
Chart1Component.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: Chart1Component, selectors: [["ngx-chart1"]], decls: 1, vars: 13, consts: [[3, "scheme", "groupPadding", "results", "gradient", "xAxis", "yAxis", "yAxisTicks", "showXAxisLabel", "showYAxisLabel", "xAxisLabel", "yAxisLabel", "legendTitle", "roundDomains", "select", "activate", "deactivate"]], template: function Chart1Component_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ngx-charts-bar-vertical-2d", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("select", function Chart1Component_Template_ngx_charts_bar_vertical_2d_select_0_listener($event) { return ctx.onSelect($event); })("activate", function Chart1Component_Template_ngx_charts_bar_vertical_2d_activate_0_listener($event) { return ctx.onActivate($event); })("deactivate", function Chart1Component_Template_ngx_charts_bar_vertical_2d_deactivate_0_listener($event) { return ctx.onDeactivate($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("scheme", ctx.colorScheme)("groupPadding", 0)("results", ctx.multi)("gradient", ctx.gradient)("xAxis", ctx.showXAxis)("yAxis", ctx.showYAxis)("yAxisTicks", ctx.yAxisTicks)("showXAxisLabel", ctx.showXAxisLabel)("showYAxisLabel", ctx.showYAxisLabel)("xAxisLabel", ctx.xAxisLabel)("yAxisLabel", ctx.yAxisLabel)("legendTitle", ctx.legendTitle)("roundDomains", ctx.roundDomains);
    } }, directives: [_swimlane_ngx_charts__WEBPACK_IMPORTED_MODULE_2__["BarVertical2DComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NoYXJ0cy9jaGFydDEvY2hhcnQxLmNvbXBvbmVudC5zY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](Chart1Component, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'ngx-chart1',
                templateUrl: './chart1.component.html',
                styleUrls: ['./chart1.component.scss'],
            }]
    }], function () { return [{ type: src_app_server_service__WEBPACK_IMPORTED_MODULE_1__["ServerService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/charts/chart2/chart2.component.ts":
/*!***************************************************!*\
  !*** ./src/app/charts/chart2/chart2.component.ts ***!
  \***************************************************/
/*! exports provided: Chart2Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Chart2Component", function() { return Chart2Component; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var ng_apexcharts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ng-apexcharts */ "./node_modules/ng-apexcharts/__ivy_ngcc__/fesm2015/ng-apexcharts.js");



const _c0 = ["chart"];
class Chart2Component {
    constructor() {
        this.chartOptions = {
            series: [
                1.85 +
                    1.95 +
                    2.15 +
                    2.0 +
                    1.75 +
                    2.45 +
                    2.55 +
                    1.8 +
                    2.3 +
                    1.85 +
                    1.85 +
                    2.65 +
                    1.85 +
                    2.2 +
                    2.25 +
                    1.85 +
                    2.45 +
                    2.7 +
                    2.0 +
                    1.95 +
                    2.2 +
                    2.35 +
                    2.55 +
                    2.45 +
                    2.65 +
                    2.4 +
                    2.55 +
                    1.8 +
                    2.15 +
                    2.0,
            ],
            title: {
                text: 'Зарядка батареи сейчас',
            },
            chart: {
                offsetY: 15,
                height: 'auto',
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    track: {
                        show: false,
                    },
                    startAngle: -90,
                    endAngle: 90,
                    dataLabels: {
                        name: {
                            offsetY: -25,
                            fontSize: '14px',
                            fontWeight: 700,
                        },
                        value: {
                            offsetY: -20,
                            fontSize: '20px',
                            fontWeight: 400,
                            // color: '#00000',
                            formatter: (val) => val + '%',
                        },
                        total: {
                            show: false,
                        },
                    },
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'light',
                    type: 'horizontal',
                    inverseColors: true,
                    colorStops: [
                        {
                            offset: 0,
                            color: '#ff0000',
                            opacity: 1,
                        },
                        {
                            offset: 20,
                            color: '#ffaf00',
                            opacity: 1,
                        },
                        {
                            offset: 50,
                            color: '#f9ff00',
                            opacity: 1,
                        },
                        {
                            offset: 80,
                            color: '#b0ff00',
                            opacity: 1,
                        },
                        {
                            offset: 100,
                            color: '#00ff00',
                            opacity: 1,
                        },
                    ],
                },
            },
            stroke: {
                dashArray: 6,
            },
            labels: ['Уровень зарядки'],
        };
    }
}
Chart2Component.ɵfac = function Chart2Component_Factory(t) { return new (t || Chart2Component)(); };
Chart2Component.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: Chart2Component, selectors: [["ngx-chart2"]], viewQuery: function Chart2Component_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.chart = _t.first);
    } }, decls: 1, vars: 15, consts: [[3, "series", "chart", "yaxis", "xaxis", "title", "stroke", "grid", "markers", "tooltip", "plotOptions", "responsive", "dataLabels", "legend", "labels", "fill"]], template: function Chart2Component_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "apx-chart", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("series", ctx.chartOptions.series)("chart", ctx.chartOptions.chart)("yaxis", ctx.chartOptions.yaxis)("xaxis", ctx.chartOptions.xaxis)("title", ctx.chartOptions.title)("stroke", ctx.chartOptions.stroke)("grid", ctx.chartOptions.grid)("markers", ctx.chartOptions.markers)("tooltip", ctx.chartOptions.tooltip)("plotOptions", ctx.chartOptions.plotOptions)("responsive", ctx.chartOptions.responsive)("dataLabels", ctx.chartOptions.dataLabels)("legend", ctx.chartOptions.legend)("labels", ctx.chartOptions.labels)("fill", ctx.chartOptions.fill);
    } }, directives: [ng_apexcharts__WEBPACK_IMPORTED_MODULE_1__["ChartComponent"]], styles: ["ngx-chart2[_ngcontent-%COMP%] {\n  margin: auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY2hhcnRzL2NoYXJ0Mi9jaGFydDIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxZQUFBO0FBQ0oiLCJmaWxlIjoic3JjL2FwcC9jaGFydHMvY2hhcnQyL2NoYXJ0Mi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIm5neC1jaGFydDIge1xyXG4gICAgbWFyZ2luOiBhdXRvO1xyXG59XHJcbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](Chart2Component, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'ngx-chart2',
                templateUrl: './chart2.component.html',
                styleUrls: ['./chart2.component.scss'],
            }]
    }], function () { return []; }, { chart: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['chart']
        }] }); })();


/***/ }),

/***/ "./src/app/charts/chart3/chart3.component.ts":
/*!***************************************************!*\
  !*** ./src/app/charts/chart3/chart3.component.ts ***!
  \***************************************************/
/*! exports provided: Chart3Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Chart3Component", function() { return Chart3Component; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var ng_apexcharts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ng-apexcharts */ "./node_modules/ng-apexcharts/__ivy_ngcc__/fesm2015/ng-apexcharts.js");



const _c0 = ["chart"];
class Chart3Component {
    constructor() {
        this.chartOptions = {
            series: [{
                    name: 'Series 1',
                    data: [6, -55, -55, 2178, 2213, -55, 2197, -55, -55, 2195],
                },
            ],
            chart: {
                offsetY: 30,
                height: 350,
                type: 'line',
                toolbar: {
                    show: false,
                },
                dropShadow: {
                    enabled: true,
                    top: 5,
                    blur: 3,
                    color: '#39DA8A',
                    opacity: 0.35,
                },
                zoom: {
                    enabled: false,
                },
            },
            stroke: {
                show: true,
                curve: 'smooth',
                colors: ['#39DA8A'],
            },
            title: {
                text: 'Потребление по амперам от времени',
            },
            yaxis: {
                show: true,
                title: {
                    text: 'Ампер',
                },
            },
            xaxis: {
                type: 'category',
                categories: [
                    `${new Date(1599232519).getMinutes()}:${new Date(1599232519).getSeconds()}:${new Date(1599232519).getMilliseconds()}`,
                    `${new Date(1599296061).getMinutes()}:${new Date(1599296061).getSeconds()}:${new Date(1599296061).getMilliseconds()}`,
                    `${new Date(1599296064).getMinutes()}:${new Date(1599296064).getSeconds()}:${new Date(1599296064).getMilliseconds()}`,
                    `${new Date(1599296067).getMinutes()}:${new Date(1599296067).getSeconds()}:${new Date(1599296067).getMilliseconds()}`,
                    `${new Date(1599296070).getMinutes()}:${new Date(1599296070).getSeconds()}:${new Date(1599296070).getMilliseconds()}`,
                    `${new Date(1599296073).getMinutes()}:${new Date(1599296073).getSeconds()}:${new Date(1599296073).getMilliseconds()}`,
                    `${new Date(1599296076).getMinutes()}:${new Date(1599296076).getSeconds()}:${new Date(1599296076).getMilliseconds()}`,
                    `${new Date(1599296079).getMinutes()}:${new Date(1599296079).getSeconds()}:${new Date(1599296079).getMilliseconds()}`,
                    `${new Date(1599296082).getMinutes()}:${new Date(1599296082).getSeconds()}:${new Date(1599296082).getMilliseconds()}`,
                    `${new Date(1599296085).getMinutes()}:${new Date(1599296085).getSeconds()}:${new Date(1599296085).getMilliseconds()}`,
                ],
                title: {
                    text: 'Время',
                },
                labels: {
                    show: true,
                    style: {
                        fontSize: 'auto',
                    },
                },
                axisBorder: {
                    show: false,
                },
                crosshairs: {
                    show: true,
                },
                tooltip: {
                    enabled: true,
                },
            },
            grid: {
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
                yaxis: {
                    lines: {
                        show: false,
                    },
                },
            },
            markers: {
                colors: '#39DA8A',
                strokeColors: 'white',
                strokeWidth: 3,
                hover: {
                    size: 7,
                    sizeOffset: 3,
                },
            },
            tooltip: {
                enabled: true,
                theme: 'light',
                marker: {
                    show: false,
                },
                x: {
                    show: false,
                },
            },
        };
    }
    randomSeries() {
        let arr = [];
        for (let i = 0; i < 10; i++) {
            arr.push(Math.floor(1.75 + Math.random() * 2.8));
        }
        return arr;
    }
}
Chart3Component.ɵfac = function Chart3Component_Factory(t) { return new (t || Chart3Component)(); };
Chart3Component.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: Chart3Component, selectors: [["ngx-chart3"]], viewQuery: function Chart3Component_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.chart = _t.first);
    } }, inputs: { chart3: "chart3" }, decls: 1, vars: 9, consts: [[3, "series", "chart", "yaxis", "xaxis", "title", "stroke", "grid", "markers", "tooltip"]], template: function Chart3Component_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "apx-chart", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("series", ctx.chartOptions.series)("chart", ctx.chartOptions.chart)("yaxis", ctx.chartOptions.yaxis)("xaxis", ctx.chartOptions.xaxis)("title", ctx.chartOptions.title)("stroke", ctx.chartOptions.stroke)("grid", ctx.chartOptions.grid)("markers", ctx.chartOptions.markers)("tooltip", ctx.chartOptions.tooltip);
    } }, directives: [ng_apexcharts__WEBPACK_IMPORTED_MODULE_1__["ChartComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NoYXJ0cy9jaGFydDMvY2hhcnQzLmNvbXBvbmVudC5zY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](Chart3Component, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'ngx-chart3',
                templateUrl: './chart3.component.html',
                styleUrls: ['./chart3.component.scss'],
            }]
    }], function () { return []; }, { chart3: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], chart: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['chart', { static: false }]
        }] }); })();


/***/ }),

/***/ "./src/app/charts/chart3/series.pipe.ts":
/*!**********************************************!*\
  !*** ./src/app/charts/chart3/series.pipe.ts ***!
  \**********************************************/
/*! exports provided: SeriesPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SeriesPipe", function() { return SeriesPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class SeriesPipe {
    transform(value, args) {
        if (args === 'radar') {
            return value.map(c => {
                return {
                    name: c.name,
                    data: c.data
                };
            });
        }
        return value;
    }
}
SeriesPipe.ɵfac = function SeriesPipe_Factory(t) { return new (t || SeriesPipe)(); };
SeriesPipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "series", type: SeriesPipe, pure: true });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SeriesPipe, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"],
        args: [{
                name: 'series'
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/charts/chart4/chart4.component.ts":
/*!***************************************************!*\
  !*** ./src/app/charts/chart4/chart4.component.ts ***!
  \***************************************************/
/*! exports provided: Chart4Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Chart4Component", function() { return Chart4Component; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var ng_apexcharts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ng-apexcharts */ "./node_modules/ng-apexcharts/__ivy_ngcc__/fesm2015/ng-apexcharts.js");



const _c0 = ["chart"];
class Chart4Component {
    constructor() {
        this.chartOptions = {
            series: [{
                    name: 'Series 1',
                    // data: [344, -55, -55, -55, -55, -55, -55, -55, -55, -55],
                    data: this.getDataArr()
                }],
            chart: {
                offsetY: 30,
                height: 350,
                type: 'line',
                toolbar: {
                    show: false,
                },
                dropShadow: {
                    enabled: true,
                    top: 5,
                    blur: 3,
                    color: '#39DA8A',
                    opacity: 0.35
                },
                zoom: {
                    enabled: false,
                }
            },
            stroke: {
                show: true,
                curve: 'smooth',
                colors: ['#39DA8A']
            },
            title: {
                text: 'Температура от времени'
            },
            yaxis: {
                show: true,
                title: {
                    text: 'Температура'
                }
            },
            xaxis: {
                type: 'category',
                categories: [
                    `${new Date(1599232519).getMinutes()}:${new Date(1599232519).getSeconds()}:${new Date(1599232519).getMilliseconds()}`,
                    `${new Date(1599296061).getMinutes()}:${new Date(1599296061).getSeconds()}:${new Date(1599296061).getMilliseconds()}`,
                    `${new Date(1599296064).getMinutes()}:${new Date(1599296064).getSeconds()}:${new Date(1599296064).getMilliseconds()}`,
                    `${new Date(1599296067).getMinutes()}:${new Date(1599296067).getSeconds()}:${new Date(1599296067).getMilliseconds()}`,
                    `${new Date(1599296070).getMinutes()}:${new Date(1599296070).getSeconds()}:${new Date(1599296070).getMilliseconds()}`,
                    `${new Date(1599296073).getMinutes()}:${new Date(1599296073).getSeconds()}:${new Date(1599296073).getMilliseconds()}`,
                    `${new Date(1599296076).getMinutes()}:${new Date(1599296076).getSeconds()}:${new Date(1599296076).getMilliseconds()}`,
                    `${new Date(1599296079).getMinutes()}:${new Date(1599296079).getSeconds()}:${new Date(1599296079).getMilliseconds()}`,
                    `${new Date(1599296082).getMinutes()}:${new Date(1599296082).getSeconds()}:${new Date(1599296082).getMilliseconds()}`,
                    `${new Date(1599296085).getMinutes()}:${new Date(1599296085).getSeconds()}:${new Date(1599296085).getMilliseconds()}`,
                ],
                title: {
                    text: 'Время'
                },
                labels: {
                    show: true,
                    style: {
                        fontSize: 'auto',
                    },
                },
                axisBorder: {
                    show: false,
                },
                crosshairs: {
                    show: true,
                },
                tooltip: {
                    enabled: true,
                }
            },
            grid: {
                xaxis: {
                    lines: {
                        show: false,
                    }
                },
                yaxis: {
                    lines: {
                        show: false,
                    }
                },
            },
            markers: {
                colors: '#39DA8A',
                strokeColors: 'white',
                strokeWidth: 3,
                hover: {
                    size: 7,
                    sizeOffset: 3
                }
            },
            tooltip: {
                enabled: true,
                theme: 'light',
                marker: {
                    show: false,
                },
                x: {
                    show: false
                }
            }
        };
    }
    getDataArr() {
        return [344, -55, -55, -55, -55, -55, -55, -55, -55, -55];
    }
}
Chart4Component.ɵfac = function Chart4Component_Factory(t) { return new (t || Chart4Component)(); };
Chart4Component.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: Chart4Component, selectors: [["ngx-chart4"]], viewQuery: function Chart4Component_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.chart = _t.first);
    } }, decls: 1, vars: 9, consts: [[3, "series", "chart", "yaxis", "xaxis", "title", "stroke", "grid", "markers", "tooltip"]], template: function Chart4Component_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "apx-chart", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("series", ctx.chartOptions.series)("chart", ctx.chartOptions.chart)("yaxis", ctx.chartOptions.yaxis)("xaxis", ctx.chartOptions.xaxis)("title", ctx.chartOptions.title)("stroke", ctx.chartOptions.stroke)("grid", ctx.chartOptions.grid)("markers", ctx.chartOptions.markers)("tooltip", ctx.chartOptions.tooltip);
    } }, directives: [ng_apexcharts__WEBPACK_IMPORTED_MODULE_1__["ChartComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NoYXJ0cy9jaGFydDQvY2hhcnQ0LmNvbXBvbmVudC5zY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](Chart4Component, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'ngx-chart4',
                templateUrl: './chart4.component.html',
                styleUrls: ['./chart4.component.scss']
            }]
    }], function () { return []; }, { chart: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ["chart"]
        }] }); })();


/***/ }),

/***/ "./src/app/charts/chart5/chart5.component.ts":
/*!***************************************************!*\
  !*** ./src/app/charts/chart5/chart5.component.ts ***!
  \***************************************************/
/*! exports provided: Chart5Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Chart5Component", function() { return Chart5Component; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var ng_apexcharts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ng-apexcharts */ "./node_modules/ng-apexcharts/__ivy_ngcc__/fesm2015/ng-apexcharts.js");



const _c0 = ["chart"];
class Chart5Component {
    constructor() {
        this.chartOptions = {
            series: [{
                    name: 'Series 1',
                    // data: [344, -55, -55, -55, -55, -55, -55, -55, -55, -55],
                    data: this.getDataArr()
                }],
            chart: {
                offsetY: 30,
                height: 350,
                type: 'line',
                toolbar: {
                    show: false,
                },
                dropShadow: {
                    enabled: true,
                    top: 5,
                    blur: 3,
                    color: '#39DA8A',
                    opacity: 0.35
                },
                zoom: {
                    enabled: false,
                }
            },
            stroke: {
                show: true,
                curve: 'smooth',
                colors: ['#39DA8A']
            },
            title: {
                text: 'Температура от времени'
            },
            yaxis: {
                show: true,
                title: {
                    text: 'Температура'
                }
            },
            xaxis: {
                type: 'category',
                categories: [
                    `${new Date(1599232519).getMinutes()}:${new Date(1599232519).getSeconds()}:${new Date(1599232519).getMilliseconds()}`,
                    `${new Date(1599296061).getMinutes()}:${new Date(1599296061).getSeconds()}:${new Date(1599296061).getMilliseconds()}`,
                    `${new Date(1599296064).getMinutes()}:${new Date(1599296064).getSeconds()}:${new Date(1599296064).getMilliseconds()}`,
                    `${new Date(1599296067).getMinutes()}:${new Date(1599296067).getSeconds()}:${new Date(1599296067).getMilliseconds()}`,
                    `${new Date(1599296070).getMinutes()}:${new Date(1599296070).getSeconds()}:${new Date(1599296070).getMilliseconds()}`,
                    `${new Date(1599296073).getMinutes()}:${new Date(1599296073).getSeconds()}:${new Date(1599296073).getMilliseconds()}`,
                    `${new Date(1599296076).getMinutes()}:${new Date(1599296076).getSeconds()}:${new Date(1599296076).getMilliseconds()}`,
                    `${new Date(1599296079).getMinutes()}:${new Date(1599296079).getSeconds()}:${new Date(1599296079).getMilliseconds()}`,
                    `${new Date(1599296082).getMinutes()}:${new Date(1599296082).getSeconds()}:${new Date(1599296082).getMilliseconds()}`,
                    `${new Date(1599296085).getMinutes()}:${new Date(1599296085).getSeconds()}:${new Date(1599296085).getMilliseconds()}`,
                ],
                title: {
                    text: 'Время'
                },
                labels: {
                    show: true,
                    style: {
                        fontSize: 'auto',
                    },
                },
                axisBorder: {
                    show: false,
                },
                crosshairs: {
                    show: true,
                },
                tooltip: {
                    enabled: true,
                }
            },
            grid: {
                xaxis: {
                    lines: {
                        show: false,
                    }
                },
                yaxis: {
                    lines: {
                        show: false,
                    }
                },
            },
            markers: {
                colors: '#39DA8A',
                strokeColors: 'white',
                strokeWidth: 3,
                hover: {
                    size: 7,
                    sizeOffset: 3
                }
            },
            tooltip: {
                enabled: true,
                theme: 'light',
                marker: {
                    show: false,
                },
                x: {
                    show: false
                }
            }
        };
    }
    getDataArr() {
        return [344, -55, -55, -55, -55, -55, -55, -55, -55, -55];
    }
}
Chart5Component.ɵfac = function Chart5Component_Factory(t) { return new (t || Chart5Component)(); };
Chart5Component.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: Chart5Component, selectors: [["ngx-chart5"]], viewQuery: function Chart5Component_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.chart = _t.first);
    } }, decls: 1, vars: 9, consts: [[3, "series", "chart", "yaxis", "xaxis", "title", "stroke", "grid", "markers", "tooltip"]], template: function Chart5Component_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "apx-chart", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("series", ctx.chartOptions.series)("chart", ctx.chartOptions.chart)("yaxis", ctx.chartOptions.yaxis)("xaxis", ctx.chartOptions.xaxis)("title", ctx.chartOptions.title)("stroke", ctx.chartOptions.stroke)("grid", ctx.chartOptions.grid)("markers", ctx.chartOptions.markers)("tooltip", ctx.chartOptions.tooltip);
    } }, directives: [ng_apexcharts__WEBPACK_IMPORTED_MODULE_1__["ChartComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NoYXJ0cy9jaGFydDUvY2hhcnQ1LmNvbXBvbmVudC5zY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](Chart5Component, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'ngx-chart5',
                templateUrl: './chart5.component.html',
                styleUrls: ['./chart5.component.scss']
            }]
    }], function () { return []; }, { chart: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ["chart"]
        }] }); })();


/***/ }),

/***/ "./src/app/charts/chart6/chart6.component.ts":
/*!***************************************************!*\
  !*** ./src/app/charts/chart6/chart6.component.ts ***!
  \***************************************************/
/*! exports provided: Chart6Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Chart6Component", function() { return Chart6Component; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var ng_apexcharts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ng-apexcharts */ "./node_modules/ng-apexcharts/__ivy_ngcc__/fesm2015/ng-apexcharts.js");



const _c0 = ["chart"];
class Chart6Component {
    constructor() {
        this.chartOptions = {
            series: [{
                    name: 'Series 1',
                    // data: [344, -55, -55, -55, -55, -55, -55, -55, -55, -55],
                    data: this.getDataArr()
                }],
            chart: {
                offsetY: 30,
                height: 350,
                type: 'line',
                toolbar: {
                    show: false,
                },
                dropShadow: {
                    enabled: true,
                    top: 5,
                    blur: 3,
                    color: '#39DA8A',
                    opacity: 0.35
                },
                zoom: {
                    enabled: false,
                }
            },
            stroke: {
                show: true,
                curve: 'smooth',
                colors: ['#39DA8A']
            },
            title: {
                text: 'Температура от времени'
            },
            yaxis: {
                show: true,
                title: {
                    text: 'Температура'
                }
            },
            xaxis: {
                type: 'category',
                categories: [
                    `${new Date(1599232519).getMinutes()}:${new Date(1599232519).getSeconds()}:${new Date(1599232519).getMilliseconds()}`,
                    `${new Date(1599296061).getMinutes()}:${new Date(1599296061).getSeconds()}:${new Date(1599296061).getMilliseconds()}`,
                    `${new Date(1599296064).getMinutes()}:${new Date(1599296064).getSeconds()}:${new Date(1599296064).getMilliseconds()}`,
                    `${new Date(1599296067).getMinutes()}:${new Date(1599296067).getSeconds()}:${new Date(1599296067).getMilliseconds()}`,
                    `${new Date(1599296070).getMinutes()}:${new Date(1599296070).getSeconds()}:${new Date(1599296070).getMilliseconds()}`,
                    `${new Date(1599296073).getMinutes()}:${new Date(1599296073).getSeconds()}:${new Date(1599296073).getMilliseconds()}`,
                    `${new Date(1599296076).getMinutes()}:${new Date(1599296076).getSeconds()}:${new Date(1599296076).getMilliseconds()}`,
                    `${new Date(1599296079).getMinutes()}:${new Date(1599296079).getSeconds()}:${new Date(1599296079).getMilliseconds()}`,
                    `${new Date(1599296082).getMinutes()}:${new Date(1599296082).getSeconds()}:${new Date(1599296082).getMilliseconds()}`,
                    `${new Date(1599296085).getMinutes()}:${new Date(1599296085).getSeconds()}:${new Date(1599296085).getMilliseconds()}`,
                ],
                title: {
                    text: 'Время'
                },
                labels: {
                    show: true,
                    style: {
                        fontSize: 'auto',
                    },
                },
                axisBorder: {
                    show: false,
                },
                crosshairs: {
                    show: true,
                },
                tooltip: {
                    enabled: true,
                }
            },
            grid: {
                xaxis: {
                    lines: {
                        show: false,
                    }
                },
                yaxis: {
                    lines: {
                        show: false,
                    }
                },
            },
            markers: {
                colors: '#39DA8A',
                strokeColors: 'white',
                strokeWidth: 3,
                hover: {
                    size: 7,
                    sizeOffset: 3
                }
            },
            tooltip: {
                enabled: true,
                theme: 'light',
                marker: {
                    show: false,
                },
                x: {
                    show: false
                }
            }
        };
    }
    getDataArr() {
        return [344, -55, -55, -55, -55, -55, -55, -55, -55, -55];
    }
}
Chart6Component.ɵfac = function Chart6Component_Factory(t) { return new (t || Chart6Component)(); };
Chart6Component.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: Chart6Component, selectors: [["ngx-chart6"]], viewQuery: function Chart6Component_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.chart = _t.first);
    } }, decls: 1, vars: 9, consts: [[3, "series", "chart", "yaxis", "xaxis", "title", "stroke", "grid", "markers", "tooltip"]], template: function Chart6Component_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "apx-chart", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("series", ctx.chartOptions.series)("chart", ctx.chartOptions.chart)("yaxis", ctx.chartOptions.yaxis)("xaxis", ctx.chartOptions.xaxis)("title", ctx.chartOptions.title)("stroke", ctx.chartOptions.stroke)("grid", ctx.chartOptions.grid)("markers", ctx.chartOptions.markers)("tooltip", ctx.chartOptions.tooltip);
    } }, directives: [ng_apexcharts__WEBPACK_IMPORTED_MODULE_1__["ChartComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NoYXJ0cy9jaGFydDYvY2hhcnQ2LmNvbXBvbmVudC5zY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](Chart6Component, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'ngx-chart6',
                templateUrl: './chart6.component.html',
                styleUrls: ['./chart6.component.scss']
            }]
    }], function () { return []; }, { chart: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ["chart"]
        }] }); })();


/***/ }),

/***/ "./src/app/charts/chart7/chart7.component.ts":
/*!***************************************************!*\
  !*** ./src/app/charts/chart7/chart7.component.ts ***!
  \***************************************************/
/*! exports provided: Chart7Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Chart7Component", function() { return Chart7Component; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_server_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/server.service */ "./src/app/server.service.ts");
/* harmony import */ var _swimlane_ngx_charts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @swimlane/ngx-charts */ "./node_modules/@swimlane/ngx-charts/__ivy_ngcc__/fesm2015/swimlane-ngx-charts.js");




class Chart7Component {
    constructor(server) {
        this.server = server;
        this.view = [500, 400];
        this.legend = true;
        this.legendPosition = 'below';
        this.colorScheme = {
            domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
        };
    }
}
Chart7Component.ɵfac = function Chart7Component_Factory(t) { return new (t || Chart7Component)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_server_service__WEBPACK_IMPORTED_MODULE_1__["ServerService"])); };
Chart7Component.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: Chart7Component, selectors: [["ngx-chart7"]], decls: 1, vars: 5, consts: [[3, "view", "scheme", "results", "legend", "legendPosition"]], template: function Chart7Component_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "ngx-charts-gauge", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("view", ctx.view)("scheme", ctx.colorScheme)("results", ctx.single)("legend", ctx.legend)("legendPosition", ctx.legendPosition);
    } }, directives: [_swimlane_ngx_charts__WEBPACK_IMPORTED_MODULE_2__["GaugeComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NoYXJ0cy9jaGFydDcvY2hhcnQ3LmNvbXBvbmVudC5zY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](Chart7Component, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'ngx-chart7',
                templateUrl: './chart7.component.html',
                styleUrls: ['./chart7.component.scss'],
            }]
    }], function () { return [{ type: src_app_server_service__WEBPACK_IMPORTED_MODULE_1__["ServerService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/header/header.component.ts":
/*!********************************************!*\
  !*** ./src/app/header/header.component.ts ***!
  \********************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var src_app_server_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/server.service */ "./src/app/server.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _uiowa_date_range_picker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @uiowa/date-range-picker */ "./node_modules/@uiowa/date-range-picker/__ivy_ngcc__/fesm2015/uiowa-date-range-picker.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");







class HeaderComponent {
    constructor(server) {
        this.server = server;
        this.dateRange = new _uiowa_date_range_picker__WEBPACK_IMPORTED_MODULE_2__["DateRange"]();
        this.maxDate = new Date();
        this.timeRange = [
            new Date().getTime() - 600000,
            new Date().getTime() - 600000 * 6,
            new Date().getTime() - 600000 * 6 * 24,
            new Date().getTime() - 600000 * 6 * 24 * 7,
        ];
    }
    clickFilter(e) {
        if (this.elClicked) {
            this.elClicked.classList.remove('clicked');
        }
        this.elClicked = e.target;
        this.elClicked.classList.add('clicked');
        this.dateRange.start = new Date(+e.target.value);
        this.dateRange.end = new Date();
        src_app_server_service__WEBPACK_IMPORTED_MODULE_0__["ServerService"].start = this.dateRange.start;
        src_app_server_service__WEBPACK_IMPORTED_MODULE_0__["ServerService"].end = this.dateRange.end;
    }
    reload() {
        document.cookie = `start=${this.dateRange.start}`;
        document.cookie = `end=${this.dateRange.end}`;
        location.reload();
    }
    ngOnInit() {
        this.maxDate.setDate(this.maxDate.getDate() + 20);
        for (let i = 0, l = document.cookie.split(';').length; i < l; i++) {
            if (document.cookie.split(';')[i].indexOf('start=')) {
                this.dateRange.start = new Date(this.getCookie('start'));
                src_app_server_service__WEBPACK_IMPORTED_MODULE_0__["ServerService"].start = this.dateRange.start;
            }
            if (document.cookie.split(';')[i].indexOf('end=')) {
                this.dateRange.end = new Date(this.getCookie('end'));
                src_app_server_service__WEBPACK_IMPORTED_MODULE_0__["ServerService"].end = this.dateRange.end;
            }
        }
        let pickerInput = document.querySelector('input');
        pickerInput.style.maxWidth = '';
    }
    getCookie(cookie_name) {
        let results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');
        if (results)
            return unescape(results[2]);
        else
            return null;
    }
}
HeaderComponent.ɵfac = function HeaderComponent_Factory(t) { return new (t || HeaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_server_service__WEBPACK_IMPORTED_MODULE_0__["ServerService"])); };
HeaderComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: HeaderComponent, selectors: [["app-header"]], decls: 10, vars: 7, consts: [[1, "grid"], [1, "btn-filter", 3, "value", "click"], ["name", "dateRangePicker", "ngDefaultControl", "", 3, "dateRange", "ngModel", "maxDate", "dateRangeChange", "ngModelChange"]], template: function HeaderComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HeaderComponent_Template_button_click_1_listener($event) { return ctx.clickFilter($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "10 \u043C\u0438\u043D\u0443\u0442");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HeaderComponent_Template_button_click_3_listener($event) { return ctx.clickFilter($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "1 \u0447\u0430\u0441");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HeaderComponent_Template_button_click_5_listener($event) { return ctx.clickFilter($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "1 \u0434\u0435\u043D\u044C");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function HeaderComponent_Template_button_click_7_listener($event) { return ctx.clickFilter($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "1 \u043D\u0435\u0434\u0435\u043B\u044F");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "date-range-picker", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("dateRangeChange", function HeaderComponent_Template_date_range_picker_dateRangeChange_9_listener($event) { return ctx.dateRange = $event; })("ngModelChange", function HeaderComponent_Template_date_range_picker_ngModelChange_9_listener($event) { return ctx.dateRange = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", ctx.timeRange[0]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", ctx.timeRange[1]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", ctx.timeRange[2]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", ctx.timeRange[3]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("dateRange", ctx.dateRange)("ngModel", ctx.dateRange)("maxDate", ctx.maxDate);
    } }, directives: [_uiowa_date_range_picker__WEBPACK_IMPORTED_MODULE_2__["DateRangePickerComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgModel"]], styles: ["@supports (display: grid) {\n  .grid[_ngcontent-%COMP%] {\n    display: grid;\n    grid-gap: 1.5vw;\n    min-height: 10vh;\n    width: auto;\n    align-items: center;\n    justify-items: center;\n    padding: 20px 20px 0px 20px;\n  }\n\n  .grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n    grid-template-rows: auto;\n    grid-template-areas: \"box1 box2 box3\" \"box4 box5 box5\";\n  }\n\n  @media screen and (min-width: 800px) {\n    .grid[_ngcontent-%COMP%] {\n      grid-template-columns: repeat(5, 1fr);\n      grid-template-rows: auto;\n      grid-template-areas: \"box1 box2 box3 box4\" \"box5 box5 . .\";\n    }\n  }\n  @media screen and (min-width: 1500px) {\n    .grid[_ngcontent-%COMP%] {\n      grid-template-columns: repeat(6, 1fr);\n      grid-template-rows: auto;\n      grid-template-areas: \"box1 box2 box3 box4 box5 box5\";\n    }\n  }\n  .grid[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:nth-child(1) {\n    grid-area: box1;\n  }\n\n  .grid[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:nth-child(2) {\n    grid-area: box2;\n  }\n\n  .grid[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:nth-child(3) {\n    grid-area: box3;\n  }\n\n  .grid[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:nth-child(4) {\n    grid-area: box4;\n  }\n\n  .grid[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:nth-child(5) {\n    grid-area: box5;\n  }\n\n  .btn-filter[_ngcontent-%COMP%]:hover, .clicked[_ngcontent-%COMP%] {\n    background-color: #e1ecfe;\n  }\n\n  .btn-filter[_ngcontent-%COMP%] {\n    white-space: nowrap;\n    width: 90%;\n    height: 90%;\n    padding: 10px;\n    border-radius: 3px;\n    background-color: white;\n    color: #8f96a0;\n    outline: none;\n    border: none;\n    transition: 0.1s;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaGVhZGVyL2hlYWRlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFO0lBQ0UsYUFBQTtJQUNBLGVBQUE7SUFDQSxnQkFBQTtJQUNBLFdBQUE7SUFDQSxtQkFBQTtJQUNBLHFCQUFBO0lBRUEsMkJBQUE7RUFBRjs7RUFHQTtJQUNFLHFDQUFBO0lBQ0Esd0JBQUE7SUFDQSxzREFDRTtFQURKOztFQUtBO0lBQ0U7TUFDRSxxQ0FBQTtNQUNBLHdCQUFBO01BQ0EsMERBQ0U7SUFISjtFQUNGO0VBT0E7SUFDRTtNQUNFLHFDQUFBO01BQ0Esd0JBQUE7TUFDQSxvREFBQTtJQUxGO0VBQ0Y7RUFRQTtJQUNFLGVBQUE7RUFORjs7RUFRQTtJQUNFLGVBQUE7RUFMRjs7RUFPQTtJQUNFLGVBQUE7RUFKRjs7RUFNQTtJQUNFLGVBQUE7RUFIRjs7RUFLQTtJQUNFLGVBQUE7RUFGRjs7RUFJQTs7SUFFRSx5QkFBQTtFQURGOztFQUlBO0lBQ0UsbUJBQUE7SUFDQSxVQUFBO0lBQ0EsV0FBQTtJQUNBLGFBQUE7SUFDQSxrQkFBQTtJQUNBLHVCQUFBO0lBQ0EsY0FBQTtJQUNBLGFBQUE7SUFDQSxZQUFBO0lBQ0EsZ0JBQUE7RUFERjtBQUNGIiwiZmlsZSI6InNyYy9hcHAvaGVhZGVyL2hlYWRlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBzdXBwb3J0cyAoZGlzcGxheTogZ3JpZCkge1xyXG4gIC5ncmlkIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLWdhcDogMS41dnc7XHJcbiAgICBtaW4taGVpZ2h0OiAxMHZoO1xyXG4gICAgd2lkdGg6IGF1dG87XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAganVzdGlmeS1pdGVtczogY2VudGVyO1xyXG4gICAgLy8gbWF4LXdpZHRoOiA1MHZ3O1xyXG4gICAgcGFkZGluZzogMjBweCAyMHB4IDBweCAyMHB4O1xyXG4gIH1cclxuXHJcbiAgLmdyaWQge1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMWZyKTtcclxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0bztcclxuICAgIGdyaWQtdGVtcGxhdGUtYXJlYXM6XHJcbiAgICAgIFwiYm94MSBib3gyIGJveDNcIlxyXG4gICAgICBcImJveDQgYm94NSBib3g1XCI7XHJcbiAgfVxyXG5cclxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA4MDBweCkge1xyXG4gICAgLmdyaWQge1xyXG4gICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg1LCAxZnIpO1xyXG4gICAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG87XHJcbiAgICAgIGdyaWQtdGVtcGxhdGUtYXJlYXM6XHJcbiAgICAgICAgXCJib3gxIGJveDIgYm94MyBib3g0XCJcclxuICAgICAgICBcImJveDUgYm94NSAuIC5cIjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDE1MDBweCkge1xyXG4gICAgLmdyaWQge1xyXG4gICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg2LCAxZnIpO1xyXG4gICAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG87XHJcbiAgICAgIGdyaWQtdGVtcGxhdGUtYXJlYXM6IFwiYm94MSBib3gyIGJveDMgYm94NCBib3g1IGJveDVcIjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC5ncmlkIC5pdGVtOm50aC1jaGlsZCgxKSB7XHJcbiAgICBncmlkLWFyZWE6IGJveDE7XHJcbiAgfVxyXG4gIC5ncmlkIC5pdGVtOm50aC1jaGlsZCgyKSB7XHJcbiAgICBncmlkLWFyZWE6IGJveDI7XHJcbiAgfVxyXG4gIC5ncmlkIC5pdGVtOm50aC1jaGlsZCgzKSB7XHJcbiAgICBncmlkLWFyZWE6IGJveDM7XHJcbiAgfVxyXG4gIC5ncmlkIC5pdGVtOm50aC1jaGlsZCg0KSB7XHJcbiAgICBncmlkLWFyZWE6IGJveDQ7XHJcbiAgfVxyXG4gIC5ncmlkIC5pdGVtOm50aC1jaGlsZCg1KSB7XHJcbiAgICBncmlkLWFyZWE6IGJveDU7XHJcbiAgfVxyXG4gIC5idG4tZmlsdGVyOmhvdmVyLFxyXG4gIC5jbGlja2VkIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNlMWVjZmU7XHJcbiAgfVxyXG5cclxuICAuYnRuLWZpbHRlciB7XHJcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gICAgd2lkdGg6IDkwJTtcclxuICAgIGhlaWdodDogOTAlO1xyXG4gICAgcGFkZGluZzogMTBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xyXG4gICAgY29sb3I6ICM4Zjk2YTA7XHJcbiAgICBvdXRsaW5lOiBub25lO1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gICAgdHJhbnNpdGlvbjogMC4xcztcclxuICB9XHJcbn1cclxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](HeaderComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-header',
                templateUrl: './header.component.html',
                styleUrls: ['./header.component.scss'],
            }]
    }], function () { return [{ type: src_app_server_service__WEBPACK_IMPORTED_MODULE_0__["ServerService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/server.service.ts":
/*!***********************************!*\
  !*** ./src/app/server.service.ts ***!
  \***********************************/
/*! exports provided: totals, total, val, ServerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "totals", function() { return totals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "total", function() { return total; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "val", function() { return val; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServerService", function() { return ServerService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");




///MODELS
class totals {
}
class total {
}
class val {
}
///ENDMODELS
class ServerService {
    constructor(http) {
        this.http = http;
    }
    getDataQuery(start_time = '1000', end_time = '4999999000', data = '10') {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const str = ServerService.HOST +
                '/api/bms?' +
                '\&start\_time=' +
                start_time +
                '\&end\_time=' +
                end_time +
                '\&data=' +
                data;
            let response = yield fetch(str);
            let res = yield response.json();
            return res;
        });
    }
}
ServerService.HOST = 'http://80.89.235.39';
ServerService.ɵfac = function ServerService_Factory(t) { return new (t || ServerService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"])); };
ServerService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: ServerService, factory: ServerService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](ServerService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\User\Desktop\п\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map