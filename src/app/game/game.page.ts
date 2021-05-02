import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  @ViewChild('canvas', { static: true }) gameCanvas;
  gameContext;
  background;
  ground;
  nghia;
  pipeNorth;
  pipeSouth;

  bX;
  bY;
  gap;
  gravity;
  score;
  constant;

  flySound;
  scoreSound;
  hitSound;

  pipe = [];

  constructor(private route: ActivatedRoute, private router: Router, private alertController: AlertController) { }

  startNewGame() {
    this.gameContext = this.gameCanvas.nativeElement.getContext("2d");

    this.background = new Image();
    this.background.src = "../../assets/images/bg.png"

    this.ground = new Image();
    this.ground.src = "../../assets/images/fg.png"

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
    }

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
        if (this.hitSound) this.hitSound.play();
        this.flySound = null;
        this.hitSound = null;
        this.scoreSound = null;
        this.presentAlert();
        return;
      }

      if (this.pipe[i].x == 5) {
        this.score++;
        if (this.scoreSound) this.scoreSound.play();
      }

    }

    this.gameContext.drawImage(this.ground, 0, this.gameCanvas.nativeElement.height - this.ground.height);
    this.gameContext.drawImage(this.nghia, this.bX, this.bY);

    this.bY += this.gravity;

    requestAnimationFrame(this.draw.bind(this));
  }

  moveUp() {
    this.bY -= 30;
    if (this.flySound) this.flySound.play();
  }

  drawNewPipes(i: number) {
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

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Game Over!!!!',
      message: 'Du hast ' + this.score + (this.score > 1 ? ' Punkte' : ' Punkt'),
      backdropDismiss: false,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(["/"]);
        }
      }]
    })

    await alert.present();
  }

}
