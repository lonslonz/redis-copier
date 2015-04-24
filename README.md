redis-copier
====
Copy commands of a redis server to another server in real time.

# Description

This module copy one server's commands to another simply.
You can use it to make REDIS development environment on local PC.
It uses MONITOR to get commands.

# Install

    npm install redis-copier

# Usage

Be careful that you don't use same server for source and destination server.

    var redisCopier = require('./');

    redisCopier.copyCommand({
        commandsInclude: ["set", "expire"],
        keysInclude: ["myKey"],
        valuesInclude: ["valueWantToCopy"],
        sourceServer : {
            server: "localhost",
            port: "6379"
        },
        destServer : {
            server: "localhost",
            port: "6380"
        }
    });

or modify run.js (sample) and run it.

   node run.js

If option's value is the part of word, it will be copied.
For examples:

    keysInclude: ["my"]
    issuedCommand : set mykey 1

this command will be copied.