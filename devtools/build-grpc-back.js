#!/usr/bin/node

const cp = require('child_process');
const path = require('path');
const fs = require('fs-extra');
const rimraf = require('rimraf');
const root = require('app-root-path');
const helpers = require('./helpers');

const npmBinPath = cp.execSync('npm bin', {cwd: process.cwd()})
    .toString()
    .replace(/\n/, '');

const PBJS = npmBinPath + '/pbjs --no-create --no-encode --no-decode --no-verify --no-convert' +
    ' --no-delimited --no-beautify';
const PBTS = npmBinPath + '/pbts --no-comments';

const sedPath = root.resolve('devtools/build-grpc-back.sed');
const grpcDir = root.resolve('grpc-proto/.tmp');
const grpcBackDir = root.resolve('packages/backend/libs/grpc-proto');

const IGNORE_PACKAGES = [
    // ...
];

const IGNORE_PROTO_FILES = ['**/index.proto'];

// remove old
rimraf.sync(grpcDir);
rimraf.sync(grpcBackDir);

// **** build grpc-web
helpers.getPackages(IGNORE_PACKAGES, root.resolve('grpc-proto')).forEach(package => {
    const protos = helpers.getProtosListPath(IGNORE_PROTO_FILES, package);
    const pkgName = path.basename(package);
    const pkgPath = `${grpcDir}/${pkgName}`;

    protos.forEach(proto => {
        const protoName = path.basename(proto, '.proto');
        const file = `${pkgPath}/${protoName}`;
        const cmd = `${PBJS} -t static ${proto} | ${PBTS} -o ${file}.d.ts - && sed -i -f ${sedPath} ${file}.d.ts`;

        try {
            console.log(`Build grpc-web for '${protoName}'.proto`);
            fs.ensureDirSync(pkgPath);

            if (path.extname(protoName) === '.enum') {
                cp.execSync(`${PBJS} --no-comments -t static-module ${proto} -o ${file}.js`,
                    {cwd: root.path, stdio: 'inherit'});
            }

            cp.execSync(cmd, {cwd: root.path, stdio: 'inherit'});
        } catch (err) {
            process.exit(err.status);
        }
    });
});

fs.copySync(root.resolve('grpc-proto'), grpcBackDir);

// copy typings and remove js and web typings
fs.copySync(`${grpcBackDir}/.tmp`, grpcBackDir);
rimraf.sync(`${grpcBackDir}/.tmp`);
rimraf.sync(`${grpcBackDir}/!**/!*_grpc_web_*`);
rimraf.sync(grpcDir);

process.exit(0);
