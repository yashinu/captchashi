function randomElement(arr) {
  return arr[Math.floor((Math.random()*arr.length))];
};

function randomKey(settings) {
  settings = settings || {};
  let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  if (settings.characters === "hex") {
    settings.length = 6;
    settings.characters = numbers.concat(["a", "b", "c", "d", "e", "f"]);
    settings.case = "lower";
  } else if (settings.characters === "alphabetic") settings.characters = alphabet;
  else if (settings.characters === "numeric") settings.characters = numbers;
  else if (settings.characters === "alphanumeric") settings.characters = alphabet.concat(numbers);
  else if (settings.characters) settings.characters = String(settings.characters).split("");
  else settings.characters = alphabet.concat(numbers);

  if (settings.case === "upper") settings.characters = settings.characters.map(c => c.toUpperCase());
  else if (settings.case === "lower") settings.characters = settings.characters.map(c => c.toLowerCase());
  else settings.characters = settings.characters.map(c => Math.round(Math.random()) ? c.toUpperCase() : c.toLowerCase());

  if (!settings.length) settings.length = 4;
  if (Number(settings.length) < 1 || Number(settings.length) > 12) throw new Error("You must specify a valid length! (number 1-12)");
  let key = "";
  for (let i = 0; i < Number(settings.length); i++) {
    key += randomElement(settings.characters);
  };
  return key;
};

function createImage(settings) {
  settings = settings || {};

  if (!settings.size) settings.size = "2000x500";
  if (isNaN(settings.size.split("x")[0]) || isNaN(settings.size.split("x")[1])) throw new Error("You must specify a valid size! (ex: 2000x500)");

  if (!settings.backgroundColor) settings.backgroundColor = "33363c";
  if (typeof settings.backgroundColor !== "string" || settings.backgroundColor.replace("#", "").length !== 6) throw new Error("You must specify a valid background color code! (ex: ffffff)");
  else settings.backgroundColor = settings.backgroundColor.replace("#", "");
  if (settings.backgroundColor.toLowerCase() === "random") settings.backgroundColor = randomKey({ characters: "hex" });

  if (!settings.textColor) settings.textColor = "ffffff";
  if (typeof settings.textColor !== "string" || settings.textColor.replace("#", "").length !== 6) throw new Error("You must specify a valid text color code! (ex: ffffff)");
  else settings.textColor = settings.textColor.replace("#", "");
  if (settings.textColor.replace("#", "").toLowerCase() === "random") settings.textColor = randomKey({ characters: "hex" });

  return `https://dummyimage.com/${settings.size}/${settings.backgroundColor}/${settings.textColor}&text=Yashinu`;
};

class Captchashi {
  constructor(settings) {
    settings = ((!settings || typeof settings !== "object") ? {} : settings);
    this.key = randomKey(settings.keySettings || {});
    if ((settings.imageSettings || {}).image !== false) this.image = createImage(settings.imageSettings || {}).replace("Yashinu", this.key);
  };
};

module.exports = Captchashi;
/* Yashinu */