const mongoose = require('mongoose');
const assert = require('chai').assert;

const User = require('../lib/models/user.model');
const updater = require('../lib/update-user');

describe.skip('update-user function', () => {
    // let dummyJob = new Job()
    let dummyUser = new User({
        username: 'Testy',
        hash: '$2a$08$F5f7nZtejb5o6N6kZ.XAP.kGlWCGoCnkOAgavSO/xd8LQq121wyEy',
        job: {
            start_date: '2016-02-10T00:48:31.406Z',
            // job_name: 'something'/*{
            //     jobType: 'Unskilled',
            //     jobLevel: 'Entry',
            //     monthlySalary: 1000,
            //     promotionInterval: 1
            // }*/
        },
        age: 18,
        original_signup: '2016-02-10T00:48:31.406Z'
    });

    it('updates the age after one game year', () => {
        dummyUser = updater(new Date('2016-02-23'), dummyUser);
        assert.equal(dummyUser.age, 19);
    });

    it('updates the amount of months on the job', () => {
        console.log('dUse is..', dummyUser);
    });
});