# Cardinal Toe
## Description
Cardinal Toe is a text-based adventure game based on the zany, NSFW BBC sketchshow Limmy's Show by Brian Limond.


## Installation
### Install Node.js & Node Package Manager
From a bash CLI, in the root directory, ensure you have the Node.js & Node Package Manager installed.
```
node -v
npm -v
```
If you do not, consider installing these using Node Version Manager, available here: https://github.com/nvm-sh/nvm and follow the installation instructions.
### Install Cardinal Toe
Download Cardinal_Toe into the directory of your choice and install dependencies.
```
npm install
```



## Execution
### Serve on LocalHost
It is best to serve the game on LocalHost.

From the bash CLI, in the root directory.
```
ng serve
```
The app can now be accessed via LocalHost on the link provided by the Angular CLI.


### Gameplay
Cardinal toe is a text-based adventure game that is heavily randomised.

The player interacts with the environment either by clicking on buttons, the image of their current 'Location' or text that is coloured.

The colour of the text indicates what the text refers to: Locations (green), Items (red) or Actions (blue).

The game is accessed through the "Play" button on the left-side of the screen.

The player traverses a map, which is created from a series of random scenarios that are often juxtaposed.

The areas may or may not contain a point(s) of interest known as 'Landmarks' which are coloured green if present.

Landmarks may be searched by clicking on them. Landmarks may in turn contain 'Item Targets' which can be considered as Quests. 

When encountering a Quest the player will learn of an Item they must find to pass it.

The player then searches other Landmarks to find the required Item.

On returning, they will be able to use the Item to pass the Quest.

On succeeding in a given number of Quests, the game will end & the player is given the opportunity to restart the game.



## Design
The game relies heavily on randomisation and the constants that determine the behaviour of the randomisation are easily adjustable. All constants described below can be accessed & adjusted within `/src/app/app.config.ts`.

The game may also be extended with additional assets added to the JSON files in the `/src/assets/data` directory.

### Locations
#### Logic
The map is generated on clicking the "Play" button. Initially, two pre-defined & locations are generated: "Glade" & "Forest". After this, locations are randomly generated from `/src/assets/data/locations.json`. Locations are generated such that they branch off from _Forest_ either towards a quest or, towards nothing of interest.

There are two constants that affect the shape of the map. They are: `DEPTH_LIMIT` & `DEVIATION_LIMIT`. The `DEPTH_LIMIT` sets how many steps from _Glade_ will be generated on any branch. The `DEVIATION_LIMIT` sets how many wrong turns can be made on the map before a branch terminates.

Both constants can be adjusted in `app.config.ts`.

#### Assets
Further Locations may be added to the game by adding further entries to `/src/assets/data/locations.json` & `/src/assets/images/locations/`.

Images should be `.jpg` format & named to exactly match the `location.name` it corresponds to. `location.name` is further described below.

The "blurb" property is optional, the app will render the description in place of it, if it is not declared.

Additional Locations should be formatted as below:

```
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
The number and index of Landmarks that will be included any given location is randomised when the map is generated.

Landmarks are also defined within `/src/assets/data/locations.json` as above.

### Items
#### Logic
On encountering a Quest & clicking on the described Item, the Session State stores that the player is "looking for" that Item.

The Item is given a countdown until it is discovered. Each time the player searches a landmark that does not contain a quest, the countdown is decremented.

The number of unsuccessful searches required before finding the Item may be adjusted by changing the `DEFAULT_ITEM_COUNTDOWN` in `app.config.ts`.

#### Assets
Items are tied to specific quests & further items should be added along with an appropriate quest that will require it.

Additional items may be added to the game by adding further entries to `/src/assets/data/items.json` and should be formatted as below:

```
  {
    "itemAlias": "(STRING) A NOUN TO REFER TO THE ITEM",
    "name": "(STRING) A MORE DESCRIPTIVE NAME FOR IT",
    "description": "(STRING) WHAT THE PLAYER WILL SAY ON FINDING THE ITEM",
    "itemTargetAlias": "(STRING) THE ALIAS OF THE ITEM TARGET THAT REQUIRES THE ITEM"
  }
```

### Quests

#### Logic
The number of Quests or, Item Targets required before completing the game is the `QUESTS_REQUIRED_TO_WIN` constant. It is currently set to `1` and adjustment be unsuccessful as further assets must first be added.

#### Assets
Further Item Targets may be added to `./src/assets/data/itemTargets.json`. As above, a unique item should be added to the Items JSON simultaneously. The Item Targets should be formatted as below:
```
{
    "alias": "(STRING) A NOUN TO REFER TO WHAT THE PLAYER ENCOUNTERS",
    "name": "(STRING) A BRIEF, MORE DESCRIPTIVE NAME",
    "description": "(STRING) A DESCRIPTION OF WHAT THE PLAYER ENCOUNTERS BEFORE COMPLETING THE QUEST",
    "requiredItemAlias": "(STRING) ALIAS OF THE ITEM REQUIRED [see above]",
    "completedDescription": "(STRING) A DESCRIPTION OF WHAT HAPPENS ONCE THE PLAYER COMPLETES THE QUEST"
}
```

The aliases must exactly match. I.E. 
```
itemTarget.requiredItemAlias == item.Alias && item.itemTargetAlias == itemTarget.alias
```

Images may be added of Item Targets in the `/src/assets/images/itemTargets/` directory. The images should be in `.jpg` format and named to exactly match `itemTarget.alias` as described above.

# Credits
Written & designed by Ben Sullivan [https://github.com/drbensullivan] & Karl Minton [https://github.com/karlsminton]

"Limmy's Show" Copyright [https://www.twitch.tv/limmy] & Banijay

Images generated using Microsoft Designers