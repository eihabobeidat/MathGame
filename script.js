//used ids: name age register levelTest nextLevel h2Id finalPhase
//used classes: lvlQuestion lvlAnswer easyQuestion midQuestion hardQuestion Answer
var name="";
var age=0;
var levelMark=0;
var finalMark=0;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function Register()
{
	name = document.getElementById('userName').value;
	age = document.getElementById('userAge').value;
	if (name != "")
	{
		console.log(`${name} && ${age}`);
		document.getElementById('register').style.display = "none";
		document.getElementById('levelTest').style.display = "block";
	}
	else
	{
		console.log("invalid input");
	}
}

function getAnswer(question)
{
	switch(question[2])
	{
		case '+':
		return parseInt(question[0])+parseInt(question[4]);
		break;
		case '-':
		return parseInt(question[0])-parseInt(question[4]);
		break;
		case '*':
		return parseInt(question[0])*parseInt(question[4]);
		break;
		case '/':
		return parseInt(question[0])/parseInt(question[4]);
		break;
	}
}

function generateQuestion(level)
{
	let op;
	level === "easy"? op=2 : op=4;
	let num1 = getRandomInt(10);
	let num2 = getRandomInt(10);
	switch (getRandomInt(op)) 
	{
		case 0:
		return `${num1} + ${num2}`;
		break;
		case 1:
		if (num1 < num2)
		{
			return `${num2} - ${num1}`;
		}
		return `${num1} - ${num2}`;
		break;
		break;
		case 2:
		return `${num1} * ${num2}`;
		break;
		case 3:
		if (num2===0)
		{
			num2++;
		}
		return `${num1} / ${num2}`;
		break;
	}
}

function Victory()
{
	//vic
	console.log('Victory');
	let elemnt = document.getElementById('resultScreen');
	let message = document.getElementById(`message`).innerHTML=`Congratulations ${name}, you scored ${finalMark}`;
	let firework = document.createElement('img');
	firework.src = "fw.gif";
	firework.style.paddingLeft = "28%";
	let anime = document.createElement('img');
	anime.src = "happ.gif";
	let sound = document.createElement('audio');
	sound.src = "vic.mp4";
	sound.type= "video/mp4";
	sound.autoplay= true;
	sound.style.display="none";
	elemnt.appendChild(firework);
	elemnt.appendChild(anime);
	elemnt.appendChild(sound);
}

function lose()
{
	//lose
	console.log('Victory');
	let elemnt = document.getElementById('resultScreen');
	let message = document.getElementById(`message`).innerHTML=`Need improvement ${name}, scored ${finalMark}`;
	let figth = document.createElement('img');
	figth.src = "rasengan.gif";
	figth.style.paddingLeft = "26%";
// 	figth.hight="50%";
 	let anime = document.createElement('img');
	anime.src = "sad.gif";
 	let sound = document.createElement('audio');
	sound.src = "los.mp4";
	sound.type= "video/mp4";
	sound.autoplay= true;
	sound.style.display="none";
	elemnt.appendChild(figth);
	elemnt.appendChild(anime);
	elemnt.appendChild(sound);
}

function getFinalMark(mark)
{
	let answers = document.getElementsByClassName("Answer");
	for (var i=0; i < answers.length; i++) 
	{
		if (mark >= 7)
		{
			if(parseInt(answers[i].value) === getAnswer(questions[i].value)*2)
			{
				finalMark+=2;
			}
			continue;
		}
		if(parseInt(answers[i].value) === (getAnswer(questions[i].value)))
		{
			finalMark+=mark;
		}
	}
	document.getElementById('nextLevel').style.display="none";
	if (finalMark >= 45){Victory()}
	else if (finalMark >= 15 && levelMark < 7) {Victory()}
	else if (finalMark >= 7 && levelMark < 5) {Victory()}
	else {lose()}
}

function getLevelMark()
{
	let answers = document.getElementsByClassName("lvlAnswer");
	for (var i=0; i < answers.length; i++) 
	{
		if(parseInt(answers[i].value) === (getAnswer(questions[i].value)))
		{
			levelMark+=2
		}
	}
	nextLevelTest(levelMark);
}

