const express = require('express');
const router = express.Router();
const awsService = require('../services/aws');

router.post('/start', (req, res, next) => {
    let instances = [];
    if (req.body.instanceId) {
        instances.push(req.body.instanceId);
    }
    // if (process.env.INSTANCES && process.env.INSTANCES.length > 0) {
    //     instances = process.env.INSTANCES.split(',');
    // }

    awsService.startInstances(instances)
        .then(instanceList => {
          console.log(instanceList)
            res.send('OK');
        })
        .catch(e => {
            res.status(400).send(e.message)
        })
});

router.post('/stop', (req, res, next) => {
    let instances = [];
    if (req.body.instanceId) {
        instances.push(req.body.instanceId);
    }
    // if (process.env.INSTANCES && process.env.INSTANCES.length > 0) {
    //     instances = process.env.INSTANCES.split(',');
    // }

    awsService.stopInstances(instances)
        .then(instanceList => {
          console.log(instanceList)
            res.send('OK');
        })
        .catch(e => {
            res.status(400).send(e.message)
        })
});

module.exports = router;
