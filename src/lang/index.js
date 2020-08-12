import formsEN from './forms/en';
import formsDE from './forms/de';

import headEN from './head/en';
import headDE from './head/de';

import bodyEN from './body/en';
import bodyDE from './body/de';

import routesEN from './routes/en';
import routesDE from './routes/de';

import testingEN from './testing/en';
import testingDE from './testing/de';

const en = {
  ...headEN,
  ...bodyEN,
  ...formsEN,
  ...routesEN,
  ...testingEN
}

const de = {
  ...headDE,
  ...bodyDE,
  ...formsDE,
  ...routesDE,
  ...testingDE
}

const lang = {
  en: en,
  de: de,
}

const newlang = packTogether();
// language object converted so that each definition
// carries all language variations (for convenience)
function packTogether() {
  const languages = Object.keys(lang);
  const newObject = {};
  // new language object
  languages.forEach(
    language => Object.keys(lang[language]).forEach(
      definition => newObject[definition] = Object.assign({
        [language]: lang[language][definition]
      },newObject[definition])
  ));
  // used for checks if language exists
  languages.forEach(language => newObject[language] = language);
  return newObject;
}

export default newlang;