function nextLevelTest(mark)
{
	//the next level
	//new phase hide previus
	document.getElementById('levelTest').style.display="none";
	const h2 = document.getElementById('h2Id');
	h2.innerHTML = `You scored ${mark} of 10`;
	if (mark >= 7)
	{
		//hard
		//intermediate
		var nextSection = document.getElementById("finalPhase");
		for(let i=0; i<25; i++)
		{
			//final Q/A container
			let finDiv = document.createElement("div");
			finDiv.className = "col-sm-12";
			//Q/A div
			let qaDiv = document.createElement("div");
			qaDiv.className="form-inline";
			//question part
			let divQ = document.createElement("div");
			divQ.className="form-group mb-2";
			let q = document.createElement("input");
			q.type = "text";
			q.readOnly=true;
			q.className="form-control-plaintext hardQuestion";
			q.value="Question";
			divQ.appendChild(q);
			//answer part
			let divA = document.createElement("div");
			divA.className = "form-group mx-sm-3 mb-2";
			let a = document.createElement("input");
			a.type = "text";
			a.className = "form-control Answer";
			a.placeholder="Answer";
			divA.appendChild(a);
			qaDiv.appendChild(divQ);
			qaDiv.appendChild(divA);
			finDiv.appendChild(qaDiv);
			//EOFinalContainer
			nextSection.appendChild(finDiv);

		}
		//button
		let button = document.createElement("button");
		button.className="btn btn-danger mb-2";
		button.addEventListener("click", () => {getFinalMark(9)});
		button.style="margin-right: auto; margin-left:auto; width:30%;";
		button.innerHTML="Save Answer";
		nextSection.appendChild(button);
		//get questions
		questions = document.getElementsByClassName("hardQuestion");
		for (var i=0; i < questions.length; i++)
		{
			let temp = generateQuestion("hard")
			questions[i].value = `${temp} + ${getAnswer(temp)}`;
		}
	}
	else if (mark >= 5)
	{
		//intermediate
		var nextSection = document.getElementById("finalPhase");
		for(let i=0; i<10; i++)
		{
			//final Q/A container
			let finDiv = document.createElement("div");
			finDiv.className = "col-sm-12";
			//Q/A div
			let qaDiv = document.createElement("div");
			qaDiv.className="form-inline";
			//question part
			let divQ = document.createElement("div");
			divQ.className="form-group mb-2";
			let q = document.createElement("input");
			q.type = "text";
			q.readOnly=true;
			q.className="form-control-plaintext midQuestion";
			q.value="Question";
			divQ.appendChild(q);
			//answer part
			let divA = document.createElement("div");
			divA.className = "form-group mx-sm-3 mb-2";
			let a = document.createElement("input");
			a.type = "text";
			a.className = "form-control Answer";
			a.placeholder="Answer";
			divA.appendChild(a);
			qaDiv.appendChild(divQ);
			qaDiv.appendChild(divA);
			finDiv.appendChild(qaDiv);
			//EOFinalContainer
			nextSection.appendChild(finDiv);

		}
		//button
		let button = document.createElement("button");
		button.className="btn btn-success mb-2";
		button.addEventListener("click", () => {getFinalMark(2)});
		button.style="margin-right: auto; margin-left:auto; width:30%;";
		button.innerHTML="Save Answer";
		nextSection.appendChild(button);
		//get questions
		questions = document.getElementsByClassName("midQuestion");
		for (var i=0; i < questions.length; i++)
		{
			questions[i].value = generateQuestion("mid");
		}
	}
	else
	{
		//easy
		var nextSection = document.getElementById("finalPhase");
		for(let i=0; i<5; i++)
		{
			//final Q/A container
			let finDiv = document.createElement("div");
			finDiv.className = "col-sm-12";
			//Q/A div
			let qaDiv = document.createElement("div");
			qaDiv.className="form-inline";
			//question part
			let divQ = document.createElement("div");
			divQ.className="form-group mb-2";
			let q = document.createElement("input");
			q.type = "text";
			q.readOnly=true;
			q.className="form-control-plaintext easyQuestion";
			q.value="Question";
			divQ.appendChild(q);
			//answer part
			let divA = document.createElement("div");
			divA.className = "form-group mx-sm-3 mb-2";
			let a = document.createElement("input");
			a.type = "text";
			a.className = "form-control Answer";
			a.placeholder="Answer";
			divA.appendChild(a);
			qaDiv.appendChild(divQ);
			qaDiv.appendChild(divA);
			finDiv.appendChild(qaDiv);
			//EOFinalContainer
			nextSection.appendChild(finDiv);

		}
		//button
		let button = document.createElement("button");
		button.className="btn btn-info mb-2";
		button.addEventListener("click", () => {getFinalMark(2)});
		button.style="margin-right: auto; margin-left:auto; width:30%;";
		button.innerHTML="Save Answer";
		nextSection.appendChild(button);
		//get questions
		questions = document.getElementsByClassName("easyQuestion");
		for (var i=0; i < questions.length; i++)
		{
			questions[i].value = generateQuestion("easy");
		}
	}
}

//main
var questions = document.getElementsByClassName("lvlQuestion");
for (var i=0; i < questions.length; i++)
{
	questions[i].value = generateQuestion("easy");
}
