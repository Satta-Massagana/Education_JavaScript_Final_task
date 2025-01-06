import { Warrior } from './Warrior';
import { Axe } from '../weapons/Axe';
import { Knife } from '../weapons/Knife';

export class Dwart extends Warrior {
  constructor(position, name, logger) {
    super(position, name, logger);
    this.initializeAttributes();
    this.weapons = [new Axe(), new Knife()];
    this.hitCount = 0;
  }

  initializeAttributes() {
    this.life = 130;
    this.initialLife = 130;
    this.attack = 15;
    this.luck = 20;
    this.description = 'Гном';
  }

  takeDamage(damage) {
    const takenDamage = (this.hitCount++ % 6 === 0 && this.getLuck() > 0.5) ? damage / 2 : damage;
    super.takeDamage(takenDamage);
  }
}
