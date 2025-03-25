let generateButtons = document.querySelectorAll('.tab-content button');


for (let i = 0; i < generateButtons.length; i++) {
  generateButtons[i].addEventListener('click', handleGeneration);
}

function handleGeneration(e) {
  let url;
  let targetTab = e.target.parentElement;

  showErrorMessage(targetTab, 0);

  if (targetTab.id == 'quote') {
    targetTab.getElementsByTagName('div')[0].innerHTML = `<img src='./loading.gif'></img>`

    fetch('https://dummyjson.com/quotes/random')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
          }
          return response.json();
      })
      .then(data => targetTab.getElementsByTagName('div')[0].innerHTML = `<blockquote>&ldquo;${data.quote}&rdquo; &mdash; ${data.author}</blockqoute>`);
  }
  else {

    targetTab.getElementsByTagName("img")[0].src = "./loading.gif";

    if (targetTab.id == 'meme') {
      url = 'https://meme-api.com/gimme';

      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
            }
            return response.json();
          })
        .then(data => targetTab.getElementsByTagName("img")[0].src = data.preview[2])
        .catch(error => {console.log("This is the error:", error); showErrorMessage(targetTab, 1);});
    }

    if (targetTab.id == 'dog') {
      fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          targetTab.getElementsByTagName("img")[0].src = data.message;
        })
        .catch(error => console.log(error));
    }
  
    if (targetTab.id == 'cat') {
      fetch('https://cataas.com/cat?width=320')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
          }
          targetTab.getElementsByTagName("img")[0].src = response.url;
        })
        .catch(error => {console.log("This is the error:", error); showErrorMessage(targetTab, 1);});
    }
  }
}

function showErrorMessage(targetTab, mode) {

  let errMsg = targetTab.getElementsByClassName('err-msg')[0]
  if (errMsg) {
    errMsg.remove();
  }

  let imgElement = targetTab.getElementsByTagName("img")[0];
  if (imgElement) {
    imgElement.src = '';
  }

  if (mode == 1) {
    const errMsgElement = document.createElement('p');
    errMsgElement.className = 'err-msg';
    errMsgElement.textContent = 'Something went wrong. Please try again.'
    targetTab.appendChild(errMsgElement);
  }
}