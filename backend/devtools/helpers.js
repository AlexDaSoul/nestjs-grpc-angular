const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');

// Helper functions
const ROOT = path.resolve(__dirname, '..');

exports.root = path.join.bind(path, ROOT);
exports.getServicesList = () => {
    const servicesList = fs.readdirSync(root('src/packages')).reduce((acum, val) => {
        if (fs.statSync(root(`src/packages/${val}`)).isDirectory()) {
            acum.push(val);
        }
        return acum;
    }, []);
    if (!servicesList.length) {
        throw new Error('Services list is empty.');
    }
    return servicesList;
};

exports.getPackagesList = () => {
    return glob.sync('/{*,packages/*}/package.json', {
        root: root('src'),
        ignore: '**/node_modules/**'
    });
};
