(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["game-game-module"],{

/***/ "/mCa":
/*!*********************************************!*\
  !*** ./src/app/game/game-routing.module.ts ***!
  \*********************************************/
/*! exports provided: GamePageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GamePageRoutingModule", function() { return GamePageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _game_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game.page */ "9/LI");




const routes = [
    {
        path: '',
        component: _game_page__WEBPACK_IMPORTED_MODULE_3__["GamePage"]
    }
];
let GamePageRoutingModule = class GamePageRoutingModule {
};
GamePageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], GamePageRoutingModule);



/***/ }),

/***/ "9/LI":
/*!***********************************!*\
  !*** ./src/app/game/game.page.ts ***!
  \***********************************/
/*! exports provided: GamePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GamePage", function() { return GamePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_game_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./game.page.html */ "Wr0u");
/* harmony import */ var _game_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game.page.scss */ "pdH3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "TEn/");






let GamePage = class GamePage {
    constructor(route, router, alertController) {
        this.route = route;
        this.router = router;
        this.alertController = alertController;
        this.pipe = [];
    }
    startNewGame() {
        this.gameContext = this.gameCanvas.nativeElement.getContext("2d");
        this.background = new Image();
        this.background.src = "../../assets/images/bg.png";
        this.ground = new Image();
        this.ground.src = "../../assets/images/fg.png";
        let id = this.route.snapshot.queryParams.fig;
        this.nghia = new Image();
        this.nghia.src = "../../assets/images/nghia" + id + "-mit-wings-transparent-fixed.png";
        this.pipeNorth = new Image();
        this.pipeNorth.src = "../../assets/images/pipeNorth.png";
        this.pipeSouth = new Image();
        this.pipeSouth.src = "../../assets/images/pipeSouth.png";
        this.pipe = [];
        this.pipe[0] = {
            x: this.gameCanvas.nativeElement.width,
            y: 0
        };
        this.bX = 10;
        this.bY = 150;
        this.gap = 90;
        this.gravity = 1.3;
        this.score = 0;
        this.constant = 0;
        this.setupSounds();
        this.draw();
    }
    setupSounds() {
        this.hitSound = new Audio();
        this.hitSound.src = "../../assets/sound/hit.mp3";
        this.flySound = new Audio();
        this.flySound.src = "../../assets/sound/fly.mp3";
        this.scoreSound = new Audio();
        this.scoreSound.src = "../../assets/sound/score.mp3";
    }
    ngOnInit() {
        //this.startNewGame();
        this.setupSounds();
    }
    ionViewWillEnter() {
        this.startNewGame();
    }
    draw() {
        this.gameContext.drawImage(this.background, 0, 0);
        for (let i = 0; i < this.pipe.length; i++) {
            this.drawNewPipes(i);
            // detect collisions
            if (this.bX + this.nghia.width >= this.pipe[i].x && this.bX <= this.pipe[i].x + this.pipeNorth.width && (this.bY <= this.pipe[i].y + this.pipeNorth.height || this.bY + this.nghia.height >= this.pipe[i].y + this.constant) || (this.bY + this.nghia.height >= this.gameCanvas.nativeElement.height - this.ground.height)) {
                if (this.hitSound)
                    this.hitSound.play();
                this.flySound = null;
                this.hitSound = null;
                this.scoreSound = null;
                this.presentAlert();
                return;
            }
            if (this.pipe[i].x == 5) {
                this.score++;
                if (this.scoreSound)
                    this.scoreSound.play();
            }
        }
        this.gameContext.drawImage(this.ground, 0, this.gameCanvas.nativeElement.height - this.ground.height);
        this.gameContext.drawImage(this.nghia, this.bX, this.bY);
        this.bY += this.gravity;
        requestAnimationFrame(this.draw.bind(this));
    }
    moveUp() {
        this.bY -= 30;
        if (this.flySound)
            this.flySound.play();
    }
    drawNewPipes(i) {
        this.constant = this.pipeNorth.height + this.gap;
        this.gameContext.drawImage(this.pipeNorth, this.pipe[i].x, this.pipe[i].y);
        this.gameContext.drawImage(this.pipeSouth, this.pipe[i].x, this.pipe[i].y + this.constant);
        this.pipe[i].x--;
        if (this.pipe[i].x == 45) {
            this.pipe.push({
                x: this.gameCanvas.nativeElement.width,
                y: Math.floor(Math.random() * this.pipeNorth.height) - this.pipeNorth.height
            });
        }
    }
    presentAlert() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                header: 'Game Over!!!!',
                message: 'Du hast ' + this.score + (this.score > 1 ? ' Punkte' : ' Punkt'),
                backdropDismiss: false,
                buttons: [{
                        text: 'OK',
                        handler: () => {
                            this.router.navigate(["/"]);
                        }
                    }]
            });
            yield alert.present();
        });
    }
};
GamePage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"] }
];
GamePage.propDecorators = {
    gameCanvas: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['canvas', { static: true },] }]
};
GamePage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-game',
        template: _raw_loader_game_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_game_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], GamePage);



/***/ }),

/***/ "Wr0u":
/*!***************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/game/game.page.html ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content>\n  <div class=\"play-ground\" (click)=\"moveUp()\">\n    <h3><b><i>Score: {{ score }} </i></b></h3>\n    <canvas \n      id=\"canvas\" \n      width=\"288\" \n      height=\"512\"\n      #canvas\n    >\n    </canvas>\n  </div>\n</ion-content>\n");

/***/ }),

/***/ "ekgB":
/*!*************************************!*\
  !*** ./src/app/game/game.module.ts ***!
  \*************************************/
/*! exports provided: GamePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GamePageModule", function() { return GamePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _game_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./game-routing.module */ "/mCa");
/* harmony import */ var _game_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./game.page */ "9/LI");







let GamePageModule = class GamePageModule {
};
GamePageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _game_routing_module__WEBPACK_IMPORTED_MODULE_5__["GamePageRoutingModule"]
        ],
        declarations: [_game_page__WEBPACK_IMPORTED_MODULE_6__["GamePage"]]
    })
], GamePageModule);



/***/ }),

/***/ "pdH3":
/*!*************************************!*\
  !*** ./src/app/game/game.page.scss ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".play-ground {\n  text-align: center;\n  background-color: black;\n  height: 100%;\n  padding: 2px 0;\n}\n.play-ground h3 {\n  color: white;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2dhbWUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksa0JBQUE7RUFDQSx1QkFBQTtFQUNBLFlBQUE7RUFDQSxjQUFBO0FBQ0o7QUFDSTtFQUNJLFlBQUE7QUFDUiIsImZpbGUiOiJnYW1lLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5wbGF5LWdyb3VuZCB7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBwYWRkaW5nOiAycHggMDtcblxuICAgIGgzIHtcbiAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgIH1cbn1cblxuIl19 */");

/***/ })

}]);
//# sourceMappingURL=game-game-module.js.map