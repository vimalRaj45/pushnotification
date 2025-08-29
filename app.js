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
  if (!('serviceWorker' in navigator)) {
    console.error('Service Worker not supported');
    return;
  }

  navigator.serviceWorker.getRegistration().then(reg => {
    if (!reg) {
      console.error('No Service Worker registration found');
      return;
    }

    console.log('Service Worker registration found:', reg.scope);

    reg.showNotification('Hello!', {
      body: 'Notifications are working!',
      icon: 'icon.png',
      data: { url: 'https://vsgroupsofcompany.neocities.org/vs' },
      tag: 'demo-notification',
      renotify: true
    });

    console.log('Notification requested via Service Worker');
  }).catch(err => {
    console.error('Error getting SW registration:', err);
  });
}

// Register Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(reg => {
      console.log('Service Worker registered:', reg.scope);
    })
    .catch(err => console.error('SW registration failed:', err));
} else {
  console.error('Service Worker not supported');
}
