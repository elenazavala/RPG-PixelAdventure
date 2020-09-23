let first = true; let engr,engrLeft, engrRight,mcL,lib = false;
var config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  scene: [TitleScene, SettingsScene, BattleSimulationScene],
  parent: "div.gameContainer",
  pixelArt: true,
  physics:
  {
    default: "arcade",
  }
};

var game = new Phaser.Game(config);
