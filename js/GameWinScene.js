class GameWinScene extends Phaser.Scene
{
  constructor()
  {
    super("GameWinScene");
  }
  preload()
  {
    this.load.image('victory', './assets/gameWin.png');
    this.load.audio("wsound", "assets/audio/winMusic.mp3");
    this.load.audio("fsound", "assets/audio/finalVoice.mp3");
    this.load.atlas('fgibb', './assets/sprites/finalgibb/gibbo.png', './assets/sprites/finalgibb/gibbo.json');
		this.load.atlas('fgill', './assets/sprites/finalgill/profGill.png', './assets/sprites/finalgill/profGill.json');
		this.load.atlas('fplayer', './assets/sprites/finalplayer/finalp.png', './assets/sprites/finalplayer/finalp.json');
    this.load.atlas('textfinal', './assets/sprites/finalDialogue/dialogue.png', './assets/sprites/finalDialogue/dialogue.json');

  }
  create()
  {
    //add sound to scene
    game.sound.stopAll();
    this.gameWinTrack = this.sound.add("wsound");
    this.dialogueSoundFinal = this.sound.add("fsound");
    //config variable for music
    var musicConfig =
    {
      mute: false,
      volume: 0.45 * gameSettings.volume,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
    }
    this.gameWinTrack.play(musicConfig);

    //config variable for dialogue audio effect
    var musicConfig5 =
    {
      mute: false,
      volume: 1 * gameSettings.volume,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0
    }
    this.dialogueSoundFinal.play(musicConfig5);
    //end music section

    //display victory image
    this.gameWinImage = this.physics.add.image(500, 200, "victory");
    //add gibbons,player and gill sprites
   // this.finalGibb = this.physics.add.sprite(450,500, "Gibbons");
   // this.finalGill = this.physics.add.sprite(540,500, "Gill");

   //add gibbons and create animation
    this.finalGibb = this.physics.add.sprite(450, 500, "fgibb");
    this.anims.create({
      key: 'dance1',
      frames: this.anims.generateFrameNames('fgibb', {
        start: 0,
        end: 9,
        zeroPad: 3,
        prefix: 'tile',
        suffix: '.png'
      }),
      frameRate: 4,
      repeat: -1,
    });
    this.finalGibb.play("dance1");

    //add gill and create animation
    this.finalGill = this.physics.add.sprite(550,500,"fgill");
    this.anims.create({
      key: 'dance2',
      frames: [
        {
          key: 'fgill',
          frame: "tile000.png"
        },
        {
          key: 'fgill',
          frame: "tile001.png"
        },
        {
          key: 'fgill',
          frame: "tile002.png"
        },
        {
          key: 'fgill',
          frame: "tile003.png"
        },
        {
          key: 'fgill',
          frame: "tile004.png"
        },
        {
          key: 'fgill',
          frame: "tile010.png"
        },
        {
          key: 'fgill',
          frame: "tile011.png"
        },
        {
          key: 'fgill',
          frame: "tile012.png"
        },
        {
          key: 'fgill',
          frame: "tile013.png"
        },
        {
          key: 'fgill',
          frame: "tile014.png"
        },
      ],
      frameRate: 4,
      repeat: -1
    });
    
    this.finalGill.play("dance2");

    //add player and create animation
    this.finalPlayer = this.physics.add.sprite(500, 500, "fplayer");
    this.anims.create({
      key: 'dance3',
      frames: this.anims.generateFrameNames('fplayer', {
        start: 0,
        end: 4,
        zeroPad: 3,
        prefix: 'tile',
        suffix: '.png'
      }),
      frameRate: 4,
      repeat: -1,
    });
    this.finalPlayer.play("dance3");


    //create animation for the congratulation message
    this.finalTextAnim = this.physics.add.sprite(500,400, "textfinal");
    this.finalTextAnim.setDepth(13);
    this.anims.create({
      key: 'congratulate',
      frames: this.anims.generateFrameNames('textfinal', {
        start: 1,
        end: 47,
        zeroPad: 5,
        prefix: 'tile',
        suffix: '.png'
      }),
      frameRate: 17,
      repeat: 0,
    });
    this.finalTextAnim.play('congratulate');

      //create play again text
      var gameOvertext = this.add.bitmapText(450, 700, "pixelFont", "play again ", 20).setInteractive({ useHandCursor: true });
      gameOvertext.on('pointerdown', function () { location.reload(); });


  }
}
