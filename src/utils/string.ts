// Utility to normalize text: lowercase + remove accents/diacritics
export const  normalize = (str: string) => {
 return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // strip accents
}