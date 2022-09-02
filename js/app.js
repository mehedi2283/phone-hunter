const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText ? searchText : 'apple '}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};
const displayPhones = (phones, dataLimit) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.innerText = "";
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 6) {
    phones = phones.slice(0, 6);

    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

  const noPhone = document.getElementById("not-found");

  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
  } else {
    noPhone.classList.add("d-none");
  }
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
              <div class="card">

                 <div class="d-flex justify-content-center p-3">
                    <img src="${phone.image}" class="card-img-top w-50 " alt="...">
                </div>   
                
                <div class="card-body text-center">
                  <h5 class="card-title">Brand: ${phone.brand}</h5>
                  <h5 class="card-title fw-bold">${phone.phone_name}</h5>
                  <p class="card-text">This is a longer card with supporting text below as a natural     lead-in to additional content. This content is a little bit longer.</p>
                  <button onclick="loadPhoneDetails('${phone.slug}')" type="button"  class=" btn btn-primary" data-bs-toggle="modal" data-bs-target="#showDetailsModal">Show Details</button>
                </div>
              </div>
        `;
    phoneContainer.appendChild(phoneDiv);
  });
  toggleSpinner(false);
};

const proccessSearch = (dataLimit) => {
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhones(searchText, dataLimit);
};

document.getElementById("btn-search").addEventListener("click", function () {
  proccessSearch(6);
});


document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        proccessSearch(6);
    }
});

const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

document.getElementById("btn-show-all").addEventListener("click", function () {
  proccessSearch();
});

const loadPhoneDetails = async id =>{
    const url = ` https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
    console.log(data.data);
}

const displayPhoneDetails = phone =>{
     const modalTitle = document.getElementById('showDetailsModalLabel');
     modalTitle.innerText = phone.name;
     const phoneDetails = document.getElementById('modal-body');
     phoneDetails.innerHTML = `
     <div class="d-flex justify-content-center p-3">
          <img src="${phone.image}" class="card-img-top w-25 " alt="...">
    </div> 
    <p class=" ">Chip Set :  ${phone.mainFeatures ? phone.mainFeatures.chipSet : 'Not Found'}</p>
    <p class=" ">Display Size :  ${phone.mainFeatures ? phone.mainFeatures.displaySize : 'Not Found'}</p>
    <p class=" ">memory :  ${phone.mainFeatures.memory ? phone.mainFeatures.memory : 'Not Found'}</p>
    <p class=" ">Sensors :  ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] : 'Not Found'}</p>
    <p class=" ">Storage :  ${phone.mainFeatures.storage ? phone.mainFeatures.storage : 'Not Found'}</p>
    <p class="fs-5 fw-bold">Release Date :  ${phone.releaseDate ? phone.releaseDate : 'Not Found'}</p>
     `;
     
}

loadPhones('apple',1);
