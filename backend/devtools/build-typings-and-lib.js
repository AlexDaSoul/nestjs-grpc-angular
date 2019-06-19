#!/usr/bin/node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');
const rimraf = require('rimraf');

const ROOT = path.resolve(__dirname, '..');
const root = path.join.bind(path, ROOT);
const grpcDir = root('src/grpc-proto');
const libDir = root('src/lib');
const packagesDir = root('/src/packages');

const getProtosList = () => {
    return glob.sync('/**/index.proto', {
        root: grpcDir,
    });
};

const getPackagesList = () => {
    return glob.sync('/*', {
        root: packagesDir,
    });
};

// copy grpc-proto
rimraf.sync(grpcDir);
fs.copySync(root('../grpc-proto'), grpcDir);

// **** build typings
getProtosList().forEach(protoFile => {
    const protoFileDir = path.dirname(protoFile);
    console.log(`Generate NestJS typings for ${protoFileDir}`);

    execSync( // npm i -g protobufjs
        `pbjs --no-encode --no-decode --no-verify --no-convert --no-delimited --no-beautify -l -t static ${protoFile} | ` +
        `pbts --no-comments -o ${protoFileDir}/index.d.ts -`,
        { cwd: root(), stdio: 'inherit' }
    );

    // replace Promise to Observable and add second param to services due NestJS features
    execSync(
        `sed -i \
        -e '2i import { Observable } from "rxjs";' \
        -e '2i import { Metadata } from "grpc";' \
        -e '/.*(request: [^,]\\+, callback: [^)]\\+).*/d # remove service functions with callback (variation 1)' \
        -e 's/Promise/Observable/g                       # modify service functions return type from Promise to Observable (variation 2)' \
        -e 's/\\((request: [^,)]\\+\\))/\\1, metadata?: Metadata)/ # add param Metadata to variation 2 methods' \
        ${protoFileDir}/index.d.ts`,
        { cwd: root(), stdio: 'inherit' }
    );
});

getPackagesList().forEach(package => {
    const grpcProtoDir = `${package}/grpc-proto`;
    const libMsDir = `${package}/lib`;

    rimraf.sync(grpcProtoDir);
    fs.copySync(grpcDir, grpcProtoDir);

    rimraf(libMsDir, [], () => {
        fs.copySync(libDir, libMsDir);
    });
});

rimraf.sync(grpcDir);
