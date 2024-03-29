// screen size
const SCREEN_W = 1920;
const SCREEN_H = 1080;

// game states
const STATE_INIT = 1;
const STATE_RESTART = 2;
const STATE_PLAY = 3;
const STATE_GAMEOVER = 4;

// current state
var state = STATE_INIT;

// coordinates of the screen center
const SCREEN_CX = SCREEN_W / 2;
const SCREEN_CY = SCREEN_H / 2;

//Main Scene
class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMain" });
  }

  preload() {
    this.preload.image("imgBack", "./assets/img_back.jpg");
  }

  create() {
    this.sprBack = this.add.image(SCREEN_CX, SCREEN_CY, "imgBack");

    this.input.keyboard.on(
      "keydown-P",
      function () {
        console.log("Game is paused. Press [P] to resume.");
        this.scene.pause();
        this.scene.launch("ScenePause");
      },
      this
    );
  }

  update(time, delta) {
    switch (state) {
      case STATE_INIT:
        console.log("Init game.");
        state = STATE_RESTART;
        break;
      case STATE_RESTART:
        console.log("Restart game.");
        state = STATE_PLAY;
        break;
      case STATE_GAMEOVER:
        console.log("Game over");
        break;
    }
  }
}

//Pause Scene
class PauseScene extends Phaser.Scene {
  constructor() {
    super({ key: "ScenePause" });
  }

  create() {
    this.input.keyboard.on(
      "keydown-P",
      function () {
        this.scene.resume("SceneMain");
        this.scene.stop();
      },
      this
    );
  }
}

//game configuration
var config = {
  type: Phaser.AUTO,
  width: SCREEN_W,
  height: SCREEN_H,

  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },

  scene: [MainScene, PauseScene]
};
