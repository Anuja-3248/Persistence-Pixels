/**
 * Notification Service for Aegis Sentinel
 * Handles storage, filtering, and simulated API endpoints.
 */

const NOTIFICATION_KEY = 'aegis_notifications';
const POLL_INTERVAL = 30000; // 30 seconds

// Initial dummy data to make it look "complete" on first load
const INITIAL_NOTIFICATIONS = [
  {
    id: 'n1',
    userId: 'ID-01',
    type: 'emergency',
    title: 'Flash Flood Warning',
    description: 'Severe flash flooding expected in Sector A-7. Evacuate immediately to higher ground.',
    location: 'Mumbai, India',
    priority: 'high',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    isVerified: true
  },
  {
    id: 'n2',
    userId: 'ID-01',
    type: 'authority',
    title: 'Government Advisory',
    description: 'National Disaster Response Force (NDRF) deployed to coastal regions for monitoring.',
    location: 'Mumbai, India',
    priority: 'medium',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    isVerified: true
  },
  {
    id: 'n3',
    userId: 'ID-01',
    type: 'rescue',
    title: 'Rescue Team Update',
    description: 'Team Bravo has successfully reached the stuck civilians in the valley.',
    location: 'Himalayas, India',
    priority: 'low',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    isVerified: false
  }
];

export const notificationService = {
  // GET /notifications
  getNotifications: async (userId, location) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let stored = JSON.parse(localStorage.getItem(NOTIFICATION_KEY));
    if (!stored) {
      stored = INITIAL_NOTIFICATIONS;
      localStorage.setItem(NOTIFICATION_KEY, JSON.stringify(stored));
    }

    // Filter by User
    let filtered = stored.filter(n => n.userId === userId || n.userId === 'GLOBAL');

    // Location Logic: Only show location-based alerts if they match user location
    // Or if they are emergency/authority (which might be global)
    filtered = filtered.filter(n => {
      if (n.type === 'location' || n.type === 'emergency') {
        return !n.location || n.location === location;
      }
      return true;
    });

    // Sort: High priority first, then latest
    return filtered.sort((a, b) => {
      if (a.priority === 'high' && b.priority !== 'high') return -1;
      if (a.priority !== 'high' && b.priority === 'high') return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  },

  // POST /notifications
  createNotification: async (notificationData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const stored = JSON.parse(localStorage.getItem(NOTIFICATION_KEY)) || INITIAL_NOTIFICATIONS;
    
    const newNotification = {
      id: `n-${Date.now()}`,
      userId: notificationData.userId || 'ID-01',
      type: notificationData.type || 'general',
      title: notificationData.title,
      description: notificationData.description,
      location: notificationData.location,
      priority: notificationData.priority || 'low',
      isRead: false,
      isVerified: notificationData.isVerified || false,
      createdAt: new Date().toISOString()
    };
    
    const updated = [newNotification, ...stored];
    localStorage.setItem(NOTIFICATION_KEY, JSON.stringify(updated));
    return newNotification;
  },

  // PATCH /notifications/:id/read
  markAsRead: async (id) => {
    const stored = JSON.parse(localStorage.getItem(NOTIFICATION_KEY)) || INITIAL_NOTIFICATIONS;
    const updated = stored.map(n => n.id === id ? { ...n, isRead: true } : n);
    localStorage.setItem(NOTIFICATION_KEY, JSON.stringify(updated));
    return { success: true };
  },

  // PATCH /notifications/read-all
  markAllAsRead: async (userId) => {
    const stored = JSON.parse(localStorage.getItem(NOTIFICATION_KEY)) || INITIAL_NOTIFICATIONS;
    const updated = stored.map(n => n.userId === userId ? { ...n, isRead: true } : n);
    localStorage.setItem(NOTIFICATION_KEY, JSON.stringify(updated));
    return { success: true };
  },

  // DELETE /notifications
  clearAll: async (userId) => {
    localStorage.setItem(NOTIFICATION_KEY, JSON.stringify([]));
    return { success: true };
  }
};
