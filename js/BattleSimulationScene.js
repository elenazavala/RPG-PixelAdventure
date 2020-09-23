
class BattleSimulationScene extends Phaser.Scene
{
  constructor()
  {
    super("BattleSimulationScene");
    this.key = "BattleSimulationScene";
    this.completeAttArr = [{name:"Inheritance",basePower:40, cost:5, accuracy:95, critRate:1},
                           {name:"Linked List",basePower:60, cost:2, accuracy:85, critRate:1},
                           {name:"Recursion",basePower:55, cost:5, accuracy:85, critRate:2},
                           {name:"Big O",basePower:85, cost:5, accuracy:70, critRate:1}
                           ];
  }

  create()
  {

    //create button
    var button = this.add.text(100, 200, "Click to start simulation (results in console)", {font:"bold 30px Arial", fill:"white"}).setInteractive({useHandCursor: true});
    button.on('pointerdown',() => this.click());

    var backButton = this.add.text(100, 400, "Return to settings menu", {font:"30px Arial", fill:"white"}).setInteractive({useHandCursor: true});
    backButton.on('pointerdown', () => this.clickBack());
  }

  click()
  {
    console.log("Beginning 1000 tests on 3 units using all attacks");

    const totalTests = 1000;
    //create test units
    let testUnit1 = new Unit(this,0,0,'player',0,100,0,this.completeAttArr);//0 knowledge
    let testUnit2 = new Unit(this,0,0,'player',0,100,50,this.completeAttArr);//50 knowledge
    let testUnit3 = new Unit(this,0,0,'player',0,100,100,this.completeAttArr);//100 knowledge
    let unitArr = [testUnit1, testUnit2, testUnit3];
    let report;
    let singleReport;
    let totalDamage;
    for(let i = 0; i < unitArr.length; i++)//every unit
    {
      for(let j = 0; j < this.completeAttArr.length; j++)//every attack
      {
        report = {hits: 0, critical_hits: 0, max_damage: 0, min_damage: 0, average_damage: 0};
        totalDamage = 0;
        for(let k = 0; k <= totalTests; k++)//100 tests
        {
          //get report
          singleReport = unitArr[i].calculateDamage(this.completeAttArr[j].basePower, this.completeAttArr[j].accuracy, this.completeAttArr[j].critRate);
          //check for hits
          if(!singleReport.miss)
          {
            report.hits++;
            //check for min damage
            if(totalDamage == 0 || singleReport.damage < report.damage)
            {
              report.min_damage = singleReport.damage;
            }
          }
          //check for max damage
          if(singleReport.damage > report.max_damage)
          {
            report.max_damage = singleReport.damage;
          }
          //check for crits
          if(singleReport.critical)
          {
            report.critical_hits++;
          }
          //sum damage
          totalDamage = totalDamage + singleReport.damage;
        }
        report.average_damage = totalDamage / totalTests;
        console.log("Unit " + (i+1) + " with " + (i*50) + " knowledge using " + this.completeAttArr[j].name + " results:");
        console.log(report);
      }
    }
  }

  clickBack()
  {
    this.scene.pause();
    this.scene.switch("SettingsScene");
  }

}
