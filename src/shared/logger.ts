import winston, { format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';
const { combine, timestamp, label, printf } = format;

// Custom Log Format
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `${`[${date.toDateString()} ${hour}:${minute}:${second}]`} [${label}] ${level}: ${message}`;
});

// Create a logger for general information logs
const logger = winston.createLogger({
  level: 'info',
  format: combine(label({ label: 'COW-HUT' }), timestamp(), myFormat),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.Console(), // to show status in console
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'success',
        'CH-%DATE%-success.log'
      ), // Specify the file path for success logs
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '10d',
    }),
  ],
});

// Create a logger specifically for error logs
const errorLogger = winston.createLogger({
  level: 'error',
  format: combine(label({ label: 'COW-HUT' }), timestamp(), myFormat),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.Console(), // to show status in console
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'error',
        'CH-%DATE%-error.log'
      ), // Specify the file path for error logs
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '10d',
    }),
  ],
});

export { logger, errorLogger };
