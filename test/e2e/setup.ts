module.exports = async () => {
    const path = require('path');
    const compose = require('docker-compose');

    const promise = new Promise((resolve, reject) => { // eslint-disable-line
        compose.upAll({ cwd: path.join(__dirname), log: true }).then(
            () => {
                resolve('DeBio Network Node is Up!');
            },
            (err) => {
                resolve(`Something went wrong when spawning DeBio Network Node: ${err.message}`);
            }
        );
    });

    console.log(await promise);
}