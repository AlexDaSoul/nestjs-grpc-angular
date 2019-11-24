import { ConnectionOptions } from 'typeorm';

import { typeorm } from '../../../env';

// typeorm cli have some issue with importing es6 modules, so we export config with CommonJS module system
module.exports = typeorm as ConnectionOptions;
