console.log('SW.js loaded');

// Install event
self.addEventListener('install', () => {
  console.log('SW installed');
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', event => {
  console.log('SW activated');
  event.waitUntil(self.clients.claim());
});

// Handle notification click
self.addEventListener('notificationclick', event => {
  console.log('Notification clicked:', event.notification);
  event.notification.close();

  const url = event.notification.data?.url || 'https://vsgroupsofcompany.neocities.org/vs';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      for (const client of windowClients) {
        if (client.url === url && 'focus' in client) {
          console.log('Focusing existing window:', client.url);
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        console.log('Opening new window:', url);
        return self.clients.openWindow(url);
      }
    })
  );
});
