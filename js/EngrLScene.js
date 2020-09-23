class EngrLScene extends Phaser.Scene {
	constructor() {
    super({key : 'EngrLScene'});
    this.key = 'EngrLScene';
		this.collectedAttacks = {first: false, second: false, third: false};
    }

preload() {
  //load necessary images
  this.load.image("tiles", "./assets/tilesets/worldKU.png");
  this.load.tilemapTiledJSON("map3", "./assets/tilemaps/engrLeft.json");
  this.load.spritesheet('Gill', "./assets/sprites/Gill.png", { frameWidth: 32, frameHeight: 32 });//load Gibbons sprite
  this.load.image("boxBack", "assets/box1.png");//load chat box

}

create() {

  //create const map
  const map3 = this.make.tilemap({ key: "map3" });

  //add tileset to map
  const tileset = map3.addTilesetImage("worldKU", "tiles");

  //create layers
  const belowLayer = map3.createStaticLayer("Below Player", tileset, 0, 0);
  const worldLayer = map3.createStaticLayer("World", tileset, 0, 0);

  //set collision
  worldLayer.setCollisionByProperty({collision: true});

  //find spawn point on map
  const spawnPoint = map3.findObject("Objects", obj => obj.name === "Spawn Point");

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

  //add Gill sprite to scene
  let gill = this.physics.add.sprite(615, 335, "Gill");

  //collider
  this.physics.add.collider(player, worldLayer);

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('player', { start: 5, end: 9 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { start: 10, end: 14 }),
      frameRate: 10,
      repeat: -1
  });

  this.anims.create({
    key: 'up',
    frames: this.anims.generateFrameNumbers('player', { start: 15, end: 19 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'down',
    frames: this.anims.generateFrameNumbers('player', { start: 1, end: 4}),
    frameRate: 10,
    repeat: -1
  });

  //default camera
  const camera = this.cameras.main;
  camera.startFollow(player);
  camera.setBounds(0, 0, map3.widthInPixels, map3.heightInPixels);

  //talk to gill
  this.physics.add.overlap(player, gill, this.clickBook, null, this);

  //dialogue box section.......................................
  this.dialogueBox = this.add.image(550, 290, "textbox");
  this.dialogueBox.visible = false
  this.dialogueBook = this.add.bitmapText(430, 277, "pixelFont", "You attended to Gill's lecture! \n You learned a new attack!", 17);
  this.dialogueBook.visible = false
  this.xButton = this.add.image(665, 274, "exit").setInteractive({ useHandCursor: true });
  this.xButton.on('pointerdown', () => this.clickExit());
  this.xButton.visible = false
  //end dialogue box section.......................................

  cursors = this.input.keyboard.createCursorKeys();
  //exit engr
  worldLayer.setTileIndexCallback([1336], exitEngrL, this);

  function exitEngrL()
    {
        game.scene.keys['EngrLScene'].sys.sleep();
        game.scene.keys['EngrScene'].sys.wake();
    	this.scene.switch('EngrScene');
    }
}
//dialogue for talking to Gill
clickBook() {

  this.dialogueBox.visible = true
  this.dialogueBook.visible = true
  this.xButton.visible = true
	//check to see if a new move can be added
  if(battleCount == 1 && !this.collectedAttacks.first)
	{
		this.collectedAttacks.first = true;
		attackArr.push({name:"Linked List",basePower:60, cost:2, accuracy:85, critRate:1});
	}
	else if(battleCount == 2 && !this.collectedAttacks.second)
	{
		this.collectedAttacks.second = true;
		attackArr.push({name:"Recursion",basePower:55, cost:5, accuracy:85, critRate:2});
	}
	else if(battleCount == 3 && !this.collectedAttacks.third)
	{
		this.collectedAttacks.third = true;
		attackArr.push({name:"Big O",basePower:85, cost:5, accuracy:70, critRate:1});
	}
}
//for when clicking exit, everything disappears
clickExit() {
  this.dialogueBox.visible = false
  this.dialogueBook.visible = false
  this.xButton.visible = false
}

update(time, delta) {
  if(player.getEnergy() <= 0 )
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
