const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const myConfig = require('./customConfig');

/*
Lighthouse documentation is BAD AND CONFUSING. Best to just look through the code. Useful links:
https://github.com/GoogleChrome/lighthouse
https://github.com/GoogleChrome/lighthouse/blob/master/docs/architecture.md
https://github.com/GoogleChrome/lighthouse/blob/master/docs/configuration.md
https://github.com/GoogleChrome/lighthouse/blob/master/docs/readme.md#using-programmatically

https://github.com/GoogleChrome/lighthouse/blob/master/docs/recipes/custom-audit/searchable-audit.js
https://github.com/GoogleChrome/lighthouse/blob/master/docs/recipes/custom-audit/searchable-gatherer.js
https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/gather/gatherers/image-usage.js

https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/index.js
https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/runner.js#L387

To run on command line:
lighthouse https://www.audible.com --disable-cpu-throttling --disable-network-throttling --disable-device-emulation --output json --output-path ./testOutput.json --config-path ./customConfig.js
*/

const endpoints = [
    // put endpoints here
];

const flags = {
    output: 'json',
    disableCpuThrottling: true,
    disableDeviceEmulation: true,
    disableNetworkThrottling: true
};

function launchChromeAndRunLighthouse(url, opts, config = null) {
    return chromeLauncher.launch({ chromeFlags: opts.chromeFlags }).then(chrome => {
        opts.port = chrome.port;

        return lighthouse(url, opts, config).then(results => {
            return chrome.kill().then(() => {
                return results;
            });
        });
    });
}

function runTests() {
    // Note: these are run in parallel
    for (let endpoint of endpoints) {
        launchChromeAndRunLighthouse(endpoint, flags, myConfig).then((results) => {
            const auditResults = results.audits['audible-image-size-audit'];

            console.log(`RESULTS FOR ${endpoint}:`);
            console.log(auditResults.details);
            console.log('\n\n');
        });
    }
}

runTests();
