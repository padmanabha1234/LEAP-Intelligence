$(document).ready(function() {
  $("#manual-alerts-button").click(function() {
    var notification = $("<div class='notification'></div>");
    var icon = $("<span class='notification-icon'><i class='fa fa-bell'></i></span>");
    var content = $("<span class='notification-content'>This is a professional notification.</span>");
    var close = $("<span class='notification-close'><i class='fa fa-times'></i></span>");

    close.click(function() {
      notification.remove();
    });

    notification.append(icon);
    notification.append(content);
    notification.append(close);

    $("#notifications-list").prepend(notification);
  });
});

let notifications = [];
let alertsCount = 0;
let visibleNotifications = 0;

const abbreviationMap = {
  "Higher Threshold": "HT",
  "Lower Threshold": "LT",
  "Higher Anomaly": "HA",
  "Lower Anomaly": "LA"
};

const colorMap = {
  "Higher Threshold": "#F1948A", // Muted red
  "Lower Threshold": "#F1948A", // Navy blue
  "Higher Anomaly": "#5DADE2", // Muted orange
  "Lower Anomaly": "#5DADE2" // Muted green
};

function addNotification(type, message) {
  alertsCount++;
  document.getElementById('alerts-count').innerText = alertsCount;

  const abbreviationMap = {
    "Higher Threshold": "HT",
    "Lower Threshold": "LT",
    "Higher Anomaly": "HA",
    "Lower Anomaly": "LA"
  };

  const colorMap = {
    "Higher Threshold": "#F1948A", // Muted red
    "Lower Threshold": "#F1948A", // Navy blue
    "Higher Anomaly": "#5DADE2", // Muted orange
    "Lower Anomaly": "#5DADE2" // Muted green
  };

  notifications.push({
    type: abbreviationMap[type],
    message: message,
    color: colorMap[type]
  });

  // Flash the notification for 2 seconds
  let notificationDiv = document.createElement('div');
  notificationDiv.className = 'notification-flash';

  let typeSpan = document.createElement('span');
  typeSpan.className = 'notification-type';
  typeSpan.innerText = `${abbreviationMap[type]}: `;
  typeSpan.style.fontWeight = 'bold';

  let messageSpan = document.createElement('span');
  messageSpan.className = 'notification-message';
  messageSpan.innerText = message;

  // Split the message into two parts: text before the date and text after the date
const parts = message.split(/(?<=\d{2}\/\d{2}\/\d{2})/);
const textBeforeDate = parts[0];
const textAfterDate = parts[1];

// Create separate spans for the text before and after the date
const textBeforeDateSpan = document.createElement('span');
textBeforeDateSpan.innerText = textBeforeDate;

const textAfterDateSpan = document.createElement('span');
textAfterDateSpan.innerText = textAfterDate;
textAfterDateSpan.style.fontStyle = 'italic'; // Make the text after the date italic
textAfterDateSpan.style.fontSize = "x-large";

  notificationDiv.appendChild(typeSpan);
  notificationDiv.appendChild(messageSpan);

  notificationDiv.style.backgroundColor = colorMap[type];
  notificationDiv.style.color = 'white';
  document.body.appendChild(notificationDiv);

  setTimeout(() => {
    document.body.removeChild(notificationDiv);
  }, 2000);
}

// CSS style for .notification-flash class
const flashStyle = document.createElement('style');
flashStyle.innerHTML = `
    .notification-flash {
        display: block;
        white-space: nowrap;
        padding: 5px 10px;
        margin: 5px;
        border-radius: 5px;
        width: 40%;
    }

    .notification {
        margin-bottom: 5px;
        display: block;
        border-left: 4px solid #000; /* Thick left border */
        border-right: 2px solid #ccc; /* Shadow effect for right border */
        border-top: 2px solid #ccc; /* Shadow effect for top border */
        border-bottom: 2px solid #ccc; /* Shadow effect for bottom border */
        transition: border-color 0.3s;
        clear: both;
        padding-left: 10px;
        position: relative;
        padding-left: 10px;
        overflow: hidden;
    }

    .notification-type {
        font-weight: bold;
    }

    .notification-message {
        margin-left: 5px;
    }

    .notification:hover {
        border-color: #000; /* Highlight the border on hover */
    }

    .notification:last-child {
        margin-bottom: 0;
    }
`;
document.head.appendChild(flashStyle);

function displayNotifications() {
  let notificationsList = document.getElementById('notifications-list');
  notificationsList.style.position = 'fixed';
  notificationsList.style.top = '10';
  notificationsList.style.right = '0';
  notificationsList.style.height = '100vh';

  notifications.forEach(notification => {
    let notificationDiv = document.createElement('div');
    notificationDiv.className = 'notification';

    let typeSpan = document.createElement('span');
    typeSpan.className = 'notification-type';
    typeSpan.innerText = `${notification.type}: `;

    let messageSpan = document.createElement('span');
    messageSpan.className = 'notification-message';
    messageSpan.innerText = notification.message;

    notificationDiv.appendChild(typeSpan);
    notificationDiv.appendChild(messageSpan);

    notificationDiv.style.backgroundColor = 'transparent'; // Set transparent background color
    notificationDiv.style.borderLeftColor = notification.color; // Set left border color
    notificationDiv.style.color = notification.color; // Set text color to match the border color
    notificationsList.appendChild(notificationDiv); // Use appendChild to add notifications in separate lines
  });

  // Toggle display of notifications list
  notificationsList.style.display = notificationsList.style.display === 'block' ? 'none' : 'block';
}

document.getElementById('alerts-icon').addEventListener('click', function() {
  let notificationsList = document.getElementById('notifications-list');
  displayNotifications();
  // If the notifications list is visible, reset alerts count and notifications
  if (notificationsList.style.display === 'block') {
    alertsCount = 0;
    document.getElementById('alerts-count').innerText = '';
    notifications = [];
  }
});
