// ============ INGREDIENT DATA ============
// Edit names, quips, and effect colors here. No other file needs to change.
//
// Each ingredient has:
//   id     — unique number (controls the badge label too)
//   text   — what appears on the card
//   quip   — what the pot "says" when this ingredient is dropped in
//   effect — hex color the pot turns; pick from the palette below or any hex
//   image  — (optional) path to an image that flashes on screen when dropped
//
// Palette (matches the page's CSS):
//   burgundy  #7a2230
//   rose      #d96d7a
//   gold      #d4a14a
//   gold-deep #a87425
//   moss      #5c6b3a
//   copper    #b8552c

const ingredients = [
  { id: 1,  text: "Professional vibe coder",                    quip: "I'm sure Dad is proud (right Dad?).",                  effect: "#7a2230", image: "images/mom_vibe_code.jpg" },
  { id: 2,  text: "Proud Tesla owner",                          quip: "Adding silent horsepower. The simmer just got electric.",   effect: "#5c6b3a", image: "images/mom_tesla.jpg" },
  { id: 3,  text: "Elon Musk superfan",                         quip: "Spicy. The pot has some very interesting Opinions™ now.",                         effect: "#b8552c", image: "images/mom_elon_musk.jpg" },
  { id: 4,  text: "Un-scammable",                               quip: "Scam-shield engaged. No one is getting those 3 extra dollars from Mom.",               effect: "#7a2230" },
  { id: 5,  text: "Consumed a cactus taco",                     quip: "A prickly sensation has been added into the pot. Maybe not the best time to take a drink.",            effect: "#a87425" },
  { id: 6,  text: "Backyard pickleball enthusiast",             quip: "*THWACK* Athletic spirit added. Built up from many years of walking uphill, both ways, to get to school.",   effect: "#5c6b3a", image: "images/mom_pickleball.jpg" },
  { id: 7,  text: "Solved a Rubik's cube in 2 minutes",         quip: "Galaxy brain unlocked. The pot just sorted itself by color.", effect: "#7a2230", image: "images/mom_rubiks_cube.jpg" },
  { id: 8,  text: "Recovered 2 contact lenses from sink drains", quip: "Oh man. These were some embarassing times...",                     effect: "#5c6b3a" },
  { id: 9,  text: "Went from enemies to friends with Joyce Holliday", quip: "Hugs added. Even the broth is forgiving now.",        effect: "#d96d7a", image: "images/mom_joyce_holliday.jpg" },
  { id: 10, text: "Tracks birds in Big Brain Academy",          quip: "Spatial reasoning: max!!!",                    effect: "#5c6b3a" },
  { id: 11, text: "Solves expert-level sudokus",                quip: "The pot now follows strict row constraints.", effect: "#7a2230", image: "images/mom_sudoku.jpg" },
  { id: 12, text: "Cooks very tasty 牛肉",                        quip: "Somewhere from within the pot, a distressed moo can be heard.",   effect: "#b8552c", image: "images/mom_cooking_niu_rou.jpg" },
  { id: 13, text: 'Makes jokes like "Rock!... Paper!"',         quip: "Comedy gold detected. The pot is wheezing with laughter.",                effect: "#d4a14a" },
  { id: 14, text: "Gives excellent life advice",                quip: "Sage essence infused. Pot now whispers wisdom.",            effect: "#5c6b3a" },
  { id: 15, text: "Best mom in the world",                      quip: "Hold on. Hold ON. Something incredible is happening.",      effect: "#7a2230" },
];
