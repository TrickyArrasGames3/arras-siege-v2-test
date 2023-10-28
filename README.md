# Arras.io Private Server Template

## Quick Start Guide

1. Click the top right where it says **Remix**
2. Give your new project a name.
3. Your private server name will be at <https://arras.io/#host=arras-template.glitch.me> (replace `arras-template` with it's new name)
4. You can add a gamemode code in the link to specify its gamemode (see below).

## More Information

1. Open the file at the left named `.env 🔑`
2. Fill it in with
```
SECRET=aSecretPasswordHere
```
3. Open the private server with <https://arras.io/#host=arras-template.glitch.me&key=aSecretPasswordHere> (replace `aSecretPasswordHere` with the password)
4. The map/config data are in the `config.js` file
5. The tank data are in the `lib/definitions.js` file
6. Other stuff (score curve, stat amount) are in the `server.js` file
7. To make custom shapes, you can go to <https://arras.io/ext/custom-shape>

## Gamemode Code

You can add a gamemode code in the link to specify its gamemode, such as <https://arras.io/#host=arras-template.glitch.me&mode=f> where `f` is the gamemode code.

Parts of the gamemode code must appear in the order below, all of which are optional:
- `p` for Private
- `e` for customized event names, which is followed by the length of the event name and then the event name itself, such as `e5space`
- `d` for customized event names with dashes, which is followed by the number of words and the length of each word and the word itself, such as `d21d3day`
- `o` for Open
- `m` for Maze
- `f` for FFA, `2` for 2 Teams, `3` for 3 Teams, or `4` for 4 Teams
- `d` for Domination, `m` for Mothership, or `a` for Assault

Note:
- Maze FFA, 2 Teams Mothership, and 2 Teams Assault are replaced with just Maze, Mothership, and Assault
- Team modes without domination or mothership are changed to TDM instead of Teams
- Although Maze is before the team number in the gamemode code, they are moved to be after it in the displayed name (`m2` to 2TDM Maze)
 
## Breaking Changes

Breaking changes are important updates to the template that you should do on your server, as otherwise it may stop functioning. The last breaking change is on April 10th, 2019. If you've made a private server before that day, it may no longer work without this update. See `CHANGELOG.md` for details.

# special things

Spwn = spawn
fspw = final spawns (for finale bosses)