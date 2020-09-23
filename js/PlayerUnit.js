//This class contains the PlayerUnit class which derives from the Unit class to implement a battle unit exclusive to the player
class PlayerUnit extends Unit
{
  constructor(scene, x, y, texture, frame, health, baseAttack, attacks)
  {
    super(scene, x, y, texture, frame, health, baseAttack);
    //Scale overworld sprite to better fit the screen
    this.setScale(11);
  }
}
