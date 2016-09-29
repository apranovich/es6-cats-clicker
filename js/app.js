(function(){
  
  let model = {
    cats: [
      { id: 1, name: "Tom", imgSrc: "https://goo.gl/DYDsqL", clicksNumber: 0 },
      { id: 2, name: "Nick", imgSrc: "https://goo.gl/WMSr08", clicksNumber: 0 },
      { id: 3, name: "Alex", imgSrc: "https://goo.gl/lPWdDy", clicksNumber: 0 },
      { id: 4, name: "Pit", imgSrc: "https://goo.gl/6c4fro", clicksNumber: 0 },
      { id: 5, name: "John", imgSrc: "https://goo.gl/F4QtMW", clicksNumber: 0 }
    ]
  };

  let view = {
    catListItemTemplate: (cat) => { 
      return `<span>${cat.name}</span>` 
    },
    catTemplate: (cat) => {
      return `<div id="${cat.name}">
                <h2>${cat.name}</h2>
                <img src=${cat.imgSrc} height="300" width="400"/>
                <h3>Clicks number: <span class="${cat.name}-clicks-number">${cat.clicksNumber}</span></h3>
              </div>`;
    },
    renderCat: (id) => {
      let selectedCat = model.cats.filter((item) => {return item.id === id})[0];
      let catDetails = document.getElementById("cat-area");
      catDetails.innerHTML = view.catTemplate(selectedCat);
    },
    renderCatsList: () => {
      let docFragment = document.createDocumentFragment();
      let listElement = document.getElementById("cats-list").getElementsByTagName("ul")[0];
        
      for(let cat of model.cats) {
        let liElem = document.createElement('li');
        liElem.innerHTML = view.catListItemTemplate(cat);
        liElem.addEventListener('click', () => {
          view.renderCat(cat.id);
          controller.bindCounterWithCat(cat.name);
        });
        docFragment.appendChild(liElem);
      }
      
      listElement.appendChild(docFragment);
    }
  };

  let controller = {
    bindCounterWithCat: (catName) => {
      let catParent = document.getElementById(catName);
      let catImg = catParent.getElementsByTagName("img")[0];
      catImg.addEventListener('click', () => {
        let clicksNumberElement = catParent.getElementsByClassName(`${catName}-clicks-number`)[0];
        let currentClicksNumber = +clicksNumberElement.innerHTML;
        currentClicksNumber++;
        clicksNumberElement.innerHTML = currentClicksNumber;
      });
    }
  };
  
  view.renderCatsList();
  view.renderCat(model.cats[0].id);
})();