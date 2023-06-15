importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: 'AIzaSyBybXVFqAgaUaVQFAzmMURY2Vr8chUmDPw',
    appId: '1:338654189304:web:06207aa1b23282f4c9cd0d',
    messagingSenderId: '338654189304',
    projectId: 'dmclmobileapp',
    authDomain: 'dmclmobileapp.firebaseapp.com',
    databaseURL: 'https://dmclmobileapp.firebaseio.com',
    storageBucket: 'dmclmobileapp.appspot.com',
    measurementId: 'G-LG7B1Q7LJ4',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/icon.png'
    };
    self.registration.showNotification(notificationTitle,
        notificationOptions);


});


self.addEventListener('notificationclick', function (event) {
    console.debug('SW notification click event', event)
    const url = "https://notification.stdmcl.com:11443/location";
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(windowClients => {
            // Check if there is already a window/tab open with the target URL
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                // If so, just focus it.
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            // If not, then open the target URL in a new window/tab.
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
})

