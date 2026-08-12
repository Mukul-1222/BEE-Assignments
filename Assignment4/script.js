let seatsAvailable = true;

let booking = new Promise(function(resolve, reject) {
    setTimeout(function() {
        if (seatsAvailable) {
            resolve("1. Seats are Available");
        } else {
            reject("No Seats Available");
        }
    }, 2000);
});

booking
    .then(function(message) {
        console.log(message);
        return "2. Payment Processed Successfully";
    })
    .then(function(message) {
        console.log(message);
        return "3. Booking Confirmed";
    })
    .then(function(message) {
        console.log(message);
        return "4. Ticket Generated Successfully";
    })
    .then(function(message) {
        console.log(message);
    })
    .catch(function(error) {
        console.log("Error:", error);
    });