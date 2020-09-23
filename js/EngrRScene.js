class EngrRScene extends Phaser.Scene {
  constructor() {
    super({ key: 'EngrRScene' });
    this.key = 'EngrRScene';
  }

  preload() {
    //load necessary images
    this.load.image("tiles", "./assets/tilesets/worldKU.png");
    this.load.tilemapTiledJSON("map4", "./assets/tilemaps/engrRight.json");
    this.load.spritesheet('Gibbons', "./assets/sprites/Gibbons.png", { frameWidth: 32, frameHeight: 32 });//load Gibbons sprite
    this.load.image("boxBack", "assets/box1.png");//load chat box
    this.load.audio("preBattleSong", "assets/audio/engrRghtMusic.mp3")

  }

  create() {
    //start of music section.......................................
    game.sound.stopAll();
    this.campusMusic = this.sound.add("preBattleSong");
    //config variable for music
    var musicConfig =
    {
      mute: false,
      volume: 1 * gameSettings.volume,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    }
    this.campusMusic.play(musicConfig);
    //end music section...............................................

    //create const map
    const map4 = this.make.tilemap({ key: "map4" });

    //add tileset to map
    const tileset = map4.addTilesetImage("worldKU", "tiles");

    //create layers
    const belowLayer = map4.createStaticLayer("Below Player", tileset, 0, 0);
    const worldLayer = map4.createStaticLayer("World", tileset, 0, 0);

    //set collision
    worldLayer.setCollisionByProperty({ collision: true });

    //find spawn point on map
    const spawnPoint = map4.findObject("Objects", obj => obj.name === "Spawn Point");
    const gibspawnPoint = map4.findObject("Objects", obj => obj.name === "Gib-Spawn");

    //start of bars section.......................................
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
    //end of bars section.......................................

    //add player to spawn point
    player = new Player({
      scene: this,
      x: spawnPoint.x,
      y: spawnPoint.y,
      key: 'player',
      energy: energy,
      knowledge: kn
    });

    //add Gibbons sprite to scene
    let gibbons = this.physics.add.sprite(420, 335, "Gibbons");


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
    camera.setBounds(0, 0, map4.widthInPixels, map4.heightInPixels);

    //talk to gibbons
    this.physics.add.overlap(player, gibbons, this.clickBook, null, this)

    this.dialogueBox = this.add.image(550, 290, "textbox");
    this.dialogueBox.visible = false
    this.dialogueBook = this.add.bitmapText(430, 277, "pixelFont", " its exam day! \n Click OK to begin", 17);
    this.dialogueBook.setInteractive({ useHandCursor: true });
    this.dialogueBook.on('pointerdown', () => this.enterBattle());
    this.dialogueBook.visible = false
    this.xButton = this.add.image(665, 274, "exit").setInteractive({ useHandCursor: true });
    this.xButton.on('pointerdown', () => this.clickExit());
    this.xButton.visible = false




    cursors = this.input.keyboard.createCursorKeys();
    //exit engr
    worldLayer.setTileLocationCallback(10, 13, 1, 1, exitEngrR, this);



    function exitEngrR() { //function to exit scene and into previous scene
      game.scene.keys['EngrRScene'].sys.sleep();
      game.scene.keys['EngrScene'].sys.wake();
      this.scene.switch('EngrScene');
    }
  }

  //dialogue for talking to Gill
  clickBook() {

  this.dialogueBox.visible = true;
  this.dialogueBook.visible = true;
  this.xButton.visible = true;
  //for when clicking exit, everything disappears
  }
  clickExit() {
  this.dialogueBox.visible = false;
  this.dialogueBook.visible = false;
  this.xButton.visible = false;
  }

  enterBattle() {
    //this is where you call the function to transition to battle scene
    //destroy the box when the button is pressed

    if(battleCount == 1)
      {
        //sleep current scene
        this.scene.pause();

        //create new BattleScene instance passing in its scene key and current scene key
        //the battle scene will wake and switch back to this scene
        let battle1 = new BattleScene("Battle1", "EngrRScene");
        //add to scene manager in config
        this.scene.add("Battle1", battle1);
        //start battle
        this.scene.start("Battle1");
      }
      else if(battleCount == 2)
      {
        //sleep current scene
        this.scene.pause();

        //create new BattleScene instance passing in its scene key and current scene key
        //the battle scene will wake and switch back to this scene
        let battle2 = new BattleScene("Battle2", "EngrRScene");
        //add to scene manager in config
        this.scene.add("Battle2", battle2);
        //start battle
        this.scene.start("Battle2");
      }
      else if(battleCount == 3)
      {
        //sleep current scene
        this.scene.pause();

        //create new BattleScene instance passing in its scene key and current scene key
        //the battle scene will wake and switch back to this scene
        let battle3 = new BattleScene("Battle3", "EngrRScene");
        //add to scene manager in config
        this.scene.add("Battle3", battle3);
        //start battle
        this.scene.start("Battle3");
      }
      //check for completed battles
      else if(battleCount > 3)
      {
        game.scene.keys['EngrRScene'].sys.sleep();
        this.scene.switch("GameWin");
      }
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
