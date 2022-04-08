//  BEGIN CANVAS HEARTS  --- Animated hearts forked from Gerard Ferrandez -  https://codepen.io/ge1doot/pen/OypQdy
//  I simply changed the background color and graphic to a heart.   Gerard is amazing.

var myPen = {};

(function() {

    'use strict';

    // main loop

    this.run = function() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.img, this.pointer.x - 100, this.pointer.y - 100, 200, 200);

        for (var i = 0; i < this.N; i++) {

            this.particles[i].run();

        }

    }

    // particles class

    var Particle = function(pen, size) {

        this.pX = (pen.canvas.width * 0.5) + (Math.random() * 200) - 100;
        this.pY = -size - Math.random() * 200;
        this.vX = 0;
        this.vY = Math.random();
        this.size = size;
        this.img = pen.img;
        this.pointer = pen.pointer;
        this.canvas = pen.canvas;
        this.ctx = pen.ctx;

    }

    Particle.prototype.run = function() {

        this.pY += this.vY;
        this.pX += this.vX;
        this.vY += 0.1;

        if (this.pY > this.canvas.height) {
            this.pY = -this.size;
            this.pX = (this.canvas.width * 0.5) + (Math.random() * 200) - 100;
            this.vY = 0;
            this.vX = 0;
        }

        var dx = this.pX - this.pointer.x,
            dy = this.pY - this.pointer.y,
            r = (100 + this.size * 0.5),
            d = dx * dx + dy * dy;

        if (d < r * r) {

            d = Math.sqrt(d);
            dx /= d;
            dy /= d;
            d = (r - d) * 1.1;
            dx *= d;
            dy *= d;

            this.pX += dx;
            this.pY += dy;

            this.vX = 0.5 * dx + ((this.pX >= this.pointer.x) ? 2 : -2);
            this.vY = 0.5 * dy;

        }

        this.ctx.drawImage(this.img, this.pX - this.size * 0.5, this.pY - this.size * 0.5, this.size, this.size);

    }

    // canvas

    this.canvas = {

        elem: document.createElement('canvas'),

        resize: function() {
            this.width = this.elem.width = this.elem.offsetWidth;
            this.height = this.elem.height = this.elem.offsetHeight;
        },

        init: function() {
            var ctx = this.elem.getContext('2d');
            document.body.appendChild(this.elem);
            window.addEventListener('resize', this.resize.bind(this), false);
            this.resize();
            return ctx;
        }

    };

    this.ctx = this.canvas.init();

    // pointer

    this.pointer = (function(canvas) {

        var pointer = {
            x: canvas.width / 2,
            y: canvas.height / 2,
            pointer: function(e) {
                var touchMode = e.targetTouches,
                    pointer;
                if (touchMode) {
                    e.preventDefault();
                    pointer = touchMode[0];
                } else pointer = e;
                this.x = pointer.clientX;
                this.y = pointer.clientY;
            },
        };

        window.addEventListener('mousemove', function(e) {
            this.pointer(e);
        }.bind(pointer), false);
        canvas.elem.addEventListener('touchmove', function(e) {
            this.pointer(e);
        }.bind(pointer), false);
        return pointer;

    }(this.canvas));

    // init

    this.particles = [];
    this.N = 800;
    this.img = new Image();
    this.img.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/191814/heart_codepen.png';

    for (var i = 0; i < this.N; i++) {
        this.particles[i] = new Particle(this, 35);
    }

    // request animation loop
    var myPen = this;
    (function run() {
        requestAnimationFrame(run);
        myPen.run();
    })();

}).apply(myPen);

// END CANVAS HEARTS


// BEGIN AUDIOO PLAYER

$(function() {

    var audio = $("audio")[0];
    $('#opening_screen').on('click', function() {
        $('#opening_screen').addClass('roEdgeUpOut');

        $('.player_container').toggleClass('hidden roEdgeUpIn');
        //Play/pause the track
        if (audio.paused == false) {
            audio.pause();
            $('#btn-play-pause').children('i').removeClass('fa-pause');
            $('#btn-play-pause').children('i').addClass('fa-play');

        } else {
            audio.play();
            $('#btn-play-pause').children('i').removeClass('fa-play');
            $('#btn-play-pause').children('i').addClass('fa-pause');
        }
    });
    $('#btn-play-pause').on('click', function() {
        //Play/pause the track
        if (audio.paused == false) {
            audio.pause();
            $(this).children('i').removeClass('fa-pause');
            $(this).children('i').addClass('fa-play');
        } else {
            audio.play();
            $(this).children('i').removeClass('fa-play');
            $(this).children('i').addClass('fa-pause');
        }
    });

    $('#btn-stop').on('click', function() {
        //Stop the track
        audio.pause();
        audio.currentTime = 0;
        $('#btn-play-pause').children('i').removeClass('fa-pause');
        $('#btn-play-pause').children('i').addClass('fa-play');
    });

    $('#btn-mute').on('click', function() {
        //Mutes/unmutes the sound
        if (audio.volume != 0) {
            audio.volume = 0;
            $(this).children('i').removeClass('fa-volume-off');
            $(this).children('i').addClass('fa-volume-up');
        } else {
            audio.volume = 1;
            $(this).children('i').removeClass('fa-volume-up');
            $(this).children('i').addClass('fa-volume-off');
        }
    });

    function updateProgress() {
        //Updates the progress bar
        var progress = document.getElementById("progress");
        var value = 0;
        if (audio.currentTime > 0) {
            value = Math.floor((100 / audio.duration) * audio.currentTime);
        }
        progress.style.width = value + "%";
    }

    //Progress Bar event listener
    audio.addEventListener("timeupdate", updateProgress, false);

});
// END AUDIOO PLAYER

