#!/usr/bin/node

const cp = require('child_process');
const fs = require('fs-extra');
const rimraf = require('rimraf');
const glob = require('glob');
const root = require('app-root-path');
const helpers = require('./helpers');

const grpcDir = root.resolve('backend/src/grpc-proto');
const libDir = root.resolve('backend/src/lib');
const packagesDir = root.resolve('backend/src/packages');

const BIN_PATH = cp.execSync('npm bin', { cwd: root.path })
    .toString()
    .replace(/\n/, '');

const IGNORE_PACKAGES = [
    // ...
];

const IGNORE_PROTO_FILES = ['**/index.proto'];

const getServices = ()  => {
    return glob.sync('/*', {
        root: packagesDir
    });
};

// copy grpc-proto
rimraf.sync(grpcDir);
fs.copySync(root.resolve('grpc-proto'), grpcDir);

// **** build typings
helpers.getPackages(IGNORE_PACKAGES, grpcDir).forEach(pkg => {
    const protos = helpers.getProtosList(IGNORE_PROTO_FILES, pkg).split(' ');

    protos.forEach(proto => {
        const name = proto.replace(/.proto/, '');
        const input = `${pkg}/${proto}`;
        const output = `${pkg}/${name}.d.ts`;

        cp.execSync(
            `${BIN_PATH}/pbjs --no-encode --no-decode --no-verify --no-convert --no-delimited --no-beautify -l -t static ${input} | \
                       ${BIN_PATH}/pbts --no-comments -o ${output} -`,
            { cwd: root.path, stdio: 'inherit' }
        );

        // replace Promise to Observable and add second param to packages due NestJS features
        cp.execSync(
            `sed -i \
                -e '2i import { Observable } from "rxjs";' \
                -e '2i import { Metadata } from "grpc";' \
                -e '/.*(request: [^,]\\+, callback: [^)]\\+).*/d # remove service functions with callback (variation 1)' \
                -e 's/Promise/Observable/g                       # modify service functions return type from Promise to Observable (variation 2)' \
                -e 's/\\((request: [^,)]\\+\\))/\\1, metadata?: Metadata)/ # add param Metadata to variation 2 methods' \
                ${output}`,
            { cwd: root.path, stdio: 'inherit' }
        );

        console.log(`Generate NestJS typings for ${input}`);
    });
});

process.exit(0);
