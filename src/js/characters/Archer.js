import { Player } from './Player';
import { Bow } from '../weapons/Bow';
import { Knife } from '../weapons/Knife';

export class Archer extends Player {
  constructor(position, name, logger) {
    super(position, name, logger);
    this.initializeAttributes();
    this.weapons = [new Bow(), new Knife()];
  }

  initializeAttributes() {
    this.life = 80;
    this.initialLife = 80;
    this.magic = 35;
    this.initialMagic = 35;
    this.attack = 5;
    this.agility = 10;
    this.description = 'Лучник';
  }

  getDamage(distance) {
    return distance <= this.weapon.range 
      ? (this.attack + this.weapon.getDamage()) * this.getLuck() * Math.max(distance, 1) / this.weapon.range 
      : 0;
  }
}
