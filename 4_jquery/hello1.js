
  // Character prototype
  function Character(name, health) {
    this.name = name;
    this.health = health;
  }
  
  Character.prototype.printStats = function() {
    console.log(`${this.name} - Health: ${this.health}`);
  };
  
  // Player constructor
  function Player(name, health, level) {
    this.name = name;
    this.health = health;
    this.level = level;
  }
  
  // Implement levelUp method for Player
  Player.prototype = Object.create(Character.prototype);
  Player.prototype.levelUp = function() {
    this.level++;
    this.health *= 2;
    console.log(`${this.name} leveled up to level ${this.level}!\nThe ${this.name} new health is ${this.health}`);
  };
  
  // Enemy constructor
  function Enemy(name, health) {
    this.name = name;
    this.health = health;
  }
  
  // Implement attack method for Enemy
  Enemy.prototype = Object.create(Character.prototype);
  Enemy.prototype.attack = function(target) {
    console.log(`${this.name} attacks ${target.name}`);
    target.health -= 3;
  };
  
  // Create instances and demonstrate functionalities
  const player = new Player("Hero", 100, 1);
  const enemy = new Enemy("Monster", 50);
  
  // Demonstrate functionalities
  player.printStats();
  enemy.printStats();
  
  // Perform attacks, level up, etc.
  enemy.attack(player);
  while (player.health > 15) enemy.attack(player);
  player.printStats();
  player.levelUp();