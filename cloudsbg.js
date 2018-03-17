var onNextFrame = window.requestAnimationFrame       || 
                  window.webkitRequestAnimationFrame || 
                  window.mozRequestAnimationFrame    || 
                  window.oRequestAnimationFrame      || 
                  window.msRequestAnimationFrame     || 
                  function( callback )
                  {
                      window.setTimeout(callback, 1000 / 60);
                  };

function init()
{
    onNextFrame(render);
}
document.body.style.backgroundColor = "#004C93";

var canvas = document.getElementById("clouds");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var cloudCanvas = document.createElement("canvas");
var cloudCtx = cloudCanvas.getContext("2d");
cloudCanvas.width = 168;
cloudCanvas.height = 100;
cloudCtx.fillStyle = "#1A80E0";

let x = 30, y = 75;

cloudCtx.fillRect (x, y, 100, 25);

cloudCtx.beginPath();
cloudCtx.arc(x, y-5, 30, 0, 2 * Math.PI, false);
cloudCtx.fill();

cloudCtx.beginPath();
cloudCtx.arc(x+35, y-20, 25, 0, 2 * Math.PI, false);
cloudCtx.fill();

cloudCtx.beginPath();
cloudCtx.arc(x+70, y-25, 35, 0, 2 * Math.PI, false);
cloudCtx.fill();

cloudCtx.beginPath();
cloudCtx.arc(x+101, y-10, 35, 0, 2 * Math.PI, false);
cloudCtx.fill();

class Cloud
{
    constructor(x, y)
    {
        this.x = x == null ? Math.random() * window.innerWidth : x;
        this.y = y == null ? Math.random() * (window.innerHeight * .75) + 100 : y;
        this.nextY = Math.random() * (window.innerHeight * .75) + 100;
        this.speed = (Math.random() * (6 - 5) + 5) * 0.1;
        this.magic = Math.random() * 3 + 1;
    }

    drawCloud(ctx)
    {
        this.y += Math.sin((new Date()).getTime() * this.magic * .003);
        this.x += this.speed;
        
        if (this.x > window.innerWidth - 168)
        {
            ctx.clearRect(this.x - window.innerWidth - 2, this.nextY, 168, 100);
            ctx.drawImage(cloudCanvas, this.x - window.innerWidth, this.nextY += Math.sin((new Date()).getTime()  * this.magic * .003));
        }
        
        if (this.x > window.innerWidth + 30)
        {
            this.x = 30;
            this.y = this.nextY;
            this.nextY = Math.random() * (window.innerHeight * .75) + 100;
        }
        
        ctx.drawImage(cloudCanvas, Math.floor(this.x), Math.floor(this.y));
    }
}

var numClouds = Math.floor(10 * (window.innerWidth / 1920));

var clouds = [];
for (var i = 0; i < numClouds; i ++)
{
    clouds.push(new Cloud(((i % numClouds) / numClouds) * window.innerWidth));
}

window.onresize = function(event) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var newNumClouds = Math.floor(10 * (window.innerWidth / 1920));
    var cloudDelta = newNumClouds - numClouds;
    if (cloudDelta > 0)
    {
        for (var i = 0; i < cloudDelta; i++)
        {
            clouds.push(new Cloud((((i + numClouds - 1) % numClouds) / numClouds) * window.innerWidth));
        }
        for (var i = 0; i < numClouds; i++)
        {
            clouds[i].x = ((i % numClouds) / numClouds) * window.innerWidth;
        }
        numClouds = newNumClouds;
    }
    
    if (cloudDelta < 0)
    {
        for (var i = 0; i < cloudDelta; i++)
        {
            clouds.pop();
        }
        for (var i = 0; i < numClouds; i++)
        {
            clouds[i].x = ((i % numClouds) / numClouds) * window.innerWidth;
        }
        numClouds = newNumClouds;
    }
};

function render()
{
    for (var i = 0; i < numClouds; i++)
    {
        ctx.clearRect(clouds[i].x - 2, clouds[i].y, 168, 100);
    }

    for (var i = 0; i < numClouds; i++)
    {
        clouds[i].drawCloud(ctx);
    }

    onNextFrame(render);
}

init();
