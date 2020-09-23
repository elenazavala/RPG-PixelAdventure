class LibraryScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LibraryScene' });
    this.key = 'LibraryScene'
  }

  preload() {
    //load necessary images
    this.load.image("tiles", "./assets/tilesets/worldKU.png");
    this.load.tilemapTiledJSON("mapLib", "./assets/tilemaps/library.json");
    this.load.audio("libraryMusic", "assets/audio/librarymusic.mp3")
    this.load.audio("secret", "assets/audio/secretsound.mp3")
  }

  create() {
    //start of music section.......................................
    game.sound.stopAll();
    this.campusMusic = this.sound.add("libraryMusic");
    this.secretSound = this.sound.add("secret");
    //config variable for music
    var musicConfig =
    {
      mute: false,
      volume: 0.3 * gameSettings.volume,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    }
    this.campusMusic.play(musicConfig);
    //end music section...............................................

    //create const map
    const mapLib = this.make.tilemap({ key: "mapLib" });

    //add tileset to map
    const tileset = mapLib.addTilesetImage("worldKU", "tiles");

    //create layers
    const aboveLayer = mapLib.createStaticLayer("Above", tileset, 0, 0);
    const belowLayer = mapLib.createStaticLayer("Below Player", tileset, 0, 0);
    const worldLayer = mapLib.createStaticLayer("World", tileset, 0, 0);

    //set collision
    worldLayer.setCollisionByProperty({ collision: true });

    //aboveLayer.setDepth(10); //had to coment this out otherwise book wouldnt disappear idk why

    //find spawn point on map
    const spawnPoint = mapLib.findObject("Objects", obj => obj.name === "Spawn Point");

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

    //create book object
    this.bookObject = this.add.image(549, 443, "libro").setInteractive({ useHandCursor: true });
    this.bookObject.on('pointerdown', () => this.clickBook());

    //dialogue box section.......................................
    this.dialogueBox = this.add.image(528, 415, "textbox");
    this.dialogueBox.visible = false
    this.dialogueBook = this.add.bitmapText(398, 400, "pixelFont", " You read the book! \n Your knowledge has increased.", 17);
    this.dialogueBook.visible = false
    this.xButton = this.add.image(643, 402, "exit").setInteractive({ useHandCursor: true });
    this.xButton.on('pointerdown', () => this.clickExit());
    this.xButton.visible = false
    //end dialogue box section.......................................

    //collider
    this.physics.add.collider(player, worldLayer);
    //add player animations
    //add player right animations
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
    camera.setBounds(0, 0, mapLib.widthInPixels, mapLib.heightInPixels);

    cursors = this.input.keyboard.createCursorKeys();

    //exit libr
    worldLayer.setTileLocationCallback(15, 16, 1, 1, exitLib, this);
    worldLayer.setTileLocationCallback(16, 16, 1, 1, exitLib, this);

    function exitLib() {  //function to exit library scene and into world scene
      lib = true;
      game.scene.keys['LibraryScene'].sys.sleep();
      game.scene.keys['WorldScene'].sys.wake();
      this.scene.switch('WorldScene');
    }
    engrLeft = false;
    engrRight = false;
  }

  //for when clicking book, dialogue box appears
  clickBook() {
    this.bookObject.visible = false;
    player.knowledgeUp();
    var musicConfig2 =
    {
      mute: false,
      volume: 2 * gameSettings.volume,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0
    }
    this.secretSound.play(musicConfig2);
    this.dialogueBox.visible = true
    this.dialogueBook.visible = true
    this.xButton.visible = true
    player.energyDownStudy();//energy goes down from learning

  }

  //for when clicking exit, everything disappears
  clickExit() {
    this.dialogueBox.visible = false;
    this.dialogueBook.visible = false;
    this.xButton.visible = false;
    this.bookObject.visible = false;
  }

  update(time, delta) {
    if(player.getEnergy() <= 0 )//check for game over condition
    {
      gameOver(this);
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
      player.anims.play('left', true);//play animations left movement
    } else if (cursors.right.isDown) {
      player.anims.play('right', true);//play animations right movement
    } else if (cursors.up.isDown) {
      player.anims.play('up', true);//play animations up movement
    } else if (cursors.down.isDown) {
      player.anims.play('down', true);//play animations down movement
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
