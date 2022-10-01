const throttle = require('lodash.throttle');

const form = document.querySelector('form');
const inputEmail = document.querySelector('input');
const inputMessage = document.querySelector('textarea');

form.addEventListener('input', throttle(onInput, 500));
form.addEventListener('submit', onSubmit);

function onInput() {
  const dataOutput = {
    email: inputEmail.value,
    message: inputMessage.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(dataOutput));
}
if (localStorage.getItem('feedback-form-state') !== null) {
  const localData = localStorage.getItem('feedback-form-state');
  const localDataJSON = JSON.parse(localData);
  inputEmail.value = localDataJSON.email;
  inputMessage.value = localDataJSON.message;
}

function onSubmit(evt) {
  evt.preventDefault();
  const localData = localStorage.getItem('feedback-form-state');
  const localDataJSON = JSON.parse(localData);

  inputEmail.value = ' ';
  inputMessage.value = ' ';
  console.log(localDataJSON);
  localStorage.clear();
}
