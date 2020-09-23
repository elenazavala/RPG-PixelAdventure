//global variables
  //attributes for a attack:move, power of attack, cost to use(currently unused), % accuracy to hit, multiplier to the 1/8 crit chance
  let attackArr = [{name:"Inheritance",basePower:40, cost:5, accuracy:95, critRate:1}]
	//ideas for other attacks: recursion, sort, data structure
  let examAttackArr = [{name:"Interface", basePower:30, cost:0, accuracy:95,critRate:0}]
  let player; //declaration of player object
  let cursors; //variable that will be used later to control player
  let EnergyBar; //declaration of the energy bar
  let KnowledgeBar;//declaration of knowledge bar
  let spawnPoint;//variable that will be used to get player'spawn points
  let energy = 100; //set player's energy
  let kn = 0;//set player's knowledge
  let count = 0;
  let currentBattle = 1;//current in-game battle count
  let battleCount = 1;
  let gameSettings = {difficulty:0,//-1 is easy, 0 is normal, 1 is hard
                      volume:.5,//multiplier
                      playerSpeed:1//multiplier
                      };

class TitleScene extends Phaser.Scene {
	constructor() {
		super({ key: 'TitleScene' });
	}

	preload() {
		this.load.image('background', './assets/background.png');
    this.load.image('battleSceneBG','./assets/images/bcbg.png')
		this.load.spritesheet('player', "./assets/sprites/Player.png", { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('attButton', "./assets/images/attButton.png",{frameWidth:300, frameHeight: 75});
		this.load.image("green-bar", "assets/health-green.png");
		this.load.image("red-bar", "assets/health-red.png");
		this.load.bitmapFont("pixelFont", "font/font.png", "font/font.xml");
		this.load.bitmapFont("Font-knowledge-bar", "font_knowledge_bar/font.png", "font_knowledge_bar/font.xml");
		this.load.image("green-knowledge", "assets/green-knowledge.png");
		this.load.image("red-knowledge", "assets/red-knowledge.png");
		this.load.spritesheet("exam", "./assets/sprites/exam.png", { frameWidth: 32, frameHeight: 32 })
		this.load.audio("titlesong", "assets/audio/title_song.mp3")
		this.load.image("coffee", "./assets/cafe.png");
		this.load.image("kuBus", "./assets/sprites/bus.png");
		this.load.image("talkButton", "./assets/talk.png");
		this.load.audio("campussong", "assets/audio/campustheme.mp3");
		this.load.audio("itemSonidito", "assets/audio/itemget.mp3");
		this.load.image("libro", "./assets/book.png");
		this.load.image("textbox", "./assets/mclainsTextBox.png");
		this.load.image("exit", "./assets/exitbutton.png");
		this.load.audio("voz1", "assets/audio/voice1.mp3");
		this.load.audio("voz2", "assets/audio/voice2.mp3");
		this.load.audio("voz3", "assets/audio/voice3.mp3");
		this.load.atlas('npc1', './assets/sprites/larajean/spritesheet1.png', './assets/sprites/larajean/spritesheet1.json');
		this.load.atlas('npc2', './assets/sprites/pam/spritesheet2.png', './assets/sprites/pam/spritesheet2.json');
		this.load.atlas('npc3', './assets/sprites/jim/spritesheet3.png', './assets/sprites/jim/spritesheet3.json');
		this.load.atlas('npc4', './assets/sprites/bolt/bolt.png', './assets/sprites/bolt/bolt.json');
		this.load.atlas('npc5', './assets/sprites/driver/driver.png', './assets/sprites/driver/driver.json');
		this.load.atlas('npc6', './assets/sprites/juanchi/juanchi.png', './assets/sprites/juanchi/juanchi.json');
		this.load.atlas('npc7', './assets/sprites/gino/gino.png', './assets/sprites/gino/gino.json');
		this.load.atlas('npc8', './assets/sprites/mumu/mumu.png', './assets/sprites/mumu/mumu.json');
		this.load.atlas('npc9', './assets/sprites/bubu/bubu.png', './assets/sprites/bubu/bubu.json');
		this.load.atlas('npc10', './assets/sprites/douche/douche.png', './assets/sprites/douche/douche.json');
		this.load.atlas('npc11', './assets/sprites/daniel/daniel.png', './assets/sprites/daniel/daniel.json');
		this.load.atlas('npc12', './assets/sprites/emma/emma.png', './assets/sprites/emma/emma.json');
		this.load.atlas('npc13', './assets/sprites/gloria/gloria.png', './assets/sprites/gloria/gloria.json');
		this.load.atlas('npc14', './assets/sprites/haley/haley.png', './assets/sprites/haley/haley.json');
		this.load.atlas('npc15', './assets/sprites/kelly/kelly.png', './assets/sprites/kelly/kelly.json');
		this.load.atlas('npc16', './assets/sprites/bitty/bitty.png', './assets/sprites/bitty/bitty.json');
		this.load.atlas('npc17', './assets/sprites/joe/joe.png', './assets/sprites/joe/joe.json');
		this.load.atlas('npc18', './assets/sprites/juliet/juliet.png', './assets/sprites/juliet/juliet.json');
		this.load.atlas('npc19', './assets/sprites/lulu/lulu.png', './assets/sprites/lulu/lulu.json');
		this.load.atlas('npc20', './assets/sprites/matty/matty.png', './assets/sprites/matty/matty.json');
		this.load.atlas('npc21', './assets/sprites/mimi/mimi.png', './assets/sprites/mimi/mimi.json');
		this.load.atlas('npc22', './assets/sprites/olivia/olivia.png', './assets/sprites/olivia/olivia.json');
		this.load.atlas('npc23', './assets/sprites/prof_1/prof_1.png', './assets/sprites/prof_1/prof_1.json');
		this.load.atlas('npc24', './assets/sprites/prof_2/prof_2.png', './assets/sprites/prof_2/prof_2.json');
		this.load.atlas('npc25', './assets/sprites/prof3/prof3.png', './assets/sprites/prof3/prof3.json');
		this.load.atlas('npc26', './assets/sprites/rob/rob.png', './assets/sprites/rob/rob.json');
		this.load.atlas('npc27', './assets/sprites/tai/tai.png', './assets/sprites/tai/tai.json');
		this.load.atlas('npc28', './assets/sprites/toby/toby.png', './assets/sprites/toby/toby.json');
		this.load.atlas('npc29', './assets/sprites/harry/spritesheet4.png', './assets/sprites/harry/spritesheet4.json');
		this.load.atlas('npc30', './assets/sprites/sara/sara.png', './assets/sprites/sara/sara.json');
		this.load.atlas('textpam', './assets/sprites/pam/spritesheet_text1.png', './assets/sprites/pam/spritesheet_text1.json');
		this.load.atlas('textjuan', './assets/sprites/juanchi/dialogue/monkey.png', './assets/sprites/juanchi/dialogue/monkey.json');
		this.load.atlas('textsara', './assets/sprites/sara/dialogue/triedCoffee.png', './assets/sprites/sara/dialogue/triedCoffee.json');
		this.load.atlas('bicicleta', './assets/sprites/bike/bike.png', './assets/sprites/bike/bike.json');

	}
	create() {
		//start of music section.......................................
		this.titleMusic = this.sound.add("titlesong");
		//config variable for music
		var musicConfig =
		{
			mute: false,
			volume: 0.5,
			rate: 1,
			detune: 0,
			seek: 0,
			loop: true,
			delay: 0
		}
		this.titleMusic.play(musicConfig);
		//end of music section.......................................

		//counter
		count++;
		if(count > 1)
		{
  			energy = 100; //set player's energy
  			kn = 0;//set player's knowledge
  			currentBattle = 1;//current in-game battle count
  			battleCount = 1;
		}

		/*
		declaration of bars has to be made in this scene in order to be able to change the value of both energy and knowledge bar
		throughout all other scenes
		*/
		//set Energy bar
		var backgroundBar = this.add.image(195, 730, "red-bar");
		EnergyBar = this.add.image(195, 730, "green-bar");
		backgroundBar.fixedToCamera = true;
		EnergyBar.fixedToCamera = true;
		backgroundBar.setScrollFactor(0);
		EnergyBar.setScrollFactor(0);

		this.healthLabel = this.add.bitmapText(20, 725, "pixelFont", "ENERGY: ", 20);
		this.healthLabel.setScrollFactor(0);

		//set Knowledge bar
		var backBar = this.add.image(195, 698, "red-knowledge");
		KnowledgeBar = this.add.image(95, 698, "green-knowledge");
		backBar.fixedToCamera = true;
		KnowledgeBar.fixedToCamera = true;
		backBar.setScrollFactor(0);
		KnowledgeBar.setScrollFactor(0);

		this.healthLabel = this.add.bitmapText(6, 693, "Font-knowledge-bar", "KNOWLEDGE: ", 20);
		this.healthLabel.setScrollFactor(0);
		var button = this.add.text(445, 493, 'START', { fontSize: '70px', });

		var bg = this.add.image(0, 0, 'background');
		bg.setOrigin(0, 0);
		button.setInteractive({ useHandCursor: true });
		button.on('pointerdown', () => this.clickButton());
    this.add.text(50, 0, "May 7, 2020 Release", {font: "25px Arial", fill: "white"});
    //add Settings button
    var settingsButton = this.add.text(760, 710, "SETTINGS", {font: 'bold 50px Arial', fill:"black"}).setInteractive();
    settingsButton.on('pointerdown', () => this.clickSettings());
    settingsButton.setOrigin(0,0);
	}
	clickButton() {
		this.titleMusic.stop();
    //create scenes
    let worldScene = new WorldScene();
    let libraryScene = new LibraryScene();
    let engrScene = new EngrScene();
    let engrLScene = new EngrLScene();
    let engrRScene = new EngrRScene();
    let mcLnScene = new McLnScene();
    let gameOverScene = new GameOverScene();
    let gameWinScene = new GameWinScene();
    //add scenes to the scene manager
    this.scene.add("WorldScene", worldScene);
    this.scene.add("LibraryScene", libraryScene);
    this.scene.add("EngrScene", engrScene);
    this.scene.add("EngrLScene", engrLScene);
    this.scene.add("EngrRScene", engrRScene);
    this.scene.add("McLnScene", mcLnScene);
    this.scene.add("GameOverScene", gameOverScene);
    this.scene.add("GameWinScene", gameWinScene);
    //start world scene
		this.scene.start('WorldScene');
	}
  clickSettings()
  {
    this.scene.pause();
    this.scene.start("SettingsScene");
  }
}
