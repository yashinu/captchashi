<h1 align="center">Captchashi</h1>
<p align="center">
	<a href="https://www.npmjs.com/package/captchashi" title="NPM version"><img alt="NPM version" src="https://img.shields.io/npm/v/captchashi?logo=npm"/></a>
	<a href="https://www.npmjs.com/package/captchashi" title="NPM downloads"><img alt="NPM downloads" src="https://img.shields.io/npm/dt/captchashi?logo=npm"/></a>
	<br>
	<a href="https://github.com/yashinu/captchashi/blob/master/LICENSE" title="License"><img alt="License" src="https://img.shields.io/github/license/yashinu/captchashi?logo=github&logoColor=black"/></a>
</p>

A library to help you create random key with image for captcha systems. `|` Captcha sistemleri için rastgele kod ve resim üretmenize yarayacak bir kütüphane.


## Installation (Kurulum)
To install captchashi, use npm: `|` captchashi yüklemek için, npm kullanın:
```
npm install captchashi
```

## Usage (Kullanım)
```js
var Captchashi = require("captchashi");

let myCaptcha = new Captchashi({ keySettings, imageSettings });
console.log(myCaptcha.key); // 1Ra9
console.log(myCaptcha.image); // Image Link
```

## Configuration (Ayarlar)

**keySettings** (optional) `|` **Kod Ayarları** (Seçmeli)
```js
const keySettings = {
  length: 4, // 1-12
  characters: "alphanumeric", // alphabetic / numeric / alphanumeric / hex / customizable
  case: "both" // upper / lower / both (optional)
}
```
* `length` Length of the key. `|` Oluşturulacak kodun uzunluğu. **(1-12)**
* `characters` Characters of the key. `|` Oluşturulacak kodun karakterleri. **(alphabetic`/`numeric`/`alphanumeric`/`hex`/`customizable)**
  * customizable example: `"asdhdfe159357"`
* `case` Case of the key (upper/lower/both). `|` Oluşturulacak kodun büyük/küçük harf durumu (büyük/küçük/ikisi). **(upper`/`lower`/`both)**

**imageSettings** (optional) `|` **Resim Ayarları** (Seçmeli)
```js
const imageSettings = {
  image: true, // true/false (optional, default: true) when it's false, you don't get image link
  size: "2000x500",
  backgroundColor: "33363c", // image's background color
  textColor: "ffffff" // image's text color
}
```

- That settings are default. `|` Bu ayarlar varsayılandır.
---

## Example (Örnek)
- An example for Discord Bot. `|` Discord Botu için bir örnek. **(v12)**
```js
const Discord = require("discord.js");
var Captchashi = require("captchashi");

client.on("message", async message => {
  if (message.content === "!verify") {
    await verify(message);
  };
});

async function verify(message) {
  let myCaptcha = new Captchashi();
  let verifyMsg = await message.channel.send(new Discord.MessageEmbed().setDescription("You must type specified code in **a minute** for verify!").attachFiles([new Discord.MessageAttachment(myCaptcha.image, "captcha.png")]).setImage("attachment://captcha.png").setColor("2F3136"));
  let filter = m => m.author.id === message.author.id;
  message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ["time"] }).then(collected => {
    let result = collected.first();
    if (!result || result.content !== myCaptcha.key) return message.reply(`Verify failed because you did not enter the specified code! To verify, you must get new code by typing \`!verify\``);
    result.react("✅").catch(err => { return undefined; });
    // if (message.member) message.member.roles.add("role ID"); // for add role
    verifyMsg.delete().catch(err => { return undefined; });
  }).catch(err => {
    message.reply(`Verify failed because you did not enter the specified code! To verify, you must get new code by typing \`!verify\``);
    verifyMsg.delete().catch(err => { return undefined; });
  });
};
```

## Contact (İletişim)
<p align="center">
  <a href="https://discord.com/users/367679437816463360"><img src="https://img.shields.io/badge/Yashinu%20-7289DA.svg?&style=for-the-badge&logo=discord&logoColor=white"></a>
  <a href="https://github.com/yashinu"><img src="https://img.shields.io/badge/Yashinu%20-1d202b.svg?&style=for-the-badge&logo=github&logoColor=white"></a>
  <a href="https://discord.gg/serendia"><img src="https://img.shields.io/badge/Serendia%20Squad%20-1d202b.svg?&style=for-the-badge&logo=discord&logoColor=white"></a>
</p>