document.getElementById('send-btn').addEventListener('click', function () {
    let phoneNumber = document.getElementById('send-to').value;
    let amount = document.getElementById('send-amount').value;

    fetch('/ussd', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `sessionId=12345&serviceCode=*123#&phoneNumber=${phoneNumber}&text=1*07*${amount}`
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Display USSD response
    })
    .catch(error => console.error('Error:', error));
});

// Function to switch tabs
function openTab(evt, tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
