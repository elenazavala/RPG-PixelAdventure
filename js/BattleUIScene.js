class BattleUIScene extends Phaser.Scene
{
  constructor(instanceName, battleInstanceName)
  {
    super(instanceName);
    this.name = instanceName;
    this.battleSceneName = battleInstanceName;
    this.playerTurn = true;
  }

  create()
  {

    //access to battle scene
    this.battleScene = this.scene.get(this.battleSceneName);
    //graphics:
    const lineWidth = 15;
    this.graphics = this.add.graphics();

    //--enemy health bar
    this.graphics.lineStyle(1,0x000000, 0.75);
    this.graphics.fillStyle(0x4b4952, 0.75);
    this.graphics.strokeRect(100,50,310,70);
    this.graphics.fillRect(100,50,310,70);
    this.examBar = new HealthBar(this, 104, 54, this.battleScene.exam_battle.health);
    this.add.text(104, 100 - 15, "EXAM " + battleCount, {font: "30px pixelFont", fill: "white"});

    //--player health bar
    this.graphics.lineStyle(1,0x000000, 0.75);
    this.graphics.fillStyle(0x4b4952, 0.75);
    this.graphics.strokeRect(600,50,310,70);
    this.graphics.fillRect(600,50,310,70);
    this.playerBar = new HealthBar(this, 604, 54, this.battleScene.player_battle.health);
    this.add.text(604, 100 - 15, "PLAYER", {font: "30px pixelFont", fill:"white"});
    //--bottom menu
    this.graphics.lineStyle(lineWidth,0xd1d0d6,1.0);
    this.graphics.fillStyle(0x4b4952, 1);
    this.graphics.strokeRect(lineWidth, 768*3/4-lineWidth, 1024-2*lineWidth, 768/4);
    this.graphics.fillRect(lineWidth, 768*3/4-lineWidth, 1024-2*lineWidth, 768/4);

    //add attack buttons
    this.drawAttButtons();
  }

  clickAtt(num)
  {
    if(this.playerTurn)
    {
      this.playerTurn = false;
      //attack exam and collect report which holds {critical:bool, miss:bool}
      let playerReport = this.battleScene.player_battle.attack(this.battleScene.exam_battle, attackArr[num]);
      //update examBar
      this.examBar.updateHealth(this.battleScene.exam_battle.health);
      //swich turn to exam
      this.examAttack();
    }
  }

  examAttack()
  {
    if(this.battleScene.exam_battle.health != 0)
    {
      //randomize attack from exam
      let randAttNum = Phaser.Math.Between(0,examAttackArr.length-1);
      //attack player and collect report which holds {critical:bool, miss:bool}
      let examReport = this.battleScene.exam_battle.attack(this.battleScene.player_battle, examAttackArr[randAttNum]);
      //update playerBar
      this.playerBar.updateHealth(this.battleScene.player_battle.health);
      //switch turn back to player
      this.playerTurn = true;
      //temp:
      //console.log(this.playerBar.value);
      //console.log(this.examBar.value);
      //console.log("turn complete");
    }
  }

  drawAttButtons()
  {
    //configurable position
    const configX = 435;
    const configY = 615;
    const textXOffset = configX - 300/2 + 10;
    const textYOffset = configY - 75/2 + 10;
    //add attack prompt
    this.add.text(50, configY, "Attacks:", {font:"30px Arial", fill: "white"});
    //add first attack
    var attButton1 = this.add.sprite(configX, configY, 'attButton',0).setInteractive({ useHandCursor: true });
    var attText1 = this.add.text(textXOffset , textYOffset, attackArr[0].name,{font: "30px Arial", fill: "white"});
    attButton1.on('pointerover', function(event){attButton1.setFrame(1);});
    attButton1.on('pointerout', function(event){attButton1.setFrame(0);});
    attButton1.on('pointerdown', () => {this.clickAtt(0);});
    //add second attack
    if(attackArr.length >= 2)
    {
      var attButton2 = this.add.sprite(configX, configY + 85, 'attButton',0).setInteractive({ useHandCursor: true });
      var attText2 = this.add.text(textXOffset, textYOffset + 85, attackArr[1].name,{font: "30px Arial", fill: "white"});
      attButton2.on('pointerover', function(event){attButton2.setFrame(1);});
      attButton2.on('pointerout', function(event){attButton2.setFrame(0);});
      attButton2.on('pointerdown', () => {this.clickAtt(1)});
    }
    //add third attack
    if(attackArr.length >= 3)
    {
      var attButton3 = this.add.sprite(configX + 310, configY, 'attButton',0).setInteractive({ useHandCursor: true });
      var attText3 = this.add.text(textXOffset + 310, textYOffset, attackArr[2].name,{font: "30px Arial", fill: "white"});
      attButton3.on('pointerover', function(event){attButton3.setFrame(1);});
      attButton3.on('pointerout', function(event){attButton3.setFrame(0);});
      attButton3.on('pointerdown', () => {this.clickAtt(2)});
    }
    //add fourth attack
    if(attackArr.length >= 4)
    {
      var attButton4 = this.add.sprite(configX + 310, configY + 85, 'attButton',0).setInteractive({ useHandCursor: true });
      var attText4 = this.add.text(textXOffset + 310 , textYOffset + 85, attackArr[3].name,{font: "30px Arial", fill: "white"});
      attButton4.on('pointerover', function(event){attButton4.setFrame(1);});
      attButton4.on('pointerout', function(event){attButton4.setFrame(0);});
      attButton4.on('pointerdown', () => {this.clickAtt(3)});
    }
  }

  update()
  {

  }
}
