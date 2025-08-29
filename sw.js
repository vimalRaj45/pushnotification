self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = event.notification.data?.url || 'https://vsgroupsofcompany.neocities.org/vs';
  event.waitUntil(
    self.clients.openWindow(url)
  );
});
