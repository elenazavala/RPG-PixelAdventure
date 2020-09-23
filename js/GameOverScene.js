class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOverScene");
  }
  preload() {

    this.load.atlas('player2', './assets/sprites/explodingPlayer/explodingPlayer.png', './assets/sprites/explodingPlayer/explodingPlayer.json');
    this.load.image('endgame', './assets/gameover.png');
    //this.load.image('replay', './assets/playAgain.png');
    this.load.bitmapFont("pixelFont", "font/font.png", "font/font.xml");
    this.load.audio("gsound1", "assets/audio/gameover1.mp3");
		this.load.audio("gsound2", "assets/audio/gameover2.mp3");



  }
  create() {
    //audio section
    game.sound.stopAll();
    this.gameOverMusic1 = this.sound.add("gsound1");
    this.gameOverMusic2 = this.sound.add("gsound2");
    this.gameOverMusic1.play();
        //config variable for music
        var musicConfig =
        {
          mute: false,
          volume: 0.45 * gameSettings.volume,
          rate: 1,
          detune: 0,
          seek: 0,
          loop: true,
          delay: 3
        }
        this.gameOverMusic2.play(musicConfig);

    //create play again text
    var gameOvertext = this.add.bitmapText(450, 700, "pixelFont", "play again ", 20).setInteractive({ useHandCursor: true });
    gameOvertext.on('pointerdown', function () { location.reload(); });

    //create player explosion
    this.death = this.physics.add.sprite(500, 400, "player2");
    this.anims.create({
      key: 'explosion',
      frames: this.anims.generateFrameNames('player2', {
        start: 0,
        end: 9,
        zeroPad: 3,
        prefix: 'tile',
        suffix: '.png',
        repeat: 0,
        hideOnComplete: true
      }),
      frameRate: 4,
      repeat: 0,
    });
    this.death.play("explosion");

    //create fading of the Game Over image
    this.gameOverImage = this.physics.add.image(500, 200, "endgame");
    this.gameOverImage.setAlpha(0);
    this.tweens.add({
      targets: this.gameOverImage,
      alpha: 1,
      delay: 3000,
      duration: 15000,
      ease: 'Power2'
    });


  }
}
