
import winston from "winston";
import config from '../config/config.js'

const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5,
    },
    colors: {
        fatal: 'underline bold red',
        error: 'red',
        warning: 'yellow',
        info: 'cyan',
        http: 'magenta',
        debug: 'white',
    }
}

const loggerDebug = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports:[
        new winston.transports.Console({level: "debug", format:winston.format.combine(winston.format.colorize({colors:customLevelsOptions.colors}),winston.format.simple())})
    ]
})
const loggerProd = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports:[
        new winston.transports.Console({level: "info", format:winston.format.combine(winston.format.colorize({colors:customLevelsOptions.colors}),winston.format.simple())}),
        new winston.transports.File({filename: './errors.log', level:'error', format: winston.format.simple()})
    ]
})
const logger = config.isProd ?  loggerProd : loggerDebug;
export const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.http(`${req.method} in ${req.url} - ${new Date().toLocaleTimeString}`)
    next();
}
export {logger};