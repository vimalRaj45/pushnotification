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
  const title = 'Hello!';
  const options = {
    body: 'Notifications are working!',
    icon: 'icon.png',
     { url: 'https://vsgroupsofcompany.neocities.org/vs' }
  };
  new Notification(title, options);
}

// Register service worker
if ('serviceWorker' in navigator) {
  const swUrl = '/pushnotification/sw.js';
  navigator.serviceWorker.register(swUrl)
    .then(reg => console.log('SW registered:', reg.scope))
    .catch(err => console.error('SW registration failed:', err));
}
