import { Player } from './Player';
import { Sword } from '../weapons/Sword';
import { Knife } from '../weapons/Knife';

export class Warrior extends Player {
    constructor(position, name, logger) {
        super(position, name, logger);
        this.initializeAttributes();
        this.weapons = [
            new Sword(),
            new Knife()
        ];
    }

    initializeAttributes() {
        this.life = 120;
        this.initialLife = 120;
        this.speed = 2;
        this.attack = 10;
        this.description = 'Воин';
    }

    takeDamage(damage) {
        if (this.life < this.initialLife / 2 && this.getLuck() > 0.8) {
            const fromMagic = Math.min(damage, this.magic);
            this.magic -= fromMagic;
            super.takeDamage(damage - fromMagic);
        } else {
            super.takeDamage(damage);
        }
    }
}
