import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";

countries.registerLocale(en);

export const getCountryOptions = () => {
  const names = countries.getNames("en", { select: "official" });

  return Object.entries(names).map(([code, name]) => ({
    code,
    name,
  }));
};
