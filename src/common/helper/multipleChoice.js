const choicesArr = [
  { items: ['Mensuration', 'Measurement', 'Distillation'], answerId: 21, answer: 'Mensuration' },
  {
    items: ['Used to cut meat', 'Used to handle hot food item', 'Used to preheat food'],
    answerId: 28,
    answer: 'Used to handle hot food item',
  },
  {
    items: [
      'I use it for simping the egg',
      'I use it to measure the egg',
      'I use it for beating small amount of eggs.',
    ],
    answerId: 35,
    answer: 'I use it for beating small amount of eggs.',
  },
  {
    items: [
      'To prevent you from sharing your saliva to others',
      'For decorations only',
      'To maintain the mess',
    ],
    answerId: 39,
    answer: 'To prevent you from sharing your saliva to others',
  },
  {
    items: [
      'To avoid overcooked food',
      'To make sure the food is cold',
      'To prevent bacterial infections from foods.',
    ],
    answerId: 40,
    answer: 'To prevent bacterial infections from foods.',
  },
  {
    items: ['Boil the food easily', 'Cook or preheat the food easily.', 'Blend the food easily'],
    answerId: 42,
    answer: 'Cook or preheat the food easily.',
  },
  {
    items: ['Spatula', 'Measuring cup', 'Pulping garlic'],
    answerId: 49,
    answer: 'Spatula',
  },
  {
    items: ['Vegetable peeler', 'Rubber scraper', 'Grater'],
    answerId: 50,
    answer: 'Vegetebale peelers',
  },
];

export const selectedChoice = (answerId) => choicesArr.find((el) => el.answerId === answerId);
