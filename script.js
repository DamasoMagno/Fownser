const input = document.querySelector("input");
const buttonSearchQuestion = document.querySelector("button");
const select = document.querySelector("select");
const imageResult = document.querySelector(".finalResult");

let responses;

const Elements = {
  renderQuestion(question){
    const html = `
    <div class="question">
      <p>
        ${question}
      </p>
      <strong>
        Pergunta
      </strong>
    </div>
    `;

    return html;
  },

  renderAllResponses(response){
    const html = `
    <div class="question">
      <p>
        ${response.response}
      </p>
      <strong>
        Reposta
        <a href="${response.origin.url}">Ver</a>
      </strong>
    </div>
    `;

    return html;
  }
}

const DOM = {
  container: document.querySelector("#main-container"),

  renderAllItems(){
    if(responses){
      DOM.container.innerHTML = Elements.renderQuestion(responses.ask);
      DOM.container.innerHTML += Elements.renderAllResponses(responses);
    }
  }
}

const API = {
  async getAllNameSite(){
    const data = await fetch("http://localhost:3333/sites");
    const response = await data.json();
    response.forEach(site => {
      select.innerHTML += `<option value="${site}">${site}</option>`
    })
  },

  async getData(event){
    event.preventDefault();
    if(!input.value) return;
    const informations = {
      title: input.value,
      origin: select.value
    };

    try {
      const response = await fetch("http://localhost:3333/result");
      responses = await response.json();
    } catch {
      imageResult.setAttribute("src", "assets/noneResponse.png");
    }
  },
}

API.getAllNameSite();

buttonSearchQuestion.addEventListener("click" , async (event) => {
  await API.getData(event);
  DOM.renderAllItems();
});