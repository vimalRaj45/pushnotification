// Request notification permission
document.getElementById('notifyBtn').addEventListener('click', async () => {
  if (!('Notification' in window)) {
    alert('This browser does not support notifications.');
    return;
  }

  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    showNotification();
  } else if (permission === 'denied') {
    alert('Please allow notifications in your browser settings.');
  }
});

// Show notification
function showNotification() {
  const title = 'Hello!';
  const options = {
    body: 'Notifications are working in Chrome!',
    icon: 'icon.png',
    data: { url: 'https://vsgroupsofcompany.neocities.org/vs' }
  };
  new Notification(title, options);
}

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('SW registered:', reg.scope))
    .catch(err => console.error('SW registration failed:', err));
}
