# Boss splitting:

first go to server.js and search for `BOSS_SPLIT_TYPE` and add a case

for multiple at once use for loop then the type of the boss

change `any tank you want` to Class.yourtanknamehere
example:

```
example.define(Class.abysslingB)

it should be a defined tank or else it gived out a error
```

Example:

```
case 'example':
  this.onDeath = () => {
    let x = this.x,
        y = this.y
    let example = new Entity({
       x: x,
       y: y
    })
    example.define(any tank you want)
    example.team = team you want
    example.color = color you want
  }
```

for loop its used

```
case 'example':
  this.onDeath = () => {
    let x = this.x,
        y = this.y
    for (let i = 0; i < number; i++) {
      let example = new Entity({
       x: x,
       y: y
      })
      example.define(any tank you want)
      example.team = team you want
      example.color = color you want
    }
  }
```

# Color bullets:

this one is a bit easier if you want it to a tank from this remixed version, use COLOR_OVERRIDE: color number
after TYPE: exports.bullet in a tank
it should be colored now feel free to also copy paste the feature! same as boss_split_type too

# To add your boss to a wave (who know this ignore this)

search a bossSpawn and scroll until you find wave code
or search a boss that spawns there then add your boss there! for a new wave copy paste it and increase the later waves number by 1

# Adding your custom food

go to server.js
search using ctrl + f and search makefood then go getFoodClass and change a polygon with your polygon (Note: the level depends on it)
