*/
var assert = require("assert");
var redisCopier = require("..");

describe('Grep', function(){
    it('grep', function(){
        var grepOptions = {
            commands: ["append","set"],
            keys: ['te']
        }

        redisCopier.grepCommand({
            commands: ["append","set"],
            keys: ['te']
        });


    });

});