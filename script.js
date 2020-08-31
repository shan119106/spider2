const questionNumber=document.querySelector(".question-number");
const questionText=document.querySelector(".question-text");
const optionContainer=document.querySelector(".option-container");
const answersIndicatorContainer=document.querySelector(".answer-indicator");
const homeBox=document.querySelector(".home_page");
const quizBox=document.querySelector(".quiz-box");
const resultBox=document.querySelector(".result-box");
let questionCounter =0;
let currentQuestion;
let availableQuestions = [];
let availableOptions=[];
let animationDelay = 0.2;
let optionLen=0;
let correctAnswer=0;
let attempt =0;
let username='';
const startingMinutes =10;
let time = startingMinutes*60;
let countDownTimer=document.getElementById('timer');
let displayTime='';
let timeTaken ='';
let DisplayMinutes ='';
let seconds;
let highScore=0;
let highScoreUser='';
let date=0;
let month=0;
let year =0;
let sec =0;
let min =0;
let hour =0;
let current_date;
let current_time;
function shuffle(ar){
	let newPos;
	let temp;
	for( let i=ar.length-1;i>0;i--){
		newPos=Math.floor(Math.random()*(i+1));
		temp=ar[i];
		ar[i]=ar[newPos];
		ar[newPos]=temp;
	}
	return ar;
}

function setAvailableQuestions(){
	const totalQuestion=quiz.length;
	availableQuestions=shuffle(quiz);
	
}
function resetQuiz(){
	
	questionCounter =0;
	currentQuestion={};
	availableQuestions = [];
	availableOptions=[];
	animationDelay = 0.2;
	optionLen=0;
	correctAnswer=0;
	attempt =0;
	
}
function updateAnswerIndicator(){
	answersIndicatorContainer.children[questionCounter].classList.add("attempt");
	
}
//get result
function getResult(element){
	const value=element.innerHTML;
	const id=element.id
	if(value === currentQuestion.answer){
		currentQuestion.answered=element.innerHTML;
		element.classList.add("correct");
		correctAnswer++;
	}
	else{
		currentQuestion.answered=element.innerHTML;
		element.classList.add("wrong");
		
	}
	attempt++;
	unclickableOptions();
	updateAnswerIndicator();

}
function getNewQuestion(){

	questionNumber.innerHTML="Question  " + (questionCounter+1) + " of  "+availableQuestions.length;
	questionText.innerHTML=availableQuestions[questionCounter].q;
	currentQuestion=availableQuestions[questionCounter];
	optionLen=availableQuestions[questionCounter].options.length;
	optionContainer.innerHTML='';
	let animationDelay=0.15;
	availableOptions=shuffle(currentQuestion.options);
	
	for(let i=0; i<optionLen; i++){
		const option=document.createElement("div");
		option.innerHTML=availableOptions[i];
		option.id=i;
		option.style.animationDelay=animationDelay+'s';
		animationDelay=animationDelay+0.15;
		option.className="option";
		optionContainer.appendChild(option);
		option.setAttribute("onclick","getResult(this)");
	}
	


}
function moveToQuestion(element){
	const Id = element.id;
	questionCounter=parseInt(element.id)-10;
	getNewQuestion();
	optionAnswered();
}
function optionAnswered(){
	if(currentQuestion.answered == ''){

	}
	else{
			unclickableOptions();
			for(let i=0; i<optionLen; i++){
				if(document.getElementById(i).innerHTML===currentQuestion.answered){
					if(document.getElementById(i).innerHTML===currentQuestion.answer){
					document.getElementById(i).classList.add("correct");
					
					}
				
				else{
					document.getElementById(i).classList.add("wrong");
					}
				}
			}

		
		}
}
function next(){
		questionCounter++;
	if(questionCounter=== availableQuestions.length){
		
		quizOver();

	}
	else{
			getNewQuestion();
			optionAnswered();
			
	}
}
function previous(){
	
	if(questionCounter== 0){
		console.log("cannot go back");
	}
	else{
		questionCounter--;
		getNewQuestion();
		optionAnswered();
		
	}
}
function answerIndicator(){
	console.log("answer-indicator")
	const totalQuestion=quiz.length;
	for(let i=0; i<totalQuestion; i++){
		const Indicator=document.createElement('div');
		Indicator.id=i+10;
		Indicator.innerHTML=i+1;
		answersIndicatorContainer.appendChild(Indicator);
		Indicator.setAttribute('onclick','moveToQuestion(this)');
	}
}

