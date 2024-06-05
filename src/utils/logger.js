import winston from "winston";

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
        fatal: 'red',
        error: 'orange',
        warning: 'yellow',
        info: 'cyan',
        http: 'blue',
        debug: 'white',
    }
}

const logger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports:[
        new winston.transports.Console({level: "info", format:winston.format.combine(winston.format.colorize({colors:customLevelsOptions.colors}),winston.format.simple())}),
        new winston.transports.File({filename: './errors.log', level:'warning', format: winston.format.simple()})
    ]
})

export const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.info(`${req.method} in ${req.url} - ${new Date().toLocaleTimeString}`)
    next();
}