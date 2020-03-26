const express = require('express');
const router = express.Router();
const awsService = require('../services/aws');

/* GET home page. */
router.get('/', (req, res, next) => {
  let instances = [];
  if(process.env.INSTANCES && process.env.INSTANCES.length > 0) {
    instances = process.env.INSTANCES.split(',');
  }

  awsService.getInstanceList(instances)
  .then(result=> {
    let instanceList = [];
    result.Reservations.forEach(i => {
      instanceList = instanceList.concat(i.Instances);
    });
    console.log(instanceList);

    res.render('index', { instanceList });
  });
});

module.exports = router;
