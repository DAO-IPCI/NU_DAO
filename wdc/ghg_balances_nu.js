(function() {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function(schemaCallback) {
        tableau.log("Getting schema");
        var cols = [{
            id: "member_id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "balance",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "NUGHGBalance",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    myConnector.getData = function(table, doneCallback) {
        tableau.log("Fetching data");
        server = "hbrz.khassanov.me:80";
        month = ("0" + (today.getMonth())).slice(-2) + "/" + today.getFullYear(); // prev month
        $.getJSON("http://" + server + "/api/v1/members/ghg/balances?month=" + month, function(resp) {
            tableau.log("Recieved:");
            tableau.log(resp);
            var balances = resp.balances;
            var tableData = [];

            for (var i = 0, len = balances.length; i < len; i++) {
                tableData.push({
                    "member_id": balances[i].member_id,
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
