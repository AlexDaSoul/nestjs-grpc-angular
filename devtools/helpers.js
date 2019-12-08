const glob = require('glob');
const path = require('path');

exports.getPackages = (ignore, root)  => {
    return glob.sync('/*', {
        root,
        ignore
    });
};

exports.getProtosList = (ignore, root) => {
    const files = glob.sync('/*.proto', {
        root,
        ignore
    });

    return files.map(file => path.basename(file)).join(' ');
};

exports.getProtosListPath = (ignore, root) => {
    return glob.sync('/*.proto', {
        root,
        ignore
    });
};

