
const questions = [
    {
      type: "mc",
      question: "Vad sög Felix av för något när vi var yngre?",
      answers: ["Dildo", "Morot", "Banan"],
      correct: 1
    },
    {
      type: "text",
      question: "Vad hade Felix för raggningsreplik för att få alla brudarna på fall när vi var på Gotland?",
      correctAnswer: "Vart ligger ICA någonstans?"
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let userName = "";
  
  function startQuiz() {
    userName = document.getElementById("username").value.trim() || "Deltagare";
    document.getElementById("start-screen").classList.add("hidden");
    showQuestion();
  }
  
  function showQuestion() {
    const quizDiv = document.getElementById("quiz");
    quizDiv.classList.remove("hidden");
    quizDiv.innerHTML = "";
  
    if (currentQuestion >= questions.length) {
      showResult();
      return;
    }
  
    const q = questions[currentQuestion];
  
    if (q.image) {
      const img = document.createElement("img");
      img.src = q.image;
      img.alt = "Bild till frågan";
      img.style.maxWidth = "100%";
      img.style.marginBottom = "1rem";
      quizDiv.appendChild(img);
    }
  
    const questionEl = document.createElement("div");
    questionEl.className = "question";
    questionEl.textContent = `Fråga ${currentQuestion + 1} av ${questions.length} – ${userName}: ${q.question}`;
    quizDiv.appendChild(questionEl);
  
    if (q.type === "mc") {
      const answersDiv = document.createElement("div");
      answersDiv.className = "answers";
      q.answers.forEach((a, i) => {
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "answer";
        input.value = i;
        label.appendChild(input);
        label.append(" ", a);
        answersDiv.appendChild(label);
      });
      quizDiv.appendChild(answersDiv);
    } else if (q.type === "text") {
      const input = document.createElement("input");
      input.type = "text";
      input.id = "text-answer";
      input.style.width = "100%";
      quizDiv.appendChild(input);
    }
  
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Nästa";
    nextBtn.onclick = () => checkAnswer(q);
    quizDiv.appendChild(nextBtn);
  }
  
  function checkAnswer(q) {
    if (q.type === "mc") {
      const selected = document.querySelector("input[name='answer']:checked");
      if (selected && parseInt(selected.value) === q.correct) score++;
    }
    currentQuestion++;
    showQuestion();
  }
  
  function showResult() {
    document.getElementById("quiz").classList.add("hidden");
    const resultDiv = document.getElementById("result");
    resultDiv.classList.remove("hidden");
    resultDiv.innerHTML = `${userName}, du fick ${score} av ${questions.filter(q => q.type === 'mc').length} rätt på quizet!`;
  }
  