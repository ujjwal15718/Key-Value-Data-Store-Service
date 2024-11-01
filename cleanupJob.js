const cron = require('node-cron');
const KVModel = require('./models/kvModel');

// Schedule a cron job to run every minute
cron.schedule('*/5 * * * *', async () => {
    const now = new Date(); // Get the current date and time
    try {
        // Delete records where TTL has expired
        await KVModel.query().delete().whereRaw('ttl IS NOT NULL AND (created_at + interval \'1 second\' * ttl) < ?', [now]);
        console.log('Expired keys cleaned up');
    } catch (error) {
        // Log any errors that occur during the cleanup process
        console.error('Error during cleanup:', error);
    }
});