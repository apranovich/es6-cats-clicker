(function(){
  
  let model = {
    cats: [
      { id: 1, name: "Tom", imgSrc: "https://goo.gl/DYDsqL", clicksNumber: 0 },
      { id: 2, name: "Nick", imgSrc: "https://goo.gl/WMSr08", clicksNumber: 0 },
      { id: 3, name: "Alex", imgSrc: "https://goo.gl/lPWdDy", clicksNumber: 0 },
      { id: 4, name: "Pit", imgSrc: "https://goo.gl/6c4fro", clicksNumber: 0 },
      { id: 5, name: "John", imgSrc: "https://goo.gl/F4QtMW", clicksNumber: 0 }
    ],
    currentCat: null
  };

  let view = {
    catsList: {
      template: (cat) => { 
        return `<button>${cat.name}</button>`;
      },
      render: (cats) => {
        let docFragment = document.createDocumentFragment();
        let listElement = document.getElementById("cats-list").getElementsByTagName("ul")[0];
          
        for(let cat of cats) {
          let liElem = document.createElement('li');
          liElem.innerHTML = view.catsList.template(cat);
          liElem.addEventListener('click', () => {
            model.currentCat = cat;
            view.cat.render(cat);
          });
          docFragment.appendChild(liElem);
        }
        
        listElement.appendChild(docFragment);
      }
    },
    cat: {
      render: (cat) => {
        let catNameElem = document.getElementById("cat-name");
        let catImgElem = document.getElementById("cat-img");
        let catClicksCounterElem = document.getElementById("cat-clicks");
        catNameElem.textContent = cat.name;
        catImgElem.src = cat.imgSrc;
        catClicksCounterElem.textContent = cat.clicksNumber;
      }
    }
  };

  let controller = {
    init: () => {
      view.catsList.render(model.cats); // render left-side list
      model.currentCat = model.cats[0]; // init current cat
      view.cat.render(model.currentCat); // render current cat
      controller.bindCounterWithCat(); // bind cat area with clicks on cat image
    },
    bindCounterWithCat: () => {
      let catImgElem = document.getElementById("cat-img");
      catImgElem.addEventListener('click', () => {
        let cat = model.currentCat;
        let catClicksCounterElem = document.getElementById("cat-clicks");
        let currentClicksNumber = +catClicksCounterElem.innerHTML;
        cat.clicksNumber = ++currentClicksNumber;
        catClicksCounterElem.textContent = cat.clicksNumber;
      });
    }
  };
  
  controller.init();
})();