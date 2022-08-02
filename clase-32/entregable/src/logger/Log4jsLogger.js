const log4js = require('log4js');
const path = requrie('path');
const {fileURLToPath} = require('url');
const filename = fileURLToPath(meta.url);
const dirname = path.dirname(filename);

log4js.configure({
    appenders: {
        terminal: {type: 'console'},
        warnFile: {type: 'file', filename: dirname + '../../../log/warn.log'},
        errorFile: {type: 'file', filename: dirname + '../../../log/error.log'},
        loggerInfo: {type: 'logLevelFilter', appender: 'terminal', level: 'info'},
        loggerWarn: {type: 'logLevelFilter', appender: 'warnFile', level: 'warn', maxLevel:'warn'},
        loggerError: {type: 'logLevelFilter', appender: 'errorFile', level: 'error', maxLevel: 'error'}
    },
    categories: {
        default: {appenders: ['terminal', 'loggerWarn', 'loggerError'], level: 'info'}
    }
})

const logger = log4js.getLogger();

module.export = logger