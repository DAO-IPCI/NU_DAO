(function() {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function(schemaCallback) {
        tableau.log("Getting schema");
        var cols = [{
            id: "member_id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "balance",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "member_block_number",
            dataType: tableau.dataTypeEnum.int
        }];

        var tableSchema = {
            id: "NUGHGBalance",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    myConnector.getData = function(table, doneCallback) {
        var server = "nudao.kz";
        var today = new Date();
        var month = ("0" + (today.getMonth())).slice(-2) + "/" + today.getFullYear(); // prev month
        
        // Polyfill to let it work in Tableau desktop
        if (!Array.prototype.find) {
          Object.defineProperty(Array.prototype, 'find', {
            value: function(predicate) {
             // 1. Let O be ? ToObject(this value).
              if (this == null) {
                throw new TypeError('"this" is null or not defined');
              }
        
              var o = Object(this);
        
              // 2. Let len be ? ToLength(? Get(O, "length")).
              var len = o.length >>> 0;
        
              // 3. If IsCallable(predicate) is false, throw a TypeError exception.
              if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
              }
        
              // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
              var thisArg = arguments[1];
        
              // 5. Let k be 0.
              var k = 0;
        
              // 6. Repeat, while k < len
              while (k < len) {
                // a. Let Pk be ! ToString(k).
                // b. Let kValue be ? Get(O, Pk).
                // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                // d. If testResult is true, return kValue.
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                  return kValue;
                }
                // e. Increase k by 1.
                k++;
              }
        
              // 7. Return undefined.
              return undefined;
            }
          });
        }

        $.getJSON("https://" + server + "/api/v1/members", function(resp) {
            var member_block_numbers = [];
            for (var i = 0, len = resp.length; i < len; i++) {
                member_block_numbers.push({
                    "member_id": parseInt(resp[i].id),
                    "member_block_number": parseInt(resp[i].name.split(" ")[1])
                });
            }

            $.getJSON("https://" + server + "/api/v1/members/ghg/balances?month=" + month, function(resp) {
                var balances = resp.balances;
                var tableData = [];
                for (var i = 0, len = balances.length; i < len; i++) {
                    tableData.push({
                        "member_id": balances[i].member_id,
                        "member_block_number": member_block_numbers.find(function(elem) {
                            return elem.member_id == parseInt(balances[i].member_id);
                        }).member_block_number,
                        "balance": balances[i].balance
                    });
                }
                table.appendRows(tableData);
                doneCallback();
            });
        });
    };

    tableau.registerConnector(myConnector);

    myConnector.init = function(initCallback) {
        tableau.log("Init connector");
        initCallback();
        tableau.connectionName = "NU GHG Balance";
        tableau.submit();
    };
})();
