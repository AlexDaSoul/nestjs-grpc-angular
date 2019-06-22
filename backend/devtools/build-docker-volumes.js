#!/usr/bin/env node
/**
 **  Build high level external volumes from config files.
 **  --debug  build debug volumes
 **
 **/
const chp = require('child_process');
const fs = require('fs-extra');
const helpers = require('./helpers');
const yaml = require('js-yaml');

let composeFiles = ['docker-compose.yml'];
const argv = require('minimist')(process.argv.slice(2));
if (argv.debug) {
    composeFiles.push('docker-compose-develop.volumes.yml');
} else {
    composeFiles.push('docker-compose.volumes.yml');
}

composeFiles.forEach(conf => {
    var doc = yaml.safeLoad(fs.readFileSync(helpers.root('docker/' + conf), 'utf8'));
    if (doc.volumes) {
        Object.keys(doc.volumes).forEach(key => {
            if (doc.volumes[key].external) {
                chp.execSync(`docker volume create ${helpers.fillTemplate(key, { IMAGEPREFIX: helpers.conf.microservice.docker.imagePrefix })}`);
            }
        });
    }
});
