// cronJob.js

const cron = require('node-cron');
const { updateHallStatusAndCleanup } = require('./hallService');
const Hall = require('../model/hallModel');

// Schedule the job to run every hour
cron.schedule('0 * * * *', async () => {
    // Run both update and cleanup functions
    await updateHallStatusAndCleanup();

    // Cleanup finished halls every day at midnight
    const currentHour = new Date().getHours();
    if (currentHour === 0) {
        try {
            // Find and delete halls with the status "finished"
            await Hall.deleteMany({ status: "finished" });
            console.log('Finished hall cleanup job completed successfully.');
        } catch (error) {
            console.error('Error in finished hall cleanup job:', error);
        }
    }
});

module.exports = { cron };
