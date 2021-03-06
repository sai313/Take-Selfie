var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function start() {
    document.getElementById("textbox").innerHTML="";
    recognition.start();
}

recognition.onresult=function (event) {
    console.log(event);
    var content = event.results[0][0].transcript;
    document.getElementById("textbox").innerHTML=content;
    console.log(content);
    if(content == "take my selfie") {
        console.log("taking selfie");
        speak();
    }
}

camera = document.getElementById("myCamera");
Webcam.set({
    width:360,
    height:250,
    image_format:"jpeg",
    jpeg_quality:90
});

function speak() {
    var synth=window.speechSynthesis;
    speak_data = "Taking your selfie in 5 seconds";
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    Webcam.attach(myCamera);
    setTimeout(function () {
        take_snapshot();
        save();
    },5000);
}

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML='<img id="selfie_img" src="'+data_uri+'"/>';
    });
}

function save() {
    link=document.getElementById("link");
    image=document.getElementById("selfie_img").src;
    link.href=image;
    link.click();
}
