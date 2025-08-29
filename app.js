console.log('App.js loaded');

const notifyBtn = document.getElementById('notifyBtn');

notifyBtn.addEventListener('click', async () => {
  console.log('Notify button clicked');

  if (!('Notification' in window)) {
    alert('Browser does not support notifications.');
    console.error('Notifications not supported');
    return;
  }

  const permission = await Notification.requestPermission();
  console.log('Notification permission:', permission);

  if (permission === 'granted') {
    console.log('Permission granted. Showing notification...');
    showNotification();
  } else if (permission === 'denied') {
    alert('Please allow notifications in browser settings.');
    console.error('Permission denied');
  } else {
    console.warn('Notification permission:', permission);
  }
});

function showNotification() {
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.getRegistration().then(reg => {
      if (reg) {
        console.log('SW registration found:', reg.scope);
        reg.showNotification('Hello!', {
          body: 'Notifications are working!',
          icon: 'icon.png',
          data: { url: 'https://vsgroupsofcompany.neocities.org/vs' },
          tag: 'demo-notification',
          renotify: true
        }).then(() => {
          console.log('Notification requested via SW');
        }).catch(err => {
          console.error('SW notification failed:', err);
          // Fallback
          new Notification('Hello!', { body: 'Notifications are working!', icon: 'icon.png' });
        });
      } else {
        console.warn('No SW registration found, using direct Notification');
        new Notification('Hello!', { body: 'Notifications are working!', icon: 'icon.png' });
      }
    }).catch(err => console.error('Error getting SW registration:', err));
  } else {
    console.warn('No SW controller, using direct Notification');
    new Notification('Hello!', { body: 'Notifications are working!', icon: 'icon.png' });
  }
}

// Register Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(reg => console.log('Service Worker registered:', reg.scope))
    .catch(err => console.error('SW registration failed:', err));
} else {
  console.error('Service Worker not supported');
}
