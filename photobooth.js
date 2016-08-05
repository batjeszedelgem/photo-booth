function setupUserMedia() {
    var canvas = document.getElementById("snapshot"),
        context = canvas.getContext("2d"),
        video = document.getElementById("live"),
        videoObj = {"video": true},
        errBack = function (error) {
            alert(error);
            console.log("Video capture error: ", error.code);
        };

    if (navigator.getUserMedia) { // Standard
        navigator.getUserMedia({"video": true}, function (stream) {
            video.src = stream;
            video.play();
        }, errBack);
    } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
        navigator.webkitGetUserMedia({"video": true}, function (stream) {
            video.src = window.URL.createObjectURL(stream);
            video.play();
        }, errBack);
    }
    else if (navigator.mozGetUserMedia) { // Firefox-prefixed
        navigator.mozGetUserMedia({"video": true}, function (stream) {
            video.src = window.URL.createObjectURL(stream);
            video.play();
        }, errBack);
    }
}

function snap() {
    live = document.getElementById("live");
    snapshot = document.getElementById("snapshot");

    // Make the canvas the same size as the live video
    snapshot.width = live.clientWidth
    snapshot.height = live.clientHeight

    // Draw a frame of the live video onto the canvas
    c = snapshot.getContext("2d")
    c.drawImage(live, 0, 0, snapshot.width, snapshot.height)

    $('#snapshot').show();
    $('#live').hide();
}

function redo() {
    $('#snapshot').hide();
    $('#live').show();
}

function done() {
    $('#snapshot').hide();
    $('#live').show();
}