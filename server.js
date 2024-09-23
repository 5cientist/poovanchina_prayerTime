const express = require('express');
const app = express();

// Load environment variables
const PORT = process.env.PORT || 3000;

// Dummy data for prayer times
const prayerTimes = {
    Fajr: { Azan: '05:00 AM', Iqamah: '05:15 AM' },
    Dhuhr: { Azan: '12:30 PM', Iqamah: '12:45 PM' },
    Asr: { Azan: '03:45 PM', Iqamah: '04:00 PM' },
    Maghrib: { Azan: '06:15 PM', Iqamah: '06:30 PM' },
    Isha: { Azan: '08:00 PM', Iqamah: '08:15 PM' }
};

// Route to get all prayer times
app.get('/prayer-times', (req, res) => {
    res.status(200).json(prayerTimes);
});

// Route to get a specific prayer time (e.g., Fajr, Dhuhr, etc.)
app.get('/prayer-times/:prayer', (req, res) => {
    const prayer = req.params.prayer;
    if (prayerTimes[prayer]) {
        res.status(200).json(prayerTimes[prayer]);
    } else {
        res.status(404).json({ message: 'Prayer not found' });
    }
});

// Catch-all route for undefined endpoints
app.use((req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

// Global error handler (for any uncaught errors)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
