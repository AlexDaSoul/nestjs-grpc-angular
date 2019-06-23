#!/usr/bin/node

const cp = require('child_process');
const path = require('path');
const fs = require('fs-extra');
const rimraf = require('rimraf');
const root = require('app-root-path');
const helpers = require('./helpers');

const grpcDir = root.resolve('frontend/src/app/grpc/proto');

const IGNORE_PACKAGES = [
    // ...
];

const IGNORE_PROTO_FILES = ['index.proto'];

// copy grpc-proto
rimraf.sync(grpcDir);

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

process.exit(0);
