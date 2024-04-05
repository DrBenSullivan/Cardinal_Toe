
# Cardinal Toe

_TODO: an introduction_

### Install
_todo: install information_

### Design

**Node object**
```
/**
 * @description A singular step the player may occupy
 *
 * Naming convention might need changing for clarity
 */
export class Node
{
    /**
     * @property The name of the node. can be referenced from other nodes when making a choice
     * @example "A forest"
     */
    _name;

    /**
     * @property the description that will be given for the node when the player reaches it
     * @example "You arrive in a densely wooded area"
     */
    _description;

    /**
     * @property an array of other Nodes - each are a path for the player to take
     */
    _nodes;
}
```
**Events Json Format**
```
{
	"nodes": [
		{
			"name": "Name Referenced In-game (i.e 'A Forest')",
			"description": "The description the player will see on this node (i.e 'You arrive in a densely wooded area.')"
		},
		{
			"name": "etc",
			"description": "etc etc"
		}
	]
}
```
