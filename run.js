var redisCopier = require('./');

redisCopier.copyCommand({
    commandsInclude: ["set", "select"],
    keysInclude: ['mykey'],
    valuesInclude: ['120'],
    sourceServer : {
        server: "localhost",
        port: "6379"
    },
    destServer : {
        server: "localhost",
        port: "6380"
    }
});