// BEGIN AUDIO SYNCHING
// Using jQuery to add event listener to the audio element and toggle classes based on the curren time.  

var audioElement = document.getElementById('player');
var lastTime = 0;
audioElement.addEventListener('timeupdate', function(e) {
    var nowTime = this.currentTime;

    //Check if just passed the 1.4 second time mark.
    if (nowTime > 1 && lastTime < 5) {

        $("#peace h2").siblings().addClass('hidden').removeClass('pushSoftOut');
        $("#heart").addClass('hidden').removeClass('pushSoftIn');

    }

    // Wise Mwn Say
    if (nowTime > 8 && lastTime < 8) {
        $('#wisemensay').toggleClass('pushSoftIn hidden');

    }

    // Only fools rush in

    if (nowTime > 17 && lastTime < 17) {
        $('#onlyfools1').toggleClass('pushSoftIn hidden');
        $('#wisemensay').toggleClass('pushSoftIn pushSoftOut');
    }

    // But I can't help
    if (nowTime > 24 && lastTime < 24) {

        $('#canthelp1').toggleClass('pushSoftIn hidden');
        $('#onlyfools1').toggleClass('pushSoftIn pushSoftOut');
    }

    // Falling in love
    if (nowTime > 32 && lastTime < 32) {

        $('#fallinginlove1').toggleClass('pushSoftIn hidden');
        $('#canthelp1').toggleClass('pushSoftIn pushSoftOut');
    }

    // With you
    if (nowTime > 37 && lastTime < 37) {

        $('#withyou1').toggleClass('pushSoftIn hidden');
        $('#fallinginlove1').toggleClass('pushSoftIn pushSoftOut');
    }

    // Shall I Stay
    if (nowTime > 44 && lastTime < 44) {

        $('#shallistay').toggleClass('pushSoftIn hidden');
        $('#withyou1').toggleClass('pushSoftIn pushSoftOut');
    }

    // Would it be a sin
    if (nowTime > 50 && lastTime < 50) {

        $('#beasin').toggleClass('pushSoftIn hidden');
        $('#shallistay').toggleClass('pushSoftIn pushSoftOut');
    }
    // If I can't help
    if (nowTime > 60 && lastTime < 60) {

        $('#ificanthelp').toggleClass('pushSoftIn hidden');
        $('#beasin').toggleClass('pushSoftIn pushSoftOut');
    }
    //  Falling in Love - 2
    if (nowTime > 67 && lastTime < 67) {

        $('#fallinginlove2').toggleClass('pushSoftIn hidden');
        $('#ificanthelp').toggleClass('pushSoftIn pushSoftOut');
    }
    // With You - 2

    if (nowTime > 75 && lastTime < 75) {

        $('#withyou2').toggleClass('pushSoftIn hidden');
        $('#fallinginlove2').toggleClass('pushSoftIn pushSoftOut');
    }
    // Like a rivere flows
    if (nowTime > 82 && lastTime < 82) {

        $('#likeariver1').toggleClass('pushSoftIn hidden');
        $('#withyou2').toggleClass('pushSoftIn pushSoftOut');
    }
    // Surelt to the sea
    if (nowTime > 90 && lastTime < 90) {

        $('#tothesea1').toggleClass('pushSoftIn hidden');
        $('#likeariver1').toggleClass('pushSoftIn pushSoftOut');
    }

    // Darling so it goes
    if (nowTime > 96 && lastTime < 96) {

        $('#darlingitgoes1').toggleClass('pushSoftIn hidden');
        $('#tothesea1').toggleClass('pushSoftIn pushSoftOut');
    }

    // Some things
    if (nowTime > 102 && lastTime < 102) {

        $('#somethings1').toggleClass('pushSoftIn hidden');
        $('#darlingitgoes1').toggleClass('pushSoftIn pushSoftOut');
    }

    // Are meant to be

    if (nowTime > 108 && lastTime < 108) {

        $('#meanttobe1').toggleClass('pushSoftIn hidden');
        $('#somethings1').toggleClass('pushSoftIn pushSoftOut');
    }
    // Take my hand
    if (nowTime > 114 && lastTime < 114) {

        $('#takemyhand1').toggleClass('pushSoftIn hidden');
        $('#meanttobe1').toggleClass('pushSoftIn pushSoftOut');
    }
    // Take my whole life too
    if (nowTime > 120 && lastTime < 120) {

        $('#wholelife1').toggleClass('pushSoftIn hidden');
        $('#takemyhand1').toggleClass('pushSoftIn pushSoftOut');
    }
    // For I can't help
    if (nowTime > 126 && lastTime < 126) {

        $('#foricanthelp1').toggleClass('pushSoftIn hidden');
        $('#wholelife1').toggleClass('pushSoftIn pushSoftOut');
    }
    // Falling in love
    if (nowTime > 132 && lastTime < 132) {

        $('#fallinginlove3').toggleClass('pushSoftIn hidden');
        $('#foricanthelp1').toggleClass('pushSoftIn pushSoftOut');
    }
    // With you - 3
    if (nowTime > 138 && lastTime < 138) {

        $('#withyou3').toggleClass('pushSoftIn hidden');
        $('#fallinginlove3').toggleClass('pushSoftIn pushSoftOut');
    }

    if (nowTime > 144 && lastTime < 144) {

        $('#likeariver2').toggleClass('pushSoftIn hidden');
        $('#withyou3').toggleClass('pushSoftIn pushSoftOut');
    }
    // Surely to the sea
    if (nowTime > 150 && lastTime < 150) {

        $('#tothesea2').toggleClass('pushSoftIn hidden');
        $('#likeariver2').toggleClass('pushSoftIn pushSoftOut');
    }

    // Darling so it goes
    if (nowTime > 156 && lastTime < 156) {

        $('#darlingitgoes2').toggleClass('pushSoftIn hidden');
        $('#tothesea2').toggleClass('pushSoftIn pushSoftOut');
    }

    // Some things
    if (nowTime > 162 && lastTime < 162) {

        $('#somethings2').toggleClass('pushSoftIn hidden');
        $('#darlingitgoes2').toggleClass('pushSoftIn pushSoftOut');
    }

    // Are meant to be

    if (nowTime > 168 && lastTime < 168) {

        $('#meanttobe2').toggleClass('pushSoftIn hidden');
        $('#somethings2').toggleClass('pushSoftIn pushSoftOut');
    }
    // Take my hand
    if (nowTime > 174 && lastTime < 174) {

        $('#takemyhand2').toggleClass('pushSoftIn hidden');
        $('#meanttobe2').toggleClass('pushSoftIn pushSoftOut');
    }
    // Take my whole life too
    if (nowTime > 180 && lastTime < 180) {

        $('#wholelife2').toggleClass('pushSoftIn hidden');
        $('#takemyhand2').toggleClass('pushSoftIn pushSoftOut');
    }
    // For I can't help
    if (nowTime > 186 && lastTime < 186) {

        $('#foricanthelp2').toggleClass('pushSoftIn hidden');
        $('#wholelife2').toggleClass('pushSoftIn pushSoftOut');
    }

    // Falling in love

    if (nowTime > 192 && lastTime < 192) {

        $('#fallinginlove4').toggleClass('pushSoftIn hidden');
        $('#foricanthelp2').toggleClass('pushSoftIn pushSoftOut');
    }
    // With you - 3
    if (nowTime > 198 && lastTime < 198) {

        $('#withyou4').toggleClass('pushSoftIn hidden');
        $('#fallinginlove4').toggleClass('pushSoftIn pushSoftOut');
    }

    // For I can't help
    if (nowTime > 204 && lastTime < 204) {

        $('#foricanthelp3').toggleClass('pushSoftIn hidden');
        $('#withyou4').toggleClass('pushSoftIn pushSoftOut');
    }

    // Falling in love

    if (nowTime > 210 && lastTime < 210) {

        $('#fallinginlove5').toggleClass('pushSoftIn hidden');
        $('#foricanthelp3').toggleClass('pushSoftIn pushSoftOut');
    }

    // Falling in love
    if (nowTime > 216 && lastTime < 216) {

        $('#withyou5').toggleClass('pushSoftIn hidden');
        $('#fallinginlove5').toggleClass('pushSoftIn pushSoftOut');
    }
    // With you - 3
    if (nowTime > 222 && lastTime < 222) {

        $('#withyou6').toggleClass('pushSoftIn hidden');
        $('#withyou5').toggleClass('pushSoftIn pushSoftOut');
    }


    // With you - 3
    if (nowTime > 228 && lastTime < 228) {

        $('#withyou6').toggleClass('pushSoftIn hidden');
        $('#withyou5').toggleClass('pushSoftIn pushSoftOut');
    }
    // With you - 3
    if (nowTime > 234 && lastTime < 234) {

        $('#withyou6').toggleClass('pushSoftIn pushSoftOut');
    }

    if (nowTime > 240 && lastTime < 240) {

        $('#bemine').toggleClass('roEdgeUpIn hidden');

    }
    lastTime = nowTime;
});