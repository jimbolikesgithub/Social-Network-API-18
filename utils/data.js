const username = [
    'bruh123',
    'chickens456',
    'petrolleum789',
    'oilandgas112',
    'laundry115',
    'dishes342',
    'london437',
    'kittycat995',
    'kuruma352',
    'grass527',
    'airplane257',
];

const goodReactions = [
    'I love bruh stuff',
    'Chickens are amazing',
    'Petrolleum jelly is good for skin',
    'Oil and gas exist',
    'I like doing laundry',
    'Clean the dishes pls',
    'Is London a good place?',
    'I love kitty cats',
    'Kuruma, kudasai',
    'Touching grass is a',
    'Airplanes are air planes',
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomUsername = () =>
  `${getRandomArrItem(username)} ${getRandomArrItem(username)}`;

// Function to generate random assignments that we can add to student object.
const getRandomReactions = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionName: getRandomArrItem(goodReactions),
      score: Math.floor(Math.random() * (99 - 70 + 1) + 70),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomUsername, getRandomReactions };