var express = require('express');
let fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});

router.post('/home', async (req, res, next) => {
    //fs.writeFile('logs', `${req.body.message} - ` + (new Date()));
    await fs.appendFile('logs', "\n" + "Home - " + (new Date()), function (err) {
        if (err) throw err;
    });

    await res.status(200).json({status: 'ok'});
});

router.post('/create', async (req, res, next) => {
    //fs.writeFile('logs', `${req.body.message} - ` + (new Date()));
    await fs.appendFile('logs', "\n" + "Create - " + (new Date()), function (err) {
        if (err) throw err;
    });

    await res.status(200).json({status: 'ok'});
});

router.post('/creategray', async (req, res, next) => {
    //fs.writeFile('logs', `${req.body.message} - ` + (new Date()));
    await fs.appendFile('logs', "\n" + "Create Grayz - " + (new Date()), function (err) {
        if (err) throw err;
    });

    await res.status(200).json({status: 'ok'});
});

router.post('/join', async (req, res, next) => {
    //fs.writeFile('logs', `${req.body.message} - ` + (new Date()));
    await fs.appendFile('logs', "\n" + "Join - " + (new Date()), function (err) {
        if (err) throw err;
    });

    await res.status(200).json({status: 'ok'});
});

router.post('/joingray', async (req, res, next) => {
    //fs.writeFile('logs', `${req.body.message} - ` + (new Date()));
    await fs.appendFile('logs', "\n" + "Join Gray - " + (new Date()), function (err) {
        if (err) throw err;
    });

    await res.status(200).json({status: 'ok'});
});

router.post('/search', async (req, res, next) => {
    //fs.writeFile('logs', `${req.body.message} - ` + (new Date()));
    await fs.appendFile('logs', "\n" + "Search - " + (new Date()), function (err) {
        if (err) throw err;
    });

    await res.status(200).json({status: 'ok'});
});

router.post('/addTrack', async (req, res, next) => {
    //fs.writeFile('logs', `${req.body.message} - ` + (new Date()));
    await fs.appendFile('logs', "\n" + "Add Track - " + (new Date()), function (err) {
        if (err) throw err;
    });

    await res.status(200).json({status: 'ok'});
});

router.post('/suggest', async (req, res, next) => {
    //fs.writeFile('logs', `${req.body.message} - ` + (new Date()));
    await fs.appendFile('logs', "\n" + "Suggest Track - " + (new Date()), function (err) {
        if (err) throw err;
    });

    await res.status(200).json({status: 'ok'});
});

router.post('/joinCode', async (req, res, next) => {
    //fs.writeFile('logs', `${req.body.message} - ` + (new Date()));
    await fs.appendFile('logs', "\n" + "Join Attempt - " + (new Date()), function (err) {
        if (err) throw err;
    });

    await res.status(200).json({status: 'ok'});
});

router.post('/start', async (req, res, next) => {
    //fs.writeFile('logs', `${req.body.message} - ` + (new Date()));
    await fs.appendFile('logs', "\n" + "Start task - " + (new Date()), function (err) {
        if (err) throw err;
    });

    await res.status(200).json({status: 'ok'});
});

module.exports = router;
