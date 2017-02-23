const assert = require('chai').assert;

const updater = require('../lib/update-user');

describe.only('update-user function', () => {
 
    var dummyUser = {
        username: 'Testy',
        hash: '$2a$08$F5f7nZtejb5o6N6kZ.XAP.kGlWCGoCnkOAgavSO/xd8LQq121wyEy',
        retired: false,
        age: 18,
        bank_account: 200000,
        networth: '',
        assets: [],
        original_signup: new Date('2016-02-10'),
        last_sign_in: new Date('2016-02-22'),
        job: {
            start_date: new Date('2016-02-10'),
            job_name: {
                jobType: 'Unskilled',
                jobLevel: 'Entry',
                monthlySalary: 1000,
                promotionInterval: 0
            }
        }
    };
    dummyUser.networth = dummyUser.bank_account;

    it('updates the age after one game year', () => {
        dummyUser = updater(new Date('2016-02-23'), dummyUser);
        assert.equal(dummyUser.age, 19);
    });

    it('updates the promotionInterval in game months', () => {
        reset(dummyUser);
        dummyUser = updater(new Date('2016-02-11'), dummyUser);
        assert.equal(dummyUser.job.job_name.promotionInterval, 1);
    });

    function reset(obj) {
        obj.retired = false,
        obj.age = 18;
        obj.bank_account = 200000,
        obj.networth = obj.bank_account,
        obj.assets = [],
        obj.job.job_name.jobLevel = 'Entry';
        obj.job.job_name.monthlySalary = 1000;
        obj.job.job_name.promotionInterval = 0;
       
        return obj;
    }
});