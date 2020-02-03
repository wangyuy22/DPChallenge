console.log('----index.js working correctly----')


// this is the questions data that you should use, feel free to change the questions data
// for testing purpose
const data = {
  questions: [
      {
          prompt: 'Slowly, over time, have your parents stopped saying your name and started calling you by generic names like "champ", "kiddo", "disappointment", or "buddy"?',
          options: {
              A: "They usually say my name two to five times every sentence to make sure they don't forget it.",
              B: "When I call, they tell me to 'hold on, I need to check your birth certificate.'",
              C: "They usually ask me if I'm calling the wrong number.",
              D: "I never talk to my parents.",
              E: "No."
          }
      },
      {
          prompt: 'When was the last time your parents expressed disappointment in you?',
          options: {
              A: "Never. I am a paradigm of human excellence.",
              B: "The third time they caught me in a compromising position with a peach.",
              C: "When I asked them for a single bean.",
              D: "When I called them over the phone sobbing, telling them that I miss them and wish they were a larger presence in my life.",
              E: "No."
          }
      },
      {
          prompt: 'How much of your childhood trauma stems specifically from the way your parents raised you?',
          options: {
              A: "T-trauma? Who has that? Ha. Hahahahahahahahah-",
              B: "My parents are two very nice, gentle people who never really wanted to commit to the responsibilities of childrearing and I suffered for it.",
              C: "Let's not talk about it.",
              D: "I was raised as an upstanding, moral individual thanks to the occasional spanking.",
              E: "No."
          }
      },
      {
          prompt: 'Do you often dream of your mother giving you a nice, warm sponge bath, as if your brain is craving maternal comfort?',
          options: {
              A: "Yes, but it is my father who is doing the sponging.",
              B: "No, I do not dream because I cannot fall asleep at night because I worry that my parents hate me.",
              C: "Yes, except I wasn't dreaming, and I was, in fact, remembering the last night I spent time with my mother before returning to school.",
              D: " I'm allergic to sponges, so this is not a dream, but a nightmare.",
              E: "No."
          }
      },
      {
          prompt: "If you were asked to identify the sound of your father's voice, would you be able to do it?",
          options: {
              A: "No, because my father's voice is identical to that of James Earl Jones and I think every man sounds like James Earl Jones.",
              B: "No, because my father has a medical condition that does not allow him to speak.",
              C: "No, because I have not talked to my father since I left home.",
              D: "No, because my father is a chronic smoker, smokes twenty cigarettes a day, and as a result his voice becomes more unrecognizable with every passing day.",
              E: "No."
          }
      },
      {
          prompt: "If you do not call your parents, will they ever call you?",
          options: {
              A: "No.",
              B: "No.",
              C: "No.",
              D: "No.",
              E: "No."
          }
      },
      {
        prompt: "Hello",
        options: {
            A: "No.",
            B: "No.",
            C: "No.",
            D: "No.",
            E: "No."
        }
    },
  ],
  results: [
      "Your parents don't miss you and just feel obligated to talk to you when they call. You are a nuisance in their life and a constant drain on their financial resources. You're the reason they weren't able to go to Cancun this year, and you should be ashamed of it.",
      "Your parents don't miss you and just feel obligated to talk to you! You are their greatest disappointment, and you will never live up to the high expectations set by your older sibling. You will forever live in their shadow, and your parents will leave everything to your high-achieving sibling and will only leave you one bean.",
      "Your parents feel obligated to talk to you, but still love you. They are just rediscovering themselves in their old age and deserve the time to do so. They'll always be there for you, and are your biggest supporters. I hope you give them the chance to do so.",
      "Your parents don't miss you, and you are in fact a horrible person. Your parents are right to disown you. I am sorry, but you will need to put yourself up for adoption right now.",
      "No."
  ]
}

//Function that ensures only one option of each question is selected
function selectOnly(id) {
  var q = id.split(" ")[0].split("-")[1]
  var cl = "Check-" + q
  var_options = $("*[id^='"+cl+"']")
  Object.keys(var_options).forEach((k, i) => {
    if (var_options[k].id !== id) {
      var_options[k].checked = false;
    }
  })
  document.getElementById(id).checked = true;
}

//Adding all of the questions and options to the page
for (var i = 0; i < data.questions.length; i++) {
  var block = $("<div class='block "+i+"' "+"> </div>")
  var question = $("<div class='question "+i+"' "+"></div>").text(i+1 + ". " + data.questions[i].prompt);
  var option_block = $("<div class='option-block "+i+"' "+"></div>")
  var options_obj = data.questions[i].options

  //iterating through each of the options
  Object.keys(options_obj).forEach((key, index) => {
    var box = $("<div class='box "+key+"' "+"> </div>")
    var option = $("<input type='checkbox' id='Check-"+i+" "+key+"' "+"value=Value"+key+"' "+"onclick='selectOnly(this.id)'/>")
    var msg = $("<p class='choice'> <p").text(key + ": " + options_obj[key])
    $(box).append(msg); 
    $(box).append(option); 
    $(option_block).append(box); 
  })
  $(block).append(question); 
  $(block).append(option_block); 
  $("div.container-question").append(block); 
}

//function after clicking the 'Retake Quiz' button
function restart() {
  var_questions = $("*[class^='question ']")
  var q_len = var_questions.length
  $("#submit-button").prop("disabled",false);
    for (i = 0; i < q_len; i++) {
      var cl = "Check-" + i
      var_opts = $("*[id^='"+cl+"']")
      Object.keys(var_opts).forEach((k, i) => {
        if (!isNaN(k)) {
          var_opts[k].disabled = false;
          var_opts[k].checked = false;
        }
      })
    }
    $("div.container-result").empty();
}

//Finds the majority answer and gives the corresponding result
function findResult(dict) {
  var max = 0;
  var winner = -1;
  Object.keys(dict).forEach((key, index) => {
    if (dict[key] > max) {
      winner = key
      max = dict[key]
    }
  })
  var result = data.results[winner];
  var msg = $("<p> <p").text(result)
  $("div.container-result").append(msg);
  var restart_button = $("<button id='restart' onclick='restart()'> Retake Quiz! </button>") 
  $("div.container-result").append(restart_button);
}

//Function that runs after clicking the submit button
function submit() {
  var_questions = $("*[class^='question ']")
  var q_len = var_questions.length
  var answered = true

  //checks if all questions is answered
  for (i = 0; i < q_len; i++) {
    var cl = "Check-" + i
    var_opts = $("*[id^='"+cl+"']")
    var checked_opt = false;

    //checks for selected checkbox in each question
    Object.keys(var_opts).forEach((k, i) => {
      if (!isNaN(k)) {
        checked_opt = checked_opt || var_opts[k].checked
      }
    })
    answered = answered && checked_opt
  }

  //if all questions are answered, disable the button and all of the checkboxes and show the result
  if (answered) {
    $("#submit-button").prop("disabled",true);
    var obj_dict = {}
    for (i = 0; i < q_len; i++) {
      var cl = "Check-" + i
      var_opts = $("*[id^='"+cl+"']")
      var checked_opt = false;
      Object.keys(var_opts).forEach((k, i) => {
        if (!isNaN(k)) {
          var_opts[k].disabled = true;
          if (!(k in obj_dict)) {
            obj_dict[k] = 0;
          }
          if (var_opts[k].checked) {
            obj_dict[k] += 1
          }
        }
      })
    }
    findResult(obj_dict)
  }
}