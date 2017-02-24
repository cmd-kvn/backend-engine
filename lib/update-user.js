const User = require('./models/user.model');
const Job = require('./models/job.model');


module.exports = function update(date, user) {
    var elapsedGameYears, monthsWorked;

    /* Update the user's age */
    // convert ms to days
    // 1 real day = 1 game month
    // ms * (1 calendar day/86400000 ms) * (1 game month/1 calendar day) * (1 game year/12 game months)
    elapsedGameYears = (date - user.original_signup) * (1 / 86400000) * (1 / 1) * (1 / 12);
    user.age = 18 + Math.floor(elapsedGameYears);

    /* Add montlySalary to bank account */
    // The monthlySalary can be added straightforwardly
    // because setInterval updates every "game month" (86400s, 1 calendar day)
    user.bank_account += user.job.job_name.monthlySalary;

    /* Update networth */
    user.networth = user.bank_account /* TODO: + assets values */;

    /* Check if the user can retire */
    if (user.networth >= 1000000) {
        user.retired = true;
    }

    /* Update monthsWorked */
    // ms * (1 calendar day/86400000 ms) * (1 game month/1 calendar day) = game months
    monthsWorked = (date - user.job.start_date) * (1 / 86400000);
    // user.job.job_name.promotionInterval = Math.floor(monthsWorked);

    /* Update jobLevel */
    /* Update montlySalary */
    // type and level: // unskilled 1 | us2 | us3 | blue collar 1 | bc2 | bc3 | white collar 1 | wc2 | wc3
    // promoInt:       // 6 months    | 24  | 0   | 12            | 36  | 0   | 24             | 60  | 0   
    // monthlyIncome:  // 1k          | 1.5K| 2k  | 2k            | 3k  | 4k  | 4k             | 6k  | 8k 
    // promoInt is the time point when you can move to the next job level; you can't go above level 3
    
    let userJob = {};

    Job.findById(user.job.job_name._id)
    .then( job => {
        if(!job) return 'No job exists!';
        else userJob = job;
    });

    if (userJob.promotionInterval === 0 || userJob.promotionInterval > monthsWorked) {
        // user is at jobLevel 3 or has not worked enough months to be promoted; nothing changes
    }
    else if (monthsWorked === userJob.promotionInterval) {
        //find next job
        Job.find({ jobType: userJob.jobType })
            .then(jobsArr => {
                if (userJob.jobLevel === 'Entry') {
                    jobsArr.filter(x => {
                        if (x.jobLevel === 'Mid-level') {
                            return x._id;
                        }
                    });
                }
                else if (userJob.jobLevel === 'Mid-level') {
                    jobsArr.filter(x => {
                        if (x.jobLevel === 'Senior') {
                            return x._id;
                        }
                    });
                }
            })
            .then(newId => {
                userJob.job_name = newId;
                return userJob;
            });
    }
    
    
    
    // if (user.job.job_name.jobType === 'Unskilled') {
    //     if (monthsWorked < 6) {
    //         user.job.job_name.jobLevel = 'Entry';
    //         user.job.job_name.monthlySalary = 1000;
    //     }
    //     else if (monthsWorked > 6 && monthsWorked < 24) {
    //         user.job.job_name.jobLevel = 'Mid-level';
    //         user.job.job_name.monthlySalary = 1500;
    //     }
    //     else {
    //         user.job.job_name.jobLevel = 'Senior';
    //         user.job.job_name.monthlySalary = 2000;
    //     }
    // }
    // else if (user.job.job_name.jobType === 'Blue Collar') {
    //     if (monthsWorked < 12) {
    //         user.job.job_name.jobLevel = 'Entry';
    //         user.job.job_name.monthlySalary = 2000;
    //     }
    //     else if (monthsWorked > 12 && monthsWorked < 36) {
    //         user.job.job_name.jobLevel = 'Mid-level';
    //         user.job.job_name.monthlySalary = 3000;
    //     }
    //     else {
    //         user.job.job_name.jobLevel = 'Senior';
    //         user.job.job_name.monthlySalary = 4000;
    //     }
    // }
    // else if (user.job.job_name.jobType === 'White Collar') {
    //     if (monthsWorked < 24) {
    //         user.job.job_name.jobLevel = 'Entry';
    //         user.job.job_name.monthlySalary = 4000;
    //     }
    //     else if (monthsWorked > 24 && monthsWorked < 60) {
    //         user.job.job_name.jobLevel = 'Mid-level';
    //         user.job.job_name.monthlySalary = 6000;
    //     }
    //     else {
    //         user.job.job_name.jobLevel = 'Senior';
    //         user.job.job_name.monthlySalary = 8000;
    //     }
    // }


    return user;
};
