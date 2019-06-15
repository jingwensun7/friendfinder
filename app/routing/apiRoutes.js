var path = require("path");
var friends = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {
        var userInput = req.body;
        var matchName = "";
        var matchPhoto = "";
        var totalDifference = 100;
        for (var i = 0; i < friends.length; i ++) {
            var difference = 0;
                for (var k = 0; k < userInput.scores.length; k++) {
                    difference += Math.abs(friends[i].scores[k] - userInput.scores[k]);
                }
                if (difference < totalDifference) {
                    totalDifference = difference;
                    matchName = friends[i].name;
                    matchPhoto = friends[i].photo;
                }
            }
            friends.push(userInput);

            res.json({matchName: matchName, matchPhoto: matchPhoto});
    });
};