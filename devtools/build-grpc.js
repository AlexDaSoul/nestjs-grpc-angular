#!/usr/bin/node

const cp = require('child_process');
const glob = require('glob');
const path = require('path');
const fs = require('fs-extra');
const rimraf = require('rimraf');
const root = require('app-root-path');
const helpers = require('./helpers');

const grpcDir = root.resolve('grpc-proto/.build');
const libBackDir = root.resolve('backend/src/lib');
const packagesBackDir = root.resolve('backend/src/packages');
const grpcBackDir = root.resolve('backend/src/grpc-proto');
const grpcFrontDir = root.resolve('frontend/src/app/grpc/proto');

const getBackServices = ()  => {
    return glob.sync('/*', {
        root: packagesBackDir
    });
};

const IGNORE_PACKAGES = [
    // ...
];

const IGNORE_PROTO_FILES = ['**/index.proto'];

// copy grpc-proto
rimraf.sync(grpcDir);
rimraf.sync(grpcBackDir);
rimraf.sync(grpcFrontDir);

// **** build grpc-web
helpers.getPackages(IGNORE_PACKAGES, root.resolve('grpc-proto')).forEach(package => {
    const protos = helpers.getProtosList(IGNORE_PROTO_FILES, package);
    const pkgName = path.basename(package);
    const pkgPath = `${grpcDir}/${pkgName}`;

    const CMD =
        `protoc -I=${package} ${protos}` +
        ` --js_out=import_style=commonjs:${pkgPath}` +
        ` --grpc-web_out=import_style=commonjs+dts,mode=grpcwebtext:${pkgPath}`;

    try {
        console.log(`Build grpc-web for '${pkgName}'`);
        fs.ensureDirSync(pkgPath);
        cp.execSync(CMD, { cwd: root.path, stdio: 'inherit' });
    } catch (err) {
        process.exit(err.status);
    }
});

fs.copySync(root.resolve('grpc-proto'), grpcBackDir);
fs.copySync(root.resolve('grpc-proto/.build'), grpcFrontDir);

// copy typings and remove js and web typings
fs.copySync(`${grpcBackDir}/.build`, grpcBackDir);
rimraf.sync(`${grpcBackDir}/.build`);
// rimraf.sync(`${grpcBackDir}/**/*.js`);
rimraf.sync(`${grpcBackDir}/**/*_grpc_web_*`);

console.log(`-----------------------------------------`);

// copy typings to packages
getBackServices().forEach(pkg => {
    const grpcProtoDir = `${pkg}/grpc-proto`;
    const libMsDir = `${pkg}/lib`;

    rimraf.sync(grpcProtoDir);
    fs.copySync(grpcBackDir, grpcProtoDir);

    rimraf.sync(libMsDir);
    fs.copySync(libBackDir, libMsDir);

    console.log(`Copy lib to ${libMsDir}`);
});

rimraf.sync(grpcBackDir);
process.exit(0);