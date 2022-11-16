async function submitForm(addUpForm) {
  const number1 = Number(addUpForm.number1.value);
  const number2 = Number(addUpForm.number2.value);

  const result = await postAddUpRequest(number1, number2);
}

module.exports = { submitForm };
