# Cardinal Toe

## Description
Cardinal Toe is a text-based adventure game inspired by the zany, NSFW BBC sketch show *Limmy's Show* by Brian Limond.

## Installation

### Install Node.js & Node Package Manager
From a bash CLI in the root directory, ensure you have Node.js and the Node Package Manager installed.
```bash
node -v
npm -v
```
If you do not have them installed, consider using Node Version Manager (NVM) available [here](https://github.com/nvm-sh/nvm) and follow the installation instructions.

### Install Cardinal Toe
Download Cardinal Toe into the directory of your choice and install dependencies.
```bash
npm install
```

## Execution

### Serve on LocalHost
It is best to serve the game on LocalHost. From the bash CLI in the root directory:
```bash
ng serve
```
The app can now be accessed via LocalHost on the link provided by the Angular CLI.

### Gameplay
Cardinal Toe is a text-based adventure game that is heavily randomized. 

The player interacts with the environment by clicking on buttons, the image of their current 'Location,' or colored text. The color of the text indicates what the text refers to: Locations (green), Items (red), or Actions (blue).

The game is accessed through the "Play" button on the left side of the screen. 

The player traverses a map, created from a series of random scenarios that are often juxtaposed. The areas may or may not contain points of interest known as 'Landmarks,' which are colored green if present. 

Landmarks may be searched by clicking on them. Landmarks may contain 'Item Targets,' which can be considered as Quests. When encountering a Quest, the player will learn of an Item they must find to pass it. The player then searches other Landmarks to find the required Item. Upon returning, they will be able to use the Item to pass the Quest. On succeeding in a given number of Quests, the game will end and the player is given the opportunity to restart.

## Design
The game relies heavily on randomization. The constants that determine the behavior of the randomization are easily adjustable. All constants described below can be accessed and adjusted within `/src/app/app.config.ts`.

The game can also be extended with additional assets added to the JSON files in the `/src/assets/data` directory.

### Locations

#### Logic
The map is generated when the "Play" button is clicked. Initially, two predefined locations are generated: "Glade" and "Forest." After this, locations are randomly generated from `/src/assets/data/locations.json`. Locations are generated such that they branch off from the Forest either towards a quest or towards nothing of interest.

There are two constants that affect the shape of the map: `DEPTH_LIMIT` and `DEVIATION_LIMIT`. The `DEPTH_LIMIT` sets how many steps from Glade will be generated on any branch. The `DEVIATION_LIMIT` sets how many wrong turns can be made on the map before a branch terminates. Both constants can be adjusted in `app.config.ts`.

#### Assets
Further locations may be added to the game by adding entries to `/src/assets/data/locations.json` and `/src/assets/images/locations/`. Images should be in `.jpg` format and named to exactly match the `location.name` it corresponds to. The `location.name` is described below.

The "blurb" property is optional. The app will render the description in place of it if it is not declared.

Additional locations should be formatted as follows:
```json
{
  "name": "(STRING) SHORT NAME FOR LOCATION",
  "description": "(STRING) LONG DESCRIPTION OF WHAT THE PLAYER ENCOUNTERS ON ENTERING A LOCATION",
  "blurb": "(STRING) A BRIEF DESCRIPTION THAT THE PLAYER MIGHT GLEAN FROM A DISTANCE ABOUT A LOCATION",
  "landmarks": [
    "(STRING) A SHORT NAME FOR A LANDMARK",
    "(STRING) ANOTHER",
    "(STRING) YET ANOTHER"
  ]
}
```

### Landmarks
The number and index of Landmarks included in any given location are randomized when the map is generated. Landmarks are defined within `/src/assets/data/locations.json` as shown above.

### Items

#### Logic
On encountering a Quest and clicking on the described Item, the session state stores that the player is "looking for" that Item. The Item is given a countdown until it is discovered. Each time the player searches a landmark that does not contain a quest, the countdown is decremented. The number of unsuccessful searches required before finding the Item can be adjusted by changing the `DEFAULT_ITEM_COUNTDOWN` in `app.config.ts`.

#### Assets
Items are tied to specific quests. Further items should be added along with an appropriate quest that will require them. Additional items may be added to the game by adding entries to `/src/assets/data/items.json`. Items should be formatted as follows:
```json
{
  "itemAlias": "(STRING) A NOUN TO REFER TO THE ITEM",
  "name": "(STRING) A MORE DESCRIPTIVE NAME FOR IT",
  "description": "(STRING) WHAT THE PLAYER WILL SAY ON FINDING THE ITEM",
  "itemTargetAlias": "(STRING) THE ALIAS OF THE ITEM TARGET THAT REQUIRES THE ITEM"
}
```

### Quests

#### Logic
The number of Quests or Item Targets required before completing the game is determined by the `QUESTS_REQUIRED_TO_WIN` constant. It is currently set to `1` and adjustment may be unsuccessful if further assets are not added.

#### Assets
Further Item Targets may be added to `./src/assets/data/itemTargets.json`. As mentioned above, a unique item should be added to the Items JSON simultaneously. Item Targets should be formatted as follows:
```json
{
  "alias": "(STRING) A NOUN TO REFER TO WHAT THE PLAYER ENCOUNTERS",
  "name": "(STRING) A BRIEF, MORE DESCRIPTIVE NAME",
  "description": "(STRING) A DESCRIPTION OF WHAT THE PLAYER ENCOUNTERS BEFORE COMPLETING THE QUEST",
  "requiredItemAlias": "(STRING) ALIAS OF THE ITEM REQUIRED [see above]",
  "completedDescription": "(STRING) A DESCRIPTION OF WHAT HAPPENS ONCE THE PLAYER COMPLETES THE QUEST"
}
```

The aliases must exactly match, i.e.,
```json
itemTarget.requiredItemAlias == item.Alias && item.itemTargetAlias == itemTarget.alias
```

Images of Item Targets may be added to the `/src/assets/images/itemTargets/` directory. Images should be in `.jpg` format and named to exactly match `itemTarget.alias` as described above.

## Credits
Written and designed by [Ben Sullivan](https://github.com/drbensullivan]) and [Karl Minton](https://github.com/karlsminton).

*Limmy's Show* Copyright [Limmy on Twitch](https://www.twitch.tv/limmy) and Banijay.

Images generated using Microsoft Designer.

