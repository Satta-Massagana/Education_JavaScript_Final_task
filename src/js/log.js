const logContainer = document.getElementById('battleLog');

function log(message, color = 'green') {
    const logMessage = `<p class='message ${color}'>${message}</p>`;
    logContainer.insertAdjacentHTML('beforeend', logMessage);
}

export function clearLog() {
    logContainer.innerHTML = '';
}

export default log;
