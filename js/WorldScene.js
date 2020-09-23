var inZone = false;
var dialogueNum = 0;

class WorldScene extends Phaser.Scene {
  constructor() {
    super({ key: 'WorldScene' });
    this.key = 'WorldScene';
  }

  /*
  |--------------------------------------------------------------------------
  | PreLoad
  |--------------------------------------------------------------------------
  */
  preload() {
    //load necessary images
    this.load.image("tiles", "./assets/tilesets/worldKU.png");
    this.load.tilemapTiledJSON("map", "./assets/tilemaps/worldMap.json");
  }

  /*
  |--------------------------------------------------------------------------
  | Create
  |--------------------------------------------------------------------------
  */
  create() {
    /*
    |--------------------------------------------------------------------------
    | GAME AUDIO SECTION
    |--------------------------------------------------------------------------
    */
    game.sound.stopAll();
    this.campusMusic = this.sound.add("campussong");
    this.itemGetSound = this.sound.add("itemSonidito");
    this.dialogueSound = this.sound.add("voz1");
    this.dialogueSound3 = this.sound.add("voz3");
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

    /*
    |--------------------------------------------------------------------------
    | PLAYER SECTION
    |--------------------------------------------------------------------------
    */
    //Player reaches a door
    this.hasPlayerReachedDoor = false;

    //create const map
    const map = this.make.tilemap({ key: "map" });

    //add tileset to map
    const tileset = map.addTilesetImage("worldKU", "tiles");

    //create layers
    const base = map.createStaticLayer("Below 3", tileset, 0, 0);
    const belowLayer = map.createStaticLayer("Below Player 1", tileset, 0, 0);
    const below2Layer = map.createStaticLayer("Below Player 2", tileset, 0, 0);
    const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
    const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);

    //set collision
    worldLayer.setCollisionByProperty({ collision: true });

    //above layer is above player
    aboveLayer.setDepth(10);

    //find spawn point on map
    if (first == true) {
      spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");
      first = false;
    }
    else if (engr == true) {
      spawnPoint = map.findObject("Objects", obj => obj.name === "engDoor");
      engr = false;
    }
    else if (mcL == true) {
      spawnPoint = map.findObject("Objects", obj => obj.name === "mcLDoor");
      mcL = false;
    }
    else if (lib == true) {
      spawnPoint = map.findObject("Objects", obj => obj.name === "libDoor");
      lib = false;
    }

