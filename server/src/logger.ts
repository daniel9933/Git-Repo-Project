import pino from 'pino';

export default pino({
    transport: {
        targets: [
            {
            target: 'pino-pretty',
            },
            {
                level: 'trace',
                target: 'pino/file',
                options: {destination: '../.temp/pino-logger.log'}
            }
        ],
    },
});