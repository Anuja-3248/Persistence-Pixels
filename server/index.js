const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, 'notifications.json');

app.use(cors());
app.use(bodyParser.json());

// Initialize data file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
}

// Low-db style helper
const getNotifications = () => JSON.parse(fs.readFileSync(DATA_FILE));
const saveNotifications = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

/**
 * GET /notifications
 * Fetch user notifications, filtered by userId and location
 */
app.get('/notifications', (req, res) => {
  const { userId, location } = req.query;
  let notifications = getNotifications();

  if (userId) {
    notifications = notifications.filter(n => n.userId === userId || n.userId === 'GLOBAL');
  }

  // Filter location-based alerts
  if (location) {
    notifications = notifications.filter(n => {
      if (n.type === 'location' || n.priority === 'high') {
        return !n.location || n.location === location;
      }
      return true;
    });
  }

  // Sort by latest first
  notifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  res.json(notifications);
});

/**
 * POST /notifications
 * Create a new notification
 */
app.post('/notifications', (req, res) => {
  const { userId, type, title, description, location, priority, isVerified } = req.body;
  
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  const newNotification = {
    id: uuidv4(),
    userId: userId || 'GLOBAL',
    type: type || 'general',
    title,
    description,
    location,
    priority: priority || 'low',
    isRead: false,
    isVerified: isVerified || false,
    createdAt: new Date().toISOString()
  };

  const notifications = getNotifications();
  notifications.push(newNotification);
  saveNotifications(notifications);

  res.status(201).json(newNotification);
});

/**
 * PATCH /notifications/:id/read
 * Mark a notification as read
 */
app.patch('/notifications/:id/read', (req, res) => {
  const { id } = req.params;
  const notifications = getNotifications();
  const index = notifications.findIndex(n => n.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Notification not found' });
  }

  notifications[index].isRead = true;
  saveNotifications(notifications);

  res.json(notifications[index]);
});

/**
 * DELETE /notifications
 * Clear all notifications for a specific user
 */
app.delete('/notifications', (req, res) => {
  const { userId } = req.query;
  let notifications = getNotifications();

  if (userId) {
    notifications = notifications.filter(n => n.userId !== userId);
    saveNotifications(notifications);
  } else {
    saveNotifications([]);
  }

  res.json({ message: 'Notifications cleared' });
});

app.listen(PORT, () => {
  console.log(`DisasterX Notification Backend running on http://localhost:${PORT}`);
});
