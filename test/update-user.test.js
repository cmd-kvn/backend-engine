const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const assert = chai.assert;
chai.use(chaiHttp);

const app = require('../lib/app');
const updater = require('../lib/update-user');
const User = require('../lib/models/user.model');
const Job = require('../lib/models/job.model');

process.env.DB_URI = 'mongodb://localhost:27017/test-updater';
require('../lib/connection');

// e2e Test
// before: signup the user
// change the signup date back in time
// update the user with the function

describe.only('update-user function', () => {

    const request = chai.request(app);
    let testUser = {username: 'testUser', password: 'asdf'};
    let empty = {};

    before(() => mongoose.connection.dropDatabase());
    
    before(() => {
        return Job.create({
            jobType: 'Unskilled',
            jobLevel: 'Entry',
            monthlySalary: 1000,
            promotionInterval: 6
        });
    }
    );

    before(() => {
        return request
            .post('/user/signup')
            .send(testUser)
            .then(res => {
                testUser.token = res.body.token;
                console.log('token', res.body);
        })
        ;
    });
    // before(() => { 
    //     request
    //         .get('/user/testUser')
    //         .set('Authorization', testUser.token)
    //         .then(user => {
    //             console.log('inside', user);
    //             testUser = user;
    //             return;
    //         });
    // });

    it('creates a user', () => {
        return User.count()
        .then(count => assert.equal(1, count));
    });

    it('gives the user an entry level job', () => {
        return User.findOne({ username: 'testUser' })
            .then(user => {
                let jobId = user.job.job_name;
                return Job.findById(jobId)
                    .then(job => {
                        assert.deepEqual(job.jobLevel, 'Entry');
                    });
            });
    });

});









describe.skip('update-user function', () => {

    var dummyUser = {
        username: 'Testy',
        hash: '$2a$08$F5f7nZtejb5o6N6kZ.XAP.kGlWCGoCnkOAgavSO/xd8LQq121wyEy',
        retired: false,
        age: 18,
        bank_account: 200000,
        networth: 200000,
        assets: [],
        original_signup: new Date('2016-02-10'),
        last_sign_in: new Date('2016-02-22'),
        job: {
            start_date: new Date('2016-02-10'),
            job_name: 
                '58af2810b51e2b07c2067d95'
                // jobType: 'Unskilled',
                // jobLevel: 'Entry',
                // monthlySalary: 1000,
                // promotionInterval: 0
            
        }
    };

    it('updates the age after one game year', () => {
        dummyUser = updater(new Date('2016-02-23'), dummyUser);
        assert.equal(dummyUser.age, 19);
    });

    // it('updates the monthsWorked in game months', () => {
    //     reset(dummyUser);
    //     dummyUser = updater(new Date('2016-02-11'), dummyUser);
    //     assert.equal(dummyUser.job.job_name.promotionInterval, 1);
    // });

    it('updates the jobLevel and monthly salary', () => {
        reset(dummyUser);
        dummyUser = updater(new Date('2016-02-17'), dummyUser);
        assert.notEqual(dummyUser.job.job_name.jobLevel, 'Entry');
        assert.notEqual(dummyUser.job.job_name.jobLevel, 'Senior');
        assert.equal(dummyUser.job.job_name.jobLevel, 'Mid-level');
        assert.notEqual(dummyUser.job.job_name.monthlySalary, 1000);
        assert.notEqual(dummyUser.job.job_name.monthlySalary, 2000);
        assert.equal(dummyUser.job.job_name.monthlySalary, 1500);
    });

    // it('updates the bank account', () => {
    //     reset(dummyUser);
    //     dummyUser = updater(new Date('2016-02-11'), dummyUser);
    //     dummyUser = updater(new Date('2016-03-11'), dummyUser);
    //     assert.equal(dummyUser.bank_account, 202000);
    // });

    // it('updates the networth', () => {
    //     reset(dummyUser);
    //     dummyUser = updater(new Date('2016-02-12'), dummyUser);
    //     assert.equal(dummyUser.networth, 202000);
    // });

    // it('changes retired to true if networth > 1 million', () => {
    //     reset(dummyUser);
    //     dummyUser.networth = 999990;
    //     dummyUser = updater(new Date(), dummyUser);
    //     console.log('dummyusr', dummyUser);
    //     assert.isTrue(dummyUser.retired);
    // });

    function reset(obj) {
        obj.retired = false;
        obj.age = 18;
        obj.bank_account = 200000;
        obj.networth = obj.bank_account;
        obj.assets = [];
        // obj.job.job_name.jobLevel = 'Entry';
        // obj.job.job_name.monthlySalary = 1000;
        // obj.job.job_name.promotionInterval = 0;

        return obj;
    }
});