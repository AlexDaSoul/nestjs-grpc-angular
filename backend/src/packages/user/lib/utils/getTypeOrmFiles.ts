/*import * as module from 'module';

export const getTypeOrmFiles = (regex: RegExp) => {
    const contexts = require.context('./', true, regex);
    console.log(module);
    return contexts
        .keys()
        .map(modulePath => contexts(modulePath))
        .reduce((result, entityModule) =>
            result.concat(Object.keys(entityModule)
                .map(key => entityModule[key])), []);
};*/
