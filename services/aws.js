const AWS = require('aws-sdk');

AWS.config.update({region: process.env.REGION});
const ec2 = new AWS.EC2({apiVersion: '2016-11-15'});


module.exports.startInstances = (InstanceIds = []) => {
    console.log('InstanceIds', InstanceIds);
    const params = {
        DryRun: true,
        InstanceIds
    };

    return new Promise((resolve, reject) => {
        ec2.startInstances(params, (err, data) => {
            if (err && err.code === 'DryRunOperation') {
                params.DryRun = false;
                ec2.startInstances(params, (err, data) => {
                    if (err) {
                        return reject(err);
                    } else if (data) {
                        return resolve(data.StartingInstances);
                    }
                });
            } else {
                return reject(new Error("You don't have permission to start instances."));
            }
        });
    });
};

module.exports.stopInstances = (InstanceIds = []) => {
    const params = {
        DryRun: true,
        InstanceIds
    };

    return new Promise((resolve, reject) => {
        ec2.stopInstances(params, (err, data) => {
            if (err && err.code === 'DryRunOperation') {
                params.DryRun = false;
                ec2.stopInstances(params, (err, data) => {
                    if (err) {
                        return reject(err);
                    } else if (data) {
                        return resolve(data.StoppingInstances);
                    }
                });
            } else {
                return reject(new Error("You don't have permission to start instances."));
            }
        });
    });
};

module.exports.getInstanceList = (instances) => {
    const params = {
        DryRun: false,
        InstanceIds: instances
    };

    return new Promise((resolve, reject) => {
        ec2.describeInstances(params, function (err, data) {
            if (err) {
                return reject(err);
            } else {
                return resolve(data);
            }
        });
    });
};
