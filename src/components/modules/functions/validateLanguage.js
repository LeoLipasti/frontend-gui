export default function validateLanguage(validateValue,lang) {
  if (Number.isInteger(validateValue)) {
    return validateValue;
  }
  if (!!validateValue && typeof validateValue === "object"){
    return validateValue[lang];
  } else if (typeof validateValue === "string") {
    return validateValue;
  } else {
    return null;
  }
}