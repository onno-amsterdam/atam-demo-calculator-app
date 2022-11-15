/** This function is not covered in a unit test. A call to an outside dependency 
should be covered in an integration or e2e test. It's important however that the 
functions only makes the call and returns or resolves the result and does nothing else. */
export default function postAddUpRequest(
  num1,
  num2,
  requestHost = "localhost",
  requestPort = "4000"
) {
  return new Promise((resolve) => {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", `http://${requestHost}:${requestPort}/add-up`);

    // set headers to handle json
    httpRequest.setRequestHeader("Accept", "application/json");
    httpRequest.setRequestHeader(
      "Content-Type",
      "application/json; charset=UTF-8"
    );
    httpRequest.send(JSON.stringify({ num1: num1, num2: num2 }));
    httpRequest.onreadystatechange = (e) => {
      if (httpRequest.readyState == 4 && httpRequest.status == 200) {
        resolve(httpRequest.responseText);
      }
    };
  });
}
