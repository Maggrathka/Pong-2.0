//Pong 2.0
//Malachy O'Connor
var stage;
var backG;
var Title;
var settingsB;
var Start;
var exit;
var thirtyFPSB;
var sixtyFPSB;
var paddleGood;
var paddleBad;
var ball;
var ballyspeed;
var ballxspeed;
var savedballx;
var savedbally;
var pauseB;
var paused;
var playerScore;
var cpuScore;
var playerScoreN = 0;
var cpuScoreN = 0;
var dottedLine;
var paddleSpeed;
var speedingUp;
var savedballxx;
var savedballyy;
var speedAdded;
var playerScoreNumber;
paddleSpeed = 3;
ballyspeed = 7;
ballxspeed = 7;
createjs.Ticker.setFPS(60);

function init() {


    var queue = new createjs.LoadQueue();
    var manifest = [
        {src: "Images/backG.png", id: "backG"},
        {src: "Images/Title.png", id: "Title"},
        {src: "Images/Settings.png", id: "settingsB"},
        {src: "Images/Exit.png", id: "exit"},
        {src: "Images/Start.png", id: "Start"},
        {src: "Images/30FPS.png", id: "thirtyFPSB"},
        {src: "Images/60 FPS.png", id: "sixtyFPSB"},
        {src: "Images/paddleGood.png", id: "paddleGood"},
        {src: "Images/paddleBad.png", id: "paddleBad"},
        {src: "Images/pause.png", id: "pauseB"},
        {src: "Images/paused.png", id: "paused"},
        {src: "Images/Ball.png", id: "ball"},
        {src: "Images/speedingUp.png", id: "speedingUp"}
    ];

    queue.on("complete", handleComplete, this);
    queue.loadManifest(manifest);
    stage = new createjs.Stage("myStage");
    createjs.Ticker.addEventListener("tick", stage);

    function handleComplete() {
        var backgroundImage = queue.getResult("backG");
        var bitmap = new createjs.Bitmap(backgroundImage);


        var titleImage = queue.getResult("Title");
        Title = new createjs.Bitmap(titleImage);
        Title.y = 100;
        Title.x = 330;

        var lineImage = queue.getResult("dottedLine");
        dottedLine = new createjs.Bitmap(lineImage);
        dottedLine.x = 1000;

        var settingsImage = queue.getResult("settingsB");
        settingsB = new createjs.Bitmap(settingsImage);
        settingsB.y = 300;
        settingsB.x = 410;

        var startImage = queue.getResult("Start");
        Start = new createjs.Bitmap(startImage);
        Start.y = 235;
        Start.x = 419;

        var paddleGoodImage = queue.getResult("paddleGood");
        paddleGood = new createjs.Bitmap(paddleGoodImage);
        paddleGood.y = 0;
        paddleGood.x = 1000;

        var paddleBadImage = queue.getResult("paddleBad");
        paddleBad = new createjs.Bitmap(paddleBadImage);
        paddleBad.y = 0;
        paddleBad.x = 1000;

        var ballImage = queue.getResult("ball");
        ball = new createjs.Bitmap(ballImage);
        ball.y = 0;
        ball.x = 1000;

        var thirtyImage = queue.getResult("thirtyFPSB");
        thirtyFPSB = new createjs.Bitmap(thirtyImage);
        thirtyFPSB.y = 0;
        thirtyFPSB.x = 1000;

        var sixtyImage = queue.getResult("sixtyFPSB");
        sixtyFPSB = new createjs.Bitmap(sixtyImage);
        sixtyFPSB.y = 0;
        sixtyFPSB.x = 1000;

        var pauseImage = queue.getResult("pauseB");
        pauseB = new createjs.Bitmap(pauseImage);
        pauseB.y = 0;
        pauseB.x = 1000;

        var pausedImage = queue.getResult("paused");
        paused = new createjs.Bitmap(pausedImage);
        paused.y = 0;
        paused.x = 1000;

        var speedingUpImage = queue.getResult("speedingUp");
        speedingUp = new createjs.Bitmap(speedingUpImage);
        speedingUp.y = 0;
        speedingUp.x = -1000;

        exit = queue.getResult("exit");
        exit = new createjs.Bitmap(exit);

        stage.addChild(bitmap, Title, settingsB, Start, dottedLine, thirtyFPSB, sixtyFPSB, pauseB, paused, speedingUp);
        convertToButton(settingsB, showsettings);
        convertToButton(Start, showGame);
        convertToButton(exit, hideSettings);
        convertToButton(thirtyFPSB, thirtyframes);
        convertToButton(sixtyFPSB, sixtyframes);
        convertToButton(pauseB, pause);
        convertToButton(paused, stoppause);
        stage.update();
    }

    function showsettings() {
        stage.addChild(exit);
        exit.x = 1000;
        exit.y = 0;
        createjs.Tween.get(settingsB)
            .to({x: 400}, 200)
            .to({x: 1000}, 600);
        createjs.Tween.get(exit)
            .to({x: 0, y: 0}, 600);
        createjs.Tween.get(Start)
            .to({x: 1000}, 500);
        createjs.Tween.get(thirtyFPSB)
            .to({x: 300, y: 200}, 500);
        createjs.Tween.get(sixtyFPSB)
            .to({x: 300, y: 300}, 500);
        Start.on("click", showGame)
    }

    stage.mouseEventsEnabled = true;
}

