// hallService.js

const Hall = require('../model/hallModel');

const updateHallStatusAndCleanup = async () => {
    try {
        // Find halls with the status "scheduled" and end time in the past
        const expiredHalls = await Hall.find({ status: "scheduled", endTime: { $lte: new Date() } });

        // Update the status of expired halls to "finished"
        for (const hall of expiredHalls) {
            hall.status = "finished";
            await hall.save();
            console.log(`Hall ${hall.name} marked as finished.`);

            // Automatically delete the hall if it is finished
            await Hall.findByIdAndDelete(hall._id);
            console.log(`Hall ${hall.name} deleted after finishing.`);
        }
    } catch (error) {
        console.error('Error updating and cleaning up hall statuses:', error);
    }
};

module.exports = { updateHallStatusAndCleanup };
