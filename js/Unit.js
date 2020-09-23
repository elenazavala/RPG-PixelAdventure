//This class contains the general Unit class which hold the basic functionalities of a battle
  //unit object. The class holds the values for the unit's stats and has methods which can target
  //another unit and calculat damage

class Unit extends Phaser.GameObjects.Sprite
{
  constructor(scene, x, y, texture, frame, health, baseAttack, attacks)
  {
    super(scene,x,y,texture,frame);
    this.attacks = attacks;
    this.health = health;
    this.baseAttack = baseAttack;
  }

  //calculates damage which scales with this.baseAttack
  //@param basePower is the attack power, accuracy is attack accuracy, critRate is attack critRate
  //@return returns an integer which represents damage
  calculateDamage(basePower, accuracy, critRate)
  {
    let hit = 1;
    let crit = 1;
    //accuracy check
    if(Phaser.Math.Between(0,100) > accuracy)
    {
      hit = 0;
    }
    //critical hit check
    if(Phaser.Math.Between(1,8) <= 1*critRate)
    {
      crit = 2;
    }
    //damage calculation
    return ({damage:(Math.ceil(hit * (basePower * (this.baseAttack + 1) / 100))*crit),critical:(crit == 2), miss:(hit == 0)});
  }

  //reduces the health for a target unit
  //@param target is of type Unit, and attackInfo is an attack object
  //@post reduces target's health attribute by at least 1
  attack(target, attackInfo)
  {
    let damageReport = this.calculateDamage(attackInfo.basePower, attackInfo.accuracy, attackInfo.critRate);
    target.receiveDamage(damageReport.damage);
    return(damageReport);
  }

  //reduces this.health by the integer damage
  //@param damage is a number to reduce this.health by
  //@pre damage must be an integer
  //@post this.health will be reduced by up to the amount of damage, with this.health >= 0
  receiveDamage(damage)
  {
    this.health = this.health - damage;
    if(this.health < 0)
    {
      this.health = 0;
    }
  }
}