function bwidth(bitmap) {
    return bitmap.getBounds().width;
}


function bheight(bitmap) {
    return bitmap.getBounds().height;
}

function convertToButton(bitmap, clickHandler) {
    // create a rectangle shape the same size as the text, and assign it as the hitArea
    // note that it is never added to the display list.
    var hit = new createjs.Shape();
    var width = bwidth(bitmap);
    var height = bheight(bitmap);
    hit.graphics.beginFill("#000").drawRect(0, 0, width, height);
    bitmap.hitArea = hit;
    bitmap.on("click", clickHandler)
}

function hideSettings() {
    createjs.Tween.get(settingsB)
        .to({x: 410, y: 300}, 450);
    createjs.Tween.get(exit)
        .to({x: 1000, y: 0}, 500);
    createjs.Tween.get(Start)
        .to({x: 410}, 500);
    createjs.Tween.get(thirtyFPSB)
        .to({x: 1000}, 500);
    createjs.Tween.get(sixtyFPSB)
        .to({x: 1000}, 500);
}

function showGame(event) {
    event.stopPropagation();
    createjs.Tween.get(settingsB)
        .to({x: 1000}, 450);
    createjs.Tween.get(exit)
        .to({x: 1000}, 500);
    createjs.Tween.get(Start)
        .to({x: 1000}, 500);
    createjs.Tween.get(Title)
        .to({x: 1000}, 500);

    //Points
    cpuScore = new createjs.Text(cpuScoreN, "20px Arial", "#f91010");
    cpuScore.x = 100;
    cpuScore.y = 50;
    cpuScore.textBaseline = "alphabetic";

    playerScore = new createjs.Text(playerScoreN, "20px Arial", "#f91010");
    playerScore.x = 700;
    playerScore.y = 50;
    playerScore.textBaseline = "alphabetic";

    stage.addChild(paddleGood, paddleBad, ball, playerScore, cpuScore);
    stage.update();

    createjs.Tween.get(paddleGood)
        .to({x: 0, y: 0}, 450);
    createjs.Tween.get(paddleBad)
        .to({x: 900, y: 200}, 500);
    createjs.Tween.get(ball)
        .to({x: 480, y: 225}, 260);
    createjs.Tween.get(dottedLine)
        .to({x: 320, y: -20}, 260);
    createjs.Tween.get(pauseB)
        .to({x: 480, y: 10}, 450);
    stage.on("click", startGame);


}
function update() {
    moveBall();
    moveBadpaddle()
}

