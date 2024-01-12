document.querySelectorAll('.game-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        let command;
        if (this.classList.contains('attack')) {
            command = '!attack';
        } else if (this.classList.contains('flee')) {
            command = '!flee';
        } else if (this.classList.contains('rest')) {
            command = '!rest';
        } else if (this.classList.contains('wakeup')) {
            command = '!wakeup';
        } else if (this.classList.contains('pet')) {
            command = '!pet';
        } else if (this.classList.contains('mastery')) {
            command = '!masteries';
        } else if (this.classList.contains('worldboss')) {
            command = '!worldboss';
        } else if (this.classList.contains('env-public')) {
            command = '!env public';
        } else if (this.classList.contains('env-test')) {
            command = '!env test';
        } else if (this.classList.contains('env-dev')) {
            command = '!env dev';
        } else if (this.classList.contains('gamestats')) {
            command = '!gamestats';
        } else if (this.classList.contains('gameinfo')) {
            command = '!gameinfo';
        }

        if (command) {
            fetch('/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: command }),
            });
        }
    });
});

document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
        let monsterName = this.querySelector('.monster-title').textContent.split('|')[1].trim();
        let command = `!attack ${monsterName}`;

        fetch('/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: command }),
        });
    });
});

const ws = new WebSocket('ws://localhost:3000'); 

ws.addEventListener('message', function(event) {
    const data = JSON.parse(event.data);
    const chatMessage = `${data.username}: ${data.message}`;
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML += chatMessage + '<br>';
});
