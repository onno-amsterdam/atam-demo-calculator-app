export default async function submitForm(addUpForm) {
  // update display style of the errors
  document.getElementById("notANumberErrorNumber1").style.display = "none";
  document.getElementById("notANumberErrorNumber2").style.display = "none";
  document.getElementById("somethingWentWrongError").style.display = "none";

  const number1 = addUpForm.number1.value;
  const number2 = addUpForm.number2.value;

  const number1IsNotANumber = isNaN(number1);
  const number2IsNotANumber = isNaN(number2);

  if (number1IsNotANumber) {
    document.getElementById("notANumberErrorNumber1").style.display = "inline";
  }
  if (number2IsNotANumber) {
    document.getElementById("notANumberErrorNumber2").style.display = "inline";
  }

  if (number1IsNotANumber || number2IsNotANumber) return;

  try {
    const result = JSON.parse(
      await postAddUpRequest(Number(number1), Number(number2))
    );
    document.getElementById("resultField").innerText = result.result;
  } catch (error) {
    document.getElementById("somethingWentWrongError").style.display = "inline";
  }
}
