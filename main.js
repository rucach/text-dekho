noseX = 0;
noseY = 0;
difference = 0;
rightHandWristX = 0;
leftHandWristX = 0;

function setup(){
    video = createCapture(VIDEO);
    video.size(550, 500);
    video.position(100, 150);

    canvas = createCanvas(550, 550);
    canvas.position(800, 150);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("poseNet initialised...!!!!");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("nose X = " + noseX + "nose Y = " + noseY);

        rightHandWristX = results[0].pose.rightWrist.x;
        leftHandWristX = results[0].pose.leftWrist.x;
        difference = (leftHandWristX - rightHandWristX);

        console.log("left hand wrist X = " + leftHandWristX + " right hand wrist X = " + rightHandWristX + " difference = " + difference/5);

        document.getElementById("ans").innerHTML = difference/5 + "px";
    }
}

function draw(){
    background("white");
    text("arnaw", noseX, noseY, 420, 420);
    textSize(difference/5);
}