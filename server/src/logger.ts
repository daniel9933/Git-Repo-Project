import pino from 'pino';

export default pino({
    transport: {
        targets: [
            {
            target: 'pino-pretty',
            },
        ],
    },
});