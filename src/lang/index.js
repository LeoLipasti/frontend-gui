import formsEN from './forms/en';
import formsDE from './forms/de';

import headersEN from './headers/en';
import headersDE from './headers/de';

const en = {
  ...headersEN,
  ...formsEN
}

const de = {
  ...headersDE,
  ...formsDE
}

let lang = 'de';

// todo language subscribe to redux

export default function() {
  if (lang === 'en') {
    return en;
  }
  else if (lang === 'de') {
    return de;
  }
};