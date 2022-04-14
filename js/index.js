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
    question: "Can you select the correct location for Kinshasa?",
    feedback: "Kinshasa, the capital of DRC is in the west of the country.",
  },
  {
    question: "Below is a list of cities in DRC. Can you recognize what should not be on this list?",
    feedback: "Among these cities, only Kinshasa, Boma and Goma are in DRC. Brazaville is from the Republic of Congo, and Congo is not a city.",
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

const matchesQuestion4 = [
  "Virunga National Park",
  "Lola ya Bonobo",
  "Kahuzi Biega National Park",
  "Mikembo"
]

const optionsQuestion4 = [
  {
    id: "option1",
    value: "option1",
    option: "Southern region",
    match: 3,
  },
  {
    id: "option2",
    value: "option2",
    option: "Eastern region",
    match: 0,
  },
  {
    id: "option3",
    value: "option3",
    option: "Northen region",
    match: 2,
  },
  {
    id: "option4",
    value: "option4",
    option: "Western region",
    match: 1
  },
];

const correctResponse4 = 1; 
const correstResponse5 = ['2', '4'];
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
    node.querySelector("input").setAttribute("id", "text-input");
    formContent.appendChild(node);
  } else if (currentQuestion == 4) {
    let node = dropdownTemplate.cloneNode(true);
    node.removeAttribute("hidden");
    node.querySelector("select").setAttribute("id", "dropdown-input");
    formContent.appendChild(node);
  } else if (currentQuestion == 5) {
    let node = multiSelectTemplate.cloneNode(true);
    node.querySelector("select").setAttribute("id", "multi-select-input");
    node.removeAttribute("hidden");
    formContent.appendChild(node);
  }
};

const equals = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);

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
  else if (currentQuestion == 3) {
    if (document.querySelector("#text-input").value.toLowerCase().trim() == "drc explore") {
      return true;
    }
  }
  else if (currentQuestion == 4) {
    if (document.querySelector("#dropdown-input").value == correctResponse4) {
      return true;
    }
  }
  else if (currentQuestion == 5){

    const selected = document.querySelector("#multi-select-input").selectedOptions
    const values = Array.from(selected).map(l => l.value);

    if (equals(values, correstResponse5)) {
      return true;
    }
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
  
});
