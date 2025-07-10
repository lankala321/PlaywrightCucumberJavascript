import { transports, format } from 'winston';

// function to configure the logger for a specific scenario
export function options(scenarioName: string) {
    return {
        transports: [
            new transports.Console(),
            new transports.File({
                // dynamically set the filename based on the scenario name
                filename: `${process.env.LOG_PATH || 'test-results/logs'}/${scenarioName}/log.log`,
                // Logging level
                level: process.env.LOGLEVEL || 'info',

                // combine multiple formats\
                format: format.combine(
                    // add a timestamp to each log entry
                    format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
                    // format the log message
                    format.align(),
                    // format the log message to include level, timestamp, and message
                    format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`)
                )
            }),
        ]
    }
};