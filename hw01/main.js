var vid = document.getElementById('vid');
var canvas = document.getElementById('can');
var context = canvas.getContext('2d');

vid.addEventListener("loadedmetadata", function() {
    var vh = vid.videoHeight;
    var vw = vid.videoWidth;

    var cw = Math.floor(canvas.clientWidth / 50);
    var ch = Math.floor(canvas.clientHeight / 50);
    canvas.width = cw;
    canvas.height = ch;

    vid.addEventListener('play', function() {
        enbiggen(this, context, cw, ch);
        movevid(this, vw, vh, canvas.clientWidth, canvas.clientHeight);
    }, false);
}, false);

function enbiggen(v, c, w, h) {
    if (v.paused || v.ended) return false;
    c.drawImage(v, 0, 0, w, h);

    var idata = c.getImageData(0,0,w,h);
    var data = idata.data;
    // Loop through the pixels, turning them grayscale
    for(var i = 0; i < data.length; i+=4) {
        var r = data[i];
        var g = data[i+1];
        var b = data[i+2];
        var brightness = (3*r+4*g+b)>>>3;
        data[i] = brightness;
        data[i+1] = brightness;
        data[i+2] = brightness;
    }
    idata.data = data;
    // Draw the pixels onto the visible canvas
    c.putImageData(idata,0,0);
    // Start over!
    setInterval(enbiggen, 20, v, c, w, h); //function, timer, optional params.
}

function movevid(v, vw, vh, w, h) {
    if (v.paused || v.ended) return false;
    else {
        var x = rand(vw/2,w-vw);
        var y = rand(vh/2,h-vh);
        v.style.top = y+"px";
        v.style.left = x+"px";
        setInterval(movevid, 20, v, vw, vh, w, h);
    }
}

function rand(max,min) {
    return rnum = Math.floor(Math.random() * (max - min + 1)) + min;
}