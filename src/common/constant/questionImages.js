const { isEmpty } = require('lodash');

const question_1 = require('../assets/images/questions/1.png');
const question_10 = require('../assets/images/questions/10.png');
const question_11 = require('../assets/images/questions/11.png');
const question_12 = require('../assets/images/questions/12.png');
const question_13 = require('../assets/images/questions/13.png');
const question_14 = require('../assets/images/questions/14.png');
const question_15 = require('../assets/images/questions/15.png');
const question_16 = require('../assets/images/questions/16.png');
const question_17 = require('../assets/images/questions/17.png');
const question_18 = require('../assets/images/questions/18.png');
const question_19 = require('../assets/images/questions/19.png');
const question_2 = require('../assets/images/questions/2.png');
const question_20 = require('../assets/images/questions/20.png');
const question_3 = require('../assets/images/questions/3.png');
const question_4 = require('../assets/images/questions/4.png');
const question_5 = require('../assets/images/questions/5.png');
const question_6 = require('../assets/images/questions/6.png');
const question_7 = require('../assets/images/questions/7.png');
const question_8 = require('../assets/images/questions/8.png');
const question_9 = require('../assets/images/questions/9.png');

export const checkIfImageQuestion = (val) => {
  const images = [
    { images: question_1, val: 'question_1' },
    { images: question_2, val: 'question_2' },
    { images: question_3, val: 'question_3' },
    { images: question_4, val: 'question_4' },
    { images: question_5, val: 'question_5' },
    { images: question_6, val: 'question_6' },
    { images: question_7, val: 'question_7' },
    { images: question_8, val: 'question_8' },
    { images: question_9, val: 'question_9' },
    { images: question_10, val: 'question_10' },
    { images: question_11, val: 'question_11' },
    { images: question_12, val: 'question_12' },
    { images: question_13, val: 'question_13' },
    { images: question_14, val: 'question_14' },
    { images: question_15, val: 'question_15' },
    { images: question_16, val: 'question_16' },
    { images: question_17, val: 'question_17' },
    { images: question_18, val: 'question_18' },
    { images: question_19, val: 'question_19' },
    { images: question_20, val: 'question_20' },
  ];

  const questionImage = images.find((el) => el.val === val);
  if (isEmpty(questionImage)) {
    return '';
  } else {
    return questionImage.images;
  }
};