    /*
   |--------------------------------------------------------------------------
   | NPC SECTION
   |--------------------------------------------------------------------------
   |
   | In this section all NPCs animations are handled.
   |
   */
    //add engineering girl
    this.student1 = this.physics.add.sprite(212, 310, "npc1");
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNames('npc1', {
        start: 3,
        end: 7,
        zeroPad: 3,
        prefix: 'tile',
        suffix: '.png'
      }),
      frameRate: 3,
      repeat: -1,
    });
    this.student1.play("walk");

    //add pam sprite
    this.student2 = this.physics.add.sprite(240, 310, "npc2");
    this.pressA = this.add.image(239, 270, "talkButton");
    this.pressA.visible = false;
    this.anims.create({
      key: 'walk2',
      frames: this.anims.generateFrameNames('npc2', {
        start: 3,
        end: 7,
        zeroPad: 3,
        prefix: 'pam',
        suffix: '.png'
      }),
      frameRate: 3,
      repeat: -1,
    });
    this.student2.play("walk2");


    //add jim sprite
    this.student3 = this.physics.add.sprite(550, 657, "npc3");
    this.anims.create({
      key: 'walk3',
      frames: [
        {
          key: 'npc3',
          frame: "jim009.png"
        },
        {
          key: 'npc3',
          frame: "jim010.png"
        },
        {
          key: 'npc3',
          frame: "jim009.png"
        },
        {
          key: 'npc3',
          frame: "jim011.png"
        },
      ],
      frameRate: 4,
      repeat: -1
    });
    this.student3.play("walk3");

    //add harry sprite
    this.student4 = this.physics.add.sprite(1400, 210, "npc29");
    this.anims.create({
      key: 'walk4',
      frames: this.anims.generateFrameNames('npc29', {
        start: 3,
        end: 5,
        zeroPad: 3,
        prefix: 'harry',
        suffix: '.png'
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.student4.play("walk4");


    //add bike sprite
    this.bici = this.physics.add.sprite(-400, 700, "bicicleta");
    this.anims.create({
      key: 'ride',
      frames: this.anims.generateFrameNames('bicicleta', {
        start: 4,
        end: 6,
        zeroPad: 3,
        prefix: 'bike',
        suffix: '.png'
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.bici.play("ride");

    //bike ride motion
    var tween = this.tweens.add({
      targets: this.bici,
      x: 1800,
      duration: 20000,
      yoyo: true,
      ease: 'Linear',
      flipX: true,
      repeat: -1,

    });

    //walking jim motion
    var tween = this.tweens.add({
      targets: this.student3,
      x: 750, // up to where
      duration: 8800,
      yoyo: true,
      ease: 'Linear',
      flipX: true,
      repeat: -1
    });

    //add mumu
    this.mumunpc = this.physics.add.sprite(880, 700, "npc8");
    this.anims.create({
      key: 'ride2',
      frames: this.anims.generateFrameNames('npc8', {
        start: 0,
        end: 2,
        zeroPad: 3,
        prefix: 'tile',
        suffix: '.png'
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.mumunpc.play("ride2");
    //bike ride motion
    var tween = this.tweens.add({
      targets: this.mumunpc,
      y: -2100,
      duration: 80000,
      yoyo: false,
      ease: 'linear',
      flipX: false,
      repeat: 1,

    });

    //add prof_1 sprite
    this.profnpc1 = this.physics.add.sprite(1600, 220, "npc23");
    this.anims.create({
      key: 'walk23',
      frames: this.anims.generateFrameNames('npc23', {
        start: 6,
        end: 8,
        zeroPad: 3,
        prefix: 'tile',
        suffix: '.png'
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.profnpc1.play("walk23");
    //walking prof_1 motion
    var tween = this.tweens.add({
      targets: this.profnpc1,
      x: 1700, //up to where
      duration: 6500,
      yoyo: true,
      ease: 'Linear',
      flipX: true,
      repeat: -1
    });

    //KU BUS
    this.campusBus = this.add.image(100, 700, "kuBus");

    //add driver sprite
    this.drivernpc = this.physics.add.sprite(50, 730, "npc5");
    this.anims.create({
      key: 'driveranim',
      frames: this.anims.generateFrameNames('npc5', {
        start: 0,
        end: 8,
        zeroPad: 3,
        prefix: 'tile',
        suffix: '.png'
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.drivernpc.play("driveranim");
    //add juliet sprite
    this.julietnpc = this.physics.add.sprite(2100, 750, "npc18");
    this.anims.create({
      key: 'ridejuli',
      frames: this.anims.generateFrameNames('npc18', {
        start: 3,
        end: 6,
        zeroPad: 3,
        prefix: 'juliet',
        suffix: '.png'
      }),
      frameRate: 2,
      repeat: -1,
    });
    this.julietnpc.play("ridejuli");

    //bike ride motion
    var tween = this.tweens.add({
      targets: this.julietnpc,
      x: 20,
      duration: 20000,
      yoyo: true,
      ease: 'Linear',
      flipX: true,
      repeat: -1,

    });

    //add olivia sprite
    this.olivianpc = this.physics.add.sprite(98, 258, "npc22");
    this.anims.create({
      key: 'oliviaanim',
      frames: this.anims.generateFrameNames('npc22', {
        start: 1,
        end: 6,
        zeroPad: 3,
        prefix: 'tile',
        suffix: '.png'
      }),
      frameRate: 0.35,
      repeat: -1,
    });
    this.olivianpc.play("oliviaanim");

    //add joe sprite
    this.joenpc = this.physics.add.sprite(61, 270, "npc17");
    this.anims.create({
      key: 'joeanim',
      frames: this.anims.generateFrameNames('npc17', {
        start: 6,
        end: 8,
        zeroPad: 3,
        prefix: 'tile',
        suffix: '.png'
      }),
      frameRate: 0.5,
      repeat: -1,
    });
    this.joenpc.play("joeanim");

    //add juanchi sprite
    this.juanchinpc = this.physics.add.sprite(1503, 220, "npc6");
    this.pressA2 = this.add.image(1510, 180, "talkButton");
    this.pressA2.visible = false;

    //add sara sprite
    this.saranpc = this.physics.add.sprite(965, 525, "npc30");
    this.pressA3 = this.add.image(962, 480, "talkButton");
    this.pressA3.visible = false;
    this.anims.create({
      key: 'saraanim',
      frames: this.anims.generateFrameNames('npc30', {
        start: 0,
        end: 2,
        zeroPad: 3,
        prefix: 'tile',
        suffix: '.png'
      }),
      frameRate: 0.8,
      repeat: -1,
    });
    this.saranpc.play("saraanim");


    /*
    |--------------------------------------------------------------------------
    | DIALOGUE SECTION
    |--------------------------------------------------------------------------
    |
    */

    ///pam dialogue anim
    this.textpamanim = this.physics.add.sprite(375, 215, "textpam");
    this.textpamanim.setDepth(13);
    this.textpamanim.visible = false;
    this.anims.create({
      key: 'talk',
      frames: this.anims.generateFrameNames('textpam', {
        start: 0,
        end: 29,
        zeroPad: 3,
        prefix: 'text1_',
        suffix: '.png'
      }),
      frameRate: 10,
      repeat: 0,
    });

    ///juan dialogue anim
    this.textjuananim = this.physics.add.sprite(1510, 145, "textjuan");
    this.textjuananim.setDepth(13);
    this.textjuananim.visible = false;
    this.anims.create({
      key: 'talk2',
      frames: this.anims.generateFrameNames('textjuan', {
        start: 0,
        end: 41,
        zeroPad: 2,
        prefix: 'tile',
        suffix: '.gif'
      }),
      frameRate: 24,
      repeat: 0,
    });


    //sara dialogue anim
    this.textsaraanim = this.physics.add.sprite(962, 450, "textsara");
    this.textsaraanim.setDepth(15);
    this.textsaraanim.visible = false;
    this.anims.create({
      key: 'talk3',
      frames: this.anims.generateFrameNames('textsara', {
        start: 1,
        end: 106,
        zeroPad: 5,
        prefix: 'tile',
        suffix: '.png'
      }),
      frameRate: 16,
      repeat: 0,
    });
    //this.textsaraanim.play('talk3');



    /*
    |--------------------------------------------------------------------------
    | ENERGY BAR SECTION
    |--------------------------------------------------------------------------
    |
    | In this section, energy bar is created
    |
    */
    //set Energy bar
    var backgroundBar = this.add.image(195, 730, "red-bar");//backgroud bar for energy bar
    EnergyBar = this.add.image(EnergyBar.x, 730, "green-bar");//front green bar for energy bar
    backgroundBar.fixedToCamera = true;
    EnergyBar.fixedToCamera = true;
    backgroundBar.setScrollFactor(0);//bar will stay in same position with the map moving behind it
    EnergyBar.setScrollFactor(0);//bar will stay in same position with the map moving behind it

    this.healthLabel = this.add.bitmapText(20, 725, "pixelFont", "ENERGY: ", 20);//label for the energy bar
    this.healthLabel.setScrollFactor(0);//bar will stay in same position with the map moving behind it

    //set Knowledge bar
    var backBar = this.add.image(195, 698, "red-knowledge");//background bar for knowledge bar
    KnowledgeBar = this.add.image(KnowledgeBar.x, 698, "green-knowledge");//front green bar for knowledge bar
    backBar.fixedToCamera = true;
    KnowledgeBar.fixedToCamera = true;
    backBar.setScrollFactor(0);//bar will stay in same position with the map moving behind it
    KnowledgeBar.setScrollFactor(0);//bar will stay in same position with the map moving behind it

    this.healthLabel = this.add.bitmapText(6, 693, "Font-knowledge-bar", "KNOWLEDGE: ", 20); //label for the knowledge bar
    this.healthLabel.setScrollFactor(0);//bar will stay in same position with the map moving behind it

    /*
    |--------------------------------------------------------------------------
    | Coffee Objects Creation
    |--------------------------------------------------------------------------
    |
    */
    //create coffees around campus
    this.cafeSS = this.physics.add.group();
    for (var i = 0; i < 10; i++) {
      var unCafe = this.physics.add.image(0, 0, "coffee");
      this.cafeSS.add(unCafe); //add unCafe to grupo de cafeSS
      unCafe.setRandomPosition(30, 300, 1200, 690);
      this.physics.add.collider(unCafe, worldLayer);
    }

    /*
    |--------------------------------------------------------------------------
    | Player Animation Section
    |--------------------------------------------------------------------------
    |
    |
    |
    */

    //add player to spawn point using extended class defined in player.js
    player = new Player({
      scene: this,
      x: spawnPoint.x,//horizontal spawn position
      y: spawnPoint.y,//vertical spawn position
      key: 'player',//key to identify sprite
      energy: energy,
      knowledge: kn
    });//player's energy

    //collider
    this.physics.add.collider(player, worldLayer);

    //add player animation/movement
    //animation right movement
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { start: 5, end: 9 }),
      frameRate: 10,
      repeat: -1,
    });
    //animation left movement
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { start: 10, end: 14 }),
      frameRate: 10,
      repeat: -1
    });
    //animations up movement
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', { start: 15, end: 19 }),
      frameRate: 10,
      repeat: -1
    });
    //animations down movement
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', { start: 1, end: 4 }),
      frameRate: 10,
      repeat: -1
    });

    //enter doors
    worldLayer.setTileLocationCallback(9, 7, 1, 1, enterEngr, this);
    worldLayer.setTileLocationCallback(10, 7, 1, 1, enterEngr, this);
    worldLayer.setTileLocationCallback(31, 15, 1, 1, enterMcL, this);
    worldLayer.setTileLocationCallback(42, 16, 1, 1, enterLib, this);
    worldLayer.setTileLocationCallback(43, 16, 1, 1, enterLib, this);

    //default camera
    const camera = this.cameras.main;
    camera.startFollow(player);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    cursors = this.input.keyboard.createCursorKeys();

    /*
    |--------------------------------------------------------------------------
    | Physics for objects
    |--------------------------------------------------------------------------
    |
    | In this section, various physics for objects such as dialogues, animations,
    | overlapping, displaying dialogues, etc are handled.
    |
    */

    //physics for collecting coffees (when overlapping)
    var num = this.physics.add.overlap(player, this.cafeSS, this.collectUnCafe, null, this);

    //physics for dialogues
    var pamdialogue = this.physics.add.overlap(player, this.student2, function () {
      inZone = true;
      dialogueNum = 1;
    });
    var juandialogue = this.physics.add.overlap(player, this.juanchinpc, function () {
      inZone = true;
      dialogueNum = 2;
    });
    var saradialogue = this.physics.add.overlap(player, this.saranpc, function () {
      inZone = true;
      dialogueNum = 3;
    });

    //dialogue keys
    this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); //for talking
    this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER); //for stop talking


  }//end create

  /*
  |--------------------------------------------------------------------------
  | CollectUnCafe
  |--------------------------------------------------------------------------
  */
  //function to be called when coffee is collected
  collectUnCafe(player, unCafe) {
    var musicConfig2 =
    {
      mute: false,
      volume: 1 * gameSettings.volume,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0
    }
    this.itemGetSound.play(musicConfig2);
    player.energyUp(); //updates energy
    unCafe.disableBody(true, true); //coffee disappears after collision
  }

  /*
  |--------------------------------------------------------------------------
  | showDialogue
  |--------------------------------------------------------------------------
  */
  showDialogue() {

    if (dialogueNum == 1) {
      this.textpamanim.visible = true;
      this.textpamanim.play('talk');
      var musicConfig3 =
      {
        mute: false,
        volume: 1 * gameSettings.volume,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
      }
      this.dialogueSound.play(musicConfig3);
    }
   else if (dialogueNum == 2) {

      this.textjuananim.visible = true;
      this.textjuananim.play('talk2');
      var musicConfig3 =
      {
        mute: false,
        volume: 1 * gameSettings.volume,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
      }
      this.dialogueSound.play(musicConfig3);
    }
     else if (dialogueNum == 3) {

      this.textsaraanim.visible = true;
      this.textsaraanim.play('talk3');
      var musicConfig3 =
      {
        mute: false,
        volume: 1 * gameSettings.volume,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
      }
      this.dialogueSound3.play(musicConfig3);
    }

  }//end
  /*
  |--------------------------------------------------------------------------
  | hideDialogue
  |--------------------------------------------------------------------------
  */
  hideDialogue() {
    this.textpamanim.visible = false;
    this.textjuananim.visible = false;
    this.textsaraanim.visible = false;
    this.dialogueSound.stop();
    this.dialogueSound3.stop();
  }

  /*
  |--------------------------------------------------------------------------
  | Update
  |--------------------------------------------------------------------------
  */
  update(time, delta) {
  if (player.getEnergy() <= 0)//check for game over condition
  {
    gameOver(this);//function to transition from current scene to game over scene
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


  /*
|--------------------------------------------------------------------------
| inZone
|--------------------------------------------------------------------------
| Here we check if the player is inZone to a certain NPC that has a dialogue
| if so, a talk button will be appear,
*/
  if (inZone == false) {
    this.pressA.visible = false;
    this.pressA2.visible = false;
    this.pressA3.visible = false;
    this.hideDialogue();
  }
  if (inZone == true) {
    if (dialogueNum == 1) {
      this.pressA.visible = true;
    }
    else if (dialogueNum == 2) {
      this.pressA2.visible = true;

    }
    else if (dialogueNum == 3) {
      this.pressA3.visible = true;
    }
    /*
    this.pressA.visible = true;
    this.pressA2.visible = true;
    this.pressA3.visible = true;*/
    //if A key is is presssed, show specific dialogue
    if (this.aKey.isDown) {
      this.showDialogue();
    }
  }
  //if enter key is pressed, hide dialogue and stop sound
  if (this.enterKey.isDown) {
    this.hideDialogue();
    this.pressA.visible = false;
    this.pressA2.visible = false;
    this.pressA3.visible = false;

  }
  inZone = false;
}
}
/*
|--------------------------------------------------------------------------
| Enter to Scenes functions
|--------------------------------------------------------------------------
*/
function enterEngr() {
  first = true;
  game.scene.keys['WorldScene'].sys.sleep();
  game.scene.keys['EngrScene'].sys.wake();
  this.scene.start('EngrScene');
}
function enterMcL() {
  game.scene.keys['WorldScene'].sys.sleep();
  game.scene.keys['McLnScene'].sys.wake();
  this.scene.switch('McLnScene');
}

function enterLib() {
  game.scene.keys['WorldScene'].sys.sleep();
  game.scene.keys['LibraryScene'].sys.wake();
  this.scene.switch('LibraryScene');
}
function gameOver(sn)
{
  game.scene.keys[sn.key].sys.sleep();
  game.scene.keys['GameOverScene'].sys.wake();
  sn.scene.switch('GameOverScene');
}
