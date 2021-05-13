function randomElement(arr) {
  return arr[Math.floor((Math.random()*arr.length))];
};

function randomKey(settings) {
  let setting = settings || {};
  let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  if (setting.characters === "hex") {
    setting.length = 6;
    setting.characters = numbers.concat(["a", "b", "c", "d", "e", "f"]);
    setting.case = "lower";
  } else if (setting.characters === "alphabetic") setting.characters = alphabet;
  else if (setting.characters === "numeric") setting.characters = numbers;
  else if (setting.characters === "alphanumeric") setting.characters = alphabet.concat(numbers);
  else if (setting.characters) setting.characters = String(setting.characters).split("");
  else setting.characters = alphabet.concat(numbers);

  if (setting.case === "upper") setting.characters = setting.characters.map(c => c.toUpperCase());
  else if (setting.case === "lower") setting.characters = setting.characters.map(c => c.toLowerCase());
  else setting.characters = setting.characters.map(c => Math.round(Math.random()) ? c.toUpperCase() : c.toLowerCase());

  if (!setting.length) setting.length = 4;
  if (Number(setting.length) < 1 || Number(setting.length) > 12) throw new Error("You must specify a valid length! (number 1-12)");
  let key = "";
  for (let i = 0; i < Number(setting.length); i++) {
    key += randomElement(setting.characters);
  };
  return key;
};

function createImage(settings) {
  let setting = settings || {};

  if (!setting.size) setting.size = "2000x500";
  if (isNaN(setting.size.split("x")[0]) || isNaN(setting.size.split("x")[1])) throw new Error("You must specify a valid size! (ex: 2000x500)");

  if (!setting.backgroundColor) setting.backgroundColor = "33363c";
  if (typeof setting.backgroundColor !== "string" || setting.backgroundColor.replace("#", "").length !== 6) throw new Error("You must specify a valid background color code! (ex: ffffff)");
  else setting.backgroundColor = setting.backgroundColor.replace("#", "");
  if (setting.backgroundColor.toLowerCase() === "random") setting.backgroundColor = randomKey({ characters: "hex" });

  if (!setting.textColor) setting.textColor = "ffffff";
  if (typeof setting.textColor !== "string" || setting.textColor.replace("#", "").length !== 6) throw new Error("You must specify a valid text color code! (ex: ffffff)");
  else setting.textColor = setting.textColor.replace("#", "");
  if (setting.textColor.replace("#", "").toLowerCase() === "random") setting.textColor = randomKey({ characters: "hex" });

  return `https://dummyimage.com/${setting.size}/${setting.backgroundColor}/${setting.textColor}&text=Yashinu`;
};

class Captchashi {
  constructor(settings) {
    let setting = ((!settings || typeof settings !== "object") ? {} : settings);
    this.key = randomKey(setting.keySettings || {});
    if ((setting.imageSettings || {}).image !== false) this.image = createImage(setting.imageSettings || {}).replace("Yashinu", this.key);
  };
};

module.exports = Captchashi;
/* Yashinu */