import { Arm } from '../weapons/Arm';

export class Player {
    constructor(position, name, logger = () => {}) {
        this.name = name;
        this.position = position;
        this.life = 100;
        this.initialLife = 100;
        this.magic = 20;
        this.initialMagic = 20;
        this.speed = 1;
        this.attack = 10;
        this.agility = 5;
        this.luck = 10;
        this.description = 'Игрок';
        this.weapons = [];
        this.baseWeapon = new Arm();
        this.log = logger;
    }

    get weapon() {
        for (let currentWeapon of this.weapons) {
            if (!currentWeapon.isBroken()) {
                return currentWeapon;
            }
        }
        return this.baseWeapon;
    }

    getLuck() {
        return (Math.random() * 100 + this.luck) / 100;
    }

    getDamage(distance) {
        if (distance > this.weapon.range) {
            return 0;
        }
        return (this.attack + this.weapon.getDamage()) * this.getLuck() / Math.max(distance, 1);
    }

    takeDamage(damage) {
        this.log(`${this.shortInfo} получает урон в ${damage}`);
        this.life = Math.max(0, this.life - damage);
    }

    isDead() {
        return this.life === 0;
    }

    moveLeft(distance) {
        this.position -= Math.min(this.speed, distance);
    }

    moveRight(distance) {
        this.position += Math.min(this.speed, distance);
    }

    move(distance) {
        if (distance > 0) {
            this.moveRight(distance);
        } else {
            this.moveLeft(-distance);
        }
    }

    isAttackBlocked() {
        return this.getLuck() > (100 - this.luck) / 100;
    }

    dodged() {
        return this.getLuck() > (100 - this.agility - this.speed * 3) / 100;
    }

    takeAttack(damage) {
        this.log(`${this.shortInfo} получает удар силой ${damage}`);
        
        if (this.isAttackBlocked()) {
            this.log(`${this.shortInfo} блокирует удар`);
            this.weapon.takeDamage(damage);
        } else if (!this.dodged()) {
            this.takeDamage(damage);
        } else {
            this.log(`${this.shortInfo} уклоняется от удара`);
        }
    }

    tryAttack(enemy) {
        this.log(`${this.shortInfo} пытается атаковать ${enemy.shortInfo}.`);
        
        let distance = Math.abs(this.position - enemy.position);
        
        if (distance > this.weapon.range) {
            this.log(`${this.shortInfo} недостает до ${enemy.shortInfo}.`);
            return;
        }
        
        const damageDealt = 10 * this.getLuck();
        
        enemy.takeAttack(this.getDamage(distance));
        
        if (enemy.isDead()) {
            this.log(`${enemy.shortInfo} погиб в бою.`, 'red');
        }
        
        if (distance === 0) {
            enemy.moveRight(1);
            enemy.takeAttack(damageDealt * 2);
            this.log(`Соперник отскакивает на один ход ${enemy.shortInfo}`);
            enemy.takeAttack(damageDealt * 2);
            if (enemy.isDead()) {
                this.log(`${enemy.shortInfo} погиб в бою.`, 'red');
            }
        }
    }

    chooseEnemy(players) {
        return players
            .filter(player => player !== this)
            .reduce((acc, el) => acc === null || el.life < acc.life ? el : acc, null);
    }

    moveToEnemy(enemy) {
        const distanceToEnemy = enemy.position - this.position;
        
        if (distanceToEnemy !== 0) {
            this.move(distanceToEnemy);
            console.log(`${this.name} переместился к сопернику.`);
        }
    }

    turn(players) {
        const enemy = this.chooseEnemy(players);
        
        if (!enemy) return;

        console.log(`${this.name} начинает ход.`);
        
        console.log(`${this.shortInfo} выбирает ${enemy.shortInfo}.`);
        
        this.moveToEnemy(enemy);

       if (!enemy.isDead()) { 
           console.log(`${this.shortInfo} пытается атаковать ${enemy.shortInfo}.`);
           enemy.takeAttack(this.getDamage(Math.abs(this.position - enemy.position)));
       }
       
       console.log(`${this.description} ${this.name}, life: ${this.life}`);
   }

   get shortInfo() {
       return `${this.name}, P: ${this.position}, L: ${this.life.toFixed(2)}`;
   }
}
