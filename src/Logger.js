import * as Configuration from 'log4js/lib/configuration';
import log4js from 'log4js';
// import stdout from 'log4js/lib/appenders/stdout';
// import file from 'log4js/lib/appenders/file';
// import dateFile from 'log4js/lib/appenders/dateFile';

if (Configuration.prototype != null) {
  // Configuration.prototype.loadAppenderModule = (type) => {
  //   switch (type) {
  //     case 'stdout':
  //       return stdout;
  //     case 'file':
  //       return file;
  //     case 'dateFile':
  //       return dateFile;
  //   }
  // };
  log4js.configure({
    appenders: {
      out: {
        type: 'stdout',
      },
      app: {
        type: 'dateFile',
        filename: `logs/api.log`,
      },
      error: {
        type: 'dateFile',
        filename: `logs/api-errors.log`,
      },
      appFilter: {
        type: 'logLevelFilter',
        appender: 'app',
        level: 'info',
      },
      errorFilter: {
        type: 'logLevelFilter',
        appender: 'error',
        level: 'error',
      },
    },
    categories: {
      default: {
        appenders: ['out', 'appFilter', 'errorFilter'],
        level: 'debug',
      },
    },
  });
}
export default log4js;
