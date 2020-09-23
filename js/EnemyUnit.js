//This class contains the EnemyUnit class which derives from the Unit class to implement a battle unit exclusive to a non-playable enemy

class EnemyUnit extends Unit
{
  constructor(scene, x, y, texture, frame, grade, baseAttack, attacks)
  {
    super(scene, x, y, texture, frame, grade, baseAttack);
    this.setScale(6);
  }
}
