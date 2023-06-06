import { Given, When, Then, Before, After } from '@wdio/cucumber-framework';
import {step, addAttachment } from '@wdio/allure-reporter';

Given(/^I am on the (\w+) page$/, async (page) => {
    await browser.url(`https://the-internet.herokuapp.com/${page}`);
});

When(/^I login with (\w+) and (.+)$/, async (username, password) => {
    await $('#username').setValue(username);
    await $('#password').setValue(password);
    await $('button[type="submit"]').click();
});

Then(/^I should see a flash message saying (.*)$/, async (message) => {
    await expect($('#flash')).toBeExisting();
    await expect($('#flash')).toHaveTextContaining(message);
});


// some setup\teardown stuff use allure api
Before(async () => {
    await step('my step name', async (s1) => {
        s1.label('foo', 'bar')
        s1.owner('Boris The Blade')
        await s1.step('my child step name', async (s2) => {
            s2.issue("FOO-666", "https://example.org/issue/{}")
            s2.attach("important data1",  "plain/text")
            s2.attach("important data2",  "plain/text")
        })
    })
})

After(async () => {
    await browser.getWindowSize();
    await step("my step", async () => {
        addAttachment("important data1", "42", "plain/text")
        addAttachment("important data2", "43", "plain/text")
        addAttachment("important data3", "44", "plain/text")
    })
})

// some setup\teardown stuff don't use allure api
Before(async () => {

})

After(async () => {

})