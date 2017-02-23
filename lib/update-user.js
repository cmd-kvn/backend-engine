module.exports = function update(date, user) {
    var elapsedGameYears, promoInterval;

    /* Update the user's age */
    // convert ms to days
    // 1 real day = 1 game month
    // ms * (1 calendar day/86400000 ms) * (1 game month/1 calendar day) * (1 game year/12 game months)
    elapsedGameYears = (date - user.original_signup) * (1 / 86400000) * (1 / 1) * (1 / 12);
    user.age = 18 + Math.floor(elapsedGameYears);
    console.log('elapsed game years is: ', elapsedGameYears);

    /* Update promotionInterval */
    // ms * (1 calendar day/86400000 ms) * (1 game month/1 calendar day) = game months
    promoInterval = (date - user.job.start_date) * (1 / 86400000);
    console.log('pInt is..', promoInterval);
    user.job.job_name.promotionInterval = Math.floor(promoInterval);

    /* Update jobLevel */
    /* Update montlySalary */
    // type and level: // unskilled 1 | us2 | us3 | blue collar 1 | bc2 | bc3 | white collar 1 | wc2 | wc3
    // promoInt:       // 6 months    | 24  | x   | 12            | 36  | x   | 24             | 60  | x   
    // monthlyIncome:  // 1k          | 1.5K| 2k  | 2k            | 3k  | 4k  | 4k             | 6k  | 8k 
    // promoInt is the time in months it takes to move to the next job level
    // there is no max months at level 3 that will move you to the next job class

    if (user.job.job_name.jobType === 'Unskilled') {
        if (promoInterval < 6) {
            user.job.job_name.jobLevel = 'Entry';
            user.job.job_name.monthlySalary = 1000;
        }
        else if (promoInterval > 6 && promoInterval < 24) {
            user.job.job_name.jobLevel = 'Mid-level';
            user.job.job_name.monthlySalary = 1500;
        }
        else {
            user.job.job_name.jobLevel = 'Senior';
            user.job.job_name.monthlySalary = 2000;
        }
    }
    else if (user.job.job_name.jobType === 'Blue Collar') {
        if (promoInterval < 12) {
            user.job.job_name.jobLevel = 'Entry';
            user.job.job_name.monthlySalary = 2000;
        }
        else if (promoInterval > 12 && promoInterval < 36) {
            user.job.job_name.jobLevel = 'Mid-level';
            user.job.job_name.monthlySalary = 3000;
        }
        else {
            user.job.job_name.jobLevel = 'Senior';
            user.job.job_name.monthlySalary = 4000;
        }
    }
    else if (user.job.job_name.jobType === 'White Collar') {
        if (promoInterval < 24) {
            user.job.job_name.jobLevel = 'Entry';
            user.job.job_name.monthlySalary = 4000;
        }
        else if (promoInterval > 24 && promoInterval < 60) {
            user.job.job_name.jobLevel = 'Mid-level';
            user.job.job_name.monthlySalary = 6000;
        }
        else {
            user.job.job_name.jobLevel = 'Senior';}
            user.job.job_name.monthlySalary = 8000;
}
    /* Add montlySalary to bank account */
    // The monthlySalary can be added straightforwardly
    // because setInterval updates every "game month" (86400s, 1 calendar day)
    user.bank_account += user.job.job_name.monthlySalary;

    /* Update networth */
    user.networth = user.bank_account /* TODO: + assets values */;

    /* Check if the user can retire */
    if(user.networth >= 1000000) {
        user.retired = true;
    }

    return user;
};
