// We don't need 'DOMContentLoaded' because the script is 'defer'ed
const output = document.getElementById('terminal-output');
const input = document.getElementById('command-input');
const terminalBody = document.getElementById('terminal-body');
const terminalWindow = document.getElementById('terminal-window');

const githubUrl = 'https://github.com';
const youtubeUrl = 'https://youtube.com';

const helpText = [
    'Available commands:',
    "  'github'  - Navigates to GitHub profile",
    "  'youtube' - Navigates to YouTube channel",
    "  'help'    - Displays this help message",
    "  'clear'   - Clears the terminal screen",
    ""
];

// --- Helper Functions ---

/**
 * Prints a single line to the terminal output.
 * @param {string} text - The text to print.
 * @param {string} [className] - Optional CSS class for styling.
 */
function printLine(text, className = '') {
    const p = document.createElement('p');
    p.textContent = text;
    if (className) {
        p.className = className;
    }
    output.appendChild(p);
}

/**
 * Simulates typing a line character by character.
 * @param {string} text - The text to type.
 * @param {number} delay - The delay between characters.
 * @returns {Promise<void>}
 */
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

/** Prints the help message to the terminal. */
function printHelp() {
    helpText.forEach(line => printLine(line));
}

/** Scrolls the terminal body to the bottom. */
function scrollToBottom() {
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

/**
 * Logs the command the user just typed.
 * @param {string} command - The command text.
 */
function logCommand(command) {
    const p = document.createElement('p');
    p.innerHTML = `<span class="prompt">
            <span class="prompt-user">user</span><span class="prompt-at">@</span><span class="prompt-host">dev-machine</span><span class="prompt-char">:~$</span>
        </span> ${command}`;
    p.className = 'output-command'; // Dimmed style
    output.appendChild(p);
}

/**
 * Executes the given command.
 * @param {string} command - The command to execute.
 */
function executeCommand(command) {
    switch (command.toLowerCase()) {
        case 'github':
            printLine('Redirecting to GitHub...');
            printLine(githubUrl, 'output-link');
            setTimeout(() => window.open(githubUrl, '_blank'), 500);
            break;
        case 'youtube':
            printLine('Redirecting to YouTube...');
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

// --- Event Handlers ---

/** Handles the 'Enter' key press on the input. */
function handleInput(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        const command = input.value.trim();
        
        if (command === '') {
            return; // Do nothing if input is empty
        }

        logCommand(command); // Show what was typed
        executeCommand(command); // Run the command
        
        input.value = ''; // Clear the input
        scrollToBottom(); // Scroll down
    }
}

// Focus the input when the terminal window is clicked
terminalWindow.addEventListener('click', () => {
    input.focus();
});

// Handle command input
input.addEventListener('keydown', handleInput);

// --- Boot Sequence ---
async function runBootSequence() {
    await typeLine('Booting v1.3.3.7...', 20);
    await typeLine('Connecting to network...', 30);
    await typeLine('Connection established.', 50);
    await typeLine("Running 'help' command...", 20);
    printHelp();
    input.focus();
    scrollToBottom();
}

// Start the boot sequence
runBootSequence();