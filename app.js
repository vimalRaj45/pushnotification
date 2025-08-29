document.getElementById('notifyBtn').addEventListener('click', async () => {
  if (!('Notification' in window)) {
    alert('Browser does not support notifications.');
    return;
  }

  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    showNotification();
  } else if (permission === 'denied') {
    alert('Please allow notifications in browser settings.');
  }
});

function showNotification() {
  // Use the Service Worker to show notifications
  navigator.serviceWorker.getRegistration().then(reg => {
    if (reg) {
      reg.showNotification('Hello!', {
        body: 'Notifications are working!',
        icon: 'icon.png',
        data: { url: 'https://vsgroupsofcompany.neocities.org/vs' },
        tag: 'demo-notification', // prevent duplicate notifications
        renotify: true
      });
    } else {
      console.error('No SW registration found');
    }
  });
}

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(reg => console.log('SW registered:', reg.scope))
    .catch(err => console.error('SW registration failed:', err));
}
