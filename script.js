cef.on('updateBotDialog', (botName, botReplica, buttonTexts) => {
    updateBotDialog(botName, botReplica, buttonTexts.split('|'));
});
cef.on('removeFocus', () => {
    cef.set_focus(false);
});

function updateBotDialog(botName, botReplica, buttonTexts) {
    // Обновляем имя бота
    document.getElementById('bot-name').innerText = botName;
    // Обновляем реплику бота
    document.getElementById('bot-replica').innerText = botReplica;
    // Очищаем текущие кнопки
    const buttonsContainer = document.getElementById('buttons');
    buttonsContainer.innerHTML = '';

    // Создаем новые кнопки на основе переданного массива buttonTexts
    buttonTexts.forEach((text, index) => {
        if (text.trim() !== "") {
            const buttonDiv = document.createElement('div');
            buttonDiv.className = `button${index + 1}`;
            const buttonTextDiv = document.createElement('div');
            buttonTextDiv.className = `button${index + 1}-text`;
            buttonTextDiv.innerText = text;

            // Добавляем обработчик события клика
            buttonDiv.addEventListener('click', () => {
                sendButtonIDToPawn(index + 1); // Отправляем ID кнопки
            });

            buttonDiv.appendChild(buttonTextDiv);
            buttonsContainer.appendChild(buttonDiv);
			document.querySelector('.talk-bot').classList.remove('hidden');
        }
    });
}

// Функция для отправки ID кнопки в Pawn
function sendButtonIDToPawn(buttonID) {
    cef.emit('buttonClicked', buttonID);
}