function moveBall() {

    ball.x = ball.x + ballxspeed;
    ball.y = ball.y + ballyspeed;

    //Hitting Walls
    if (ball.y < 0) {
        ballyspeed = -ballyspeed
    }
    if (ball.y > 510) {
        ballyspeed = -ballyspeed
    }
    //Score
    if (ball.x <= 5) {
        cpuScore.text = cpuScore.text + 1;
        reset()
    }


    if (ball.x >= 929) {
        playerScore.text = playerScore.text + 1;
        reset()
    }

    //Bounces off paddles
    //Paddle Top
    if (ball.x <= 36) {
        if (ball.y >= paddleGood.y && ball.y <= paddleGood.y + 30) {
            ballxspeed = -ballxspeed;
            ballyspeed = -Math.abs(ballyspeed);
            ball.x = 50
        }
    }

    //Paddle bottom

    if (ball.x <= 36) {
        if (ball.y >= paddleGood.y + 114 && ball.y <= paddleGood.y + 144) {
            ballxspeed = -ballxspeed;
            ballyspeed = Math.abs(ballyspeed);
            ball.x = 42
        }
    }
    //Paddle middle
    if (ball.x <= 36) {
        if (ball.y >= paddleGood.y + 30 && ball.y <= paddleGood.y + 114) {
            ballxspeed = -ballxspeed;
            ballxspeed += 2;
            speedAdded += 2;
            ball.x = 42
        }
    }

    //Bounces off paddles
    //Paddle Top
    if (ball.x >= 880) {
        if (ball.y >= paddleBad.y && ball.y <= paddleBad.y + 30) {
            ballxspeed = -ballxspeed;
            ballyspeed = -Math.abs(ballyspeed);
            ball.x = 870
        }
    }

    //Paddle bottom

    if (ball.x >= 880) {
        if (ball.y >= paddleBad.y + 114 && ball.y <= paddleBad.y + 144) {
            ballxspeed = -ballxspeed;
            ballyspeed = Math.abs(ballyspeed);
            ball.x = 870
        }
    }

    //Paddle middle

    if (ball.x >= 880) {
        if (ball.y >= paddleBad.y + 30 && ball.y <= paddleBad.y + 114) {
            ballxspeed = -ballxspeed;
            ballxspeed += 2;
            speedAdded += 2;
            ball.x = 870
        }
    }
}
function startGame() {
    stage.on("stagemousemove", movepaddle);
    createjs.Ticker.addEventListener("tick", update);
}

function movepaddle(e) {
    // Mouse Movement
    paddleGood.y = e.stageY - 80;
}

function moveBadpaddle() {
    if (paddleBad.y !== ball.y) {
        if (paddleBad.y > ball.y) {
            paddleBad.y = paddleBad.y - paddleSpeed;
        }
        else {
            paddleBad.y = paddleBad.y + paddleSpeed
        }
    }
}

function thirtyframes() {
    createjs.Ticker.setFPS(30);
}

function sixtyframes() {
    createjs.Ticker.setFPS(60);
}

function pause() {
    savedballx = ballxspeed;
    savedbally = ballyspeed;
    ballxspeed = 0;
    ballyspeed = 0;
    createjs.Tween.get(paused)
        .to({x: 400, y: 350}, 450);
}

function stoppause() {
    ballyspeed = savedbally;
    ballxspeed = savedballx;
    createjs.Tween.get(paused)
        .to({x: 1000}, 450);
}

function reset() {
    ball.x = 480;
    ball.y = 225;
    savedballxx = ballxspeed;
    savedballyy = ballyspeed;
    ballxspeed = 0;
    ballyspeed = 0;
    stage.addEventListener("click", stopReset);
}

function stopReset() {
    ballyspeed = savedballyy;
    ballxspeed = savedballxx;
    stage.removeEventListener("click", stopReset);
    // get the text from the playerScore object and convert it to a number using parseInt
    var playerScoreN = parseInt(playerScore.text);
    stage.update();
    // check if the number is divisible by 5
    if (playerScoreN % 5 === 0) {
        speedUp();
    }
}

function speedUp() {
    createjs.Tween.get(speedingUp)
        .to({x: 1000}, 1000)
        .to({x: -1000}, 500);
    paddleSpeed += 1.5;
    ballxspeed += 3;
}