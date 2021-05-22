const input = document.querySelector("input");
const buttonSearchQuestion = document.querySelector("button");
const select = document.querySelector("select");

let responses;

const Elements = {
  renderQuestion(question){
    const html = `
    <a>
      <div>
        <p>
          ${question}
        </p>
        <strong>
          Pergunta
        </strong>
      </div>
    </a>
    `;

    return html;
  },

  renderAllResponses(response){
    const html = `
    <a 
    href="${response.origin.url}" 
    alt="${response.origin.name}"
    >
      <div>
        <p>
          ${response.response}
        </p>
        <strong>
          Reposta
        </strong>
      </div>
    </a>
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
    let allSites = [...select.children];
    const data = await fetch("http://localhost:3333/sites");
    const response = await data.json();
    response.forEach( site => 
      allSites.forEach( name => name.innerHTML = site )
    );
  },

  async getData(){
    try {
      await axios.get("http://localhost:3333/result")
      .then(response => {
        responses = response.data;
      });
    } catch {
      alert("Reposta inexistente")
    }
  },

  async sendData(){
    if(!input.value) return;
    const informations = {
      ask: input.value,
      origin: select.value
    };

    // await axios.post("http://localhost:3333/result", informations)
    console.log(informations);
  }
}

API.getAllNameSite();

buttonSearchQuestion.addEventListener("click" , async () => {
  await API.getData();
  DOM.renderAllItems();
})