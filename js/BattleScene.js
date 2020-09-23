//This class is to be instantiated with keyword new to create different battle scenes
//different units. This scene launches BattleUIScene which runs at the same time to
//display the menu and health bar UI.

class BattleScene extends Phaser.Scene
{
  constructor(instanceName, previousSceneKey)
  {
    super(instanceName);
    this.name = instanceName;
    this.previousSceneKey = previousSceneKey; //string to switch back to previous Scene
  }

  preload()
  {
    //load battle audio
    this.load.audio("battleTheme", "assets/audio/battleSceneMusic.mp3")

  }

  create()
  {
    //start of music section.......................................
    game.sound.stopAll();
    this.battleMusic = this.sound.add("battleTheme");
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
    this.battleMusic.play(musicConfig);
    //end music section...............................................

    //add background
    let bg = this.add.image(0,0,'battleSceneBG');
    bg.setOrigin(0,0);
    //create player character and add to scene
    this.player_battle = new PlayerUnit(this, 1024*2/3+50+20, 768/3+50+130, "player", 15, energy, kn, attackArr);
    this.add.existing(this.player_battle);
    //create exam enemy
    let examKnowledge = 40 + (15 + gameSettings.difficulty * 5 ) * (battleCount-1);
    this.exam_battle = new EnemyUnit(this, 1024*1/3-50-45, 768/3+50-60, "exam", 3, 100, examKnowledge, examAttackArr);
    this.add.existing(this.exam_battle);
    //run UI at the same time
    let battleUI = new BattleUIScene("BattleUIScene" + battleCount, this.name);
    this.scene.add("BattleUIScene" + battleCount, battleUI);
    this.scene.launch("BattleUIScene" + battleCount);
  }

  update()
  {
    //check for win
    if(this.exam_battle.health <= 0)
    {
      this.battleMusic.stop();
      //remove UI
      this.scene.remove("BattleUIScene" + battleCount);
      //increment battle count
      battleCount++;
      game.scene.keys[this.name].sys.sleep();
      kn = 0;
      KnowledgeBar.x = 95;
      energy = player.getEnergy();
      if(battleCount > 3)
      {
        this.scene.start("GameWinScene");
      }
      else
      {
        this.scene.resume("EngrRScene");
        this.scene.switch("EngrRScene");
      }
    }
    //check for loss
    else if(this.player_battle.health == 0)
    {
      this.scene.remove("BattleUIScene" + battleCount);
      this.scene.switch("GameOverScene");
    }
  }
}
