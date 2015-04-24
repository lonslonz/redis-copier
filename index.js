/**
 * by Jongmin Lee on 15. 4. 24..
 * https://github.com/lonslonz/redis-copier
 *
 * MIT Licensed
 */

var util = require('util');
var log4js  = require('log4js');
var logger = log4js.getLogger();
var redis = require('redis');

logger.setLevel('INFO');

exports = module.exports = copyCommand;
module.exports.copyCommand = copyCommand;

/**
 options example :
 {
    commandsInclude: ["set", "select"],
    keysInclude: ['mykey'],
    valuesInclude: ['120'],
    sourceServer : {
        server: "localhost",
        port: "6379"
    },
    destServer : {
        server: "gw.recopick.com",
        port: "6333"
    }
 }
 */
function indexOfEachItem(array, sourceStr) {
    var found = false;
    for(var i in array) {
        if(sourceStr.indexOf(array[i]) >= 0) {
            found = true;
            break;
        };
    };
    return found;
}
function copyCommand(options) {
    sourceClient = redis.createClient(options.sourceServer.port || 6379, options.sourceServer.server);
    destClient = redis.createClient(options.destServer.port || 6379, options.destServer.server);

    sourceClient.monitor(function(err, res) {
       logger.info("start copying ");
    });
    sourceClient.on("monitor", function(time, args) {
        var command = args[0];
        var key = args[1];
        var value = args[2];

        var found = false;
        if(options.commandsInclude) {
            found = indexOfEachItem(options.commandsInclude, command);
        }
        if(options.keysInclude && key && !found) {
            found = indexOfEachItem(options.keysInclude, key);
        }
        if(options.valuesInclude && value && !found) {
            found = indexOfEachItem(options.valuesInclude, value);
        }
        if(found) {
            var sendArgs = args.slice(1);

            destClient.send_command(command, sendArgs, function(err, response) {
                logger.debug('err : ' + err);
                logger.debug('response : ' + response);
                if(err) {
                    logger.error(util.inspect(err));
                } else {
                    logger.info("COPY COMMAND : " + time + ":" + util.inspect(args));
                }
            });


        } else {
            logger.debug("NON-COPY COMMAND : " + time + ":" + util.inspect(args));
        }
    })
}

