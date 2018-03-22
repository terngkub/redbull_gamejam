# redbull_gamejam
Hackathon - Redbull Game Jam

### About this project
* This is a HTML5 game my team created in 2 days of [Redbull Game Jam](https://www.eventbrite.fr/e/billets-mind-game-jam-paris-41644244055)
* We uses Phaser game engine (javascript) in this project.
* My team consists of 2 people, [camah17](https://github.com/camah17) and me.
* I work on coding and my teammate designs the levels and interface.
* The given theme of this hackathon is "four elements" (fire, water, earth and wind).

![elematix1](/screenshot/screenshot1.png?raw=true)
![elematix2](/screenshot/screenshot2.png?raw=true)

### About the game
* It's a math quiz game with a twist of 4 elements.
* The idea is that each elements interact with each other.
* For example, water puts out (or reduce) fire so if you choose them the answer will be (Fire's value - Water's value).
* The game name "Elematix" comes from "Elements" + "Mathematics" and a little "X" at the end to make it to look awesome.

### How to run the game
* Clone or download the repo.
* The game requires to run in virtual host. For PHP, you can create it with below command in the root directory of the repo. Change the port if there is a port conflict.
  ```
  php -S localhost:8080
  ```
* Open the browser. You can access the game by
	```
	localhost:8080
	```
* You can also create virtual host with other tools. It's just that the browsers don't allow you to run javascript from local files.
