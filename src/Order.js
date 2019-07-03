export default class Order {

  constructor(dataStore) {
    this.dataStore = dataStore;
  }


  add(id) {
    this.dataStore.order[id] = this.dataStore.order[id] + 1 || 1;
    this.update();
  }

  remove(id) {
    this.dataStore.order[id] --;
    if (this.dataStore.order[id] === 0){
      delete this.dataStore.order[id];
    }
    this.update();
  }

  update() {
    let html = "";

    for(let id in this.dataStore.order) {
      let produkt = this.dataStore.getProductById(id);
      
      html += `<div class="order__item" data-id="${id}">
      <div class="order__item-name">${this.dataStore.order[id]} ${produkt.name}</div>
      <button class="count-button count-button--plus">+</button>
      <button class="count-button count-button--minus">-</button>
      </div>`;
    }

    //lze použít pro zjištění, jestli je objekt prázdný: Object.entries(dataStore);

    if(html === ""){
      document.querySelector("#order").innerHTML = `
        <p class="order__empty">
        Vaše objednávka je zatím prázdná :(
        </p>`;
      
        document.querySelector("#order-btn").classList.add("hidden");

    } else {
      document.querySelector("#order").innerHTML = html;


      let plusButtons = document.querySelectorAll(".count-button--plus");
      for (let button of plusButtons){
        button.addEventListener("click", (e) => {
          let id = e.target.parentNode.dataset["id"];
          this.add(id);
        })
      }

      let minusButtons = document.querySelectorAll(".count-button--minus");
      for (let button of minusButtons){
        button.addEventListener("click", (e) => {
          let id = e.target.parentNode.dataset["id"];
          this.remove(id);
        })
      }

      document.querySelector("#order-btn").classList.remove("hidden");
    }
  }

  send(){
    this.dataStore.sendOrder()
      .then(() => {
        alert("Objednávka odeslána");
        this.dataStore.order = {};
        this.update();
      })
      .catch(() => {
        alert("Objednávku se nepodařilo odeslat");
      });
  }
}

