class McLnScene extends Phaser.Scene {
  constructor() {
    super({ key: 'McLnScene' });
    this.key = 'McLnScene';
  }

  preload() {
    //load necessary images
    this.load.image("tiles", "./assets/tilesets/worldKU.png");
    this.load.tilemapTiledJSON("map5", "./assets/tilemaps/mcLains.json");
    this.load.audio("mclainssong", "assets/audio/mclains_song.mp3");
    this.load.audio("bigItem", "assets/audio/bigitem.mp3")
  }

  create() {
    //start of music section.......................................
    game.sound.stopAll();
    this.mclainsMusic = this.sound.add("mclainssong");
    this.bigSound = this.sound.add("bigItem");
    //config variable for music
    var musicConfig =
    {
      mute: false,
      volume: 0.4,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    }
    this.mclainsMusic.play(musicConfig);
    //end of music section.......................................

    //create const map
    const map5 = this.make.tilemap({ key: "map5" });

    //add tileset to map
    const tileset = map5.addTilesetImage("worldKU", "tiles");

    //create layers
    const belowLayer = map5.createStaticLayer("Below Player", tileset, 0, 0);
    const worldLayer = map5.createStaticLayer("World", tileset, 0, 0);

    //set collision
    worldLayer.setCollisionByProperty({ collision: true });

    //find spawn point on map
    const spawnPoint = map5.findObject("Objects", obj => obj.name === "Spawn Point");

    //create coffee object
    this.cupOfCoffee = this.add.image(463, 354, "coffee").setInteractive({ useHandCursor: true });
    this.cupOfCoffee.on('pointerdown', () => this.clickCoffee());

    //start of coffee dialogue section.......................................
    this.dialogueBox = this.add.image(528, 415, "textbox");
    this.dialogueBox.visible = false
    this.dialogueCoffee = this.add.bitmapText(398, 400, "pixelFont", " You drinked the coffee! \n Your energy has increased.", 17);
    this.dialogueCoffee.visible = false
    this.xButton = this.add.image(643, 402, "exit").setInteractive({ useHandCursor: true });;
    this.xButton.on('pointerdown', () => this.clickExit());
    this.xButton.visible = false
    //end of coffee dialogue section.......................................

    //set Energy bar
    var backgroundBar = this.add.image(195, 730, "red-bar");
    EnergyBar = this.add.image(EnergyBar.x, 730, "green-bar");
    backgroundBar.fixedToCamera = true;
    EnergyBar.fixedToCamera = true;
    backgroundBar.setScrollFactor(0);
    EnergyBar.setScrollFactor(0);

    this.healthLabel = this.add.bitmapText(20, 725, "pixelFont", "ENERGY: ", 20);
    this.healthLabel.setScrollFactor(0);

    //set Knowledge bar
    var backBar = this.add.image(195, 698, "red-knowledge");
    KnowledgeBar = this.add.image(KnowledgeBar.x, 698, "green-knowledge");
    backBar.fixedToCamera = true;
    KnowledgeBar.fixedToCamera = true;
    backBar.setScrollFactor(0);
    KnowledgeBar.setScrollFactor(0);

    this.healthLabel = this.add.bitmapText(6, 693, "Font-knowledge-bar", "KNOWLEDGE: ", 20);
    this.healthLabel.setScrollFactor(0);

    //add player to spawn point
    player = new Player({
      scene: this,
      x: spawnPoint.x,
      y: spawnPoint.y,
      key: 'player',
      energy: energy,
      knowledge: kn
    });

    //collider
    this.physics.add.collider(player, worldLayer);

    //add player animations right
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { start: 5, end: 9 }),
      frameRate: 10,
      repeat: -1
    });
    //add player left animations
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { start: 10, end: 14 }),
      frameRate: 10,
      repeat: -1
    });
    //add player up animations
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', { start: 15, end: 19 }),
      frameRate: 10,
      repeat: -1
    });
    //add player down animations
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', { start: 1, end: 4 }),
      frameRate: 10,
      repeat: -1
    });

    //default camera
    const camera = this.cameras.main;
    camera.startFollow(player);
    camera.setBounds(0, 0, map5.widthInPixels, map5.heightInPixels);

    cursors = this.input.keyboard.createCursorKeys();
    //exit engr
    worldLayer.setTileLocationCallback(13, 14, 1, 1, exitmcL, this);

    function exitmcL() { //function to exit scene and into world scene
      mcL = true;
      game.scene.keys['McLnScene'].sys.sleep();
      game.scene.keys['WorldScene'].sys.wake();
      this.scene.switch('WorldScene');
    }
  }

  //for when clicking coffee, dialogue box appears
  clickCoffee() {
    var musicConfig2 =
    {
      mute: false,
      volume: 10*gameSettings.volume,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0
    }
    this.bigSound.play(musicConfig2);
    this.dialogueBox.visible = true
    this.dialogueCoffee.visible = true
    player.energyUp();
    player.energyUp();//the coffee from the shop gives the player 3 times the energy of a regular coffee
    player.energyUp();
    this.xButton.visible = true
    this.cupOfCoffee.visible = false //bye coffee
  }
  //for when clicking x button, dialogue box
  clickExit() {
    this.dialogueBox.visible = false
    this.dialogueCoffee.visible = false
    this.xButton.visible = false
  }

  update(time, delta) {
    if(player.getEnergy() <= 0 )//check for game over condition
    {
      gameOver(this);//game over function call
    }
    //player speed
    const speed = 100 * gameSettings.playerSpeed;
    const prevVelocity = player.body.velocity.clone();

    //stop previous movements
    player.body.setVelocity(0);

    //move left/right
    if (cursors.left.isDown) {
      player.body.setVelocityX(-speed);
      player.energyDown();//method to decrease energy (part of the player class)
    } else if (cursors.right.isDown) {
      player.body.setVelocityX(speed);
      player.energyDown();//method to decrease energy (part of the player class)
    }

    //move up/down
    if (cursors.up.isDown) {
      player.body.setVelocityY(-speed);
      player.energyDown();//method to decrease energy (part of the player class)
    } else if (cursors.down.isDown) {
      player.body.setVelocityY(speed);
      player.energyDown();//method to decrease energy (part of the player class)
    }

    //moving diagonally aint faster
    player.body.velocity.normalize().scale(speed);

    //player movement animation
    if (cursors.left.isDown) {
      player.anims.play('left', true);
    } else if (cursors.right.isDown) {
      player.anims.play('right', true);
    } else if (cursors.up.isDown) {
      player.anims.play('up', true);
    } else if (cursors.down.isDown) {
      player.anims.play('down', true);
    } else {
      player.anims.stop();

      //last moving frame
      if (prevVelocity.x < 0) player.frame = player.texture.get(10);
      else if (prevVelocity.x > 0) player.frame = player.texture.get(9);
      else if (prevVelocity.y < 0) player.frame = player.texture.get(19);
      else if (prevVelocity.y > 0) player.frame = player.texture.get(0);
    }
  }
}
