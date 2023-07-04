import axios from 'axios';

import Notiflix from 'notiflix';

axios.defaults.headers.common['x-api-key'] =
  'live_ofZPnPiNzWb6hnco4BifD7wDrFoIkVMiEy8q9RNC0VTM1LMSjhRX5fLB71gaQ3DP';

export const apithecatApi = axios.create({
  baseURL: 'https://api.thecatapi.com',
});

export const getCatBreeds = () => {
  return apithecatApi
    .get('/v1/breeds')
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.status);
      }

      return response.data;
    })
    .catch(error => {
      console.log(error);
      Notiflix.Report.warning(
        'THE MUSCOVITES BROKE IT ALL',
        'but the Muscovites cannot defeat the Ukrainians. We believe in Ukrainian defenders',
        'Ukraine will win',
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
      throw error;
    });
};

export const createCatByBreed = breedId => {
  return apithecatApi
    .get(`/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.status);
      }

      return response.data;
    })
    .catch(error => {
      Notiflix.Report.warning(
        'THE MUSCOVITES BROKE IT ALL',
        'but the Muscovites cannot defeat the Ukrainians. We believe in Ukrainian defenders',
        'Ukraine will win',
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
      console.log(error);
      throw error;
    });
};
