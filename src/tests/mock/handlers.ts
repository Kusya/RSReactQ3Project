import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://restcountries.com/v3.1/all?fields=name', () => {
    return HttpResponse.json([
      {
        name: {
          common: 'Belarus',
          official: '',
          nativeName: { official: '', common: '' },
        },
      },
      {
        name: {
          common: 'Poland',
          official: '',
          nativeName: { official: '', common: '' },
        },
      },
      {
        name: {
          common: 'Russia',
          official: '',
          nativeName: { official: '', common: '' },
        },
      },
    ]);
  }),
];
