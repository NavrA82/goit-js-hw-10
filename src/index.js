import './styles/styles.css';

import { getCatBreeds, createCatByBreed } from './cat-api';

import SlimSelect from 'slim-select';

import Notiflix from 'notiflix';

const ref = {
  breedSelect: document.querySelector('.breed-select'),
  loaderMassage: document.querySelector('.loader'),
  errorMassage: document.querySelector('.error'),
  catCard: document.querySelector('.cat-info'),
};

Notiflix.Report.warning(
  'Please choose a date in the future.',
  'It seems, that you are from the country where the cruiser "Moscow" sank.',
  'Sorry, I will be more careful',
  {
    width: '320px',
    svgSize: '30px',
    messageFontSize: '16px',
    backgroundColor: '#e42525cd',
    warning: {
      svgColor: '#f6c218',
      titleColor: '#f6c218',
      messageColor: '#f6c218',
      buttonBackground: '#08aa31c2',
      buttonColor: '#f6c218',
      backOverlayColor: 'rgba(238,191,49,0.9)',
    },
  }
);
ref.loaderMassage.classList.add('is-hidden');
ref.errorMassage.classList.add('is-hidden');

getCatBreeds()
  .then(data => {
    const elements = data.map(element => ({
      text: element.name,
      value: element.id,
    }));

    new SlimSelect({
      select: ref.breedSelect,
      data: elements,
    });
  })

  .catch(error => {
    console.log(error);
    throw error;
  });

ref.catCard.innerHTML = '';

window.addEventListener('beforeunload', function (event) {
  event.preventDefault();
  event.returnValue = 'Ви впевнені, що хочете покинути цю сторінку?';
});

ref.breedSelect.addEventListener('change', evt => {
  ref.loaderMassage.classList.remove('is-hidden');

  ref.errorMassage.classList.remove('is-hidden');

  const selectedBreedId = evt.currentTarget.value;

  createCatByBreed(selectedBreedId)
    .then(data => {
      const { breeds, url } = data[0];

      ref.catCard.innerHTML = ` 

        <div class="cat-card">
          <div class="wrap-img">
            <img src="${url}" alt="${breeds[0].name}" width="300"/>
          </div>
          <div class="wrap-description">
            <h2>${breeds[0].name}</h2>
            <p><span class="wrap-key">Origin: </span>${breeds[0].origin}</p>
            <p><span class="wrap-key">Description: </span>${breeds[0].description}</p>
            <p><span class="wrap-key">Temperament: </span>${breeds[0].temperament}</p>
            <a href="${breeds[0].wikipedia_url}" target="_blank" rel="nofollow"  class="wikipedia-link" style="text-decoration: none;"><span class="wrap-key" style="color: black; cursor: text;">More information: </span>WIKIPEDIA</a>
          </div>
        </div> 
        `;
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
});

// getCatBreeds()
//   .then(data => {
//     const elements = data.map(element => {
//       const optionsElement = document.createElement('option');
//       optionsElement.value = element.id;
//       optionsElement.textContent = element.name;
//       optionsElement.classList.add('cat-option');
//       return optionsElement;
//     });
//     ref.breedSelect.append(...elements);
//     console.dir(elements);
//   })
//   .catch(error => {
//     console.log(error);
//     throw error;
//   });
