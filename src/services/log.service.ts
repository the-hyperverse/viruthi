import moment from 'moment'
import log from 'electron-log/main';

export function initializeLogs() {
    // Initialize it for renderer process
    log.initialize();

    // Configuring logger
    const level = process.env.NODE_ENV === 'development' ? 'debug' : 'info';
    log.transports.console.format = '[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}] {text}';
    log.transports.console.level = level;
    log.transports.file.fileName = `${moment().format('YYYY-MM-DD')}.log`;
    log.transports.file.level = level;

    log.debug('Logs initialized.');
}


