// Install event
self.addEventListener('install', () => self.skipWaiting());

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// Handle notification click
self.addEventListener('notificationclick', event => {
  event.notification.close();

  const url = event.notification.data?.url || 'https://vsgroupsofcompany.neocities.org/vs';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      // Focus an existing tab if open
      for (const client of windowClients) {
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      // Otherwise, open a new tab
      if (self.clients.openWindow) {
        return self.clients.openWindow(url);
      }
    })
  );
});