function quizResult(){
	highScore = localStorage.getItem("highscore");
	highScoreUser =localStorage.getItem("user");
	date =localStorage.getItem("date");
	time =localStorage.getItem("time");
	if(parseInt(highScore)<=correctAnswer){
		localStorage.setItem("highscore",correctAnswer);
		localStorage.setItem("user",username);
		localStorage.setItem("date",current_date);
		localStorage.setItem("time",current_time);
		highScore = correctAnswer;
		highScoreUser = username;
		
	}
	resultBox.querySelector(".HighScore-Date").innerHTML=date;
	resultBox.querySelector(".HighScore-Time").innerHTML=time;
	resultBox.querySelector(".high-score").innerHTML=highScore;
	resultBox.querySelector(".High-score-user").innerHTML=highScoreUser;
	resultBox.querySelector(".user-name").innerHTML=username;
	resultBox.querySelector(".time-taken").innerHTML=timeTaken;
	resultBox.querySelector(".total-question").innerHTML=quiz.length;
	resultBox.querySelector(".total-attempt").innerHTML=attempt;
	resultBox.querySelector(".total-correct").innerHTML=correctAnswer;
	resultBox.querySelector(".total-wrong").innerHTML=attempt - correctAnswer;
	resultBox.querySelector(".ratio").innerHTML=attempt - correctAnswer+"/"+correctAnswer;
	resultBox.querySelector(".total-score").innerHTML=correctAnswer+"/"+quiz.length;
}
function numToTime(num){
	 const displayMinutes= Math.floor(num / 60);  
  	const displaySeconds= num % 60;
  	let dispmin =0;
  	let dispsec =0;
  	if(displayMinutes < 10){
  		dispmin ="0"+ displayMinutes;
  	}
  	else{
  		dispmin=displayMinutes;
  	}
  	if(displaySeconds < 10){
  		dispsec ="0"+ displaySeconds;
  	}
  	else{
  		dispsec=displaySeconds;
  	}

  	timeTaken= dispmin+":"+dispsec;

  	console.log(timeTaken);
}
function quizOver(){
	window.clearInterval(timer);
	quizBox.classList.add("hide");
	resultBox.classList.remove("hide");
	num=startingMinutes*60 -(DisplayMinutes*60 + seconds);
	numToTime(num);
	quizResult();
	
	
}
/*function goHome(){
	resultBox.classList.add("hide");
	homeBox.classList.remove("hide");
	quizBox.classList.add("hide");
	resetQuiz();
	

}*/
function timer(){
	const minutes = Math.floor(time/60);
	 seconds = time%60;
	DisplayMinutes='';
	 if(seconds < 10){
        seconds = "0" + seconds;
    }
    else{
    	seconds=seconds;
    }
    
    if(minutes < 10){
        DisplayMinutes = "0" + minutes;
        
    }
    else{
    	DisplayMinutes =minutes;
    }
    countDownTimer.innerHTML=DisplayMinutes+":"+seconds;
    displayTime = countDownTimer.innerHTML;
    time--;
  if(displayTime=="00:00"){
		timeTaken="15:00";
		stopTimer();
	} 

}
function stopTimer(){
	
	window.clearInterval(timer);
	quizBox.classList.add("hide");
	resultBox.classList.remove("hide");
	quizResult();
}
function startTimer(){
	
	
	setInterval(timer,1000);
	

}
function getdetail(){
	let today = new Date();
	month =addZero(today.getMonth()+1);
	year=addZero(today.getFullYear());
	date=addZero(today.getDate());
	current_date=date +'/'+month+'/'+year;

	let hours=addZero(today.getHours());
	let min=addZero(today.getMinutes());
	let sec=addZero(today.getSeconds());
	current_time =hours +':'+ min +':'+sec;
	console.log(current_time);
}
function addZero(num){
	if(num <10){
		num = "0"+num;
	}
	else{
		num =num;
	}
	return num;
}
 function startQuiz(){
 	username=document.querySelector(".username").value;
 	if(username =' '){
 		alert("type username");
 	}
 	else{
 	startTimer();
 	getdetail();
 	homeBox.classList.add("hide");
 	quizBox.classList.remove("hide");
	setAvailableQuestions();
	getNewQuestion();
	answerIndicator();
	}

}
function unclickableOptions(){
	
	for(let i=0; i<optionLen ;i++){
		optionContainer.children[i].classList.add("already-answered");

	}
}
window.onload =function(){
	document.querySelector(".total_questions").innerHTML=quiz.length;
	console.log(localStorage);
	
}