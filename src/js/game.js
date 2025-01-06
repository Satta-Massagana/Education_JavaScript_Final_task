export function play(players) {
    let currentIndex = 0;
    let activePlayers = [...players];

    while (activePlayers.length > 1) {
        const currentPlayer = activePlayers[currentIndex];
        currentPlayer.turn(activePlayers);

        activePlayers = activePlayers.filter(player => !player.isDead());

        if (currentPlayer === activePlayers[currentIndex]) {
            currentIndex++;
        }
        
        if (currentIndex >= activePlayers.length) {
            currentIndex = 0;
        }
    }

    return activePlayers[0];
}
