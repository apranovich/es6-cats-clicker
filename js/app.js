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
    },
    admin: ( () => {
      let adminArea = document.getElementById("admin-area");
      let adminEnableButton = document.getElementById("admin-btn");
      let adminCatName = document.getElementById("admin-name");
      let adminCatImg = document.getElementById("admin-img-src");
      let adminCatClicks = document.getElementById("admin-clicks");
      let adminSaveBtn = document.getElementById("admin-save");
      let adminCancelBtn = document.getElementById("admin-cancel");

      let toggleArea = () => {
        adminArea.style.display = adminArea.style.display === "none" ? "" : "none";
      };
      let toggleEnableButton = () => {
        adminEnableButton.style.display = adminEnableButton.style.display === "none" ? "" : "none";
      };

      return {
        init: () => {
          toggleArea();
          adminEnableButton.addEventListener('click', controller.enableAdmin);
          adminSaveBtn.addEventListener('click', controller.saveAdminChanges);
          adminCancelBtn.addEventListener('click', controller.cancelAdmin);
        },
        render: (selectedCat) => {
          toggleEnableButton();
          toggleArea();
          adminCatName.value = selectedCat.name;
          adminCatImg.value = selectedCat.imgSrc;
          adminCatClicks.value = selectedCat.clicksNumber;
        },
        getValues: () => {
          return {
            name: adminCatName.value, 
            imgSrc: adminCatImg.value, 
            clicksNumber: adminCatClicks.value
          };
        },
        close: () => {
          toggleArea();
          toggleEnableButton();
        }
      }
    })()
  };

  let controller = {
    init: () => {
      view.catsList.render(model.cats); // render left-side list
      model.currentCat = model.cats[0]; // init current cat
      view.cat.render(model.currentCat); // render current cat
      controller.bindCounterWithCat(); // bind cat area with clicks on cat image
      view.admin.init();
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
    },
    enableAdmin: () => {
      view.admin.render(model.currentCat);
    },
    saveAdminChanges: () => {
      Object.assign(model.currentCat, view.admin.getValues());
      view.cat.render(model.currentCat);
      view.admin.close();
    },
    cancelAdmin: () => {
      view.admin.close();
    }
  };
  
  controller.init();
})();