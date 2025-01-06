import { Mage } from './Mage';
import { StormStaff } from '../weapons/StormStaff';
import { Knife } from '../weapons/Knife';

export class Demourge extends Mage {
  constructor(position, name, logger) {
    super(position, name, logger);
    this.initializeAttributes();
    this.weapons = [new StormStaff(), new Knife()];
  }

  initializeAttributes() {
    this.life = 80;
    this.initialLife = 80;
    this.magic = 120;
    this.initialMagic = 120;
    this.attack = 6;
    this.luck = 12;
    this.description = 'Демиург';
  }

  getDamage(distance) {
    const baseDamage = super.getDamage(distance);
    return (this.magic > 0 && this.getLuck() > 0.6) ? baseDamage * 1.5 : baseDamage;
  }
}
