const { join } = require('path');

module.exports = function (options) {
    options.resolve.alias = {
        '@grpc-proto': join(process.cwd(), './libs/grpc-proto'),
        '@lib': join(process.cwd(), './libs/lib'),
        '@auth': join(process.cwd(), './apps/auth/src'),
        '@chat': join(process.cwd(), './apps/chat/src'),
        '@user': join(process.cwd(), './apps/user/src'),
    };

    return {
        ...options,
    };
};
