// Make global variables and arrays/all the classes and id's from the html.
var titlescreen = document.querySelector(".title-screen");
var questions = document.querySelector(".questions");
var done = document.querySelector(".done");
var result = document.querySelector(".result");
var qtitleEL = document.querySelector("#qtitle");
var timerEL = document.querySelector("#timer")
var initials = document.querySelector("#initials")
var scores = document.querySelector("#HS1")
var showScore = document.querySelector(".showscore")
var submitBtn = document.querySelector("#submit-btn")
var nitials=[];
var currentQuestion = 0;
var time=60;
var timer;
var qdiv = document.querySelector(".q1");
var qzQuestions = [
    {
        qtitle: "what is a group of tuna called", 
        options: ["a flock","a school","a pride","a community"],
        answer: "a school"
    },
    {
        qtitle: "what animal has the best memory in the animal kingdom", 
        options: ["a penguin","a dolphin","a elephant","a mouse"],
        answer: "a dolphin"
    },
    {
        qtitle: "how many polar bears are left in the world", 
        options: ["1 million","50,000","200","20,000"],
        answer: "20,000"
    }
]
function saveLastscore() {
    // Save related form data as an object
    var studentScore = {
      scoreEL: time,
      initials: initials.value.trim()
    };
    // Use .setItem() to store object in storage and JSON.stringify to convert it as a string
    localStorage.setItem("studentScore", JSON.stringify(studentScore));
  }
  function renderLastGrade() {
    // Use JSON.parse() to convert text to JavaScript object
    var lstScore = JSON.parse(localStorage.getItem("studentScore"));
    // Check if data is returned, if not exit out of the function
    if (lastGrade !== null) {
    document.getElementById("saved-name").innerHTML = lastGrade.student;
    document.getElementById("saved-grade").innerHTML = lastGrade.grade;
    document.getElementById("saved-comment").innerHTML = lastGrade.comment;
    } else {
      return;
    }
  }
function quizend(){
    clearInterval(timer);
    questions.setAttribute("class", "hide")
    console.log()
}
function score(){
    if (checkanswer().dataset.value!==qzQuestions[currentQuestion].answer){
        scoreEL-5
        
    }

}
function clock(){
    time--
    timerEL.textContent=time
    if (time <= 0){
        quizend();
    }
}

function checkAnswer(){
console.log(this.dataset.value);
if (this.dataset.value === qzQuestions[currentQuestion].answer){
    currentQuestion++
    
}else{

    time=time-5
    if(time<0){
        time=0
    }
}
if (currentQuestion===qzQuestions.length || time<=0){
    quizend();
}else{
    renderQuestion();
}
}

function renderQuestion(){
    qtitleEL.textContent = qzQuestions[currentQuestion].qtitle
    qdiv.textContent = "";
    for (let i = 0; i < qzQuestions[currentQuestion].options.length; i++) {
        var button = document.createElement("button")
        button.textContent=qzQuestions[currentQuestion].options[i];
        button.setAttribute("data-value", qzQuestions[currentQuestion].options[i]);
        button.addEventListener("click", checkAnswer)
        qdiv.appendChild(button);
    }
}
var playbtn = document.querySelector("#play");
// Add event listeners so when user clicks on show highscores button it displays highscores.
playbtn.addEventListener("click", function(event) {
    titlescreen.setAttribute("class", "hide")
    questions.classList.remove("hide")
    timer = setInterval(() => {
        clock()
    }, 1000);
    renderQuestion();
})
// make a function so when user enters initials and presses enter button it saves them and switches to highscore screen
submitBtn.addEventListener("click", function(event){
    event.preventDefault()
    saveLastscore()
})