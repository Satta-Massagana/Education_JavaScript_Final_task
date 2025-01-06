import './css/style.css';
import { play } from './js/game';
import log, { clearLog } from './js/log';
import { Archer } from './js/characters/Archer';
import { Crossbowman } from './js/characters/Crossbowman';
import { Demourge } from './js/characters/Demourge';
import { Dwart } from './js/characters/Dwart';
import { Mage } from './js/characters/Mage';
import { Warrior } from './js/characters/Warrior';

function createPlayers() {
    return [
        new Archer(1, 'Лучник', log),
        new Crossbowman(8, 'Арбалетчик', log),
        new Demourge(5, 'Демиург', log),
        new Dwart(12, 'Гном', log),
        new Mage(3, 'Маг', log),
        new Warrior(7, 'Воин', log)
    ];
}

document.getElementById('clearLog').addEventListener('click', clearLog);

document.getElementById('startBattle').addEventListener('click', () => {
    clearLog();
    
    const players = createPlayers();
    log('Игроки созданы!');
    
    players.forEach(player => player.logSelf());

    const winner = play(players);
    log(`ПОБЕДИЛ: ${winner.shortInfo}`);
});
