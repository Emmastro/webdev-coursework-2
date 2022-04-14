const questionData = [
  {
    question: "Which country can you explore with us?",
    feedback: "We are based in DRC, and only provide services for DRC",
  },
  {
    question: "Which service do we offer?",
    feedback:
      "We are currently expending our services, currently we offer Travel and destination, Health and wellness, personal and home, and business related services.",
  },
  {
    question: "What is our name?",
    feedback: "We are DRC explore!",
  },
  {
    question: "How much do you know about DRC? Can you match these touristic places to their cities?",
    feedback: "Feedback for question 1",
  },
  {
    question: "Below is a list of mountains in DRC. Can you recognize what should not be on this list?",
    feedback: "Feedback for question 1",
  },
];

const optionsQuestion1 = [
  {
    id: "option1",
    value: "option1",
    option: "Rwanda",
  },
  {
    id: "option2",
    value: "option2",
    option: "Democratic Republic of Congo",
  },
  {
    id: "option3",
    value: "option3",
    option: "Republic of Congo",
  },
  {
    id: "option4",
    value: "option4",
    option: "Mauritius",
  },
];

const optionsQuestion2 = [
  {
    id: "option1",
    value: "option1",
    option: "Travel and destination",
    shouldBeChecked: true,
  },
  {
    id: "option2",
    value: "option2",
    option: "Health and wellness",
    shouldBeChecked: true,
  },
  {
    id: "option3",
    value: "option3",
    option: "Personal training",
    shouldBeChecked: false,
  },
  {
    id: "option4",
    value: "option4",
    option: "Personal and home",
    shouldBeChecked: true,
  },
  {
    id: "option5",
    value: "option5",
    option: "Politics",
    shouldBeChecked: false,
  },
  {
    id: "option6",
    value: "option6",
    option: "Business",
    shouldBeChecked: true,
  },
];

let correctResponse;
let currentQuestion = 1;

const radioTemplate = document.getElementById("radio-template");
const checkboxTemplate = document.getElementById("checkbox-template");
const textTemplate = document.getElementById("text-template");
const dropdownTemplate = document.getElementById("dropdown-template");
const multiSelectTemplate = document.getElementById("multi-select-template");

const submitButton = document.querySelector("#submit");
const nextQuestion = document.querySelector("#next-question");
const feedback = document.querySelector("#feedback");
const currentQuestionText = document.querySelector("#current-question-text");
let form = document.getElementById("question-1-form");
let formContent = document.querySelector("#form-content");

const updateQuestion = () => {
  // Set text for current question
  currentQuestionText.innerHTML = `Question ${currentQuestion} of 5 <br> ${
    questionData[currentQuestion - 1].question
  }`;

  formContent.innerHTML = "";
  if (currentQuestion == 1) {
    optionsQuestion1.forEach((element) => {
      //console.log(radioTemplate.cloneNode(true))
      let node = radioTemplate.cloneNode(true);
      node.removeAttribute("hidden");
      node.removeAttribute("id");
      Object.assign(node.querySelector("input"), element);
      node.querySelector('input').classList.add('option-question1');
      node.querySelector("label").innerText = element.option;
      node.querySelector("label").setAttribute("for", element.id);

      formContent.appendChild(node);
    });
  } else if (currentQuestion == 2) {
    optionsQuestion2.forEach((element) => {
      console.log(element);
      let node = checkboxTemplate.cloneNode(true);
      node.removeAttribute("hidden");
      node.removeAttribute("id");
      Object.assign(node.querySelector("input"), element);
      node.querySelector("input").classList.add("option-question2");
      node.querySelector("label").innerText = element.option;
      node.querySelector("label").setAttribute("for", element.id);

      formContent.appendChild(node);
    });
  } else if (currentQuestion == 3) {
    let node = textTemplate.cloneNode(true);
    node.removeAttribute("hidden");
    formContent.appendChild(node);
  } else if (currentQuestion == 4) {
    let node = dropdownTemplate.cloneNode(true);
    node.removeAttribute("hidden");
    formContent.appendChild(node);
  } else if (currentQuestion == 5) {
    let node = multiSelectTemplate.cloneNode(true);
    node.removeAttribute("hidden");
    formContent.appendChild(node);
  }
};

const checkResponse = () => {
  if (currentQuestion == 1) {

    for (let element of Array.from(document.querySelectorAll(".option-question1"))){
      if (element.checked && element.getAttribute("value") == "option2") {
        return true;}
    }
   }
  else if (currentQuestion == 2) {
    let i = 0;
    console.log("checking question 2")
    for (let element of Array.from(document.querySelectorAll(".option-question2"))){
      // check if all elements that should be checked are checked
  
      if (element.checked != optionsQuestion2[i].shouldBeChecked) {
        console.log(`Check ${i} did not pass for ${element.checked} and ${optionsQuestion2[i]}`);
        return false;
      }
      i++;
    }
    // All elements checked match what should be checked
    console.log("all checks passed")
    return true;
  }
  return false;
};
updateQuestion();

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  form = document.getElementById("question-1-form");

  feedback.removeAttribute("hidden");
  if (checkResponse()) {
    // show congratulation
    feedback.innerText = "Congratulations, you got that right!";
  } else {
    // show feedback
    feedback.innerHTML = questionData[currentQuestion - 1].feedback;
  }
});

nextQuestion.addEventListener("click", (event) => {
  if (currentQuestion == 5) {
    // Responded to all questions
    return;
  }
  event.preventDefault();
  currentQuestion++;
  updateQuestion();
  feedback.setAttribute("hidden", true);
  //form = document.getElementById("question-" + currentQuestion + "-form");
  //form.removeAttribute("hidden");
});
