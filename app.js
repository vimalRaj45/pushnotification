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
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.getRegistration().then(reg => {
      if (reg) {
        reg.showNotification('Hello!', {
          body: 'Notifications are working!',
          icon: 'icon.png',
          data: { url: 'https://vsgroupsofcompany.neocities.org/vs' }
        });
      } else {
        console.error('No SW registration found');
      }
    });
  } else {
    console.error('No active SW controller');
  }
}

// Register service worker
if ('serviceWorker' in navigator) {
  const swUrl = '/pushnotification/sw.js';
  navigator.serviceWorker.register(swUrl)
    .then(reg => console.log('SW registered:', reg.scope))
    .catch(err => console.error('SW registration failed:', err));
}
