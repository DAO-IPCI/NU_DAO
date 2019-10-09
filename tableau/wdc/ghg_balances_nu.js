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
        }];

        var tableSchema = {
            id: "NUGHGBalance",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    myConnector.getData = function(table, doneCallback) {
        tableau.log("Fetching data");
        var server = "nudao.kz";
        var today = new Date();
        var month = ("0" + (today.getMonth())).slice(-2) + "/" + today.getFullYear(); // prev month
        var member_block_numbers = [];
        $.getJSON("http://" + server + "/api/v1/members", function(resp) {
            tableau.log("Fetching members list");
            for (var i = 0, len = resp.length, i < len; i++) {
                member_block_numbers.push({
                    "member_id": resp[i].id,
                    "member_block_number": parseInt(resp[i].name.split(" ")[1]);
                });
            }
        });

        $.getJSON("http://" + server + "/api/v1/members/ghg/balances?month=" + month, function(resp) {
            tableau.log("Recieved:");
            tableau.log(resp);
            var balances = resp.balances;
            var tableData = [];

            for (var i = 0, len = balances.length; i < len; i++) {
                var member_block_number = member_block_numbers.find(function(elem) {
                    return elem.member_id == balances[i].member_id;
                }).member_block_number;
                tableData.push({
                    "member_id": balances[i].member_id,
                    "member_block_number": member_block_numbers.f
                    "balance": balances[i].balance
                });
            }

            table.appendRows(tableData);
            doneCallback();
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
