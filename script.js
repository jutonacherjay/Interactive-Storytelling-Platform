

// Story branching data
const story = {
    start: {
      text: "You are an adventurer searching for hidden treasure in a mysterious jungle. After days of traveling, you arrive at a fork in the road.",
      choices: {
        A: "leftPath",
        B: "rightPath"
      }
    },
    leftPath: {
      text: "You venture deeper into the jungle, where the sounds of wild animals grow louder. After an hour, you find a hidden cave. Do you enter?",
      choices: {
        A: "enterCave",
        B: "turnBack"
      }
    },
    rightPath: {
      text: "You follow the river and discover an ancient ruin. However, you notice strange markings on the walls. Do you investigate?",
      choices: {
        A: "investigateMarkings",
        B: "keepWalking"
      }
    },
    enterCave: {
      text: "You enter the cave and find the lost treasure! Congratulations, you've completed your adventure.",
      choices: null // End of the story
    },
    turnBack: {
      text: "You decide to turn back, but the jungle proves too dangerous. You get lost and never find your way out. The end.",
      choices: null // End of the story
    },
    investigateMarkings: {
      text: "You investigate the markings and discover they reveal the location of the treasure. You follow them and find the treasure! Well done!",
      choices: null // End of the story
    },
    keepWalking: {
      text: "You keep walking along the river, but unfortunately, you are caught in a storm and lose your way. The end.",
      choices: null // End of the story
    }
  };
  
  let currentNode = "start";
  let choiceCounts = { A: 0, B: 0 }; // Tracking choice popularity
  let sectionTimes = {}; // Tracking time spent in each section
  let startTime = Date.now();
  
  // Function to update the time spent in sections
  function updateTimeTracking() {
    const timeTrackingList = document.getElementById('time-tracking-list');
    timeTrackingList.innerHTML = ''; // Clear existing list
  
    for (const section in sectionTimes) {
      const listItem = document.createElement('li');
      listItem.textContent = `Section: ${section}, Time spent: ${(sectionTimes[section] / 1000).toFixed(2)} seconds`;
      timeTrackingList.appendChild(listItem);
    }
  }
  
  // Function to update the story text
  function updateStoryText(text) {
    document.getElementById('story-text').textContent = text;
  }
  
  // Function to update the choices
  function updateChoices(choices) {
    const choiceButtons = document.querySelectorAll('.choice-btn');
  
    if (choices) {
      choiceButtons[0].style.display = 'inline-block';
      choiceButtons[1].style.display = 'inline-block';
      choiceButtons[0].textContent = "Option A: " + Object.keys(choices)[0];
      choiceButtons[1].textContent = "Option B: " + Object.keys(choices)[1];
    } else {
      // Hide buttons when there are no more choices (story end)
      choiceButtons[0].style.display = 'none';
      choiceButtons[1].style.display = 'none';
    }
  }
  
  // Function to handle making a choice
  function makeChoice(choice) {
    // Track time spent on current section
    const timeSpent = Date.now() - startTime;
    sectionTimes[currentNode] = timeSpent;
  
    // Update time tracking display
    updateTimeTracking();
  
    // Track popular choices
    choiceCounts[choice]++;
  
    // Update to the next story node
    const nextNode = story[currentNode].choices ? story[currentNode].choices[choice] : null;
    if (nextNode) {
      currentNode = nextNode;
  
      // Update the UI with the new text and choices
      updateStoryText(story[nextNode].text);
      updateChoices(story[nextNode].choices);
  
      // Reset the timer for the new section
      startTime = Date.now();
    } else {
      console.error("No valid choices available for this path.");
    }
  }
  
  // Initial setup
  document.addEventListener("DOMContentLoaded", function () {
    updateStoryText(story.start.text);
    updateChoices(story.start.choices);
  });
  