//Pong 2.0
//Malachy O'Connor
var stage;
var backG;
var Title;
var settingsB;
var Start;
var exit;
var paddleGood;
var paddleBad;
var ball;
var beginB;
var ballspeed;
ballspeed = 5;

function init() {


    var queue = new createjs.LoadQueue();
    var manifest = [
        {src: "Images/backG.png", id: "backG"},
        {src: "Images/Title.png", id: "Title"},
        {src: "Images/Settings.png", id: "settingsB"},
        {src: "Images/Exit.png", id: "exit"},
        {src: "Images/Start.png", id: "Start"},
        {src: "Images/paddleGood.png", id: "paddleGood"},
        {src: "Images/paddleBad.png", id: "paddleBad"},
        {src: "Images/Ball.png", id: "ball"}
    ];

    queue.on("complete", handleComplete, this);
    queue.loadManifest(manifest);
    stage = new createjs.Stage("myStage");
    createjs.Ticker.setFPS(30);
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

        var beginImage = queue.getResult("begin");
        begin = new createjs.Bitmap(beginImage);
        begin.y = 0;
        begin.x = 1000;

        exit = queue.getResult("exit");
        exit = new createjs.Bitmap(exit);

        stage.addChild(bitmap, Title, settingsB, Start, dottedLine, begin);
        convertToButton(settingsB, showsettings);
        convertToButton(Start, showGame);
        convertToButton(exit, hideSettings);
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
            .to({x: 1000}, 500)
        Start.on("click",showGame)
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
        .to({x: 410}, 500)
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

    stage.addChild(paddleGood, paddleBad, ball);
    stage.update();

    createjs.Tween.get(paddleGood)
        .to({x: 0, y: 0}, 450);
    createjs.Tween.get(paddleBad)
        .to({x: 900, y: 200}, 500);
    createjs.Tween.get(ball)
        .to({x: 480}, 260);
    createjs.Tween.get(dottedLine)
        .to({x: 320, y: -20}, 260);
    stage.on("click",startGame);
    console.log("showed Game")

}
function update() {
    moveBall()
}

function moveBall() {
    ball.x = ball.x + ballspeed;
    ball.y = ball.y + ballspeed;
}
function startGame(){
    console.log("starting Game");
    stage.on("stagemousemove", movepaddle);
    createjs.Ticker.addEventListener("tick", update);
}
function movepaddle(e) {
    // Mouse Movement
    paddleGood.y = e.stageY - 80;}