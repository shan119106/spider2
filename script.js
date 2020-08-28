const questionNumber=document.querySelector(".question-number");
const questionText=document.querySelector(".question-text");
const optionContainer=document.querySelector(".option-container");
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
let answers=[];
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
function optionAnswered(){
	if(currentQuestion.answered == ''){
		console.log("not attempted");
	}
	else{
			unclickableOptions();
			for(let i=0; i<optionLen; i++){
				if(document.getElementById(i).innerHTML===currentQuestion.answer){
					if(document.getElementById(i).innerHTML===currentQuestion.answered){
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

function quizResult(){
	resultBox.querySelector(".total-question").innerHTML=quiz.length;
	resultBox.querySelector(".total-attempt").innerHTML=attempt;
	resultBox.querySelector(".total-correct").innerHTML=correctAnswer;
	resultBox.querySelector(".total-wrong").innerHTML=attempt - correctAnswer;
	resultBox.querySelector(".ratio").innerHTML=attempt - correctAnswer+"/"+correctAnswer;
	resultBox.querySelector(".total-score").innerHTML=correctAnswer+"/"+quiz.length;
}
function quizOver(){
	quizBox.classList.add("hide");
	resultBox.classList.remove("hide");
	quizResult();
}
/*function goHome(){
	resultBox.classList.add("hide");
	homeBox.classList.remove("hide");
	quizBox.classList.add("hide");
	resetQuiz();
	

}*/
 function startQuiz(){
 	
 	homeBox.classList.add("hide");
 	quizBox.classList.remove("hide");
	setAvailableQuestions();
	getNewQuestion();

}
function unclickableOptions(){
	
	for(let i=0; i<optionLen ;i++){
		optionContainer.children[i].classList.add("already-answered");

	}
}
window.onload =function(){
	console.log("function loaded");
	document.querySelector(".total_questions").innerHTML=quiz.length;
}