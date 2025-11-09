
const output = document.getElementById('terminal-output');
const input = document.getElementById('command-input');
const terminalBody = document.getElementById('terminal-body');
const terminalWindow = document.getElementById('terminal-window');

const githubUrl = 'https://github.com/WindowsWrecker-LinuxFS';
const youtubeUrl = 'https://www.youtube.com/channel/UCt24vUh4fSkLJFpN2JdUOpQ';

const helpText = [
    'Available commands:',
    "  'github'  - Navigates to GitHub profile",
    "  'youtube' - Navigates to YouTube channel",
    "  'help'    - Displays this help message",
    "  'clear'   - Clears the terminal screen",
    ""
];


function printLine(text, className = '') {
    const p = document.createElement('p');
    p.textContent = text;
    if (className) {
        p.className = className;
    }
    output.appendChild(p);
}


function typeLine(text, delay = 50) {
    return new Promise(resolve => {
        const p = document.createElement('p');
        output.appendChild(p);
        let i = 0;
        function typeChar() {
            if (i < text.length) {
                p.textContent += text.charAt(i);
                i++;
                scrollToBottom();
                setTimeout(typeChar, delay);
            } else {
                resolve();
            }
        }
        typeChar();
    });
}


function printHelp() {
    helpText.forEach(line => printLine(line));
}


function scrollToBottom() {
    terminalBody.scrollTop = terminalBody.scrollHeight;
}


function logCommand(command) {
    const p = document.createElement('p');
    p.innerHTML = `<span class="prompt">
            <span class="prompt-user">user</span><span class="prompt-at">@</span><span class="prompt-host">dev-machine</span><span class="prompt-char">:~$</span>
        </span> ${command}`;
    p.className = 'output-command'; // Dimmed style
    output.appendChild(p);
}


function executeCommand(command) {
    switch (command.toLowerCase()) {
        case 'github':
            printLine('Redirecting to Github profile...');
            printLine(githubUrl, 'output-link');
            setTimeout(() => window.open(githubUrl, '_blank'), 500);
            break;
        case 'youtube':
            printLine('Redirecting to YouTube channel...');
            printLine(youtubeUrl, 'output-link');
            setTimeout(() => window.open(youtubeUrl, '_blank'), 500);
            break;
        case 'help':
            printHelp();
            break;
        case 'clear':
            output.innerHTML = '';
            break;
        default:
            printLine(`command not found: ${command}`, 'output-error');
            printLine("Type 'help' to see available commands.");
            break;
    }
}




function handleInput(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        const command = input.value.trim();
        
        if (command === '') {
            return; 
        }

        logCommand(command); 
        executeCommand(command); 
        
        input.value = ''; 
        scrollToBottom(); 
    }
}


terminalWindow.addEventListener('click', () => {
    input.focus();
});


input.addEventListener('keydown', handleInput);


async function runBootSequence() {
    await typeLine('Booting v1.3.3.7...', 20);
    await typeLine('Connecting to network...', 30);
    await typeLine('Connection established.', 50);
    await typeLine("Running 'help' command...", 20);
    printHelp();
    input.focus();
    scrollToBottom();
}


runBootSequence();
