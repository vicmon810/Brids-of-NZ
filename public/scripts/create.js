function clickHandler(event) {
  event.preventDefault();
  submitBirds();
}
const sendButton = document.querySelector("#create-button");
if (sendButton !== null) {
  sendButton.addEventListener("click", clickHandler);
}

const pn = document.querySelector("#pn");
const en = document.querySelector("#en");
const on = document.querySelector("#on");
const sn = document.querySelector("#sn");
const order = document.querySelector("#order");
const family = document.querySelector("#family");
const length = document.querySelector("#length");
const weight = document.querySelector("#weight");
const status = document.querySelector("#status");
const credit = document.querySelector("#photo_credit");
async function submitBirds() {
  const info =
    pn.value +
    "\n" +
    en.value +
    "\n" +
    on.value +
    "\n" +
    sn.value +
    "\n" +
    order.value +
    "\n" +
    family.value +
    "\n" +
    length.value +
    "\n" +
    weight.value +
    "\n" +
    status.value +
    "\n" +
    credit.value;
  console.log(info);
  const response = await fetch("/birds/created/", {
    method: "POST",
    body: JSON.stringify({ info }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  //   console.log(await response.text());
}
