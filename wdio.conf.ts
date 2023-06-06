import type {Options} from '@wdio/types'
import {step} from "@wdio/allure-reporter";

export const config: Options.Testrunner = {
    runner: 'local',
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            project: './tsconfig.json',
            transpileOnly: true
        }
    },
    specs: [
        './login.feature'
    ],
    exclude: [
    ],
    maxInstances: 10,
    capabilities: [{
        maxInstances: 5,
        //
        browserName: 'chrome',
        acceptInsecureCerts: true
    }],
    logLevel: 'error',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['chromedriver'],
    framework: 'cucumber',
    reporters: ['spec', ['allure', {outputDir: 'allure-results', useCucumberStepReporter: true}]],
    cucumberOpts: {
        require: ['./steps.ts'],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        snippets: true,
        source: true,
        strict: false,
        tagExpression: '',
        timeout: 60000,
        ignoreUndefinedDefinitions: false
    },
    // some setup\teardown stuff use allure api
    afterScenario: async function () {
        await step('afterScenario steps', async (s1) => {
            await s1.step('my child afterScenario step', async (s2) => {
                s2.attach("important data4", "plain/text")
                s2.attach("important data5", "plain/text")
            })
        })
    },

   beforeScenario: async function () {
        // noop
    },
}
