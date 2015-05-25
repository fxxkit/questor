var express     = require('express'),
    mock_data   = require('../mock_data/task-data'),
    router      = express.Router(),
    debug       = require('debug')('route');


var selectPage = function (tab) {
    return {
        explore: tab === "explore",
        mytasks: tab === "mytasks",
        create:  tab === "create",
        setting: tab === "setting"
    }
};

router.get('/', function (req, res, next) {
    res.redirect('/explore');
});

router.get('/explore', function (req, res) {
    res.render('index', {
        title: "Home",
        page: selectPage('explore')
    });
});

router.get('/mytasks', function (req, res) {
    var myTasks = mock_data._mock_myTask.myTaskIdList.map(function(taskId, idx){
        return mock_data._mock_allTasks[taskId]
    });
    res.render('mytasks', {
        tasks: myTasks,
        page: selectPage('mytasks')
    });
});

router.get('/create', function (req, res) {
    res.render('create', {
        page: selectPage('create')
    });
});

router.get('/setting', function (req, res) {
    res.render('setting', {
        page: selectPage('setting')
    });
});

module.exports = router;
