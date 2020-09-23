//This class creates and draws a bar representing health in a BattleSceneUI object.
//Adapted from a Phaser example in references

class HealthBar
{
  constructor(scene, x, y, initial)
  {
    this.bar = new Phaser.GameObjects.Graphics(scene);
    this.x = x;
    this.y = y;
    this.value = initial;
    this.ratio = 300/100;

    this.draw();

    scene.add.existing(this.bar);
  }

  updateHealth(newValue)
  {
    //check for negative health
    if(this.value < 0)
    {
      this.value = 0;
    }
    this.value = newValue;
    this.draw();
    //check for 0 health
    return(this.value == 0);
  }

  draw()
  {
    //clears previous health bar
    this.bar.clear();
    //set background of health bar
    this.bar.fillStyle(0xffffff);
    this.bar.fillRect(this.x, this.y, 300, 32);
    //check for low health, which is drawn as red
    if(this.value < 30)
    {
      this.bar.fillStyle(0xff0000);
    }
    else {
      this.bar.fillStyle(0x00ff00);
    }
    //calculate percentage of bar to fill
    let fill = Math.floor(this.ratio * this.value);
    this.bar.fillRect(this.x, this.y, fill, 32);

  }
}
