class EngrScene extends Phaser.Scene {
	constructor() {
    super({key : 'EngrScene'});
    this.key = 'EngrScene';
    }

preload() {
  //load necessary images
  this.load.image("tiles", "./assets/tilesets/worldKU.png");
  this.load.tilemapTiledJSON("map2", "./assets/tilemaps/engrMain.json");
  this.load.audio("engineeringSong", "assets/audio/engsong.mp3")

}

create() {

  //start of music section.......................................
   game.sound.stopAll();
   this.engineeringMusic = this.sound.add("engineeringSong");
   //config variable for music
   var musicConfig =
   {
     mute: false,
     volume: 1*gameSettings.volume,
     rate: 1,
     detune: 0,
     seek: 0,
     loop: true,
     delay: 0
   }
   this.engineeringMusic.play(musicConfig);
  //end of music section.......................................


  //create const map
  const map2 = this.make.tilemap({ key: "map2" });

  //add tileset to map
  const tileset = map2.addTilesetImage("worldKU", "tiles");

  //create layers
  const belowLayer = map2.createStaticLayer("Below Player", tileset, 0, 0);
  const worldLayer = map2.createStaticLayer("World", tileset, 0, 0);

  //set collision
  worldLayer.setCollisionByProperty({collision: true});

  //find spawn point on map
  if(first == true){
    spawnPoint = map2.findObject("Objects", obj => obj.name === "Spawn Point");
    first = false;
  }
  else if(engrLeft == true){
    spawnPoint = map2.findObject("Objects", obj => obj.name === "left");
  }
  else if(engrRight == true){
    spawnPoint = map2.findObject("Objects", obj => obj.name === "right");
  }
//set Energy bar
var backgroundBar = this.add.image(195,730,"red-bar");
EnergyBar = this.add.image(EnergyBar.x,730,"green-bar");
backgroundBar.fixedToCamera = true;
EnergyBar.fixedToCamera = true;
backgroundBar.setScrollFactor(0);
EnergyBar.setScrollFactor(0);

this.healthLabel = this.add.bitmapText(20,725,"pixelFont", "ENERGY: ",20);
this.healthLabel.setScrollFactor(0);

//set Knowledge bar
var backBar = this.add.image(195,698,"red-knowledge");
KnowledgeBar = this.add.image(KnowledgeBar.x,698,"green-knowledge");
backBar.fixedToCamera = true;
KnowledgeBar.fixedToCamera = true;
backBar.setScrollFactor(0);
KnowledgeBar.setScrollFactor(0);

this.healthLabel = this.add.bitmapText(6,693,"Font-knowledge-bar", "KNOWLEDGE: ",20);
this.healthLabel.setScrollFactor(0);

  //add player to spawn point
  player = new Player({scene:this,
    x:spawnPoint.x,
    y:spawnPoint.y,
    key:'player',
    energy:energy,
    knowledge:kn});


  //collider
  this.physics.add.collider(player, worldLayer);

  //add coffee to engineering building
  this.cafeSS = this.physics.add.group();
  var unCafe = this.physics.add.image(500, 420, "coffee");
  this.cafeSS.add(unCafe); //add unCafe to grupo de cafeSS

  //physics for collecting coffees (when overlapping)
  var num = this.physics.add.overlap(player, this.cafeSS, this.collectUnCafe, null, this);
  //add player animations
  //add right animation movement
  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('player', { start: 5, end: 9 }),
    frameRate: 10,
    repeat: -1
  });
  //add left animation movement
  this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { start: 10, end: 14 }),
      frameRate: 10,
      repeat: -1
  });
  //add up animations movement
  this.anims.create({
    key: 'up',
    frames: this.anims.generateFrameNumbers('player', { start: 15, end: 19 }),
    frameRate: 10,
    repeat: -1
  });
  //add down animation movement
  this.anims.create({
    key: 'down',
    frames: this.anims.generateFrameNumbers('player', { start: 1, end: 4}),
    frameRate: 10,
    repeat: -1
  });

  //default camera
  const camera = this.cameras.main;
  camera.startFollow(player);
  camera.setBounds(0, 0, map2.widthInPixels, map2.heightInPixels);

  cursors = this.input.keyboard.createCursorKeys();

  //engrDoors
  map2.setTileLocationCallback(9,11,1,1, enterEngrL, this);
  map2.setTileLocationCallback(22,11,1,1, enterEngrR, this);
  map2.setTileLocationCallback(15,16,1,1, exitEngr, this);
  map2.setTileLocationCallback(16,16,1,1, exitEngr, this);

  function enterEngrL()//function to transition into left scene
    {
      engrLeft = true;
      engrRight = false;
      game.scene.keys['EngrScene'].sys.sleep();
      game.scene.keys['EngrLScene'].sys.wake();
    	this.scene.switch('EngrLScene');
    }
    function enterEngrR()//function to transition into right scene
    {
      engrRight = true;
      engrLeft = false;
      game.scene.keys['EngrScene'].sys.sleep();
      game.scene.keys['EngrRScene'].sys.wake();
    	this.scene.switch('EngrRScene');
    }
    function exitEngr()//function to leave engineering and go to world scene
    {
      engr = true;
      game.scene.keys['EngrScene'].sys.sleep();
      game.scene.keys['WorldScene'].sys.wake();
    	this.scene.switch('WorldScene');
    }
}

//function to be called when coffee is collected
collectUnCafe(player, unCafe) {
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
  player.energyUp(); //updates energy
  unCafe.disableBody(true, true); //coffee disappears after collision
}

update(time, delta) {
  if(player.getEnergy() <= 0 )//check for game over condition
    {
      gameOver(this);//game over function
    }
    else
    {
      this.physics.resume();
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
