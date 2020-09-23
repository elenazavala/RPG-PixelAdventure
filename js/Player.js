class Player extends Phaser.Physics.Arcade.Sprite
{
    constructor(config)//player class constructor
    {
        super(config.scene,config.x,config.y,config.key,config.energy,config.knowledge);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this);
        this.energy = config.energy;//set player`s energy
        this.knowledge = config.knowledge;//set player`s knowledge
        this.maxEnergy = 100;//set player's max energy
        this.maxKnowledge = 100;//set player's max Knowledge
        KnowledgeBar.setScale((this.knowledge/this.maxKnowledge),1);
        if(this.energy > 0)//if player's energy is above 0 then show bar
        {
        EnergyBar.setScale((this.energy/this.maxEnergy),1);
        }
        else{             //else destroy bar
            EnergyBar.destroy();
        }
    };
    //method to decrease player's energy
    energyDown(){
        this.energy = this.energy - 0.05;//decrease player's energy
        if(player.energy > 0)//if player has energy then show bar
        {
            EnergyBar.x = (EnergyBar.x-0.05);//decrease energy bar
            EnergyBar.setScale((player.energy/player.maxEnergy),1);//scale energy Bar
            energy = player.getEnergy();
        }
        else if(player.energy == 0)//else destroy bar
        {
        EnergyBar.destroy();
        energy = player.getEnergy();
        }
    }
    energyDownStudy()//energy goes down from learning
    {
        if(player.energy > 0)//if player has energy then show bar
        {
            this.energy = this.energy - (7 + 5*gameSettings.difficulty);//decrease player's energy
            EnergyBar.x = (EnergyBar.x- (7 + 5*gameSettings.difficulty));//decrease energy bar
            EnergyBar.setScale((player.energy/player.maxEnergy),1);//scale energy Bar
            energy = player.getEnergy();
        }
        else if(player.energy == 0)//else destroy bar
        {
        EnergyBar.destroy();
        }
    }
    //method to increase player's energy
    energyUp()
    {
        if(this.energy > 0 && this.energy < this.maxEnergy)//if the energy is between 1 and 100 increase
        {
            if(this.energy > 90)
            {
                var left = 100 - this.energy;
                EnergyBar.x = (EnergyBar.x + left);
                this.energy = this.energy + left;//increase energy //elena: i changed it to 5 becaue 1  was not really visible
                EnergyBar.setScale((player.energy/player.maxEnergy),1);//scale energy bar
            }
            else
            {
                this.energy = this.energy + 10;
                EnergyBar.x = (EnergyBar.x+10);//add to the energy bar
                EnergyBar.setScale((player.energy/player.maxEnergy),1);//scale energy bar
                energy = player.getEnergy();
            }
        }
    }
    //method to decrease player's knowledge
    knowledgeDown()
    {
        if(player.knowledge > 0)//if player has knowledge then show bar
        {
            KnowledgeBar.visible = true;
            this.knowledge = this.knowledge - 0.05;//decrease player's knowledge
            KnowledgeBar.x = (KnowledgeBar.x-0.05);//decrease knowledge bar
            KnowledgeBar.setScale((player.knowledge/player.maxKnowledge),1);//scale knowledge Bar
            kn = player.getKnowledge();
        }
        else if(player.knowledge == 0)//else make bar not visible
        {
        KnowledgeBar.visible = false;
        }
    }
    //method to icrease player's knowledge
    knowledgeUp()
    {
        if(this.knowledge >= 0 && this.knowledge < this.maxKnowledge)//if the knowledge is between 0 and 100 increase
        {
        this.knowledge = this.knowledge + 10;//increase knowledge
        KnowledgeBar.x = (KnowledgeBar.x + 10);//add to the knowledge bar
        KnowledgeBar.setScale((player.knowledge/player.maxKnowledge),1);//scale knowledge bar
        kn = player.getKnowledge();
        }
    }
    getEnergy()
    {
        return this.energy;//returns player's energy
    }
    getKnowledge()
    {
        return this.knowledge;//return player's knowledge
    }
}
// using energy instead of energy because the game already has a
