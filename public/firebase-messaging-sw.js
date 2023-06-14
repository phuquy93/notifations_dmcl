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


