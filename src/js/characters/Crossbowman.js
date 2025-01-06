import { Archer } from './Archer';
import { LongBow } from '../weapons/LongBow';
import { Knife } from '../weapons/Knife';

export class Crossbowman extends Archer {
  constructor(position, name, logger) {
    super(position, name, logger);
    this.initializeAttributes();
    this.weapons = [new LongBow(), new Knife()];
  }

  initializeAttributes() {
    this.life = 85;
    this.initialLife = 85;
    this.attack = 8;
    this.agility = 20;
    this.luck = 15;
    this.description = 'Арбалетчик';
  }
}
