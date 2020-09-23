
class SettingsScene extends Phaser.Scene
{
  constructor()
  {
    super("SettingsScene");
    this.key = "SettingsScene";
  }
  preload()
  {
    let pluginURL = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexsliderplugin.min.js';
    this.load.plugin('rexsliderplugin', pluginURL, true);
    this.load.image('sliderHandle', "./assets/images/sliderHandle");
  }
  create()
  {
    //reference to title screen scene
    this.titleRef = this.scene.get("TitleScene");
    //add volume control
    let volumeControl = this.add.text(100,100, "Volume Level:", {font: '30px Arial', fill:"white"}).setInteractive({useHandCursor: true});

    this.img = this.add.image(370+200,115,"sliderHandle").setScale(3,3);
    this.img.slider = this.plugins.get('rexsliderplugin').add(this.img,
      {endPoints: [{x: this.img.x - 200, y: 115}, {x: this.img.x + 200, y: 115}],
       value: gameSettings.volume
      });
    this.add.graphics().lineStyle(3, 0xffffff, 1).strokePoints(this.img.slider.endPoints);

    //add difficulty select
    let difficultyControl = this.add.text(100, 200, "Difficulty:", {font: '30px Arial', fill:"white"});
    let easyButton = this.add.text(300, 200, "EASY", {font: '30px Arial', fill:"white"}).setInteractive({useHandCursor: true});
    easyButton.on("pointerdown",() => this.click(0));
    let normalButton = this.add.text(450, 200, "NORMAL", {font:'30px Arial', fill:"white"}).setInteractive({useHandCursor: true});
    normalButton.on("pointerdown",() => this.click(1));
    let hardButton = this.add.text(650, 200, "HARD", {font:'30px Arial', fill:"white"}).setInteractive({useHandCursor: true});
    hardButton.on("pointerdown",() => this.click(2));
    this.buttonArr = [easyButton, normalButton, hardButton];

    //initialize current difficulty
    this.buttonArr[gameSettings.difficulty + 1].setColor("yellow");

    //add test button
    let testButton = this.add.text(100,300,"Test menu", {font:"30px Arial", fill:"white"}).setInteractive({useHandCursor: true});
    testButton.on('pointerdown', () => this.clickTest())
    //add back button
    let backButton = this.add.text(100,400,"Return to title screen",{font: '30px Arial', fill:"white"}).setInteractive({useHandCursor: true});
    backButton.on('pointerdown', () => this.clickBack());
  }

  update()
  {
    gameSettings.volume = this.img.slider.value;
    this.sound.setVolume(gameSettings.volume);
  }

  click(x)
  {
    if(gameSettings.difficulty != (-1 + x))
    {
      for(let i = 0; i <= 2; i++)
      {
        this.buttonArr[i].setColor("white");
      }
      gameSettings.difficulty = (-1 + x);
      this.buttonArr[x].setColor("yellow");
    }
  }

  clickBack()
  {
    this.titleRef.titleMusic.stop();
    this.scene.pause();
    this.scene.start("TitleScene");
  }

  clickTest()
  {
    this.scene.pause();
    this.scene.start("BattleSimulationScene");
  }
}
