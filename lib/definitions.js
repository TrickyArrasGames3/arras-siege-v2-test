//GUN DEFINITIONS
const combineStats = function(arr) {
    try {
    // Build a blank array of the appropiate length
    let data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    arr.forEach(function(component) {
        for (let i=0; i<data.length; i++) {
            data[i] = data[i] * component[i];
        }
    });
    return {
        reload:     data[0],
        recoil:     data[1],
        shudder:    data[2], 
        size:       data[3],
        health:     data[4],
        damage:     data[5],
        pen:        data[6],
        speed:      data[7],
        maxSpeed:   data[8],
        range:      data[9],
        density:    data[10],
        spray:      data[11],
        resist:     data[12],
    };
    } catch(err) {
        console.log(err);
        console.log(JSON.stringify(arr));
    }
};
const setBuild = (build) => {
  let skills = build.split(build.includes("/") ? "/" : "").map((r) => +r);
  if (skills.length !== 10)
    throw new RangeError("Build must be made up of 10 numbers");
  return [6, 4, 3, 5, 2, 9, 0, 1, 8, 7].map((r) => skills[r]);
};
const skillSet = (() => {
    let config = require('../config.json');
    let skcnv = {
        rld: 0,
        pen: 1,
        str: 2,
        dam: 3,
        spd: 4,
    
        shi: 5,
        atk: 6,
        hlt: 7,
        rgn: 8,
        mob: 9,
    };
    return args => {
        let skills = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let s in args) {
            if (!args.hasOwnProperty(s)) continue;
            skills[skcnv[s]] = Math.round(config.MAX_SKILL * args[s]);
        }
        return skills;
    };
})();

const g = { // Gun info here 
    trap:               [36,    1,     0.25,   0.6,    1,      0.75,   1,      1.5,      1,      1,      1,      15,     3], 
    trapturret:         [36,    1,     0.25,   0.6,    1,      0.75,   1,      1,      1,      1,      1,      15,     3],
    abysstrap:          [144,    0,     0.25,   1.4,    2,      2,      3,      8,      1,      1,      1,      15,     3], 
    swarm:              [18,    0.25,  0.05,   0.4,    1,      0.75,   1,      4,      1,      1,      1,      5,      1],  
    drone:              [50,    0.25,  0.1,    0.6,    2,      1.8,    1.2,      2,      1,      1,      1,      0.1,    1], 
    factory:            [60,    1,     0.1,    0.7,    1,      0.75,   1,      3,      1,      1,      1,      0.1,    1], 
    basic:              [18,    1.4,   0.1,    1,      1,      0.75,   1,      4.5,    1,      1,      1,      15,     1],  
    smallBullet: [1, 1, 1, 0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    littlesmallBullet: [1, 1, 1, 0.65, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    littlebigbullet: [1, 1, 1, 1.8, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    celestialSkim: [1.33, 0.8, 0.8, 0.9, 1.35, 0.8, 1.26, 1, 1, 4, 1, 1, 1.1],
    eternalSkim: [2, 0.8, 0.8, 0.4, 1.35, 2.1, 1.5, 1, 1, 2, 1, 1, 1.1],
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    blank:              [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    twiceSize:          [1,     1,     1,      2,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    half_size:          [1,     1,     1,      0.5,      1,      1,      1,      1,      1,      1,      1,      1,      1],
        spam:           [1.1,   1,     1,      1.05,   1,      1.1,    1,      0.9,    0.7,    1,      1,      1,      1.05], 
        minion:         [1,     1,     2,      1,      0.4,    0.4,    1.2,    1,      1,      0.75,   1,      2,      1],      
        single:         [1.05,  1,     1,      1,      1,      1,      1,      1.05,   1,      1,      1,      1,      1],  
    sniper:             [1.35,  1,     0.25,   1,      1,      0.8,    1.1,    1.5,    1.5,    1,      1.5,    0.2,    1.15],
        rifle:          [0.8,   0.8,   1.5,    1,      0.8,    0.8,    0.9,    1,      1,      1,      1,      2,      1],     
        assass:         [1.65,  1,     0.25,   1,      1.15,   1,      1.1,    1.18,   1.18,   1,      3,      1,      1.3],
        hunter:         [1.5,   0.7,   1,      0.95,   1,      0.9,    1,      1.1,    0.8,    1,      1.2,    1,      1.15], 
            hunter2:    [1,     1,     1,      0.9,    2,      0.5,    1.5,    1,      1,      1,      1.2,    1,      1.1], 
            preda:      [1.4,   1,     1,      0.8,    1.5,    0.9,    1.2,    0.9,    0.9,    1,      1,      1,      1],   
            snake:      [0.4,   1,     4,      1,      1.5,    0.9,    1.2,    0.2,    0.35,   1,      3,      6,      0.5],   
            sidewind:   [1.5,   2,     1,      1,      1.5,    0.9,    1,      0.15,   0.5,    1,      1,      1,      1],  
            snakeskin:  [0.6,   1,     2,      1,      0.5,    0.5,    1,      1,      0.2,    0.4,    1,      5,      1],
    mach:               [0.5,   0.8,   1.7,    1,      0.7,    0.7,    1,      1,      0.8,    1,      1,      2.5,    1],
        blaster:        [1,     1.2,   1.25,   1.1,    1.5,    1,      0.6,    0.8,    0.33,   0.6,    0.5,    1.5,    0.8], 
        chain:          [1.25,  1.33,  0.8,    1,      0.8,    1,      1.1,    1.25,   1.25,   1.1,    1.25,   0.5,    1.1], 
        mini:           [1.25,  0.6,   1,      0.8,    0.55,   0.45,   1.25,   1.33,   1,      1,      1.25,   0.5,    1.1], 
            stream:     [1.1,   0.6,   1,      1,      1,      0.65,   1,      1.24,   1,      1,      1,      1,      1],    
        shotgun:        [8,     0.4,   1,      1.5,    1,      0.4,    0.8,    1.8,    0.6,    1,      1.2,    1.2,    1], 
    flank:              [1,     1.2,   1,      1,      1.02,   0.81,   0.9,    1,      0.85,   1,      1.2,    1,      1],
        tri:            [1,     0.9,   1,      1,      0.9,    1,      1,      0.8,    0.8,    0.6,    1,      1,      1],  
            trifront:   [1,     0.2,   1,      1,      1,      1,      1,      1.3,    1.1,    1.5,    1,      1,      1],  
            thruster:   [1,     1.5,   2,      1,      0.5,    0.5,    0.7,    1,      1,      1,      1,      0.5,    0.7], 
        auto: /*pure*/  [1.8,   0.75,  0.5,    0.8,    0.9,    0.6,    1.2,    1.1,    1,      0.8,    1.3,    1,      1.25],
            five:       [1.15,  1,     1,      1,      1,      1,      1,      1.05,   1.05,   1.1,    2,      1,      1],   
            autosnipe:  [1,     1,     1,      1.4,    2,      1,      1,      1,      1,      1,      1,      1,      1],   
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */ 
    pound:              [2,     1.6,   1,      1,      1,      2,      1,      0.85,   0.8,    1,      1.5,    1,      1.15], 
        destroy:        [2.2,   1.8,   0.5,    1,      2,      2,      1.2,    0.65,   0.5,    1,      2,      1,      3],
            anni:       [0.85,  1.25,  1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],    
            hive:       [1.5,   0.8,   1,      0.8,    0.7,    0.3,    1,      1,      0.6,    1,      1,      1,      1],
        arty:           [1.2,   0.7,   1,      0.9,    1,      1,      1,      1.15,   1.1,    1,      1.5,    1,      1], 
            mortar:     [1.2,   1,     1,      1,      1.1,    1,      1,      0.8,    0.8,    1,      1,      1,      1],   
            spreadmain: [0.78125, 0.25, 0.5,   1,      0.5,    1,      1,   1.5/0.78, 0.9/0.78,1,      1,      1,      1], 
            spread:     [1.5,   1,     0.25,   1,      1,      1,      1,      0.7,    0.7,    1,      1,      0.25,   1],   
            skim:       [1.33,  0.8,   0.8,    0.9,    1.35,   0.8,    2,      0.3,    0.3,    1,      1,      1,      1.1],   
    twin:               [1,     0.5,   0.9,    1,      0.9,    0.7,    1,      1,      1,      1,      1,      1.2,    1],
        bent:           [1.1,   1,     0.8,    1,      0.9,    1,      0.8,    1,      1,      1,      0.8,    0.5,    1],    
        triple:         [1.2,   0.667, 0.9,    1,      0.85,   0.85,   0.9,    1,      1,      1,      1.1,    0.9,    0.95], 
            quint:      [1.5,   0.667, 0.9,    1,      1,      1,      0.9,    1,      1,      1,      1.1,    0.9,    0.95], 
            dual:       [2,     1,     0.8,    1,      1.5,    1,      1,      1.3,    1.1,    1,      1,      1,      1.25], 
        double:         [1,     1,     1,      1,      1,      0.9,    1,      1,      1,      1,      1,      1,      1],
            hewn:       [1.25,  1.5,   1,      1,      0.9,    0.85,   1,      1,      0.9,    1,      1,      1,      1],
        puregunner:     [1,     0.25,  1.5,    1.2,    1.35,   0.25,   1.25,   0.8,    0.65,   1,      1.5,    1.5,    1.2],
            machgun:    [0.66,  0.8,   2,      1,      1,      0.75,   1,      1.2,    0.8,    1,      1,      2.5,    1], 
    gunner:             [1.25,  0.25,  1.5,    1.1,    1,      0.35,   1.35,   0.9,    0.8,    1,      1.5,    1.5,    1.2],
        power:          [1,     1,     0.6,    1.2,    1,      1,      1.25,   2,      1.7,    1,      2,      0.5,    1.5], 
            nail:       [0.85,  2.5,   1,      0.8,    1,      0.7,    1,      1,      1,      1,      2,      1,      1],       
        fast:           [1,     1,     1,      1,      1,      1,      1,      1.2,    1,      1,      1,      1,      1], 
    turret:             [2,     1,     1,      1,      0.8,    0.6,    0.7,    1,      1,      1,      0.1,    1,      1],
    gunturret:             [2,     1,     1,      1,      1,    1,    1,    1,      1,      1,      0.1,    1,      1],
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    battle:             [1,     1,     1,      1,      1.25,   1.15,   1,      1,      0.85,   1,      1,      1,      1.1],
        bees:           [1.3,   1,     1,      1.4,    1,      1.5,    0.5,    3,      1.5,    1,      0.25,   1,      1], 
          wasps:        [1.3,   1,     1,      1.6,    1,      1.6,    0.87,   3,      1.5,    1,      0.25,   1,      1], 
        carrier:        [1.5,   1,     1,      1,      1,      0.8,    1,      1.3,    1.2,    1.2,    1,      1,      1],
    hexatrap:           [1.3,   1,     1.25,   1,      1,      1,      1,      0.8,    1,      0.5,    1,      1,      1],     
    block:              [1.1,   2,     0.1,    1.5,    2,      1,      1.25,   1.5,    2.5,    1.25,   1,      1,      1.25],
        construct:      [1.3,   1,     1,      0.9,    1,      1,      1,      1,      1.1,    1,      1,      1,      1], 
        boomerang:      [0.8,   1,     1,      1,      0.5,    0.5,    1,      0.75,   0.75,   1.333,  1,      1,      1], 
    over:               [1.25,  1,     1,      0.85,   0.7,    0.8,    1,      1,      0.9,    1,      2,      1,      1], 
        meta:           [1.333, 1,     1,      1,      1,      0.667,  1,      1,      1,      1,      1,      1,      1],   
        weak:           [2,     1,     1,      1,      0.6,    0.6,    0.8,    0.5,    0.7,    0.25,   0.3,    1,      1],   
        master:         [3,     1,     1,      0.7,    0.4,    0.7,    1,      1,      1,      0.1,    0.5,    1,      1], 
        sunchip:        [5,     1,     1,      1.4,    0.5,    0.4,    0.6,    1,      1,      1,      0.8,    1,      1],     
    babyfactory:        [1.5,   1,     1,      1,      1,      1,      1,      1,      1.35,   1,      1,      1,      1], 
    lowpower:           [1,     1,     2,      1,      0.5,    0.5,    0.7,    1,      1,      1,      1,      0.5,    0.7], 
    halfrecoil:         [1,     0.5,   1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    morerecoil:         [1,     1.15,  1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    muchmorerecoil:     [1,     1.35,  1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    lotsmorrecoil:      [1,     1.8,   1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    tonsmorrecoil:      [1,     4,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    doublereload:       [0.5,   1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],  
    morereload:         [0.75,  1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    halfreload:         [2,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    lessreload:         [1.5,   1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    threequartersrof:   [1.333, 1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    morespeed:          [1,     1,     1,      1,      1,      1,      1,      1.3,    1.3,    1,      1,      1,      1], 
    bitlessspeed:       [1,     1,     1,      1,      1,      1,      1,      0.93,   0.93,   1,      1,      1,      1], 
    slow:               [1,     1,     1,      1,      1,      1,      1,      0.7,    0.7,    1,      1,      1,      1], 
    halfspeed:          [1,     1,     1,      1,      1,      1,      1,      0.5,    0.5,    1,      1,      1,      1],
    notdense:           [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      0.1,    1,      1],
    halfrange:          [1,     1,     1,      1,      1,      1,      1,      1,      1,      0.5,    1,      1,      1], 
    fake:               [1,     1,     1,   0.00001, 0.0001,   1,      1,   0.00001,   2,      0,      1,      1,      1], 
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    op:                 [0.5,   1.3,   1,      1,      4,      4,      4,      3,      2,      1,      5,      2,      1],       
    protectorswarm:     [5,  0.000001, 1,      1,      100,    1,      1,      1,      1,     0.5,     5,      1,      10],
    sanc_shield:        [0.5,    0,    1,      4,      100,  -200,   -200,     0 ,      1,      1,      1,      1,      1],
    bonfire:            [9,   1.3,   1,      1,      4,      0.001,      5,      3,      2,      1,      5,      2,   1], 
    hazard:             [5,     0.0001,     2,      10,      20,    5,    1,    2,      7,      5,      2,    2,      10],
    double_damage: [1, 1, 1, 1, 1.8, 1.65, 1, 1, 1, 1, 1, 1, 1],
    smaller: [1, 1, 1, 0.8, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    triple_damage: [1, 1, 1, 1, 2.3, 2, 1, 1, 1, 1, 1, 1, 1],
    quadro_damage: [1, 1, 1, 1, 2.7, 2.65, 1, 1, 1, 1, 1, 1, 1],
    half_damage: [1, 1, 1, 1, 0.6, 0.7, 1, 1, 1, 1, 1, 1, 1],
  // dreadnougth
  aura: [0.0001, 0, 1, 13, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  
  aura2: [0.0001, 0, 1, 34, 1, 1, 1, 1, 1, 1, 1, 1, 1]
};//

const dfltskl = 9;

// NAMES
const statnames = {
    smasher: 1,
    drone: 2,
    necro: 3,
    swarm: 4,
    trap: 5,
    generic: 6,
};
const gunCalcNames = {
    default: 0,
    bullet: 1,
    drone: 2,
    swarm: 3,
    fixedReload: 4,
    thruster: 5,
    sustained: 6,
    necro: 7,
    trap: 8,
};
// ENTITY DEFINITIONS
exports.genericEntity = {
    NAME: '',
    LABEL: 'Unknown Entity',
    TYPE: 'unknown',
    DAMAGE_CLASS: 0, // 0: def, 1: food, 2: tanks, 3: obstacles
    DANGER: 0,
    VALUE: 0,
    SHAPE: 0,
    COLOR: 16,    
    INDEPENDENT: false,
    CONTROLLERS: ['doNothing'],    
    HAS_NO_MASTER: false,
    MOTION_TYPE: 'glide', // motor, swarm, chase
    FACING_TYPE: 'toTarget', // turnWithSpeed, withMotion, looseWithMotion, toTarget, looseToTarget
    DRAW_HEALTH: false,
    DRAW_SELF: true,
    DAMAGE_EFFECTS: true,
    RATEFFECTS: true,
    MOTION_EFFECTS: true,
    INTANGIBLE: false,
    ACCEPTS_SCORE: true,
    GIVE_KILL_MESSAGE: false,
    CAN_GO_OUTSIDE_ROOM: false,
    HITS_OWN_TYPE: 'normal', // hard, repel, never, hardWithBuffer
    DIE_AT_LOW_SPEED: false,
    DIE_AT_RANGE: false,
    CLEAR_ON_MASTER_UPGRADE: false,
    PERSISTS_AFTER_DEATH: false,
    VARIES_IN_SIZE: false,
    HEALTH_WITH_LEVEL: true,
    CAN_BE_ON_LEADERBOARD: true,
    HAS_NO_RECOIL: false,
    AUTO_UPGRADE: 'none',
    BUFF_VS_FOOD: false,
    OBSTACLE: false,
    CRAVES_ATTENTION: false,
    NECRO: false,
    UPGRADES_TIER_1: [],
    UPGRADES_TIER_2: [],
    UPGRADES_TIER_3: [],
    SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    LEVEL: 0,
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
    GUNS: [],
    MAX_CHILDREN: 0,
    BODY: {
        ACCELERATION: 1,
        SPEED: 0,
        HEALTH: 1,
        RESIST: 1,
        SHIELD: 0,
        REGEN: 0,
        DAMAGE: 1,
        PENETRATION: 1,

        RANGE: 0,
        FOV: 1,
        DENSITY: 1,
        STEALTH: 1,
        PUSHABILITY: 1,        
        HETERO: 2,
    },    
    FOOD: {
        LEVEL: -1,
    },
};

// FOOD
exports.food = {
    TYPE: 'food',
    DAMAGE_CLASS: 1,
    CONTROLLERS: ['moveInCircles'],
    HITS_OWN_TYPE: 'repel',
    MOTION_TYPE: 'drift',
    FACING_TYPE: 'turnWithSpeed',
    BODY: {
        STEALTH: 30,
        PUSHABILITY: 1,
    },
    DAMAGE_EFFECTS: false,
    RATEFFECTS: false,
    HEALTH_WITH_LEVEL: false,
};

const basePolygonDamage = 1;
const basePolygonHealth = 2;
exports.hexacontakaienneagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 10,
    },
    LABEL: 'Hexacontakaienneagon',
    VALUE: 30000,
    SHAPE: 69,
    SIZE: 100,
    COLOR: 14,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 80,
        HEALTH: 300 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        SHIELD: 40 * basePolygonHealth,
        REGEN: 0.6,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.biggerPentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 6,
    },
    LABEL: 'Epsilon Pentagon',
    VALUE: 55000,
    SHAPE: 5,
    SIZE: 65,
    COLOR: 14,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 80,
        HEALTH: 900 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        SHIELD: 40 * basePolygonHealth,
        REGEN: 0.6,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};

exports.giantPentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 6,
    },
    LABEL: 'Gamma Pentagon',
    VALUE: 55000,
    SHAPE: 5,
    SIZE: 65,
    COLOR: 14,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 80,
        HEALTH: 900 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        SHIELD: 40 * basePolygonHealth,
        REGEN: 0.6,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.hugePentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 6,
    },
    LABEL: 'Alpha Pentagon',
    VALUE: 15000,
    SHAPE: 5,
    SIZE: 58,
    COLOR: 14,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 80,
        HEALTH: 300 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        SHIELD: 40 * basePolygonHealth,
        REGEN: 0.6,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.hugePentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 5,
    },
    LABEL: 'Alpha Pentagon',
    VALUE: 15000,
    SHAPE: 5,
    SIZE: 58,
    COLOR: 14,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 80,
        HEALTH: 300 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        SHIELD: 40 * basePolygonHealth,
        REGEN: 0.6,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.bigPentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 4,
    },
    LABEL: 'Beta Pentagon',
    VALUE: 2500,
    SHAPE: 5,
    SIZE: 30,
    COLOR: 14,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 30,
        HEALTH: 250 * basePolygonHealth,
        RESIST: Math.pow(1.25, 2),
        SHIELD: 20 * basePolygonHealth,
        REGEN: 0.2,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.pentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 3,
    },
    LABEL: 'Pentagon',
    VALUE: 400,
    SHAPE: 5,
    SIZE: 16,
    COLOR: 14,
    BODY: {
        DAMAGE: 1.5 * basePolygonDamage,
        DENSITY: 8,
        HEALTH: 10 * basePolygonHealth,
        RESIST: 1.25,
        PENETRATION: 1.1,
    },
    DRAW_HEALTH: true,
};
exports.triangle = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 2,
    },
    LABEL: 'Triangle',
    VALUE: 120,
    SHAPE: 3,
    SIZE: 9,
    COLOR: 2,
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 6,
        HEALTH: 3 * basePolygonHealth,
        RESIST: 1.15,
        PENETRATION: 1.5,
    },
    DRAW_HEALTH: true,
};
exports.square = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 1,
    },
    LABEL: 'Square',
    VALUE: 30,
    SHAPE: 4,
    SIZE: 10,
    COLOR: 13,
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 4,
        HEALTH: basePolygonHealth,
        PENETRATION: 2,
    },
    DRAW_HEALTH: true, 
    INTANGIBLE: false,// let it
};
exports.egg = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 0,
    },
    LABEL: 'Egg',
    VALUE: 10,
    SHAPE: 0,
    SIZE: 5,
    COLOR: 6,
    INTANGIBLE: true,
    BODY: {
        DAMAGE: 0,
        DENSITY: 2,
        HEALTH: 0.0011,
        PUSHABILITY: 0,
    },
    DRAW_HEALTH: false,
};

exports.greenhexacontakaienneagon = {
    PARENT: [exports.food],
    LABEL: 'Green Hexacontakaienneagon',
    VALUE: 69000000, //we keep this polygon lets work on the boss
    SHAPE: 69,
    SIZE: 0,
    COLOR: 1,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 80,
        HEALTH: 300 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        SHIELD: 40 * basePolygonHealth,
        REGEN: 0.6,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.greenpentagon = {
    PARENT: [exports.food],
    LABEL: 'Pentagon',
    VALUE: 30000,
    SHAPE: 5,
    SIZE: 16,
    COLOR: 1,
    BODY: {
        DAMAGE: 3,
        DENSITY: 8,
        HEALTH: 200,
        RESIST: 1.25,
        PENETRATION: 1.1,
    },
    DRAW_HEALTH: true,
};
exports.greentriangle = {
    PARENT: [exports.food],
    LABEL: 'Triangle',
    VALUE: 7000,
    SHAPE: 3,
    SIZE: 9,
    COLOR: 1,
    BODY: {
        DAMAGE: 1,
        DENSITY: 6,
        HEALTH: 60,
        RESIST: 1.15,
        PENETRATION: 1.5,
    },
    DRAW_HEALTH: true,
};
exports.greensquare = {
    PARENT: [exports.food],
    LABEL: 'Square',
    VALUE: 2000,
    SHAPE: 4,
    SIZE: 10,
    COLOR: 1,
    BODY: {
        DAMAGE: 0.5,
        DENSITY: 4,
        HEALTH: 20,
        PENETRATION: 2,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
};

exports.gem = {
    PARENT: [exports.food],
    LABEL: 'Gem',
    VALUE: 2000,
    SHAPE: 6,
    SIZE: 5,
    COLOR: 0,
    BODY: {
        DAMAGE: basePolygonDamage/4,
        DENSITY: 4,
        HEALTH: 10,
        PENETRATION: 2,
        RESIST: 2,
        PUSHABILITY: 0.25,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
};
exports.greenbiggerpentagon = {
    PARENT: [exports.food],
    LABEL: 'Epsilon Pentagon',
    VALUE: 7550000,
    SHAPE: 5,
    SIZE: 65,
    COLOR: 1,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 80,
        HEALTH: 900 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        SHIELD: 40 * basePolygonHealth,
        REGEN: 0.6,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};

exports.greengiantpentagon = {
    PARENT: [exports.food],
    LABEL: 'Gamma Pentagon',
    VALUE: 5590000,
    SHAPE: 5,
    SIZE: 58,
    COLOR: 1,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 80,
        HEALTH: 900 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        SHIELD: 40 * basePolygonHealth,
        REGEN: 0.6,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.greenhugepentagon = {
    PARENT: [exports.food],
    LABEL: 'Alpha Pentagon',
    VALUE: 150000,
    SHAPE: 5,
    SIZE: 45,
    COLOR: 1,
    BODY: {
        DAMAGE: 3,
        DENSITY: 8,
        HEALTH: 800,
        RESIST: 1.25,
        PENETRATION: 1.1,
    },
    FOOD: {
      LEVEL: 3
    },
    DRAW_HEALTH: true,
};
exports.greenbigpentagon = {
    PARENT: [exports.food],
    LABEL: 'Beta Pentagon',
    VALUE: 90000,
    SHAPE: 5,
    SIZE: 36,
    COLOR: 1,
    BODY: {
        DAMAGE: 3,
        DENSITY: 8,
        HEALTH: 500,
        RESIST: 1.25,
        PENETRATION: 1.1,
    },
    FOOD: {
      LEVEL: 3
    },
    DRAW_HEALTH: true,
};
exports.greenpentagon = {
    PARENT: [exports.food],
    LABEL: 'Pentagon',
    VALUE: 30000,
    SHAPE: 5,
    SIZE: 16,
    COLOR: 1,
    BODY: {
        DAMAGE: 3,
        DENSITY: 8,
        HEALTH: 200,
        RESIST: 1.25,
        PENETRATION: 1.1,
    },
    FOOD: {
      LEVEL: 3
    },
    DRAW_HEALTH: true,
};
exports.greentriangle = {
    PARENT: [exports.food],
    LABEL: 'Triangle',
    VALUE: 7000,
    SHAPE: 3,
    SIZE: 9,
    COLOR: 1,
    BODY: {
        DAMAGE: 1,
        DENSITY: 6,
        HEALTH: 60,
        RESIST: 1.15,
        PENETRATION: 1.5,
    },
    FOOD: {
      LEVEL: 2
    },
    DRAW_HEALTH: true,
}; 
exports.greensquare = {
    PARENT: [exports.food],
    LABEL: 'Square',
    VALUE: 2000,
    SHAPE: 4,
    SIZE: 10,
    COLOR: 1,
    BODY: {
        DAMAGE: 0.5,
        DENSITY: 4,
        HEALTH: 20,
        PENETRATION: 2,
    },
    FOOD: {
      LEVEL: 1
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false, 
};
exports.giantPentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 6,
    },
    LABEL: 'Gamma Pentagon',
    VALUE: 55000,
    SHAPE: 5,
    SIZE: 65,
    COLOR: 14,
    RADIANT: 1,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 80,
        HEALTH: 900 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        SHIELD: 40 * basePolygonHealth,
        REGEN: 0.6,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.radianthugePentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 13, 
    },
    LABEL: 'Radiant Alpha Pentagon',
    VALUE: 15000,
    SHAPE: 5,
    RADIANT: 1,
    SIZE: 10,
    COLOR: 13,
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 4,
        HEALTH: basePolygonHealth,
        PENETRATION: 2,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
    GIVE_KILL_MESSAGE: true
};
exports.radiantbetaPentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 12,
    },
    LABEL: 'Radiant Beta Pentagon',
    VALUE: 2500,
    SHAPE: 5,
    RADIANT: 1,
    SIZE: 10,
    COLOR: 13,
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 4,
        HEALTH: basePolygonHealth,
        PENETRATION: 2,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
    GIVE_KILL_MESSAGE: true
};
exports.radiantpentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 11,
    },
    LABEL: 'Radiant Pentagon',
    VALUE: 400,
    SHAPE: 5,
    RADIANT: 1,
    SIZE: 10,
    COLOR: 13,
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 4,
        HEALTH: basePolygonHealth,
        PENETRATION: 2,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
    GIVE_KILL_MESSAGE: true
};
exports.radianttriangle = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 10,
    },
    LABEL: 'Radiant Triangle',
    VALUE: 120,
    SHAPE: 3,
    RADIANT: 1,
    SIZE: 10,
    COLOR: 13,
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 4,
        HEALTH: basePolygonHealth,
        PENETRATION: 2,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
    GIVE_KILL_MESSAGE: true
};
exports.radiantsquare = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 9,
    },
    LABEL: 'Radiant Square',
    VALUE: 30,
    SHAPE: 4,
    RADIANT: 1,
    SIZE: 10,
    COLOR: 13,
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 4,
        HEALTH: basePolygonHealth,
        PENETRATION: 2,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
    GIVE_KILL_MESSAGE: true,
};
exports.obstacle = {
    TYPE: 'wall',
    DAMAGE_CLASS: 1,
    LABEL: 'Rock',
    FACING_TYPE: 'turnWithSpeed',
    SHAPE: -9,
    BODY: {
        PUSHABILITY: 0,
        HEALTH: 10000,
        SHIELD: 10000,
        REGEN: 1000,
        DAMAGE: 1,
        RESIST: 100,
        STEALTH: 1,
    },
    VALUE: 0,
    SIZE: 60,
    COLOR: 16,
    VARIES_IN_SIZE: true,
    GIVE_KILL_MESSAGE: true,
    ACCEPTS_SCORE: false,
};
exports.mazeWall = {
  PARENT: [exports.obstacle],
  HITS_OWN_TYPE: 'none',
  BODY: {
    PUSHABILITY: 0,
    HEALTH: 10000,
    SHIELD: 10000,
    REGEN: 1000,
    DAMAGE: 1,
    RESIST: 100,
    STEALTH: 1,
  },
  SHAPE: 4,
  LABEL: 'Wall'
}
    exports.babyObstacle = {
        PARENT: [exports.obstacle],
        SIZE: 25,
        SHAPE: -7,
        LABEL: "Gravel",
    };

// WEAPONS
const wepHealthFactor = 0.5;
const wepDamageFactor = 1.5;
exports.bullet = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.squarebullet = {
    LABEL: 'Square Bullet',
    SHAPE: 4,
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.shield = {
  PARENT: [exports.bullet],
  MOTION_TYPE: 'shield'
}
    exports.casing = {
        PARENT: [exports.bullet],
        LABEL: 'Shell',
        TYPE: 'swarm',
    };

exports.monsterbullet = {
    LABEL: 'Monster Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    SHAPE: 4,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  28,     18,      -1.8,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.squarebullet,
        }, }, 
    ],
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.shield = {
  PARENT: [exports.bullet],
  MOTION_TYPE: 'shield'
}
    exports.casing = {
        PARENT: [exports.bullet],
        LABEL: 'Shell',
        TYPE: 'swarm',
    };

exports.swarm = {
    LABEL: 'Swarm Drone',
    TYPE: 'swarm',
    ACCEPTS_SCORE: false,
    SHAPE: 3,
    MOTION_TYPE: 'swarm',
    FACING_TYPE: 'smoothWithMotion',
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    CRAVES_ATTENTION: true,
    BODY: {
        ACCELERATION: 3,
        PENETRATION: 1.5,
        HEALTH: 0.35 * wepHealthFactor,
        DAMAGE: 1.5 * wepDamageFactor,
        SPEED: 4.5,
        RESIST: 1.6,
        RANGE: 225,
        DENSITY: 12,
        PUSHABILITY: 0.5,
        FOV: 1.5,
    },
    DIE_AT_RANGE: true,
    BUFF_VS_FOOD: true,
};
    exports.bee = {
        PARENT: [exports.swarm],
        PERSISTS_AFTER_DEATH: true, 
        SHAPE: 4, 
        LABEL: 'Drone',
        HITS_OWN_TYPE: 'hardWithBuffer',
    };
    exports.wasp = {
      PARENT: [exports.bee],
      SHAPE: 5,
    }
    exports.autoswarm = {
        PARENT: [exports.swarm],
        AI: { FARMER: true, },
        INDEPENDENT: true,
    };
exports.trapP = {
    LABEL: 'Thrown Trap',
    TYPE: 'trap',
    ACCEPTS_SCORE: false,
    SHAPE: 4, 
    MOTION_TYPE: 'glide', // def
    FACING_TYPE: 'turnWithSpeed',
    HITS_OWN_TYPE: 'trap',
    DIE_AT_RANGE: true,
    BODY: {
        HEALTH: 1 * wepHealthFactor,
        DAMAGE: 2 * wepDamageFactor,
        RANGE: 450,
        DENSITY: 2.5,
        RESIST: 2.5,
        SPEED: 0,
    },
};
exports.trap2 = {
    LABEL: 'Thrown Trap',
    ACCEPTS_SCORE: false,
    SHAPE: -3, 
    MOTION_TYPE: 'glide', // def
    FACING_TYPE: 'turnWithSpeed',
    HITS_OWN_TYPE: 'push',
    DIE_AT_RANGE: true,
    BODY: {
        HEALTH: 1 * wepHealthFactor,
        DAMAGE: 2 * wepDamageFactor,
        RANGE: 450,
        DENSITY: 2.5,
        RESIST: 2.5,
        SPEED: 0,
    },
};
    exports.trap = {
      LABEL: 'Thrown Trap',
      ACCEPTS_SCORE: false,
      SHAPE: -3, 
      MOTION_TYPE: 'glide', // def
      FACING_TYPE: 'turnWithSpeed',
      HITS_OWN_TYPE: 'repel',
      DIE_AT_RANGE: true,
      BODY: {
          HEALTH: 1 * wepHealthFactor,
          DAMAGE: 2 * wepDamageFactor,
          RANGE: 450,
          DENSITY: 2.5,
          RESIST: 2.5,
          SPEED: 0,
      },
    };
    exports.boomerang = {
        LABEL: 'Boomerang',
        PARENT: [exports.trap],
        CONTROLLERS: ['boomerang'],
        MOTION_TYPE: 'motor',  
        HITS_OWN_TYPE: 'never',
        SHAPE: -5,
        BODY: {
            SPEED: 1.25,
            RANGE: 120,
        },
    };
exports.block = {
    LABEL: 'Set Trap',
    PARENT: [exports.trap],
    SHAPE: -4,
    MOTION_TYPE: 'motor',
    BODY: {
        SPEED: 0.3,
        DENSITY: 8,
    },
};
exports.drone = {
    LABEL: 'Drone',
    TYPE: 'drone',
    ACCEPTS_SCORE: false,
    DANGER: 2,
    CONTROL_RANGE: 0,
    SHAPE: 3,
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'canRepel',
        'mapTargetToGoal',
        'hangOutNearMaster'
    ],
    AI: { BLIND: true, },
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.05,
        HEALTH: 0.6 * wepHealthFactor,
        DAMAGE: 1.25 * wepDamageFactor,
        SPEED: 3.8,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.8,
    },
    HITS_OWN_TYPE: 'hard',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
};
exports.autodrone = {
  PARENT: [exports.drone],
  INDEPENDENT: true,
  BODY: {
    SPEED: 1.4,
  },
};
exports.paladindrone = {
  PARENT: [exports.autodrone],
  SHAPE: 5,
  BODY: {
    HEALTH: 3,
    DAMAGE: 2.5,
  },
};
    exports.sunchip = {
        PARENT: [exports.drone],
        SHAPE: 4,
        NECRO: true,
        HITS_OWN_TYPE: 'hard',
        BODY: {
            FOV: 0.5,
        },
        AI: {
            BLIND: true,
            FARMER: true,
        },
        DRAW_HEALTH: false,
    };
    exports.autosunchip = {
        PARENT: [exports.sunchip],
        AI: {
            BLIND: true,
            FARMER: true,
        },
        INDEPENDENT: true,
    };
    exports.gunchip = {
        PARENT: [exports.drone],
        SHAPE: -2,
        NECRO: true,
        HITS_OWN_TYPE: 'hard',
        BODY: {
            FOV: 0.5,
        },
        AI: {
            BLIND: true,
            FARMER: true,
        },
        DRAW_HEALTH: false,
    };
exports.rocketeerMissile = {
    PARENT: [exports.bullet],
    LABEL: "Missile",
    BODY: {
        RANGE: 360,
    },
    GUNS: [
        {
            POSITION: [16.5, 10, 1.5, 0, 0, 180, 7.5],
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([
                    g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed
                ]),
                TYPE: [
                    exports.bullet,
                    {
                        PERSISTS_AFTER_DEATH: true,
                    },
                ],
                STAT_CALCULATOR: gunCalcNames.thruster,
            },
        },
    ],
};
exports.missile = {
    PARENT: [exports.bullet],
    LABEL: 'Missile',
    INDEPENDENT: true,
    BODY: {
        RANGE: 120,
    },  
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  14,     6,      1,      0,     -2,     130,     0,   ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            }, }, {
        POSITION: [  14,     6,      1,      0,      2,     230,     0,  ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,    
            }, }, 
    ],
};
exports.minimissile = {
    PARENT: [exports.bullet],
    LABEL: 'Missile',
    INDEPENDENT: true,
    BODY: {
        RANGE: 120,
    },  
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  14,     6,      1,      0,     0,     180,     0,   ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            }, }
    ],
};

exports.homingMiniMissile = {
    PARENT: [exports.bullet],
    LABEL: 'Missile',
    CONTROLLERS: ['mapTargetToGoal', 'canRepel', 'nearestDifferentMaster'], // TACTICAL NUKE INCOMING! =)
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    INDEPENDENT: true,
    BODY: {
        RANGE: 280,
    },  
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  14,     6,      1,      0,     0,     180,     0,   ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            }, }
    ],
}

    exports.twistermissile = {
      PARENT: [exports.missile],
      FACING_TYPE: 'turnWithSpeed',
      GUNS: [ {
          POSITION: [ 14, 6, 1.3, 0, 0, 90, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.lowpower]),
            TYPE: exports.bullet,
            AUTOFIRE: true
          }
        },{
          POSITION: [ 14, 6, 1.3, 0, 0, 270, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.lowpower]),
            TYPE: exports.bullet,
            AUTOFIRE: true
          }
        }
      ]
    }
    exports.hypermissile = {
        PARENT: [exports.missile],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,     6,      1,      0,     -2,     150,     0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                    STAT_CALCULATOR: gunCalcNames.thruster,
                }, }, {
            POSITION: [  14,     6,      1,      0,      2,     210,     0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                    STAT_CALCULATOR: gunCalcNames.thruster,
                }, }, {        
            POSITION: [  14,     6,      1,      0,     -2,      90,    0.5,  ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, }, {
            POSITION: [  14,     6,      1,      0,      2,     270,    0.5,  ],  
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, },
        ],
    };
    exports.snake = {
        PARENT: [exports.bullet],
        LABEL: 'Snake',
        INDEPENDENT: true,
        BODY: {
            RANGE: 120,
        },  
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,    12,     1.4,     8,      0,     180,    0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    STAT_CALCULATOR: gunCalcNames.thruster,
                    SHOOT_SETTINGS: combineStats([
                        g.basic, g.sniper, g.hunter, g.hunter2, g.snake, g.snakeskin,
                    ]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, }, {
            POSITION: [  10,    12,     0.8,     8,      0,     180,   0.5,  ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    NEGATIVE_RECOIL: true,
                    STAT_CALCULATOR: gunCalcNames.thruster,
                    SHOOT_SETTINGS: combineStats([
                        g.basic, g.sniper, g.hunter, g.hunter2, g.snake,
                    ]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, },
        ],
    };
    exports.hive = {
        PARENT: [exports.bullet],
        LABEL: 'Hive',
        BODY: {
            RANGE: 90,
            FOV: 0.5,
        },  
        FACING_TYPE: 'turnWithSpeed',
        INDEPENDENT: true,
        CONTROLLERS: ['alwaysFire', 'nearestDifferentMaster', 'targetSelf',],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    9.5,    0.6,     7,      0,      108,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,    
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      180,    0.2,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      252,    0.4,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      324,    0.6,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      36,     0.8,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, 
        ],
    };
    exports.whive = {
      PARENT: [exports.hive],
      LABEL: 'Wasp Hive',
      GUNS: (()=> {
        let wgn = [] // wasp guns
        for (let i = 0; i < 6; i++) {
          wgn.push({
            POSITION: [7, 9, 0.6, 7, 0, (360 * i) / 6, 0 + ((i/10)/2)*2],
            PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.wasps]),
              TYPE: exports.wasp,
              COLOR_OVERRIDE: 3,
              STAT_CALCULATOR: gunCalcNames.swarm
            }
          })
        }
        return wgn
      })()
    }

// TANK CLASSES
const base = {
    ACCEL: 1.6,
    SPEED: 5.25,
    HEALTH: 20,
    DAMAGE: 3,
    RESIST: 1,
    PENETRATION: 1.05,
    SHIELD: 8,
    REGEN: 0.025,
    FOV: 1,
    DENSITY: 0.5,
};
var polygons = []
for (let i = 0; i < 514; i++) {
    polygons.push(
        exports[`polygon${i}`] = {
            PARENT: [exports.food],
                FOOD: {
                    LEVEL: 1,
                },
                LABEL: `${i+3}-Gon`,
                VALUE: 10 * Math.pow(5, i),
                SHAPE: 3+i,
                SIZE: 10 * Math.pow(1.35, i),
                COLOR: 37,
                BODY: {
                    ACCELERATION: 0.0035 / i,
                    DAMAGE: 2,
                    DENSITY: 4,
                    HEALTH: 10 * Math.pow(2, i),
                    PENETRATION: 2,
                    REGEN: base.REGEN * 0.000001
                },
                DRAW_HEALTH: true, 
                INTANGIBLE: false,// let it
        }
    )
}
polygons
exports.genericTank = {
    LABEL: 'Unknown Class',
    TYPE: 'tank',
    DAMAGE_CLASS: 2,
    DANGER: 5,
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'toTarget',
    SIZE: 12,
    HITS_OWN_TYPE: 'tank',
    MAX_CHILDREN: 0,   
    DAMAGE_EFFECTS: false,
    BODY: { // def
        ACCELERATION: base.ACCEL,
        SPEED: base.SPEED,
        HEALTH: base.HEALTH, 
        DAMAGE: base.DAMAGE, 
        PENETRATION: base.PENETRATION, 
        SHIELD: base.SHIELD,
        REGEN: base.REGEN,
        FOV: base.FOV,
        DENSITY: base.DENSITY,
        PUSHABILITY: 0.9,
        HETERO: 3,
    },
    GUNS: [],
    TURRETS: [],
    GIVE_KILL_MESSAGE: true,
    DRAW_HEALTH: true,
};
let gun = { };

exports.trapTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    AUTOFIRE: true,
    BODY: {
        FOV: 0.5,
    },
    INDEPENDENT: true,
    CONTROLLERS: ['nearestDifferentMaster'], 
    COLOR: 16,
    AI: {
        SKYNET: true,
        FULL_VIEW: true,
    },
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  16,    14,      1,      0,      0,      0,      0,   ],
            }, {
        POSITION: [   4,    14,     1.8,    16,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trapturret, g.lowpower, g.fast, g.halfreload, g.halfreload, g.halfreload]),
                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap, AUTOFIRE: true
            }, },
    ],
};
exports.abyssTrapTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    AUTOFIRE: true,
    BODY: {
        FOV: 0.5,
    },
    INDEPENDENT: true,
    CONTROLLERS: ['nearestDifferentMaster'], 
    COLOR: 16,
    AI: {
        SKYNET: true,
        FULL_VIEW: true,
    },
    GUNS: [ {
      POSITION: [14, 13, 1, 0, 0, 0, 0]
    }, {
      POSITION: [3, 13, 1.4, 12, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.abysstrap, g.pound]),
        TYPE: exports.trap, AUTOFIRE: true
      }
    }
  ]
};
exports.autoTurret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 2,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret]),
                TYPE: exports.bullet,
            }, }
    ],
};

exports.machineAutoTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        COLOR: 16,
        //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,    11,     1.3,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.mach, g.slow]),
                    TYPE: exports.bullet,
                }, },
        ],
    };
    exports.autoSmasherTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        COLOR: 16,
        //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     6,      1,      0,      5,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.fast, g.mach, g.pound, g.morereload, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, }, {
            POSITION: [  20,     6,      1,      0,     -5,      0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.fast, g.mach, g.pound, g.morereload, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, },
        ],
    };
    exports.oldAutoSmasherTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        COLOR: 16,
        //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     7,      1,      0,    -5.75,    0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.lotsmorrecoil, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, }, {            
            POSITION: [  20,     7,      1,      0,     5.75,    0,     0.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.lotsmorrecoil, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, },
        ],
    };

exports.auto3gun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto]),
                TYPE: exports.bullet,
            }, }
    ],
};
    exports.auto5gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 3,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    11,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.five]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.heavy3gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 2,
            SPEED: 0.9,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  22,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.auto]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.masterGun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 3,
        },
        CONTROLLERS: ['nearestDifferentMaster'], 
        COLOR: 16,
        MAX_CHILDREN: 6,
        AI: {
            NO_LEAD: true,
            SKYNET: true,
            FULL_VIEW: true,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   8,     14,    1.3,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.master]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
    exports.sniper3gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 5,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  27,     9,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.auto, g.assass, g.autosnipe]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [   5,     9,     -1.5,    8,      0,      0,      0,   ], 
            },
        ],
    };
    exports.bansheegun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        INDEPENDENT: true,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  26,    10,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.lessreload]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.auto4gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 2,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  16,     4,      1,      0,    -3.5,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,     3.5,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.bigauto4gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,     5,      1,      0,    -4.5,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  14,     5,      1,      0,     4.5,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     5,      1,      0,      0,      0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }
        ],
    };

exports.tritrapgun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  20,    16,      1,      0,      0,      0,      0,   ], 
        }, {
        POSITION: [   2,    16,     1.1,     20,     0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.auto]),
                TYPE: exports.block,
            }, },
    ],
};
exports.smasherBody = {
    LABEL: '',
    CONTROLLERS: ['spin'], 
    COLOR: 9,
    SHAPE: 6,
    INDEPENDENT: true,
};
exports.spikeBody = {
    LABEL: '',
    CONTROLLERS: ['spin'],
    COLOR: 9,
    SHAPE: -4,
    INDEPENDENT: true,
};
    exports.spikeBody1 = {
        LABEL: '',
        CONTROLLERS: ['fastspin'], 
        COLOR: 9,
        SHAPE: 3,
        INDEPENDENT: true,
    };
    exports.spikeBody2 = {
        LABEL: '',
        CONTROLLERS: ['reversespin'], 
        COLOR: 9,
        SHAPE: 3,
        INDEPENDENT: true,
    };
exports.megasmashBody = {
    LABEL: '',
    CONTROLLERS: ['spin'], 
    COLOR: 9,
    SHAPE: -6,
    INDEPENDENT: true,
};
exports.dominationBody = {
    LABEL: '',
    CONTROLLERS: ['dontTurn'], 
    COLOR: 9,
    SHAPE: 6,
    INDEPENDENT: true,
};
    exports.baseSwarmTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Protector',
        COLOR: 16,
        BODY: {
            FOV: 2,
        },
        CONTROLLERS: ['nearestDifferentMaster'], 
        AI: {
            NO_LEAD: true,
            LIKES_SHAPES: true,
        },
        INDEPENDENT: true,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   5,    4.5,    0.6,     7,      2,      0,     0.15, ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                    TYPE: exports.swarm,
                    STAT_CALCULATOR: gunCalcNames.swarm,          
                }, }, {
            POSITION: [   5,    4.5,    0.6,     7,     -2,      0,     0.15, ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                    TYPE: exports.swarm,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, {
            POSITION: [   5,    4.5,    0.6,    7.5,     0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                    TYPE: [exports.swarm, { INDEPENDENT: true, AI: { LIKES_SHAPES: true, }, }, ],
                    STAT_CALCULATOR: gunCalcNames.swarm,  
            }, }
        ],
    };
    exports.baseGunTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Protector',
        BODY: {
            FOV: 5,
        },
        ACCEPTS_SCORE: false,
        CONTROLLERS: ['nearestDifferentMaster'], 
        INDEPENDENT: true,
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  12,    12,     1,       6,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.destroy]),
                    TYPE: exports.bullet,          
                }, }, {
            POSITION: [  11,    13,     1,       6,      0,      0,     0.1,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.destroy]),
                    TYPE: exports.bullet,          
                }, }, {
            POSITION: [   7,    13,    -1.3,     6,      0,      0,      0,   ],
                }
        ],
    };
        exports.baseProtector = {
            PARENT: [exports.genericTank],
            LABEL: 'Base',
            SIZE: 64,
            DAMAGE_CLASS: 0,
            ACCEPTS_SCORE: false,
            SKILL: skillSet({ 
                rld: 1,
                dam: 1,
                pen: 1,
                spd: 1,
                str: 1,
            }),
            BODY: { // def
                SPEED: 0,
                HEALTH: 10000, 
                DAMAGE: 10, 
                PENETRATION: 0.25, 
                SHIELD: 1000,
                REGEN: 100,
                FOV: 1,
                PUSHABILITY: 0,
                HETERO: 0,
            },
            //CONTROLLERS: ['nearestDifferentMaster'],
            FACING_TYPE: 'autospin',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  25,     0,      0,      0,     360,  0], 
                    TYPE: exports.dominationBody,
                        }, {
                POSITION: [  12,     7,      0,      45,     100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     135,    100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     225,    100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     315,    100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        },
            ],
            GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,      45,     0,   ], }, {   
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     135,     0,   ], }, {   
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     225,     0,   ], }, {   
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     315,     0,   ], }, {
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,      45,     0,   ], }, {   
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     135,     0,   ], }, {   
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     225,     0,   ], }, {   
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     315,     0,   ], }, 
            ],
        };

exports.minion = {
    PARENT: [exports.genericTank],
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.5,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     9,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minion]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, 
    ],
};
exports.pillboxTurret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    11,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.turret, g.power, g.auto, g.notdense]),
                TYPE: exports.bullet,
            }, },
    ],
};
exports.pillbox = {
    LABEL: 'Pillbox',
    PARENT: [exports.trap],
    SHAPE: 4,
    MOTION_TYPE: 'motor',
    INDEPENDENT: true,
    HAS_NO_RECOIL: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true, 
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1], 
            TYPE: exports.auto5gun,
        }
    ]
};
exports.elitepillbox = {
    LABEL: 'Pillbox',
    PARENT: [exports.trap],
    SHAPE: 4,
    MOTION_TYPE: 'motor',
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true, 
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1], 
            TYPE: exports.pillboxTurret,
        }
    ]
};
exports.skimturret = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: base.FOV * 2,
    },
    COLOR: 2,
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    LABEL: '',
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  10,    14,    -0.5,     9,      0,      0,      0,  ], 
             }, {
        POSITION: [  17,    15,      1,      0,      0,      0,      0,  ], 
               PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
                TYPE: exports.hypermissile,
            },
            },
    ],
};

exports.twisterturret = {
  PARENT: [exports.autoTurret],
  LABEL: 'Twister',
  BODY: {
    FOV: 2
  },
  GUNS: [
    {
      POSITION: [18, 9.5, 1.2, 0, 0, 0, 0]
    },
    {
      POSITION: [16, 20, 0.6, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.skim]),
        TYPE: exports.twistermissile
      }
    },
  ]
}


// non working function //
// function gunBulletType(type, options = {}) {
//   let choice = {type: exports.bullet}
//   if (options.type != null) {choice.type = options.type}
//   switch (choice) {
//     case 'bullet':
//       choice.type = {type: exports.bullet}
//       break;
//     case 'drone':
//       choice.type = {type: exports.drone}
//       break;
//     case 'necrod':
//       choice.type = {type: exports.sunchip}
//       break;
//     case 'missile':
//       choice.type = {type: exports.missile}
//       break;
//     case 'swarm':
//       choice.type = {type: exports.swarm}
//       break;
//   }
// }

function makeAuto(type, name = -1, options = {}) {
    let turret = { type: exports.autoTurret, size: 10, independent: true, };
    if (options.type != null) { turret.type = options.type; }
    if (options.size != null) { turret.size = options.size; }
    if (options.independent != null) { turret.independent = options.independent; }
    
    let output = JSON.parse(JSON.stringify(type));
    let autogun = {
        /*********  SIZE               X       Y     ANGLE    ARC */
        POSITION: [  turret.size,     0,      0,     180,    360,  1,], 
        TYPE: [turret.type, { CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: turret.independent, }],
    };
    if (type.GUNS != null) { output.GUNS = type.GUNS; }
    if (type.TURRETS == null) { output.TURRETS = [autogun]; }
    else { output.TURRETS = [...type.TURRETS, autogun]; }
    if (name == -1) { output.LABEL = 'Auto-' + type.LABEL; } else { output.LABEL = name; }
    output.DANGER = type.DANGER + 1;
    return output;
}
function makeHybrid(type, name = -1) {
    let output = JSON.parse(JSON.stringify(type));
    let spawner = { 
        /********* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [   7,     12,    1.2,     8,      0,     180,     0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.weak]),
            TYPE: [exports.drone, { INDEPENDENT: true, }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: false,    
            MAX_CHILDREN: 3,
        }, };
    if (type.TURRETS != null) { output.TURRETS = type.TURRETS; }
    if (type.GUNS == null) { output.GUNS = [spawner]; }
    else { output.GUNS = [...type.GUNS, spawner]; }
    if (name == -1) { output.LABEL = 'Hybrid ' + type.LABEL; } else { output.LABEL = name; }
    return output;
}
function gunType(type, ...j) {
  switch (type) {
    case "Gun": {
      return {
        POSITION: [j[0], j[1], j[2], j[3], j[4], j[5], j[6]],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats(j[7]),
          TYPE: j[8],
          AUTOFIRE: j[9]
        }
      }
    } break;
    case "Spawner": {
      return {
        POSITION: [j[0], j[1], j[2], j[3], j[4], j[5], j[6]],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats(j[7]),
          TYPE: j[8],
          AUTOFIRE: j[9],
          MAX_CHILDREN: j[10]
        }
      }
    } break;
    case "Empty": {
      return {
        POSITION: [j[0], j[1], j[2], j[3], j[4], j[5], j[6]],
      }
    } break;
    default: {return "ERR: Not a gun! Define a defined type!"}
  }
}
exports.ceptionB = {
  PARENT: [exports.bullet],
  GUNS: [
    gunType("Gun", 18, 8, 1, 0, 0, 0, 0, [g.basic], exports.bullet, true)
  ]  
}
exports.ceptionT = {
  PARENT: [exports.trap],
  GUNS: [
    gunType("Gun", 18, 8, 1, 0, 0, 0, 0, [g.basic], exports.bullet, true)
  ]  
}
// TANKS
exports.basic = {
    PARENT: [exports.genericTank],
    LABEL: 'Basic',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
            COLOR_OVERRIDE: null        // use color value (0 for gem 1 for green 2 for zaphkiel/triangle color)
        }, }, 
    ],
};
exports.basicCeption = {
  PARENT: [exports.genericTank],
  LABEL: 'Basic Ception',
  GUNS: [
    gunType("Gun", 18, 8, 1, 0, 0, 0, 0, [g.basic], exports.ceptionB)
  ] 
}
exports.sniperCeption = {
  PARENT: [exports.genericTank],
  LABEL: 'Sniper Ception',
  BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
  GUNS: [
    gunType("Gun", 24.5, 8, 1, 0, 0, 0, 0, [g.basic, g.sniper], exports.ceptionB)
  ] 
}
exports.twinCeption = {
  PARENT: [exports.genericTank],
  LABEL: 'Twin Ception',
  GUNS: [
    gunType("Gun", 18, 8, 1, 0, 5.5, 0, 0, [g.basic], exports.ceptionB),
    gunType("Gun", 18, 8, 1, 0, -5.5, 0, 0.5, [g.basic], exports.ceptionB)
  ] 
}
exports.trapCeption = {
  PARENT: [exports.genericTank],
  LABEL: 'Trapper Ception',
  GUNS: [
    gunType("Empty", 13, 8, 1, 0, 0, 0, 0),
    gunType("Gun", 3, 8, 1.7, 13, 0, 0, 0, [g.basic], exports.ceptionT),
  ] 
}
exports.triTrapCeption = {
  PARENT: [exports.genericTank],
  LABEL: 'Tri-Trapper Ception',
  GUNS: [
    gunType("Empty", 13, 8, 1, 0, 0, 0, 0),
    gunType("Gun", 3, 8, 1.7, 13, 0, 0, 0, [g.basic], exports.ceptionT),

    gunType("Empty", 13, 8, 1, 0, 0, 120, 0),
    gunType("Gun", 3, 8, 1.7, 13, 0, 120, 0, [g.basic], exports.ceptionT),

    gunType("Empty", 13, 8, 1, 0, 0, 240, 0),
    gunType("Gun", 3, 8, 1.7, 13, 0, 240, 0, [g.basic], exports.ceptionT),
  ] 
}
exports.testbedShell = {
  PARENT: [exports.genericTank],
  SHAPE: 9,
  COLOR: 17
}
exports.anniturret = {
  PARENT: [exports.genericTank],
  LABEL: '',
  GUNS: [
    {
      POSITION: [20.5, 19.5, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni]),
        TYPE: exports.bullet
      }
    }
  ]
}
        exports.testbed = {
            PARENT: [exports.genericTank],
            LABEL: 'Developer',
            RESET_UPGRADES: true,
            LEVEL: 45,
            BODY: { // def
                SHIELD: 1000,
                REGEN: 10000000,
                HEALTH: 100000000,
                DAMAGE: 10,
                DENSITY: 20,
                FOV: 1,
            },
            SHAPE: 9,
            SIZE: 25,
            FACING_TYPE: 'autospin',
            TURRETS: [
              {
                POSITION: [23, 0, 0, 0, 0, 0],
                TYPE: exports.testbedShell
              }, {
                POSITION: [11, 0, 0, 0, 360, 1],
                TYPE: exports.anniturret
              }
            ]
        };
        exports.testbedP = {
            PARENT: [exports.genericTank],
            LABEL: 'Developer',
            RESET_UPGRADES: true,
            LEVEL: 45,
            BODY: { // def
                SHIELD: 1000,
                REGEN: 10000000,
                HEALTH: 100000000,
                DAMAGE: 10,
                DENSITY: 20,
                FOV: 2,
            },
            SHAPE: 9,
            SIZE: 25,
            FACING_TYPE: 'autospin',
            TURRETS: [
              {
                POSITION: [23, 0, 0, 0, 0, 0],
                TYPE: exports.testbedShell
              }, {
                POSITION: [11, 0, 0, 0, 360, 1],
                TYPE: exports.anniturret
              }
            ]
        };
       exports.testbed2 = {
            PARENT: [exports.testbedP],
            LABEL: 'Page 2', 
            
        }; 
        exports.bosses = {
            PARENT: [exports.testbedP],
            LABEL: 'Bosses',
        };
        exports.bosses2 = {
            PARENT: [exports.testbedP],
            LABEL: 'Bosses',
        };
        exports.bosses2 = {
          PARENT: [exports.testbedP],
          LABEL: 'Page 2'
        }
        exports.twinsingle = {
                PARENT: [exports.genericTank],
                LABEL: 'Twin Single',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     5,      1,      0,      4.5,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.single]),
                            TYPE: exports.bullet,
                            COLOR: 14
                        }, },  {
                    POSITION: [  5.5,    5,    -1.8,    6.5,     4.5,      0,      0,   ],                         
                    },  {
                    POSITION: [  19,     5,      1,      0,      -4.5,      0,      0.5,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.single]),
                            TYPE: exports.bullet,
                        }, },  {
                    POSITION: [  5.5,    5,    -1.8,    6.5,     -4.5,      0,      0,   ],                         
                    }
                ],
            };  

            exports.single = {
                PARENT: [exports.genericTank],
                LABEL: 'Single',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.single]),
                            TYPE: exports.bullet,
                        }, },  {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],                         
                    }
                ],
            };  

        let smshskl = 12; //13;
        exports.smash = {
            PARENT: [exports.genericTank],
            LABEL: 'Smasher',
            DANGER: 6,
            BODY: {
                FOV: base.FOV * 1.05,
                DENSITY: base.DENSITY * 2,
            },
            TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  21.5,   0,      0,      0,     360,  0,], 
                TYPE: exports.smasherBody,
            }],
            IS_SMASHER: true,
            SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
            STAT_NAMES: statnames.smasher,
        };
            exports.megasmash = {
                PARENT: [exports.genericTank],
                LABEL: 'Mega-Smasher',
                DANGER: 7,
                BODY: {
                    SPEED: base.speed * 1.05,
                    FOV: base.FOV * 1.1,
                    DENSITY: base.DENSITY * 4,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  24,     0,      0,      0,     360,  0,], 
                    TYPE: exports.megasmashBody,
                }],
            };
            exports.spike = {
                PARENT: [exports.genericTank],
                LABEL: 'Spike',
                DANGER: 7,
                BODY: {
                    SPEED: base.speed*0.9,
                    DAMAGE: base.DAMAGE * 1.1,
                    FOV: base.FOV * 1.05,
                    DENSITY: base.DENSITY * 2,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [ 20.5,    0,      0,      0,     360,  0,], 
                    TYPE: exports.spikeBody,
                    }, { 
                    POSITION: [ 20.5,    0,      0,     120,    360,  0,], 
                    TYPE: exports.spikeBody,
                    }, {
                    POSITION: [ 20.5,    0,      0,     240,    360,  0,], 
                    TYPE: exports.spikeBody,
                }],
            };     
            exports.weirdspike = {
                PARENT: [exports.genericTank],
                LABEL: 'Spike',
                DANGER: 7,
                BODY: {
                    DAMAGE: base.DAMAGE * 1.15,
                    FOV: base.FOV * 1.05,
                    DENSITY: base.DENSITY * 1.5,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [ 20.5,    0,      0,      0,     360,  0,], 
                    TYPE: exports.spikeBody1,
                    }, { 
                    POSITION: [ 20.5,    0,      0,     180,    360,  0,], 
                    TYPE: exports.spikeBody2,
                }],
            };       
            exports.autosmash = makeAuto(exports.smash, 'Auto-Smasher', { type: exports.autoSmasherTurret, size: 11, });
            exports.autosmash.SKILL_CAP = [smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl,];

    exports.twin = {
        PARENT: [exports.genericTank],
        LABEL: 'Twin',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  18,     8,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  18,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, 
        ],
    };// no cobra is normal tank but more damage like 30 (well the dmg there is the multiplier... so 30 * twin dmg) k can u add 20 damage to cobra
    exports.cobra = {
        PARENT: [exports.genericTank],
        LABEL: 'Cobra',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  16,     8,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  16,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, 
        ],
    };
        exports.gunner = {
            PARENT: [exports.genericTank],
            LABEL: 'Gunner',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  12,    3.5,     1,      0,     7.25,    0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  12,    3.5,     1,      0,    -7.25,    0,     0.75, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,     3.75,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,    -3.75,    0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
            exports.machinegunner = {
                PARENT: [exports.genericTank],
                LABEL: 'Machine Gunner',
                DANGER: 6,
                BODY: {
                    SPEED: base.SPEED * 0.9,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     3,     4.0,    -3,      5,      0,     0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,    -3,     -5,      0,     0.8,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,     0,     2.5,     0,     0.4,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,     0,    -2.5,     0,     0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  14,     3,     4.0,     3,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, 
                ]
            };
            exports.autogunner = makeAuto(exports.gunner);            
            exports.nailgun = {
                PARENT: [exports.genericTank],
                LABEL: 'Nailgun',
                DANGER: 7,
                BODY: {
                    FOV: base.FOV * 1.1,
                    SPEED: base.SPEED * 0.9,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,     0.25, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.75, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     2,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],
                        },
                ],
            };
        exports.twingrd = {
            PARENT: [exports.genericTank],
            LABEL: 'Twin Guard',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,     8,      1,      0,     5.5,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                    TYPE: exports.bullet,
                }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                    TYPE: exports.bullet,
                }, }, {
                  POSITION: [13, 8, 1, 0, 0, 120, 0]
                }, {
                POSITION: [2, 8, 1.7, 13, 0, 120, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap]),
                    TYPE: exports.trap
                }, }, {
                  POSITION: [13, 8, 1, 0, 0, 240, 0]
                }, {
                POSITION: [2, 8, 1.7, 13, 0, 240, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap]),
                    TYPE: exports.trap
                }, },
            ],
        };
  exports.campfire = {
    PARENT: [exports.genericTank],
    LABEL: 'Campfire',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  20,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.twin, g.bonfire]),
            TYPE: exports.bullet,
        }, }, { 
           POSITION: [  18,     9,      -1.8,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.twin, g.bonfire]),
            TYPE: exports.bullet,
        }, }, { 
           POSITION: [  18,     8,      1,      0,      0,      180,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.twin, g.bonfire]),
            TYPE: exports.bullet,
        }, }
    ],
};
exports.bonfire = {
    PARENT: [exports.genericTank],
    LABEL: 'Bonfire',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  20,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.twin, g.bonfire]),
            TYPE: exports.bullet,
        }, }, { 
           POSITION: [  18,     9,      -1.8,      0,      0,      0,      0.5,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.twin, g.bonfire]),
            TYPE: exports.bullet,
        }, }, 
    ],
};

exports.fire = {
    PARENT: [exports.genericTank], 
    LABEL: 'Fire',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  20,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {//ig i'll make my version
            SHOOT_SETTINGS: combineStats([g.trap, g.bonfire]),
            TYPE: exports.trap,
        }, }, { 
           POSITION: [  18,     9,      -1.8,      0,      0,      0,      0.5,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.bonfire]),
            TYPE: exports.trap,
        }, }, 
    ],
}; 

exports.crawler = {
    PARENT: [exports.genericTank],
    LABEL: 'Crawler',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  20,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.bonfire]), 
            TYPE: exports.trap,
        }, }, { 
           POSITION: [  18,     9,      -1.8,      0,      0,      0,      0.5,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.bonfire]),
            TYPE: exports.trap,
        }, }, { 
           POSITION: [  18,     8,      1,      0,      0,      180,      0.1,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.bonfire]),
            TYPE: exports.trap,
        }, }
    ],
};

exports.inferno = {
  PARENT: [exports.genericTank],
  LABEL: 'Inferno',
  GUNS: [
    {
      POSITION: [18, 8, -1.8, 0, 0, 40, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.twin]),
        TYPE: exports.bullet,
        COLOR_OVERRIDE: 12
    }, }, {
      POSITION: [18, 8, -1.8, 0, 0, -40, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.twin]),
        TYPE: exports.bullet,
        COLOR_OVERRIDE: 12
      }
    },
    {
      POSITION: [20, 8, -1.8, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.twin]),
        TYPE: exports.bullet
      }
    },
  ]
}
        exports.double = {
            PARENT: [exports.genericTank],
            LABEL: 'Double Twin',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,     5.5,    180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,    -5.5,    180,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
            exports.tripletwin = {
                PARENT: [exports.genericTank],
                LABEL: 'Triple Twin',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    120,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    120,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    240,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    240,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };
            exports.autodouble = makeAuto(exports.double, 'Auto-Double');
            exports.hearth = {
              PARENT: [exports.genericTank],
              LABEL: 'Hearth',
              DANGER: 8,
              GUNS: [
                {
                  POSITION: [25, 8, 1, 0, 0, 0, 0],
                  PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                    TYPE: exports.bullet
                  }
                }, {
                  POSITION: [16, 4, 0.6, 0, 0, 0, 0],
                  PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm]),
                    TYPE: exports.swarm
                  }
                }
              ]
            }
            exports.split = {
                PARENT: [exports.genericTank],
                LABEL: 'Hewn Double',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,     5.5,     25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,    -5.5,    -25,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };
exports.monster = {
    PARENT: [exports.genericTank],
    LABEL: 'Monster',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  28,     18,      -1.8,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.monsterbullet,
        }, }, 
    ],
};
        exports.bent = {
            PARENT: [exports.genericTank],
            LABEL: 'Triple Shot',
            DANGER: 6,
            BODY: {
                SPEED: base.SPEED * 0.9,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  19,     8,      1,      0,     -2,    -20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  19,     8,      1,      0,      2,     20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
            exports.bentdouble = {
                PARENT: [exports.genericTank],
                LABEL: 'Bent Double',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,     -1,     -25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      1,      25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,     -1,     155,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      1,    -155,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.infector = {
              PARENT: [exports.genericTank],
              LABEL: 'Infector',
              GUNS: [
                {
                  POSITION: [20, 8, 1, 0, 5.5, 0, 0],
                  PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                    TYPE: exports.bullet
                  }
                },
                {
                  POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
                  PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                    TYPE: exports.bullet
                  }
                },
                 {
                  POSITION: [17, 8, 1, 0, 5.5, 0, 0],
                  PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                    TYPE: exports.bullet
                  }
                },
                {
                  POSITION: [17, 8, 1, 0, -5.5, 0, 0.5],
                  PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                    TYPE: exports.bullet
                  }
                }
              ]
            }
            exports.penta = {
                PARENT: [exports.genericTank],
                LABEL: 'Penta Shot',
                DANGER: 7,
                BODY: {
                    SPEED: base.SPEED * 0.85,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  16,     8,      1,      0,     -3,    -30,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  16,     8,      1,      0,      3,     30,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,     -2,    -15,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      2,     15,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.penta_uzi = {
              PARENT: [exports.genericTank],
              LABEL: 'Penta Uzi',
              GUNS: (() => {
                let g = []
                exports.penta.GUNS.forEach(e=>{
                  g.push({
                    POSITION: [
                      e.POSITION[0],
                      e.POSITION[1],
                      e.POSITION[2],
                      e.POSITION[3],
                      e.POSITION[4],
                      e.POSITION[5],
                      e.POSITION[6],
                    ],
                    PROPERTIES: e.PROPERTIES
                  })
                   g.push({
                    POSITION: [
                      e.POSITION[0] - 5,
                      e.POSITION[1],
                      e.POSITION[2],
                      e.POSITION[3],
                      e.POSITION[4],
                      e.POSITION[5],
                      e.POSITION[6] + 0.5,
                    ],
                    PROPERTIES: e.PROPERTIES
                  })
                })
                return g
              })()
            }
            exports.benthybrid = makeHybrid(exports.bent, 'Bent Hybrid');

        exports.triple = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                FOV: base.FOV * 1.05,
            },
            LABEL: 'Triplet',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,      1,      0,      5,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,    10,      1,      0,     -5,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  21,    10,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
            exports.quint = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                BODY: {
                    FOV: base.FOV * 1.1,
                },
                LABEL: 'Quintuplet',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  16,    10,      1,      0,     -5,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  16,    10,      1,      0,      5,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  19,    10,      1,      0,     -3,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  19,    10,      1,      0,      3,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };        
            exports.dual = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                BODY: {
                    ACCEL: base.ACCEL * 0.8,
                    FOV: base.FOV * 1.1,
                },
                LABEL: '',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     7,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.lowpower]),
                            TYPE: exports.bullet,
                            LABEL: 'Small',
                        }, }, { 
                    POSITION: [  18,     7,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.lowpower]),
                            TYPE: exports.bullet,
                            LABEL: 'Small',
                        }, }, { 
                    POSITION: [  16,    8.5,     1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  16,    8.5,     1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };

    exports.sniper = {
        PARENT: [exports.genericTank],
        LABEL: 'Sniper',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: exports.bullet,
            }, },
        ],
    };
            exports.rifle = {
                PARENT: [exports.genericTank],
                LABEL: 'Rifle',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7, 
                    FOV: base.FOV * 1.225,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */                       
                    POSITION: [  20,    10.5,    1,      0,      0,      0,      0,   ], 
                        }, {
                    POSITION: [  24,     7,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
        exports.assassin = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Assassin',
            BODY: {
                ACCELERATION: base.ACCEL * 0.6,
                SPEED: base.SPEED * 0.85,
                FOV: base.FOV * 1.4,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  27,    8.5,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [   5,    8.5,    -1.6,    8,      0,      0,      0,   ], 
                },
            ],
        };
            exports.ranger = {
                PARENT: [exports.genericTank],
                LABEL: 'Ranger',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.5,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  32,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [   5,    8.5,    -1.6,    8,      0,      0,      0,   ], 
                    },
                ],
            };
            exports.autoass = makeAuto(exports.assassin, "");

        exports.hunter = {
            PARENT: [exports.genericTank],
            LABEL: 'Hunter',
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.7,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.25,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  24,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  21,    12,      1,      0,      0,      0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
            exports.preda = {
                PARENT: [exports.genericTank],
                LABEL: 'Predator',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.85,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  24,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.hunter2, g.preda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,    12,      1,      0,      0,      0,     0.15, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.preda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  18,    16,      1,      0,      0,      0,     0.3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.poach = makeHybrid(exports.hunter, 'Poacher');
            exports.sidewind = {
                PARENT: [exports.genericTank],
                LABEL: 'Sidewinder',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    11,    -0.5,    14,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  21,    12,    -1.1,     0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewind]),
                            TYPE: exports.snake,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };

    exports.director = {
        PARENT: [exports.genericTank],
        LABEL: 'Director',  
        STAT_NAMES: statnames.drone,
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.75,
            FOV: base.FOV * 1.1,
        },
        MAX_CHILDREN: 5,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
            exports.master = {
                PARENT: [exports.genericTank],
                LABEL: '',  
                STAT_NAMES: statnames.drone,
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    FOV: base.FOV * 1.15,
                },
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  16,     1,      0,      0,      0, 0], 
                        TYPE: exports.masterGun,
                            }, {
                    POSITION: [  16,     1,      0,     120,     0, 0], 
                        TYPE: [exports.masterGun, { INDEPENDENT: true, }],
                            }, {
                    POSITION: [  16,     1,      0,     240,     0, 0], 
                        TYPE: [exports.masterGun, { INDEPENDENT: true, }],
                            },
                ],
            };

        exports.overseer = {
            PARENT: [exports.genericTank],
            LABEL: 'Overseer',  
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.1,
            },
            MAX_CHILDREN: 8,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, }, {
                POSITION: [   6,     12,    1.2,     8,      0,    270,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, },
            ],
        };
            exports.overlord = {
                PARENT: [exports.genericTank],
                LABEL: 'Overlord',
                DANGER: 7,
                STAT_NAMES: statnames.drone,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.1,
                },
                MAX_CHILDREN: 8,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, { 
                    POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, },
                ],
            };
            exports.overtrap = {
                PARENT: [exports.genericTank],
                LABEL: 'Overtrapper',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.6,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,     125,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     235,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [  14,     8,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   4,     8,     1.5,    14,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
            exports.banshee = {
                PARENT: [exports.genericTank],
                LABEL: '',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.1,
                },
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  10,     8,      0,      0,      80, 0], 
                        TYPE: exports.bansheegun,
                            }, {
                    POSITION: [  10,     8,      0,     120,     80, 0], 
                        TYPE: exports.bansheegun,
                            }, {
                    POSITION: [  10,     8,      0,     240,     80, 0], 
                        TYPE: exports.bansheegun,
                            },
                ],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,      60,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 2,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 2,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     300,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 2,   
                        }, }, 
                    ]
            };
            exports.autoover = makeAuto(exports.overseer, "");
            exports.overgunner = {
                PARENT: [exports.genericTank],
                LABEL: 'Overgunner',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 0.9,
                    FOV: base.FOV * 1.1,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,     125,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     235,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.slow, g.flank, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.slow, g.flank, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,    11,      1,      0,      0,      0,      0,   ],
                        },
                ],
            };
        
        function makeSwarmSpawner(guntype) {
            return {
                PARENT: [exports.genericTank],
                LABEL: '',
                BODY: {
                    FOV: 2,
                },
                CONTROLLERS: ['nearestDifferentMaster'], 
                COLOR: 16,
                AI: {
                    NO_LEAD: true,
                    SKYNET: true,
                    FULL_VIEW: true,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     15,    0.6,    14,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: guntype,
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,          
                        }, }
                ],
            };
        }
        exports.cruiserGun = makeSwarmSpawner(combineStats([g.swarm]));
        exports.cruiser = {
            PARENT: [exports.genericTank],
            LABEL: 'Cruiser',
            DANGER: 6,
            FACING_TYPE: 'locksFacing',
            STAT_NAMES: statnames.swarm,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                FOV: base.FOV * 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   7,    7.5,    0.6,     7,      4,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,     -4,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, },
            ],
        };
            exports.battleship = {
                PARENT: [exports.genericTank],
                LABEL: 'Battleship',
                DANGER: 7,
                STAT_NAMES: statnames.swarm,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    ACCELERATION: base.ACCEL,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      4,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Guided'                
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -4,     90,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Autonomous',        
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      4,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Autonomous',         
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -4,     270,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Guided'                
                        }, },
                ],
            };
            exports.carrier = {
                PARENT: [exports.genericTank],
                LABEL: 'Carrier',
                DANGER: 7,
                STAT_NAMES: statnames.swarm,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,          
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      2,      40,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,    
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -2,     -40,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,    
                        }, }
                ],
            };
            exports.autocruiser = makeAuto(exports.cruiser, "");
            exports.fortress = {
                PARENT: [exports.genericTank],
                LABEL: 'Fortress', //'Palisade',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                            STAT_CALCULATOR: gunCalcNames.swarm,   
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      0,     120,    1/3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                            STAT_CALCULATOR: gunCalcNames.swarm,   
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      0,     240,    2/3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                            STAT_CALCULATOR: gunCalcNames.swarm,   
                        }, }, {
                    POSITION: [  14,     9,      1,      0,      0,     60,      0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     60,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {                            
                    POSITION: [  14,     9,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {                            
                    POSITION: [  14,     9,      1,      0,      0,     300,     0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     300,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };

        exports.underseer = {
            PARENT: [exports.genericTank],
            LABEL: 'Underseer',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                ACCELERATION: base.ACCEL * 0.7,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.1,
            },
            SHAPE: 4,
            MAX_CHILDREN: 14,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   5,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                        TYPE: exports.sunchip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, }, {
                POSITION: [   5,     12,    1.2,     8,      0,     270,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                        TYPE: exports.sunchip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, },
                ],
        };
            exports.necromancer = {
                PARENT: [exports.genericTank],
                LABEL: 'Necromancer',
                DANGER: 7,
                STAT_NAMES: statnames.necro,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                SHAPE: 4,
                FACING_TYPE: 'autospin',
                MAX_CHILDREN: 14,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     12,    1.2,     8,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,     270,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,      0,     0.25, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.weak, g.doublereload]),
                            TYPE: exports.autosunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 4,
                            STAT_CALCULATOR: gunCalcNames.necro,
                            LABEL: 'Guard',
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,     180,    0.75  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.weak, g.doublereload]),
                            TYPE: exports.autosunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 4,
                            STAT_CALCULATOR: gunCalcNames.necro,
                            LABEL: 'Guard', 
                        }, },
                    ],
            };

        exports.lilfact = {
            PARENT: [exports.genericTank],
            LABEL: '',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                SPEED: base.SPEED * 0.8,
                ACCELERATION: base.ACCEL * 0.5,
                FOV: 1.1,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  4.5,    10,      1,     10.5,    0,      0,      0,   ], 
                }, {
                POSITION: [   1,     12,      1,      15,     0,      0,      0,   ], 
                PROPERTIES: {          
                    MAX_CHILDREN: 4,
                    SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
                    TYPE: exports.minion,
                    STAT_CALCULATOR: gunCalcNames.drone,                        
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,  
                }, }, {                        
                    POSITION: [  3.5,    12,      1,      8,      0,      0,      0,   ], 
                }
            ],
        };
            exports.factory = {
                PARENT: [exports.genericTank],
                LABEL: 'Factory',
                DANGER: 7,
                STAT_NAMES: statnames.drone,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: 1.1,
                },
                MAX_CHILDREN: 6,
                GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     11,      1,      10.5,   0,      0,      0,   ], 
                        }, {
                    POSITION: [   2,     14,      1,      15.5,   0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.factory]),
                            TYPE: exports.minion,
                            STAT_CALCULATOR: gunCalcNames.drone,                        
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,   
                        }, }, {                        
                    POSITION: [   4,     14,      1,      8,      0,      0,      0,   ], 
                    }
                ],
            };
exports.station = {
                PARENT: [exports.genericTank],
                LABEL: 'Station',
                DANGER: 7,
                STAT_NAMES: statnames.drone,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: 1.1,
                },
                MAX_CHILDREN: 9,
                GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     11,      1,      10.5,   0,      0,      0,   ], 
                        }, {
                    POSITION: [   2,     14,      1,      15.5,   0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.factory]),
                            TYPE: exports.minion,
                            STAT_CALCULATOR: gunCalcNames.drone,                        
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,   
                        }, }, {                        
                    POSITION: [   4,     14,      1,      8,      0,      0,      0,   ], 
                    },
                       { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   3.5,     11,      1,      10.5,   0,      180,      0,   ], 
                        }, {
                    POSITION: [   .5,     14,      1,      15.5,   0,     180,      0.5,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.factory]),
                            TYPE: exports.minion,
                            STAT_CALCULATOR: gunCalcNames.drone,                        
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,   
                        }, }, {                        
                    POSITION: [   2.5,     14,      1,      8,      0,      180,      0,   ], 
                    }
                ],
            };
    exports.machine = {
        PARENT: [exports.genericTank],
        LABEL: 'Machine Gun',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    12,     10,     1.4,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            }, },
        ],
    };
            exports.spray = {
                PARENT: [exports.genericTank],
                LABEL: 'Sprayer',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  23,     7,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.lowpower, g.mach, g.morerecoil]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  12,    10,     1.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
   exports.sprey = {
                PARENT: [exports.genericTank],
                LABEL: 'Reception',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  30,     7,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.lowpower, g.mach, g.morerecoil]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  19,    10,     1.4,     8,      0,      0,      0.25,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  14,    13,     1.8,     8,      0,      0,      0.5,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
        exports.mini = {
            PARENT: [exports.genericTank],
            LABEL: 'Minigun',
            DANGER: 6,
            BODY: {
                FOV: 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  22,     8,      1,      0,      0,      0,      0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  20,     8,      1,      0,      0,      0,    0.333, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,     8,      1,      0,      0,      0,    0.667, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
        exports.twinmini = {
          PARENT: [exports.genericTank],
          LABEL: 'Twin Minigun',
          GUNS: (() => {
            var gs = [];
            exports.mini.GUNS.forEach(e=>{
              gs.push({
              POSITION: [
                e.POSITION[0],
                e.POSITION[1],
                e.POSITION[2],
                e.POSITION[3],
                e.POSITION[4]+5.5,
                e.POSITION[5],
                e.POSITION[6],
              ],
              PROPERTIES: e.PROPERTIES
              });
              gs.push({
                POSITION: [
                  e.POSITION[0],
                  e.POSITION[1],
                  e.POSITION[2],
                  e.POSITION[3],
                  e.POSITION[4]-5.5,
                  e.POSITION[5],
                  e.POSITION[6],
                ],
                PROPERTIES: e.PROPERTIES
              })
            })
            return gs
          })()
        }
            exports.stream = {
                PARENT: [exports.genericTank],
                LABEL: 'Streamliner',
                DANGER: 7,
                BODY: {
                    FOV: 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  25,     8,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  23,     8,      1,      0,      0,      0,     0.2, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,     8,      1,      0,      0,      0,     0.4, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  19,     8,      1,      0,      0,      0,     0.6, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  17,     8,      1,      0,      0,      0,     0.8, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.hybridmini = makeHybrid(exports.mini, "");
            exports.minitrap = {
                PARENT: [exports.genericTank],
                DANGER: 6,
                LABEL: '',
                STAT_NAMES: statnames.trap,
                BODY: {
                    FOV: 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [  24,     8,      1,      0,      0,      0,      0, ], 
                            }, {
                    POSITION: [   4,     8,     1.3,     22,     0,      0,      0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, { 
                    POSITION: [   4,     8,     1.3,     18,     0,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, { 
                    POSITION: [   4,     8,     1.3,     14,     0,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
    
    exports.pound = {
        PARENT: [exports.genericTank],
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.8,
        },
        LABEL: 'Pounder',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,    12,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                TYPE: exports.bullet,
            }, },
        ],
    };
        exports.destroy = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
            },
            LABEL: 'Destroyer',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  21,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                    TYPE: exports.bullet,
                }, },
            ],
        };
            exports.anni = {
                PARENT: [exports.genericTank],
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                },
                LABEL: 'Annihilator',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [ 20.5,  19.5,     1,      0,      0,      0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
            exports.hiveshooter = {
                PARENT: [exports.genericTank],
                DANGER: 6,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.speed * 0.8,
                },
                LABEL: 'Swarmer',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,    14,     -1.2,    5,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.hive]),
                            TYPE: exports.hive,
                        }, }, {
                    POSITION: [  15,    12,      1,      5,      0,      0,      0,   ], 
                    }
                ],
            };
            exports.whiveshooter = {
              PARENT: [exports.genericTank],
              LABEL: 'Wasper',
              GUNS: [
                { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,    14,     -1.2,    5,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.hive]),
                            TYPE: exports.whive,
                          COLOR_OVERRIDE: 3
                        }, }, {
                    POSITION: [  20,    12,      1,      5,      0,      0,      0,   ], 
                    }
              ]
            }
            exports.twinhiveshoot = {
              PARENT: [exports.genericTank],
              LABEL: 'Duo Swarmer',
              GUNS: (() => {
                var gs = []
                exports.hiveshooter.GUNS.forEach(e=>{
                  gs.push({
                    POSITION: [
                      e.POSITION[0],
                      e.POSITION[1],
                      e.POSITION[2],
                      e.POSITION[3]+4.5,
                      e.POSITION[4]+9.5,
                      e.POSITION[5],
                      e.POSITION[6]
                    ],
                    PROPERTIES: e.PROPERTIES
                  })
                  gs.push({
                    POSITION: [
                      e.POSITION[0],
                      e.POSITION[1],
                      e.POSITION[2],
                      e.POSITION[3]+4.5,
                      e.POSITION[4]-9.5,
                      e.POSITION[5],
                      e.POSITION[6]+0.5,
                    ],
                    PROPERTIES: e.PROPERTIES
                  })
                })
                gs.push({POSITION: [10, 10, 4, 0, 0, 0, 0]})
                return gs
              })()
            }
            exports.hiveliner = {
              PARENT: [exports.genericTank],
              LABEL: 'HiveLiner',
              GUNS: (() => {
                var g = []
                exports.hiveshooter.GUNS.forEach(e=>{
                  g.push({
                    POSITION: [
                      e.POSITION[0]+15,
                      e.POSITION[1],
                      e.POSITION[2],
                      e.POSITION[3],
                      e.POSITION[4],
                      e.POSITION[5],
                      e.POSITION[6]
                    ],
                    PROPERTIES: e.PROPERTIES
                  })
                  g.push({
                    POSITION: [
                      e.POSITION[0]+10,
                      e.POSITION[1],
                      e.POSITION[2],
                      e.POSITION[3],
                      e.POSITION[4],
                      e.POSITION[5],
                      e.POSITION[6]+0.25
                    ],
                    PROPERTIES: e.PROPERTIES
                  });
                  g.push({
                    POSITION: [
                      e.POSITION[0]+5,
                      e.POSITION[1],
                      e.POSITION[2],
                      e.POSITION[3],
                      e.POSITION[4],
                      e.POSITION[5],
                      e.POSITION[6]+0.5
                    ],
                    PROPERTIES: e.PROPERTIES
                  });
                  g.push({
                    POSITION: [
                      e.POSITION[0],
                      e.POSITION[1],
                      e.POSITION[2],
                      e.POSITION[3],
                      e.POSITION[4],
                      e.POSITION[5],
                      e.POSITION[6]+0.75
                    ],
                    PROPERTIES: e.PROPERTIES
                  });
                  g.push({
                    POSITION: [
                      e.POSITION[0]-5,
                      e.POSITION[1],
                      e.POSITION[2],
                      e.POSITION[3],
                      e.POSITION[4],
                      e.POSITION[5],
                      e.POSITION[6]+1
                    ],
                    PROPERTIES: e.PROPERTIES
                  });
                })
                return g
              })()
            }
            exports.f_hive = { // flank hive
              PARENT: [exports.genericTank],
              LABEL: 'Flank Hive',
              GUNS: (() => {
                let h = []
                exports.hiveshooter.GUNS.forEach(e=>{
                  h.push({
                    POSITION: [
                      e.POSITION[0],
                      e.POSITION[1],
                      e.POSITION[2],
                      e.POSITION[3],
                      e.POSITION[4],
                      e.POSITION[5],
                      e.POSITION[6]
                    ],
                    PROPERTIES: e.PROPERTIES
                  })
                  h.push({
                    POSITION: [
                      e.POSITION[0],
                      e.POSITION[1],
                      e.POSITION[2],
                      e.POSITION[3],
                      e.POSITION[4],
                      e.POSITION[5] + 180,
                      e.POSITION[6]
                    ],
                    PROPERTIES: e.PROPERTIES
                  })
                })
                return h
              })()
            }
            exports.hybrid = makeHybrid(exports.destroy, 'Hybrid');
            exports.shotgun2 = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Shotgun',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                },
                GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
                    POSITION: [  4,      3,      1,     11,     -3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  4,      3,      1,     11,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  4,      4,      1,     13,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      4,      1,     12,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      4,      1,     11,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {                
                    POSITION: [  1,      3,      1,     13,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  1,      3,      1,     13,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  1,      2,      1,     13,      2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      2,      1,     13,     -2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [ 15,     14,      1,     6,       0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  8,     14,    -1.3,    4,       0,      0,      0,   ], }
                ],
            };

        exports.trapper = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Trapper',
            STAT_NAMES: statnames.trap,
            BODY: {
                SPEED: base.SPEED * 0.8,
                FOV: base.FOV * 1.15,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                        POSITION: [  15,     7,      1,      0,      0,      0,      0,   ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, },
            ],
        };
        exports.riot = {
          PARENT: [exports.genericTank],
          LABEL: 'Riot',
          GUNS: [
            {
              POSITION: [22, 8, 1, 0, 0, 0, 0]
            }, {
              POSITION: [18.5, 8, 1, 0, 0, 0, 0]
            }, {
              POSITION: [15, 8, 1, 0, 0, 0, 0]
            }, {
              POSITION: [3.5, 8, 1.4, 22, 0, 0, 0],
              PROPERTIES: {
                  SHOOT_SETTINGS: combineStats([g.trap, g.power, g.power]),
                  TYPE: exports.trap
              }
            },{
              POSITION: [3.5, 8, 1.4, 18.5, 0, 0, 0.333],
              PROPERTIES: {
                  SHOOT_SETTINGS: combineStats([g.trap, g.power, g.power]),
                  TYPE: exports.trap
              }
            },{
              POSITION: [3.5, 8, 1.4, 15, 0, 0, 0.667],
              PROPERTIES: {
                  SHOOT_SETTINGS: combineStats([g.trap, g.power, g.power]),
                  TYPE: exports.trap
              }
            }
          ]
        }
            exports.engineer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Engineer',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.75,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    11,      1,     10.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   3,    14,      1,     15.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    14,     1.3,     18,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.pillbox,        
                            SYNCS_SKILLS: true,   
                        }, }, {                            
                    POSITION: [   4,    14,      1,      8,      0,      0,      0,   ]
                    }
                ],
            };
            exports.construct = {
                PARENT: [exports.genericTank],
                LABEL: 'Mega Trapper',
                STAT_NAMES: statnames.trap,
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.7,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,    18,      1,      0,      0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    18,     1.2,     18,     0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
                            TYPE: exports.block,
                        }, }, 
                ],
            };
            exports.autotrapper = makeAuto(exports.trapper);
            exports.conq = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: '',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  21,    14,      1,      0,      0,     180,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  18,    14,      1,      0,      0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    14,     1.1,     18,     0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.block,
                        }, },
                ],
            };
            exports.bentboomer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Boomer',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   8,    10,      1,      8,     -2,     -35,     0,   ],
                        }, {
                    POSITION: [   8,    10,      1,      8,      2,      35,     0,   ],
                        }, {
                    POSITION: [   2,    10,     1.3,     16,    -2,     -35,     0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fast, g.twin]),
                            TYPE: exports.boomerang,
                        }, }, {
                    POSITION: [   2,    10,     1.3,     16,     2,      35,    0.5,  ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fast, g.twin]),
                            TYPE: exports.boomerang,
                        }, },
                ],
            };
            exports.boomer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Boomer',
                STAT_NAMES: statnames.trap,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    10,      1,      13,     0,      0,      0,   ],
                        }, {
                    POSITION: [   6,    10,    -1.5,      7,     0,      0,      0,   ],
                        }, {
                    //POSITION: [  12,    15,      1,      0,      0,      0,      0,   ],
                    //    }, {
                    POSITION: [   2,    10,     1.3,     18,     0,      0,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang]),
                            TYPE: exports.boomerang,
                        }, },
                ],
            };
            exports.quadtrapper = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: '',
                STAT_NAMES: statnames.trap, 
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     6,      1,      0,      0,     45,      0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     45,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  14,     6,      1,      0,      0,     135,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     135,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  14,     6,      1,      0,      0,     225,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     225,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  14,     6,      1,      0,      0,     315,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     315,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, },
                ],
            };

        exports.artillery = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Artillery',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  17,     3,      1,      0,     -6,     -7,     0.25,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  17,     3,      1,      0,      6,      7,     0.75,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  19,     12,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Heavy',
                    }, },
            ],
        };
            exports.mortar = {
                PARENT: [exports.genericTank],
                LABEL: 'Mortar',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  13,     3,      1,      0,     -8,     -7,     0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  13,     3,      1,      0,      8,      7,     0.8,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  17,     3,      1,      0,     -6,     -7,     0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  17,     3,      1,      0,      6,      7,     0.4,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  19,     12,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                            TYPE: exports.bullet,
                            LABEL: 'Heavy',
                        }, },
                ],
            };
            exports.skimmer = {
                PARENT: [exports.genericTank],
                BODY: {
                    FOV: base.FOV * 1.15,
                },
                LABEL: 'Skimmer',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    14,    -0.5,     9,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  17,    15,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
                            TYPE: exports.missile,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };
            exports.spread = {
                PARENT: [exports.genericTank],
                LABEL: 'Spreadshot',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  13,     4,      1,      0,    -0.8,    -75,    5/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 14.5,    4,      1,      0,    -1.0,    -60,    4/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  16,     4,      1,      0,    -1.6,    -45,    3/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 17.5,    4,      1,      0,    -2.4,    -30,    2/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  19,     4,      1,      0,    -3.0,    -15,    1/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {                    
                    POSITION: [  13,     4,      1,      0,     0.8,     75,    5/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 14.5,    4,      1,      0,     1.0,     60,    4/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  16,     4,      1,      0,     1.6,     45,    3/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 17.5,    4,      1,      0,     2.4,     30,    2/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  19,     4,      1,      0,     3.0,     15,    1/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  13,    10,     1,     8,      0,      0,      0,     ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.spreadmain, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Pounder',
                        }, },
                ],
            };

    exports.flank = {
        PARENT: [exports.genericTank],
        LABEL: 'Flank Guard',
        BODY: {
            SPEED: base.SPEED * 1.1,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, }, {   
            POSITION: [  18,     8,      1,      0,      0,     120,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, }, {   
            POSITION: [  18,     8,      1,      0,      0,     240,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, },
        ],
    };
        exports.hexa = {
            PARENT: [exports.genericTank],
            LABEL: 'Hexa Tank',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     120,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     240,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,      60,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     180,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     300,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
            exports.octo = {
                PARENT: [exports.genericTank],
                LABEL: 'Octo Tank',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      45,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     135,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     225,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     315,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.heptatrap = (() => {
                let a = 360/7, d = 1/7;
                return {
                    PARENT: [exports.genericTank],
                    LABEL: 'Hepta-Trapper',
                    DANGER: 7,
                    BODY: {
                        SPEED: base.SPEED * 0.8,
                    },
                    STAT_NAMES: statnames.trap,
                    HAS_NO_RECOIL: true,
                    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                        POSITION: [  15,     7,      1,      0,      0,      0,      0,   ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,      a,     4*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,      a,     4*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     2*a,    1*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     2*a,    1*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     3*a,    5*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     3*a,    5*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     4*a,    2*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     4*a,    2*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     5*a,    6*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     5*a,    6*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     6*a,    3*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     6*a,    3*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, },
                    ],
                };
            })();
            exports.hexatrap = makeAuto({
                PARENT: [exports.genericTank],
                LABEL: 'Hexa-Trapper',
                DANGER: 7,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                },
                STAT_NAMES: statnames.trap,
                HAS_NO_RECOIL: true,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  15,     7,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     60,     0.5,  ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     60,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     120,     0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     120,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     180,    0.5,  ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     240,     0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     240,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     300,    0.5,  ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     300,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            }, 'Hexa-Trapper');

        exports.tri = {
            PARENT: [exports.genericTank],
            LABEL: 'Tri-Angle',
            BODY: {
                HEALTH: base.HEALTH * 0.8,
                SHIELD: base.SHIELD * 0.8,
                DENSITY: base.DENSITY * 0.6,
            },
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.tonsmorrecoil]),
                        TYPE: exports.bullet,
                        LABEL: 'Front',
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, },
            ],
        }; 

            exports.booster = {
                PARENT: [exports.genericTank],
                LABEL: 'Booster',
                BODY: {
                    HEALTH: base.HEALTH * 0.6,
                    SHIELD: base.SHIELD * 0.6,
                    DENSITY: base.DENSITY * 0.2,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.muchmorerecoil]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,     -1,     135,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,      1,     225,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     145,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     215,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
            exports.fighter = {
                PARENT: [exports.genericTank],
                LABEL: 'Fighter',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,     -1,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Side',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      1,     -90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Side',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
            exports.brutalizer = {
                PARENT: [exports.genericTank],
                LABEL: '',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [   7,    7.5,    0.6,     7,     -1,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,         
                        }, }, {   
                    POSITION: [   7,    7.5,    0.6,     7,      1,     -90,     9,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,     
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
            exports.bomber = {
                PARENT: [exports.genericTank],
                LABEL: 'Bomber',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     130,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
                            TYPE: exports.bullet,
                            LABEL: 'Wing',
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     230,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
                            TYPE: exports.bullet,
                            LABEL: 'Wing',
                        }, }, {
                    POSITION: [  14,     8,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,     8,     1.5,    14,      0,     180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.morerecoil]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };    
            exports.autotri = makeAuto(exports.tri);   
            exports.autotri.BODY = {
                SPEED: base.SPEED,
            };   
            exports.falcon = {
                PARENT: [exports.genericTank],
                LABEL: 'Falcon',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  27,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.lessreload]),
                            TYPE: exports.bullet,
                            LABEL: 'Assassin',
                            ALT_FIRE: true,
                        }, }, {
                    POSITION: [   5,    8.5,   -1.6,     8,      0,      0,      0,   ], 
                        }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     180,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };

        exports.auto3 = { 
            PARENT: [exports.genericTank],
            LABEL: 'Auto-3',
            DANGER: 6,
            FACING_TYPE: 'autospin',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     8,      0,      0,     190, 0], 
                    TYPE: exports.auto3gun,
                        }, {
                POSITION: [  11,     8,      0,     120,    190, 0], 
                    TYPE: exports.auto3gun,
                        }, {
                POSITION: [  11,     8,      0,     240,    190, 0], 
                    TYPE: exports.auto3gun,
                        },
            ],
        };
            exports.auto5 = {
                PARENT: [exports.genericTank],
                LABEL: 'Auto-5',
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     8,      0,      0,     190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,      72,    190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,     144,    190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,     216,    190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,     288,    190, 0], 
                        TYPE: exports.auto5gun,
                            },
                ],
            };
            exports.heavy3 = {
                BODY: {
                    SPEED: base.SPEED * 0.95,
                },
                PARENT: [exports.genericTank],
                LABEL: 'Mega-3',
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  14,     8,      0,      0,     190, 0], 
                        TYPE: exports.heavy3gun,
                            }, {
                    POSITION: [  14,     8,      0,     120,    190, 0], 
                        TYPE: exports.heavy3gun,
                            }, {
                    POSITION: [  14,     8,      0,     240,    190, 0], 
                        TYPE: exports.heavy3gun,
                            },
                ],
            };
            exports.tritrap = {
                LABEL: '',
                BODY: {
                    SPEED: base.SPEED * 1.1,
                },
                PARENT: [exports.genericTank],
                DANGER: 6,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  12,     8,      0,      0,     190, 0], 
                        TYPE: exports.tritrapgun,
                            }, {
                    POSITION: [  12,     8,      0,     120,    190, 0], 
                        TYPE: exports.tritrapgun,
                            }, {
                    POSITION: [  12,     8,      0,     240,    190, 0], 
                        TYPE: exports.tritrapgun,
                            },
                ],
            };
            exports.sniper3 = { 
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: '',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.6,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.25,
                },
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  13,     8,      0,      0,     170, 0], 
                        TYPE: exports.sniper3gun,
                            }, {
                    POSITION: [  13,     8,      0,     120,    170, 0], 
                        TYPE: exports.sniper3gun,
                            }, {
                    POSITION: [  13,     8,      0,     240,    170, 0], 
                        TYPE: exports.sniper3gun,
                            },
                ],
            };
            exports.auto4 = { 
                PARENT: [exports.genericTank],
                DANGER: 5,
                LABEL: 'Auto-4',
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  13,     6,      0,      45,    160, 0], 
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     135,    160, 0], 
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     225,    160, 0],
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     315,    160, 0],
                        TYPE: exports.auto4gun,
                            },
                ],
            };
            
        exports.flanktrap = {
            PARENT: [exports.genericTank],
            LABEL: 'Trap Guard',
            STAT_NAMES: statnames.generic,
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  13,     8,      1,      0,      0,     180,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, },
            ],
        };
            exports.guntrap = {
                PARENT: [exports.genericTank],
                LABEL: 'Gunner Trapper',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    FOV: base.FOV * 1.25,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,    11,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [  13,    11,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,    11,     1.7,    13,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.fast, g.halfrecoil]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
            exports.bushwhack = {
                PARENT: [exports.genericTank],
                LABEL: 'Snipe Guard',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7, 
                    FOV: base.FOV * 1.2,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  13,    8.5,     1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,    8.5,    1.7,    13,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };

// Upgrade Page


exports.basic.UPGRADES_TIER_1 = [exports.twin, exports.sniper, exports.machine, exports.trapper, exports.flank, exports.director, /*exports.basicCeption*/];
// ceptions
exports.basicCeption.UPGRADES_TIER_2 = [exports.twinCeption, exports.trapCeption, exports.sniperCeption]
exports.trapCeption.UPGRADES_TIER_1 = [exports.triTrapCeption]
//-------------------
        exports.basic.UPGRADES_TIER_3 = [exports.single];
                exports.single.UPGRADES_TIER_3 = [exports.twinsingle, exports.bonfire]
    exports.basic.UPGRADES_TIER_2 = [exports.smash];
        exports.smash.UPGRADES_TIER_3 = [exports.megasmash, exports.spike, exports.autosmash];

    exports.twin.UPGRADES_TIER_2 = [exports.double, exports.bent, exports.twingrd, exports.gunner, exports.hexa];
        exports.twin.UPGRADES_TIER_3 = [exports.triple, exports.infector];
        exports.double.UPGRADES_TIER_3 = [exports.tripletwin, exports.split, exports.autodouble, exports.bentdouble];
        exports.bent.UPGRADES_TIER_3 = [exports.penta, exports.spread, exports.benthybrid, exports.bentdouble, exports.triple];
        exports.penta.UPGRADES_TIER_3 = [exports.penta_uzi]
        exports.gunner.UPGRADES_TIER_3 = [exports.autogunner, exports.nailgun, exports.auto4,exports.machinegunner];

    exports.sniper.UPGRADES_TIER_2 = [exports.assassin, exports.hunter, exports.mini, exports.hearth];
        exports.sniper.UPGRADES_TIER_3 = [exports.bushwhack];
        exports.assassin.UPGRADES_TIER_3 = [exports.ranger, exports.falcon];
        exports.hunter.UPGRADES_TIER_3 = [exports.preda, exports.poach, exports.sidewind];
        exports.trapper.UPGRADES_TIER_3 = [exports.autotrapper, exports.engineer, exports.boomer, exports.fire];
               exports.fire.UPGRADES_TIER_3 = [exports.riot]
   
    exports.machine.UPGRADES_TIER_2 = [exports.destroy, exports.artillery, exports.mini, exports.gunner];
        exports.machine.UPGRADES_TIER_3 = [exports.spray];
            exports.spray.UPGRADES_TIER_1 = [exports.sprey]
        exports.destroy.UPGRADES_TIER_3 = [exports.anni, exports.hybrid, exports.construct, exports.shotgun2, exports.bonfire];
        exports.artillery.UPGRADES_TIER_3 = [exports.mortar, exports.spread, exports.hiveshooter, exports.skimmer];
        exports.hiveshooter.UPGRADES_TIER_3 = [exports.twinhiveshoot, exports.hiveliner, exports.f_hive, exports.whiveshooter]
        exports.mini.UPGRADES_TIER_3 = [exports.stream, exports.nailgun, exports.twinmini];

    exports.flank.UPGRADES_TIER_2 = [exports.hexa, exports.campfire, exports.tri, exports.auto3, exports.flanktrap];
        exports.flank.UPGRADES_TIER_3 = [];
        exports.tri.UPGRADES_TIER_3 = [exports.fighter, exports.booster, exports.falcon, exports.bomber, exports.autotri];
        exports.hexa.UPGRADES_TIER_3 = [exports.octo, exports.hexatrap];
        exports.auto3.UPGRADES_TIER_3 = [exports.auto5, exports.heavy3, exports.auto4];
        exports.flanktrap.UPGRADES_TIER_3 = [exports.bushwhack, exports.guntrap, exports.fortress, exports.bomber];

    exports.director.UPGRADES_TIER_2 = [exports.overseer, exports.cruiser];
        exports.director.UPGRADES_TIER_3 = [exports.factory];
            exports.factory.UPGRADES_TIER_3 = [exports.station]
        exports.overseer.UPGRADES_TIER_3 = [exports.overlord, exports.overtrap, exports.overgunner];  
        exports.underseer.UPGRADES_TIER_3 = [exports.necromancer];
        exports.cruiser.UPGRADES_TIER_3 = [exports.carrier, exports.battleship, exports.fortress];

    exports.bonfire.UPGRADES_TIER_3 = [
        exports.campfire,
        exports.inferno
    ];


    /*exports.smash.UPGRADES_TIER_3 = [exports.megasmash, exports.spike, exports.autosmash];
            
    exports.twin.UPGRADES_TIER_2 = [exports.double, exports.bent, exports.triple, exports.hexa];
        exports.double.UPGRADES_TIER_3 = [exports.tripletwin, exports.autodouble];
        exports.bent.UPGRADES_TIER_3 = [exports.penta, exports.benthybrid];
        exports.triple.UPGRADES_TIER_3 = [exports.quint];

    exports.sniper.UPGRADES_TIER_2 = [exports.assassin, exports.overseer, exports.hunter, exports.builder];
        exports.assassin.UPGRADES_TIER_3 = [exports.ranger];
        exports.overseer.UPGRADES_TIER_3 = [exports.overlord, exports.battleship
            , exports.overtrap, exports.necromancer, exports.factory, exports.fortress];
        exports.hunter.UPGRADES_TIER_3 = [exports.preda, exports.poach];
        exports.builder.UPGRADES_TIER_3 = [exports.construct, exports.autobuilder];
        
    exports.machine.UPGRADES_TIER_2 = [exports.destroy, exports.gunner, exports.artillery];
        exports.destroy.UPGRADES_TIER_3 = [exports.anni, exports.hybrid];
        exports.gunner.UPGRADES_TIER_3 = [exports.autogunner, exports.mortar, exports.stream];
        exports.artillery.UPGRADES_TIER_3 = [exports.mortar, exports.spread, exports.skimmer];
        exports.machine.UPGRADES_TIER_3 = [exports.spray];

    exports.flank.UPGRADES_TIER_2 = [exports.hexa, exports.tri, exports.auto3, exports.flanktrap];
        exports.hexa.UPGRADES_TIER_3 = [exports.octo];
        exports.tri.UPGRADES_TIER_3 = [exports.booster, exports.fighter, exports.bomber, exports.autotri];
        exports.auto3.UPGRADES_TIER_3 = [exports.auto5, exports.heavy3];
        exports.flanktrap.UPGRADES_TIER_3 = [exports.guntrap, exports.fortress, exports.bomber];*/

// NPCS:
exports.crasher = {
    TYPE: 'crasher',
    LABEL: 'Crasher',
    COLOR: 5,
    SHAPE: 3,
    SIZE: 5,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 5,
        ACCEL: 0.01,
        HEALTH: 0.5,
        DAMAGE: 5,
        PENETRATION: 2,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
};
// sentinels (these crash in my coca cola)
exports.sentinel = {
    PARENT: [exports.genericTank],
    TYPE: 'crasher',
    LABEL: 'Sentinel',
    DANGER: 3,
    COLOR: 14,
    SHAPE: 5,
    SIZE: 16,
    SKILL: skillSet({
        rld: 0.5,
        dam: 0.8, 
        pen: 0.8,
        str: 0.1,
        spd: 1,
        atk: 0.5,
        hlt: 0,
        shi: 0,
        rgn: 0.7,
        mob: 0,        
    }),
    VALUE: 6667,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'minion', 'canRepel'],
    AI: { NO_LEAD: true, },
    BODY: {
        FOV: 0.5,
        ACCEL: 0.006,
        DAMAGE: base.DAMAGE * 2,
        SPEED: base.SPEED * 0.5,
        HEALTH: 36
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothToTarget',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    BUFF_VS_FOOD: true,
    GIVE_KILL_MESSAGE: true,
};
exports.sentinelLauncher = (() => {
  exports.sentinelMissile = {
    PARENT: [exports.missile],
    LABEL: '',
    GUNS: [
      {
        POSITION: [15, 8, 1, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.thruster]),
          TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true }], AUTOFIRE: true
        }
      },
      {
        POSITION: [15, 8, 1, 0, 0, 140, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.thruster]),
          TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true }], AUTOFIRE: true
        }
      },
      {
        POSITION: [15, 8, 1, 0, 0, 220, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.thruster]),
          TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true }], AUTOFIRE: true
        }
      }
    ]
  }
  return {
    PARENT: [exports.sentinel],
    GUNS: [
       {
        POSITION: [15, 13, 1.32307692308, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.skim, g.fake, [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]),
          TYPE: exports.bullet
        }
      }, {
        POSITION: [3, 17.2, 0.8, 15, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.skim]),
          TYPE: exports.sentinelMissile
        }
      },
      {
        POSITION: [13.5, 17.2, 0.2, 4.5, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.skim, g.fake, [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]),
          TYPE: exports.bullet
        }
      },
    ]
  }
})();
exports.sentinelMinigun = {
  PARENT: [exports.sentinel],
  GUNS: [
    {
      POSITION: [15, 6, 1, 0, 3.25, 0, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.mini]),
        TYPE: exports.bullet
      }
    },
    {
      POSITION: [13, 10, 0.6, 0, 3.25, 0, 0.5],
    },
    {
      POSITION: [15, 6, 1, 0, -3.25, 0, 0],
       PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.mini]),
        TYPE: exports.bullet
      }
    },
    {
      POSITION: [13, 10, 0.6, 0, -3.25, 0, 0.5],
    },
    {
      POSITION: [21, 8, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.mini]),
        TYPE: exports.bullet
      }
    },{
      POSITION: [19, 8, 1, 0, 0, 0, 0.333],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.mini]),
        TYPE: exports.bullet
      }
    },{
      POSITION: [17, 8, 1, 0, 0, 0, 0.667],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.mini]),
        TYPE: exports.bullet
      }
    }
  ]
}
// sentries
exports.sentry = {
    PARENT: [exports.genericTank],
    TYPE: 'crasher',
    LABEL: 'Sentry',
    DANGER: 3,
    COLOR: 5,
    SHAPE: 3,
    SIZE: 15,
    SKILL: skillSet({
        rld: 0.5,
        dam: 0.8, 
        pen: 0.8,
        str: 0.1,
        spd: 1,
        atk: 0.5,
        hlt: 0,
        shi: 0,
        rgn: 0.7,
        mob: 0,        
    }),
    VALUE: 1500,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal', 'canRepel'],
    AI: { NO_LEAD: true, },
    BODY: {
        FOV: 2,
        ACCEL: 0.006,
        DAMAGE: base.DAMAGE * 2,
        SPEED: base.SPEED * 0.5,
        HEALTH: 12
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothToTarget',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    BUFF_VS_FOOD: true,
    GIVE_KILL_MESSAGE: true,
};
exports.celTrapTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    AUTOFIRE: true,
    BODY: {
        FOV: 0.5,
    },
    INDEPENDENT: true,
    CONTROLLERS: ['nearestDifferentMaster'], 
    COLOR: 16,
    AI: {
        SKYNET: true,
        FULL_VIEW: true,
    },
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  16,    14,      1,      0,      0,      0,      0,   ],
            }, {
        POSITION: [   4,    14,     1.8,    16,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trapturret, g.lowpower, g.fast, g.halfreload, g.halfreload, [1.5, 1, 1, 1, 4, 2, 2, 1, 1, 1, 1, 1, 1]]),
                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap, AUTOFIRE: true
            }, },
    ],
};
let eternalTrapTurretArray = [];
for (let i = 0; i < 11; i++) {
  eternalTrapTurretArray.push({
    POSITION: [6, 9, 0, i * (360 / 11) + 360 / 11 / 2, 0, 0],
    TYPE: [
      exports.celTrapTurret,
      { CONTROLERS: ["nearestDifferentMaster"] },
    ],
  });
}
//ctta = celestialtrapturretarray
let ctta = []
for (let i = 0.5; i < 9; i++) {
  ctta.push({
    POSITION: [6, 8.5, 0, (360 * i) / 9, 0, 0],
    TYPE: exports.celTrapTurret
  })
}
exports.sentrySwarm = {
    PARENT: [exports.sentry],
    DANGER: 3,
    GUNS: [{
        POSITION: [    7,    14,    0.6,     7,     0,    180,     0,  ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
            TYPE: exports.swarm,
            COLOR_OVERRIDE: 5,
            STAT_CALCULATOR: gunCalcNames.swarm,     
        }, },
    ],
};
exports.sentrySwarmtr = {
    PARENT: [exports.sentry],
    DANGER: 3,
    GUNS: [{
        POSITION: [    7,    14,    0.6,     7,     0,    180,     0,  ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil, g.halfreload]),
            TYPE: exports.swarm,
            COLOR_OVERRIDE: 5,
            STAT_CALCULATOR: gunCalcNames.swarm,     
        }, },
    ],
};
exports.sentryGun = makeAuto(exports.sentry, 'Sentinel', { type: exports.heavy3gun, size: 12, });
exports.sentryTrap = {
  PARENT: [exports.sentry],
  TURRETS: [
    {
      POSITION: [12, 0, 0, 180, 360, 1],
      TYPE: exports.trapTurret
    }
  ]
}

exports.sentryFactory = (() => {
  exports.sentryBabyDrone = {
    PARENT: [exports.drone],
    BODY: {
      HEALTH: 6,
      DAMAGE: 1.2,
      SPEED: 1.233
    },
    DRAW_HEALTH: true,
    TURRETS: [
      {
        POSITION: [10, 0, 0, 0, 0, 1],
        TYPE: [exports.drone, { COLOR: 5 }]
      }
    ]
  }
  exports.sentryBaby = {
    PARENT: [exports.minion],
    LABEL: 'Sentry Minion',
    SHAPE: 3,
    DRAW_HEALTH: true,
    BODY: {
        FOV: 0.5,
        ACCEL: 0.006,
        DAMAGE: base.DAMAGE * 2,
        SPEED: base.SPEED * 0.5,
    },
    GUNS: [
      {
        POSITION: [ 6.2, 16, 1.5, 5, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.drone, [1, 1, 1, 1.5, 3, 0.5, 0.76, 1, 1, 1, 1, 1, 1]]),
          TYPE: exports.sentryBabyDrone, MAX_CHILDREN: 1, AUTOFIRE: true
        }
      }
    ]
  }
  return {
    PARENT: [exports.sentry],
    GUNS: [
      {
        POSITION: [6.2, 12, 1.5, 5, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.factory, [1, 1, 1, 1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1]]),
          TYPE: exports.sentryBaby, AUTOFIRE: true, MAX_CHILDREN: 3
        }
      }
    ]
  }
})();
exports.sentryDirector = (() => {
  exports.sentryDrone = {
    PARENT: [exports.drone],
    BODY: {
      HEALTH: 6,
      DAMAGE: 0.25,
      SPEED: 1.35
    },
    DRAW_HEALTH: true
  }
  return {
    PARENT: [exports.sentry],
    GUNS: [{
      POSITION: [ 6, 12, 1.2,  8,  0,  180,  0 ],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.drone]),
          TYPE: exports.sentryDrone, AUTOFIRE: true, MAX_CHILDREN: 3
      }
    }]
  }
})();
exports.sentryAnni = (() => {
  exports.sentryBullet = {
    PARENT: [exports.bullet],
  }
  return {
    PARENT: [exports.sentry],
    LABEL: "Sentinel",
    GUNS: [{
      POSITION: [ 6, 15, 1.2,  8,  0,  0,  0 ],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni]),
          TYPE: exports.sentryBullet
      }
    }]
  }
})();
exports.miniboss = {
    PARENT: [exports.genericTank],
    TYPE: 'miniboss',
    DANGER: 6,
    SIZE: 35,
    SKILL: skillSet({
        rld: 0.7,
        dam: 0.5, 
        pen: 0.8,
        str: 0.8,
        spd: 0.2,
        atk: 0.3,
        hlt: 1,
        shi: 0.7,
        rgn: 0.7,
        mob: 0,        
    }),
    LEVEL: 45,
    CONTROLLERS: ['nearestDifferentMaster', 'minion', 'canRepel', 'bossRushAI'],
    AI: { NO_LEAD: true, },
    BODY: {
      SPEED: 1.4,
      HEALTH: 500,
      FOV: 2
    },
    VALUE: 1.5 * 10e4,
    FACING_TYPE: 'autospin',
    HITS_OWN_TYPE: 'boss',
    ACCEPTS_SCORE: false,
    BROACAST_MESSAGE: 'Boss just died',
};

exports.miniboss2 = {
    PARENT: [exports.genericTank],
    TYPE: 'miniboss',
    DANGER: 6,
    SKILL: skillSet({
        rld: 0.7,
        dam: 0.5, 
        pen: 0.8,
        str: 0.8,
        spd: 0.2,
        atk: 0.3,
        hlt: 1,
        shi: 0.7,
        rgn: 0.7,
        mob: 0,        
    }),
    LEVEL: 45,
    CONTROLLERS: ['nearestDifferentMaster', 'bossminion', 'canRepel'],
    AI: { NO_LEAD: true, },
    BODY: {
      SPEED: 1.4,
      HEALTH: 500,
      FOV: 2
    },
    VALUE: 1.5 * 10e4,
    FACING_TYPE: 'autospin',
    HITS_OWN_TYPE: 'boss',
    ACCEPTS_SCORE: false,
    BROACAST_MESSAGE: 'Boss just died',
};

exports.sentryhexagon = {
  PARENT: [exports.miniboss],
  LABEL: 'Sentry Hexagon',
  FACING_TYPE: 'autospin',
  BOSS_SPLIT_TYPE: 'sentryhexagon',
  SHAPE: 0,
  COLOR: 5,
  SIZE: 10,
  TURRETS: [
    {
      POSITION: [20, -17, 0, 0, 0, 1],
      TYPE: exports.sentryGun
    },{
      POSITION: [20, -17, 0, 60, 0, 1],
      TYPE: exports.sentrySwarmtr
    },{
      POSITION: [20, -17, 0, 120, 0, 1],
      TYPE: exports.sentryGun
    },{
      POSITION: [20, -17, 0, 180, 0, 1],
      TYPE: exports.sentrySwarmtr
    },{
      POSITION: [20, -17, 0, 240, 0, 1],
      TYPE: exports.sentryGun
    },{
      POSITION: [20, -17, 0, 300, 0, 1],
      TYPE: exports.sentrySwarmtr
    }
  ]
}
exports.sentryring = {
  PARENT: [exports.miniboss],
  LABEL: 'Sentry Ring',
  FACING_TYPE: 'autospin',
  BOSS_SPLIT_TYPE: 'sentryring',
  SHAPE: 0,
  COLOR: 5,
  SIZE: 10,
  TURRETS: [
    {
      POSITION: [20, 37, 0, 0, 0, 1],
      TYPE: exports.sentryGun
    },{
      POSITION: [20, 37, 0, 60, 0, 1],
      TYPE: exports.sentrySwarmtr
    },{
      POSITION: [20, 37, 0, 120, 0, 1],
      TYPE: exports.sentryGun
    },{
      POSITION: [20, 37, 0, 180, 0, 1],
      TYPE: exports.sentrySwarmtr
    },{
      POSITION: [20, 37, 0, 240, 0, 1],
      TYPE: exports.sentryGun
    },{
      POSITION: [20, 37, 0, 300, 0, 1],
      TYPE: exports.sentrySwarmtr
    },{
      POSITION: [20, -45, -15.6, 60, 0, 1],
      TYPE: exports.sentryGun
     },{
      POSITION: [20, -45, -15.6, 120, 0, 1],
      TYPE: exports.sentrySwarmtr
    },{
      POSITION: [20, -45, -15.6, 180, 0, 1],
      TYPE: exports.sentryGun
    },{
      POSITION: [20, -45, -15.6, 240, 0, 1],
      TYPE: exports.sentrySwarmtr
    },{
      POSITION: [20, -45, -15.6, 300, 0, 1],
      TYPE: exports.sentryGun
    },{
      POSITION: [20, -45, -15.6, 0, 0, 1],
      TYPE: exports.sentrySwarmtr
    },{
      POSITION: [20, -45, 15.6, 60, 0, 1],
      TYPE: exports.sentryGun
    },{
      POSITION: [20, -45, 15.6, 120, 0, 1],
      TYPE: exports.sentrySwarmtr
    },{
      POSITION: [20, -45, 15.6, 180, 0, 1],
      TYPE: exports.sentryGun
    },{
      POSITION: [20, -45, 15.6, 240, 0, 1],
      TYPE: exports.sentrySwarmtr
    },{
      POSITION: [20, -45, 15.6, 300, 0, 1],
      TYPE: exports.sentryGun
    },{
      POSITION: [20, -45, 15.6, 0, 0, 1],
      TYPE: exports.sentrySwarmtr
    }
  ]
}
// exports.sentrypentagon = {
//   PARENT: []
// }
exports.ablgminiboss = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    SKILL: skillSet({
        rld: 0.7,
        dam: 0.5, 
        pen: 0.8,
        str: 0.8,
        spd: 0.2,
        atk: 0.3,
        hlt: 1,
        shi: 0.7,
        rgn: 0.7,
        mob: 0,        
    }),
    LEVEL: 45,
    CONTROLLERS: ['nearestDifferentMaster', 'bossminion', 'canRepel', 'bossRushAI'],
    AI: { NO_LEAD: true, },
    BODY: {
      SPEED: 1.4,
      HEALTH: 150,
      FOV: 2
    },
    SIZE: 35,
    VALUE: 1.5 * 10e4,
    HITS_OWN_TYPE: 'boss',
    BROACAST_MESSAGE: 'Boss just died',
};
exports.abyssling = {
  PARENT: [exports.ablgminiboss], 
  LABEL: 'Abyssling',
  SHAPE: 6,
  COLOR: 37,
  BODY: {
    SPEED: 1.35,
  },
  HAS_NO_RECOIL: true,
  DRAW_HEALTH: true,
  GUNS: [{
      POSITION: [18, 9, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.morereload, g.power]),
        TYPE: exports.bullet
      }
    },],
  TURRETS: [{
    POSITION: [21.5, 0, 0, 0, 0, 0],
    TYPE: [exports.abysslingshell = {
      COLOR: 17,
      SHAPE: 6
    }]
  },
  {
    POSITION: [12.25, 0, 0, 0, 0, 1],
    TYPE: [exports.abysslingshell]
  },
  {
    POSITION: [10.75, 0, 0, 0, 0, 1],
    TYPE: [exports.abysslingbody = {
      COLOR: 37,
      SHAPE: 6
    }]
  }, {
    POSITION: [6.75, 0, 0, 0, 360, 1],
    TYPE: exports.autoTurret
  },
  {
    POSITION: [8, 8, 0, (360 * 1) / 6, 0, 0],
    TYPE: exports.abyssTrapTurret
  },{
    POSITION: [8, 8, 0, (360 * 2) / 6, 0, 0],
    TYPE: exports.abyssTrapTurret
  },{
    POSITION: [8, 8, 0, (360 * 3) / 6, 0, 0],
    TYPE: exports.abyssTrapTurret
  },{
    POSITION: [8, 8, 0, (360 * 4) / 6, 0, 0],
    TYPE: exports.abyssTrapTurret
  },{
    POSITION: [8, 8, 0, (360 * 5) / 6, 0, 0],
    TYPE: exports.abyssTrapTurret
  }
],
  CONTROLLERS: ['bot', 'minion', 'nearestDifferentMaster', 'mapAltToFire', 'canRepel']
}
exports.abysslingshard1 = {
  PARENT: [exports.genericTank],
  LABEL: 'Abyssling Shard Type Trapper',
  SHAPE: 6,
  TYPE: 'miniboss', 
  CAN_BE_ON_LEADERBOARD: false,
  COLOR: 37,
  VALUE: 270000,
  BODY: {
    SPEED: 1.35,
    HEALTH: 3500,
    DAMAGE: 3
  },
  HAS_NO_RECOIL: true,
  DRAW_HEALTH: true,
  TURRETS: [  
  {
    POSITION: [8, 8, 0, (360 * 0) / 6, 180, 0],
    TYPE: exports.abyssTrapTurret
  },
],
  CONTROLLERS: ['bot', 'minion', 'nearestDifferentMaster', 'mapAltToFire', 'canRepel']
}
exports.abysslingshard2 = {
  PARENT: [exports.genericTank],
  LABEL: 'Abyssling Shard Type Central',
  SHAPE: 6,
  TYPE: 'miniboss',
  CAN_BE_ON_LEADERBOARD: false,
  COLOR: 36,
  VALUE: 370000,
  BODY: {
    SPEED: 1.35,
    HEALTH: 5500,
    DAMAGE: 3
  },
  HAS_NO_RECOIL: true,
  DRAW_HEALTH: true,
  TURRETS: [
  {
    POSITION: [21.5, 0, 0, 0, 0, 0],
    TYPE: [exports.abysslingshell]
  },
  {
    POSITION: [12.25, 0, 0, 0, 0, 1],
    TYPE: [exports.abysslingshell]
  },
  {
    POSITION: [10.75, 0, 0, 0, 0, 1],
    TYPE: [exports.abysslingbody]
  }, {
    POSITION: [6.75, 0, 0, 0, 360, 1],
    TYPE: exports.autoTurret
  },
  {
    POSITION: [8, 8, 0, (360 * 0) / 6, 180, 0],
    TYPE: exports.abyssTrapTurret
  },
],  GUNS: [
    {
      POSITION: [18, 9, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.morereload, g.power]),
        TYPE: exports.bullet
      }
    } ],
  CONTROLLERS: ['bot', 'minion', 'nearestDifferentMaster', 'mapAltToFire', 'canRepel']
}

exports.abysslingP = {
  PARENT: [exports.ablgminiboss],
  LABEL: 'Abyssling',
  SHAPE: 6,
  COLOR: 36,
  BOSS_SPLIT_TYPE: 'abysslingshards',
  FACING_TYPE: 'locksFacing',
  BODY: {
    SPEED: 9.45,
    HEALTH: 230
  },
  VALUE: 540000,
  HAS_NO_RECOIL: true,
  DRAW_HEALTH: true,
  GUNS: [{
    POSITION: [11.5, 5, 1, 0, 0, (360 * 1) / 6, 0]
  },{
    POSITION: [11.5, 5, 1, 0, 0, (360 * 2) / 6, 0]
  },{
    POSITION: [11.5, 5, 1, 0, 0, (360 * 3) / 6, 0]
  },{
    POSITION: [11.5, 5, 1, 0, 0, (360 * 4) / 6, 0]
  },{
    POSITION: [11.5, 5, 1, 0, 0, (360 * 5) / 6, 0]
  },
  {
    POSITION: [1.5, 5, 1.3, 11.5, 0, (360 * 1) / 6, 0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.trap, g.pound, g.destroy]),
      TYPE: exports.trap
    }
  },{
    POSITION: [1.5, 5, 1.3, 11.5, 0, (360 * 2) / 6, 0.5],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.trap, g.pound, g.destroy]),
      TYPE: exports.trap
    }
  },{
    POSITION: [1.5, 5, 1.3, 11.5, 0, (360 * 3) / 6, 0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.trap, g.pound, g.destroy]),
      TYPE: exports.trap
    }
  },{
    POSITION: [1.5, 5, 1.3, 11.5, 0, (360 * 4) / 6, 0.5],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.trap, g.pound, g.destroy]),
      TYPE: exports.trap
    }
  },{
    POSITION: [1.5, 5, 1.3, 11.5, 0, (360 * 5) / 6, 0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.trap, g.pound, g.destroy]),
      TYPE: exports.trap
    }
  }, {
      POSITION: [18, 9, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.morereload, g.power]),
        TYPE: exports.bullet
      }
    },],
  TURRETS: [{
    POSITION: [21.5, 0, 0, 0, 0, 0],
    TYPE: [exports.abysslingshell]
  },
  {
    POSITION: [12.25, 0, 0, 0, 0, 1],
    TYPE: [exports.abysslingshell]
  },
  {
    POSITION: [10.75, 0, 0, 0, 0, 1],
    TYPE: [exports.abysslingbody]
  }, {
    POSITION: [6.75, 0, 0, 0, 360, 1],
    TYPE: exports.autoTurret
  }
 ],
}
exports.abysslingB = {
  PARENT: [exports.abyssling],
  VALUE: 540000,
  TYPE: 'miniboss',
  BOSS_SPLIT_TYPE: 'abysslingshards',
  CAN_BE_ON_LEADERBOARD: false,
  BODY: {
    SPEED: 5.3,
    HEALTH: 3500,
    DAMAGE: 3.5
  }
}
exports.abysslingSpawner = {
  PARENT: [exports.miniboss],
  LABEL: 'Abyssling Spawner',
  VALUE: 234333,
  CAN_BE_ON_LEADERBOARD: false,
  COLOR: 36,
  ALPHA: 0.4,
  BODY: {
    SPEED: 4,
    HEALTH: 1233,
    DAMAGE: 1.75
  },
  GUNS: [
    {
      POSITION: [14, 4.5, 1.4, 0, 0, (360 * 1) / 4, 4],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic]),
        TYPE: exports.abysslingB,
        MAX_CHILDREN: 1,
        AUTOFIRE: true
      }
    },
    {
      POSITION: [14, 4.5, 1.4, 0, 0, (360 * 2) / 4, 4],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic]),
        TYPE: exports.abysslingB,
        MAX_CHILDREN: 1,
        AUTOFIRE: true
      }
    },
    {
      POSITION: [14, 4.5, 1.4, 0, 0, (360 * 3) / 4, 4],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic]),
        TYPE: exports.abysslingB,
        MAX_CHILDREN: 1,
        AUTOFIRE: true
      }
    },
    {
      POSITION: [14, 4.5, 1.4, 0, 0, (360 * 4) / 4, 4],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic]),
        TYPE: exports.abysslingB,
        MAX_CHILDREN: 1,
        AUTOFIRE: true
      }
    }
  ]
}
exports.peacekeeper1 = {
  PARENT: [exports.miniboss2],
  LABEL: 'Peacekeeper',
  SHAPE: 3,
  VALUE: 190000,
  COLOR: 36,
  BODY: {
    DAMAGE: 3.5
  },
  FACING_TYPE: 'locksFacing',
  ACCEPTS_SCORE: false,
  GUNS: [
    {
      POSITION: [23, 8, 1, 0, 0, 0, 0],
      PROPERTIES: {
        HAS_NO_RECOIL: true,
        SHOOT_SETTINGS: combineStats([g.basic]),
        TYPE: exports.bullet
      }
    },
    {
      POSITION: [14, 10, 1.7, 0, 0, 180, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.thruster]),
        TYPE: exports.bullet
      }
    }
  ],
  TURRETS: [
    {
      POSITION: [12, 0, 0, 0, 360, 1],
      TYPE: exports.autoTurret
    }
  ]
}
exports.peacekeeper2 = {
  PARENT: [exports.miniboss2],
  LABEL: 'Peacekeeper',
  SHAPE: 3,
  VALUE: 275000,
  COLOR: 36,
  BODY: {
    DAMAGE: 3.5
  },
  FACING_TYPE: 'locksFacing',
  ACCEPTS_SCORE: false,
  GUNS: [
    {
      POSITION: [23, 8, 1, 0, 0, 0, 0],
      PROPERTIES: {
        HAS_NO_RECOIL: true,
        SHOOT_SETTINGS: combineStats([g.basic]),
        TYPE: exports.bullet
      }
    },
    {
      POSITION: [16, 14, 0.5715, 0, 0, 0, 0]
    },
    {
      POSITION: [15, 11, 1.7, 0, 0, 180, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.thruster]),
        TYPE: exports.bullet
      }
    }
  ],
  TURRETS: [
    {
      POSITION: [12, 0, 0, 0, 360, 1],
      TYPE: exports.autoTurret
    },
    {
      POSITION: [22.5, 0, 0, 0, 0, 0],
      TYPE: [exports.peacekeeperbody = {
        SHAPE: 3,
        INDEPENDENT: true,
        COLOR: 19
      }]
    }
  ]
}
exports.peacekeeper3 = {
  PARENT: [exports.miniboss2],
  LABEL: 'Peacekeeper',
  SHAPE: 3,
  VALUE: 375000,
  COLOR: 36,
  BODY: {
    DAMAGE: 3.5
  },
  FACING_TYPE: 'locksFacing',
  ACCEPTS_SCORE: false,
  GUNS: [
    {
      POSITION: [23, 8, 1, 0, 0, 0, 0],
      PROPERTIES: {
        HAS_NO_RECOIL: true,
        SHOOT_SETTINGS: combineStats([g.basic]),
        TYPE: exports.bullet
      }
    },
    {
      POSITION: [16, 14, 0.5715, 0, 0, 0, 0]
    },
    {
      POSITION: [22, 9, 1.7, 0, 0, 180, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.thruster]),
        TYPE: exports.bullet
      }
    },
    {
      POSITION: [15, 11, 1.7, 0, 0, 180, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.thruster]),
        TYPE: exports.bullet
      }
    }
  ],
  TURRETS: [
    {
      POSITION: [22.5, 0, 0, 0, 0, 0],
      TYPE: [exports.peacekeeperbody]
    }, {
      POSITION: [15, 0, 0, 0, 0, 1],
      TYPE: [exports.peacekeeperbody2 = {
        SHAPE: 3,
        COLOR: 36
      }]
    }, {
      POSITION: [13, 0, 0, 0, 360, 1],
      TYPE: exports.autoTurret
    },
  ]
}
// Rogue Celestials

exports.roguecele = {
    PARENT: [exports.genericTank],
    TYPE: 'tank',
    LABEL: "Rogue Celestial",
    DANGER: 50,
    SKILL: skillSet({
        rld: 1,
        dam: 1, 
        pen: 1,
        str: 1,
        spd: 1,
        atk: 1,
        hlt: 1,
        shi: 1,
        rgn: 1,
        mob: 1,        
    }),
    LEVEL: 45,
    SIZE: 45,
    SHAPE: 9, 
    CONTROLLERS: ['nearestDifferentMaster', 'bossminion', 'canRepel'],
    AI: { NO_LEAD: true, },
    BODY: {
       HEALTH: 725,
       DAMAGE: 14.4,
       SPEED:  base.SPEED * 0.12,
       FOV: 1.5,
        REGEN: base.REGEN * 0.05
    },
    VALUE: 1 * 10e5,
    FACING_TYPE: 'autospin',
    HITS_OWN_TYPE: 'tank',
    BROADCAST_MESSAGE: 'A Celestial has fallen!',
};
// Rogue Zaphkiel (Perseus)
exports.rogueZaphkiel = (() => {
  // Projectiles
  g.perseusBullet = [1.6, 1, 1, 1, 7, 0.65, 0.33, 1, 1, 1, 1, 1, 1];
  g.perseusMissile = [1.9, 1, 1, 1, 1.4, 1.2, 1.112, 1, 1, 1, 1, 1, 1];
  g.perseusEggDrone = [0.3, 1, 1, 0.6, 1, 0.52, 0.666, 1, 1, 1, 1, 1, 1];
  exports.perseusSquareSwarm = {
    PARENT: [exports.swarm],
    SHAPE: 4
  }
  exports.perseusMissile = {
    PARENT: [exports.missile],
    GUNS: [
        {
          POSITION: [21, 6, 1, 0, 0, 180, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.thruster]),
            TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true }], AUTOFIRE: true
        }
      },
      {
        POSITION: [8, 6, 0.6, 8, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm]),
          TYPE: [exports.perseusSquareSwarm, { PERSISTS_AFTER_DEATH: true }], AUTOFIRE: true,
          COLOR_OVERRIDE: 13
        }
      }
    ]
  }
  exports.perseusEggDrone = {
    PARENT: [exports.drone],
    SHAPE: 0,
    INDEPENDENT: true,
    
  }
  exports.perseusMissileLauncher = {
    PARENT: [exports.autoTurret],
    BODY: {
      FOV: 2
    },
    GUNS: [
      {
        POSITION: [21, 10, 1.5, 0, 0, 0, 0],
      }, {
        POSITION: [18, 18, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.skim, g.perseusMissile]),
          TYPE: exports.perseusMissile
        }
      }
    ]
  }
  exports.perseusBody1 = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 5,
    COLOR: 17,
    CONTROLLERS: ['slowspin'],
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    TURRETS: (() => {
      var tr = []
      for (let i = 0.5; i < 5; i++) {
        tr.push({
          POSITION: [8, 8.5, 0, (360 * i) / 5, 180, 0],
          TYPE: exports.perseusMissileLauncher
        })
      }
      return tr
    })()
  }
  exports.perseusBody2 = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 7,
    COLOR: 17,
    CONTROLLERS: ['reverseslowspin'],
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    GUNS: (() => {
      var gs = []
      for (let i = 0.5; i < 7; i++) {
        gs.push({
          POSITION: [6.5, 6, 1.4, 5.5, 0, (360 * i) / 7, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.sunchip, g.perseusEggDrone]),
            TYPE: exports.perseusEggDrone, 
            AUTOFIRE: true,
            COLOR_OVERRIDE: 6,
            MAX_CHILDREN: 4
          }
        })
      }
      return gs
    })()
  }
  return {
    PARENT: [exports.roguecele],
    NAME: "Perseus",
    COLOR: 17,
    TURRETS: (() => {
      var tr = []
      for (let i = 0.5; i < 9; i++) {
        tr.push({
          POSITION: [6.5, 9, 0, (360 * i) / 9, 0, 0],
          TYPE: exports.celTrapTurret
        })
      }
      tr.push({
        POSITION: [14.97, 0, 0, 0, 360, 1],
        TYPE: exports.perseusBody2
      },{
        POSITION: [8.6, 0, 0, 0, 360, 1],
        TYPE: exports.perseusBody1
      })
      return tr
    })(),
    GUNS: (() => {
      var gs = []
      for (let i = 0.5; i < 7; i++) {
        gs.push({
          POSITION: [0, 6, 1.4, 0, 0, (360 * i) / 7, 240],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.sunchip, g.perseusEggDrone]),
            TYPE: exports.perseusEggDrone, 
            AUTOFIRE: true,
            COLOR_OVERRIDE: 6,
            MAX_CHILDREN: 10
          }
        })
      }
      return gs
    })()
  }
})();
// JULIUS/ALVISS
exports.alviss = (() => {
  // STATS
  g.alvissSwarm = [3, 1, 1, 0.8, 1.2, 1.3, 1.112, 1, 1, 1, 1, 1, 1]
  g.alvissMissile = [2, 1, 1, 1, 1.3, 1.2, 1.112, 1, 1, 1, 1, 1, 1]
  // PROJECTILES
  exports.eggSwarm = {
    PARENT: [exports.swarm],
    SHAPE: 0
  }
  exports.alvissMissile = {
    PARENT: [exports.missile],
    GUNS: [
      {
        POSITION: [15, 6, 1, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.thruster]),
          TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true }], AUTOFIRE: true
        }
      }
    ]
  }
  // TURRETS
  exports.alvissMissileLauncher = {
    PARENT: [exports.auto4gun],
    LABEL: '',
    BODY: {
      FOV: 2
    },
    GUNS: [
      {
        POSITION: [21.75, 8, 1.4, 0, 0, 0, 0]
      }, {
        POSITION: [19.25, 15, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.skim, g.alvissMissile]),
          TYPE: exports.alvissMissile
        }
      }
    ]
  }
  exports.alvissEggSwarmLauncher = {
    PARENT: [exports.auto4gun],
    LABEL: '',
    GUNS: [
      {
        POSITION: [8.5, 10, 0.6, 6, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.alvissSwarm]),
          TYPE: exports.eggSwarm,
          COLOR_OVERRIDE: 6
        }
      }
    ]
  }
  exports.alvissBody1 = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 5,
    COLOR: 17,
    CONTROLLERS: ['slowspin'],
    SKILL: [0, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    TURRETS: (() => {
      var tr = []
      for (let i = 0.5; i < 5; i++) {
        tr.push({
          POSITION: [8, 8.5, 0, (360 * i) / 5, 180, 0],
          TYPE: exports.alvissMissileLauncher
        })
      }
      return tr
    })()
  }
  exports.alvissBody2 = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 7,
    COLOR: 17,
    CONTROLLERS: ['reverseslowspin'],
    SKILL: [0, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    TURRETS: (() => {
      var tr = []
      for (let i = 0.5; i < 7; i++) {
        tr.push({
          POSITION: [8, 8.5, 0, (360 * i) / 7, 180, 0],
          TYPE: exports.alvissEggSwarmLauncher
        })
      }
      return tr
    })()
  }
  return {
    PARENT: [exports.roguecele],
    NAME: 'Julius',
    COLOR: 17,
    TURRETS: (() => {
      var tr = []
      for (let i = 0.5; i < 9; i++) {
        tr.push({
          POSITION: [6.5, 9, 0, (360 * i) / 9, 0, 0],
          TYPE: exports.trapTurret
        })
      }
      tr.push({
        POSITION: [14.94, 0, 0, 0, 360, 1],
        TYPE: exports.alvissBody2
      }, {
        POSITION: [8.6, 0, 0, 0, 360, 1],
        TYPE: exports.alvissBody1
      })
      return tr
    })()
  }
})()
exports.rogueEgg = {
  PARENT: [exports.genericTank],
  SHAPE: 7,
  SIZE: 50,
  VALUE: 0,
  TYPE: 'egg',
  HITS_OWN_TYPE: 'tank',
  ACCEPTS_SCORE: false,
  BOSS_SPLIT_TYPE: "spawnBoss",
  CONTROLLERS: ['moveInCircles'],
  MOTION_TYPE: 'drift',
  FACING_TYPE: 'turnWithSpeed',
  BODY: {
    ACCELERATION: 0.005,
    HEALTH: 50,
    DAMAGE: 1
  }
}
/* Terrestrials */
exports.terrestrial = {
    PARENT: [exports.genericTank],
    TYPE: 'miniboss',
    LABEL: "Terrestrial",
    DANGER: 40,
    SKILL: skillSet({
        rld: 1,
        dam: 1, 
        pen: 1,
        str: 1,
        spd: 1,
        atk: 1,
        hlt: 1,
        shi: 1,
        rgn: 1,
        mob: 1,        
    }),
    LEVEL: 45,
    SIZE: 40,
    SHAPE: 7, 
    CONTROLLERS: ['nearestDifferentMaster', 'bossminion', 'canRepel'],
    AI: { NO_LEAD: true, },
    BODY: {
       HEALTH: 325,
       DAMAGE: 6,
       SPEED:  base.SPEED * 0.12 * 1.25,
       FOV: 1.5,
        REGEN: base.REGEN * 0.05
    },
    VALUE: 1e6,
    FACING_TYPE: 'autospin',
    HITS_OWN_TYPE: 'boss',
    BROADCAST_MESSAGE: 'A Semi-Celestial has fallen!',
};
// Gersemi
exports.gersemi = (() => {
  exports.gersemiST = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    AUTOFIRE: true,
    BODY: {
        FOV: 0.5,
    },
    INDEPENDENT: true,
    CONTROLLERS: ['nearestDifferentMaster'], 
    COLOR: 16,
    AI: {
        SKYNET: true,
        FULL_VIEW: true,
    },
    GUNS: [  {
        POSITION: [   7.5,    10,     0.6,    7.5,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.turret, g.power, g.pound]),
                TYPE: [exports.swarm, {BODY: {RANGE: 750}}]
            }, },
      ],
    };
    exports.gersemiGunTurret = {
      PARENT: [exports.genericTank],
      LABEL: 'Turret',
      AUTOFIRE: true,
      BODY: {
          FOV: 0.5,
      },
      INDEPENDENT: true,
      CONTROLLERS: ['nearestDifferentMaster'], 
      COLOR: 16,
      AI: {
          SKYNET: true,
          FULL_VIEW: true,
      },
      GUNS: [  {
          POSITION: [   16,    6,     1,    0,      0,      0,      0,   ], 
              PROPERTIES: {
                  SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.power, g.pound, g.gunner, g.puregunner, g.power, g.turret]),
                  TYPE: [exports.bullet, {BODY: {RANGE: 750}}]
              }, },
      ],
    };
 exports.gersemiBody1 = {
    PARENT: [exports.genericTank],
    LABEL: "",
    SHAPE: 3,
    COLOR: 1,
    CONTROLLERS: ["slowspin"],
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    TURRETS: (() => {
      let tr = []
      for (let i = 0.5; i < 3; i++) {
        tr.push({
            POSITION: [10, 8, 0, (360 * i) / 3, 180, 0],
            TYPE: [exports.gersemiGunTurret, { INDEPENDENT: true, AUTOFIRE: true, BODY: { FOV: 3 } }],
        })
      }
      return tr
    })()
 }
   exports.gersemiBody2 = {
    PARENT: [exports.genericTank],
    LABEL: "",
    SHAPE: 5,
    COLOR: 1,
    CONTROLLERS: ["reverseslowspin"],
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    TURRETS: (() => {
      let tr = []
      for (let i = 0.5; i < 5; i++) {
        tr.push({
            POSITION: [10, 8, 0, (360 * i) / 5, 180, 0],
            TYPE: [exports.gersemiST, { INDEPENDENT: true, AUTOFIRE: true, BODY: { FOV: 3 } }],
        })
      }
      return tr
    })()
  }
  return {
    PARENT: [exports.terrestrial],
    COLOR: 1,
    TURRETS: (() => {
      let tr = [
        {
          POSITION: [14.94, 0, 0, 0, 360, 1],
          TYPE: exports.gersemiBody2
        },
        {
          POSITION: [8.6, 0, 0, 0, 360, 1],
          TYPE: exports.gersemiBody1
        }
      ]
      for (let i = 0.5; i < 7; i++) {
        tr.push({
            POSITION: [6.5, 9, 0, (360 * i) / 7, 0, 0],
            TYPE: [exports.celTrapTurret, { INDEPENDENT: true, AUTOFIRE: true }],
        })
      }
      return tr
    })()
  }
})();
var terrestrialTrapTurretArray = []
for (let i = 0.5; i < 7; i++) {
    terrestrialTrapTurretArray.push({
        POSITION: [6.5, 9, 0, (360 * i) / 7, 0, 0],
        TYPE: [exports.celTrapTurret, { INDEPENDENT: true, AUTOFIRE: true }],
    })
  }
// Athena
exports.athena = (() => {
    var homingMissile = [exports.homingMiniMissile]
    exports.trianglechip = {
        PARENT: [exports.sunchip],
        INDEPENDENT: true,
        SHAPE: 3,
        BODY: {
            FOV: 4
        }
    }
    exports.homingMissileLauncher = {
        PARENT: [exports.auto4gun],
        LABEL: 'Homing Missile Launcher',
        GUNS: [
            {
                POSITION: [21, 20, 0.01, 0, 0, 0, 0]
            }, {
                POSITION: [18, 10, 1, 0, 0, 0, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.arty, g.skim, g.halfreload, g.halfreload, g.power]),
                    TYPE: homingMissile
                }
            }
        ]
    }
    exports.athenaBody1 = {
        PARENT: [exports.genericTank],
        LABEL: 'Athena Homing Missile Launcher Body',
        SHAPE: 5,
        COLOR: 40,
        SKILL: Array(10).fill(9),
        CONTROLLERS: ['slowspin'],
        TURRETS: (function(output=[]){
            for (let i = 0.5; i < 5; i++) {
                output.push({
                    POSITION: [10, 8, 0, i*(360/5), 180, 0],
                    TYPE: exports.homingMissileLauncher
                })
            }
            return output
        })()
    }
    exports.athenaBody2 = {
        PARENT: [exports.genericTank],
        LABEL: 'Athena Triangle Chip Spawner Body',
        SHAPE: 7,
        COLOR: 40,
        SKILL: Array(10).fill(9),
        CONTROLLERS: ['reverseslowspin'],
        GUNS: (function(output=[]){
            for (let i = 0.5; i < 7; i++) {
                output.push({
                    POSITION: [6, 6, 1.4, 5.5, 0, i*(360/7), 1/i],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, [0.1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]),
                        TYPE: exports.trianglechip,
                        AUTOFIRE: true,
                        COLOR_OVERRIDE: 2,
                        MAX_CHILDREN: 4
                    }
                })
            }
            return output
        })()
    }
    return {
        PARENT: [exports.terrestrial],
        NAME: 'Athena',
        COLOR: 40,
        TURRETS: [
            {
                POSITION: [14.9, 0, 0, 0, 360, 1],
                TYPE: exports.athenaBody2
            }, {
                POSITION: [8.6, 0, 0, 0, 360, 1],
                TYPE: exports.athenaBody1
            },
            ...terrestrialTrapTurretArray
        ]
    }
})()

// Eris
exports.rocketeerTurret = {
    PARENT: [exports.genericTank],
    LABEL: "Rocketeer",
    BODY: {
        FOV: 4,
    },
    CONTROLLERS: [
        "canRepel",
        "onlyAcceptInArc",
        "mapAltToFire",
        "nearestDifferentMaster",
    ],
    COLOR: 16,
    GUNS: [
        {
            POSITION: [10, 12.5, -0.7, 10, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.pound,
                    g.arty,
                    g.skim,
                    [3.2, 1.5, 1, 1, 1.8, 1.8, 1.6, 1.3, 2, 1, 1, 1, 1]
                ]),
                TYPE: exports.rocketeerMissile,
                STAT_CALCULATOR: gunCalcNames.sustained,
            },
        },
        {
            POSITION: [17, 18, 0.65, 0, 0, 0, 0],
        },
    ],
};
exports.eris = (() => {
  
  exports.erisBody1 = {
    PARENT: [exports.genericTank],
    LABEL: "",
    SHAPE: 5,
    COLOR: 5,
    CONTROLLERS: ["slowspin"],
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
     TURRETS: (() => {
      let tr = []
      for (let i = 0.5; i < 5; i++) {
        tr.push({
            POSITION: [10, 8, 0, (360 * i) / 5, 180, 0],
            TYPE: [exports.rocketeerTurret, { BODY: { FOV: 5 } }],
        })
      }
      return tr
    })()
  }
  exports.erisBody2 = {
    PARENT: [exports.genericTank],
    LABEL: "",
    SHAPE: 7,
    COLOR: 5,
    CONTROLLERS: ["reverseslowspin"],
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    GUNS: (() => {
      let gs = []
      for (let i = 0.5; i < 7; i++) {
        gs.push({/* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [6.5, 6, 1.4, 5, 0, (360 * i) / 7, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.factory, g.pound, g.destroy]),
                TYPE: [exports.minion, { INDEPENDENT: true, BODY: { FOV: 4, SPEED: base.SPEED * 1.3 } }],
                AUTOFIRE: true,
                MAX_CHILDREN: 2
            }
        })
      }
      return gs
    })()
  }
  return {
    PARENT: [exports.terrestrial],
    COLOR: 5,
     TURRETS: (() => {
      let tr = [
        {
          POSITION: [14.94, 0, 0, 0, 360, 1],
          TYPE: exports.erisBody2
        },
        {
          POSITION: [8.6, 0, 0, 0, 360, 1],
          TYPE: exports.erisBody1
        }
      ]
      for (let i = 0.5; i < 7; i++) {
        tr.push({
            POSITION: [6.5, 9, 0, (360 * i) / 7, 0, 0],
            TYPE: [exports.celTrapTurret, { INDEPENDENT: true, AUTOFIRE: true }],
        })
      }
      return tr
    })()
  }
})();
// Ares
exports.ares = (() => {
  exports.aresHive = {
    PARENT: [exports.hive],
    LABEL: 'Mini Hive',
    MOTION_TYPE: "slowdown",
    GUNS: (() => {
      var gs = []
      for (let i = 0; i < 3; i++) {
        gs.push({
          POSITION: [14, 9.5, 0.6, 0, 0, (360 * i) / 3, 1 / i],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
            TYPE: exports.bee,
            AUTOFIRE: true
          }
        })
      }
      return gs
    })()
  }
  exports.aresHiveTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Mini Swarmer',
    BODY: {
        FOV: 2,
    },
    CONTROLLERS: [
        "canRepel",
        "onlyAcceptInArc",
        "mapAltToFire",
        "nearestDifferentMaster",
    ],
    GUNS: [
      {
            POSITION: [14, 14, -1.2, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.halfreload, g.power, g.power, g.pound, g.destroy, g.hive]),
                TYPE: exports.aresHive,
            },
        },
        {
            POSITION: [15, 12, 1, 0, 0, 0, 0],
        },
    ]
  }
  exports.aresDrone = {
      PARENT: [exports.drone],
      SHAPE: 5,
      BODY: {
            HEALTH: 5,
            SPEED: 1.5
      },
      INDEPENDENT: true,
      DRAW_HEALTH: true
  }
  exports.aresBody1 = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 5,
    COLOR: 14,
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    CONTROLLERS: ["slowspin"],
    TURRETS: (()=> {
      var tr = []
      for (let i = 0.5; i < 5; i++) {
        tr.push({
          POSITION: [10, 8, 0, (360 * i) / 5, 180, 0],
          TYPE: exports.aresHiveTurret
        })
      }
      return tr
    })()
  }
  exports.aresBody2 = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 7,
    COLOR: 14,
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    CONTROLLERS: ["reverseslowspin"],
    GUNS: (() => {
      var gs = []
      for (let i = 0.5; i < 7; i++) {
        gs.push({
          POSITION: [11.6, 6, 1.4, 0, 0, (360 * i) / 7, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone]),
            TYPE: exports.aresDrone,
            AUTOFIRE: true,
            MAX_CHILDREN: 3
          }
        })
      }
      return gs
    })()
  }
  return {
    PARENT: [exports.terrestrial],
    NAME: 'Ares',
      COLOR: 14,
    TURRETS: (() => {
      let tr = [
        {
          POSITION: [14.94, 0, 0, 0, 360, 1],
          TYPE: exports.aresBody2
        },
        {
          POSITION: [8.6, 0, 0, 0, 360, 1],
          TYPE: exports.aresBody1
        }
      ]
      for (let i = 0.5; i < 7; i++) {
        tr.push({
            POSITION: [6.5, 9, 0, (360 * i) / 7, 0, 0],
            TYPE: [exports.trapTurret, { INDEPENDENT: true, AUTOFIRE: true }],
        })
      }
      return tr
    })()
  }
})()
// Ezekiel
exports.ezekiel = (() => {
  exports.ezekielBody1 = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 3,
    COLOR: 2,
    SKILL: [0, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    CONTROLLERS: ["slowspin"],
    TURRETS: (()=> {
      var tr = []
      for (let i = 0.5; i < 3; i++) {
        tr.push({
          POSITION: [10, 8, 0, (360 * i) / 3, 180, 0],
          TYPE: [exports.auto4gun, {PARENT: [exports.skimmer]}]
        })
      }
      return tr
    })()
  }
  exports.ezekielBody2 = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 5,
    COLOR: 2,
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    CONTROLLERS: ["reverseslowspin"],
    GUNS: (() => {
      var gs = []
      for (let i = 0.5; i < 5; i++) {
        gs.push({
          POSITION: [11.6, 6, 1.4, 0, 0, (360 * i) / 5, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone]),
            TYPE: [exports.drone, { INDEPENDENT: true }],
            AUTOFIRE: true,
            MAX_CHILDREN: 3
          }
        })
      }
      return gs
    })()
  }
  return {
    PARENT: [exports.terrestrial],
    NAME: 'Ezekiel',
    COLOR: 2,
    TURRETS: (() => {
      let tr = [
        {
          POSITION: [14.94, 0, 0, 0, 360, 1],
          TYPE: exports.ezekielBody2
        },
        {
          POSITION: [8.6, 0, 0, 0, 360, 1],
          TYPE: exports.ezekielBody1
        }
      ]
      for (let i = 0.5; i < 7; i++) {
        tr.push({
            POSITION: [6.5, 9, 0, (360 * i) / 7, 0, 0],
            TYPE: [exports.trapTurret, { INDEPENDENT: true, AUTOFIRE: true }],
        })
      }
      return tr
    })()
  }
})();
// Semi Celestials 
exports.semicele = {
    PARENT: [exports.genericTank],
    TYPE: 'miniboss',
    LABEL: "Semi-Celestial",
    DANGER: 30,
    SKILL: skillSet({
        rld: 1,
        dam: 1, 
        pen: 1,
        str: 1,
        spd: 1,
        atk: 1,
        hlt: 1,
        shi: 1,
        rgn: 1,
        mob: 1,        
    }),
    LEVEL: 45,
    SIZE: 35,
    SHAPE: 6, 
    CONTROLLERS: ['nearestDifferentMaster', 'bossminion', 'canRepel'],
    AI: { NO_LEAD: true, },
    BODY: {
       HEALTH: 215,
       DAMAGE: 10.4,
       SPEED:  base.SPEED * 0.12 * 1.5,
       FOV: 1.5,
        REGEN: base.REGEN * 0.06
    },
    VALUE: 1 * 7.5e5,
    FACING_TYPE: 'autospin',
    HITS_OWN_TYPE: 'boss',
    BROADCAST_MESSAGE: 'A Semi-Celestial has fallen!',
};
exports.autoSpray = {
  PARENT: [exports.autoTurret],
  LABEL: "",
  BODY: {
    FOV: 2,
  },
  GUNS: [
    {
      POSITION: [18, 10, 1.5, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner]),
        TYPE: exports.bullet,
      },
    },
  ],
};
// Groxphy
exports.groxphy = (() => {
  g.groxphyMinion = [6.5, 1, 1, 1.4, 7.552, 0.776, 0.887, 1, 1, 1, 1, 1, 1];
  g.groxphyMinionMissile = [1.44, 1, 1, 1, 1.565, 1.222, 1.223, 1, 1, 1, 1, 1, 1];
  exports.groxphyMinion = {
    PARENT: [exports.minion],
    LABEL: '',
    SHAPE: 4,
    HAS_NO_RECOIL: true,
    INDEPENDENT: true,
    BODY: {
      FOV: 2,
      SPEED: 1.3
    },
    GUNS: [
      {
        POSITION: [8, 10, 1.7, 10, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.skim, g.groxphyMinionMissile, g.fake]),
          TYPE: exports.bullet
        }
      },
      {
        POSITION: [16, 17, 1, 0, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.skim, g.groxphyMinionMissile]),
          TYPE: exports.missile
        }
      }
    ]
  }
  exports.groxphyBody1 = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 4,
    COLOR: 4,
    CONTROLLERS: ['reverseslowspin'],
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    GUNS: (() => {
      var gs = []
      for (let i = 0; i < 4; i++) {
        gs.push({
          POSITION: [5.5, 10, 1.4, 7, 0, (360 * i) / 4, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory, g.groxphyMinion]),
            TYPE: exports.groxphyMinion,
            COLOR_OVERRRIDE: 13,
            MAX_CHILDREN: 3,
            AUTOFIRE: true
          }
        })
      }
      return gs
    })()
  }
  return {
    PARENT: [exports.semicele],
    NAME: 'Groxphy',
    COLOR: 4,
    TURRETS: (() => {// the spinning is in a 360 angle
      var tr = [
        {
          POSITION: [10, 0, 0, 0, 360, 1],
          TYPE: exports.groxphyBody1
        }
      ]
      for (let i = 0; i < 6; i++) {
        tr.push({
          POSITION: [8, 8.5, 0, (360 * i) / 6, 180, 0],
          TYPE: exports.autoSpray
        })
      }
      return tr
    })()
  }
})()
// Phobos
exports.phobos = (() => {
  g.phobosMissile = [2.5, 1, 1, 1, 1.5, 2.5, 2, 3, 1, 1, 1, 1, 1]
   g.phobosSwarm = [4, 1, 1, 1, 1.2, 1.33, 1.211, 1, 1, 1, 1, 1, 1]
  //g.tutorial = [reload, recoil, shudder, size, health, damage, penetration, speed, max, range spray, resist]
  // g.pound, g.arty, g.skim (<10 and in decimals)
  exports.phobosPentaSwarm = {
    PARENT: [exports.swarm],
    SHAPE: 5
  }
  exports.phobosMissile = {
    PARENT: [exports.missile],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  16,     8,      0.6,      0,     -3,    -210,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.twin, g.bent, g.halfreload, g.halfreload, g.halfreload]),
                            TYPE: [exports.phobosPentaSwarm, { PERSISTS_AFTER_DEATH: true }],
                            AUTOFIRE: true,
                            COLOR_OVERRIDE: 14
                        }, }, {
                    POSITION: [  16,     8,      0.6,      0,      3,     210,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.twin, g.bent, g.halfreload, g.halfreload, g.halfreload]),
                            TYPE: [exports.phobosPentaSwarm, { PERSISTS_AFTER_DEATH: true }],
                            AUTOFIRE: true,
                            COLOR_OVERRIDE: 14
                        }, }, {
                    POSITION: [  19,     8,      0.6,      0,     -2,    -195,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.twin, g.bent, g.halfreload, g.halfreload, g.halfreload]),
                            TYPE: [exports.phobosPentaSwarm, { PERSISTS_AFTER_DEATH: true }],
                            AUTOFIRE: true,
                            COLOR_OVERRIDE: 14
                        }, }, {
                    POSITION: [  19,     8,      0.6,      0,      2,     195,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.twin, g.bent, g.halfreload, g.halfreload, g.halfreload]),
                            TYPE: [exports.phobosPentaSwarm, { PERSISTS_AFTER_DEATH: true }],
                            AUTOFIRE: true,
                            COLOR_OVERRIDE: 14
                        }, }, {
                    POSITION: [  22,     8,      0.6,      0,      0,      180,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.twin, g.bent, g.halfreload, g.halfreload, g.halfreload]),
                            TYPE: [exports.phobosPentaSwarm, { PERSISTS_AFTER_DEATH: true }],
                            AUTOFIRE: true,
                            COLOR_OVERRIDE: 14
                        }, },
                ],
  }
  exports.phobosMissileLauncher = {
    PARENT: [exports.auto3gun],
    LABEL: '',
    GUNS: [
      {
        POSITION: [21, 10, 1.5, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.skim, g.phobosMissile, g.fake]),
          TYPE: exports.bullet
        }
      },
      {
        POSITION: [19, 16, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.skim, g.phobosMissile]),
          TYPE: exports.phobosMissile
        }
      },
      {
        POSITION: [17, 0.15, 100, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.skim, g.phobosMissile, g.fake]),
          TYPE: exports.bullet
        }
      },
    ]
  }
  exports.phobosBody1 = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 4,
    COLOR: 31,
    CONTROLLERS: ['reverseslowspin'],
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    TURRETS:(() => {
      var tr = []
      // if the number is 0, 2, 4, 6, 8, and so on by 2, then it is 0, if it is 1, 3, 5, 7 then it is 0.5 if odd then it is 0, if it was even then it is 0.5
      for (let i = 0; i < 4; i++){
        tr.push({
          POSITION: [8, 8, 0, (360 * i) / 4, 180, 0],
          TYPE: exports.phobosMissileLauncher
        })
      }
      return tr
    })()
  }
  return {
    PARENT: [exports.semicele],
    NAME: "Phobos",
    COLOR: 31,
    TURRETS: (() => {// the spinning is in a 360 angle
      var tr = [
        {
          POSITION: [10, 0, 0, 0, 360, 1],
          TYPE: exports.phobosBody1
        }
      ]
      for (let i = 0; i < 6; i++) {
        tr.push({
          POSITION: [8, 8.5, 0, (360 * i) / 6, 180, 0],
          TYPE: exports.autoSpray
        })
      }
      return tr
    })()
  }
})()
// Nephele
exports.nephele = (() => {
  g.nepheleMissile = [1.5, 1, 1, 1, 2, 1.4, 1.22, 3, 1, 1, 1, 1, 1]
  g.nepheleSwarm = [4, 1, 1, 1, 1.2, 1.33, 1.211, 1, 1, 1, 1, 1, 1]
  exports.nepheleSwarmLauncher = {
    PARENT: [exports.auto3gun],
    INDEPENDENT: true,
    LABEL: '',
    GUNS: [
      {
        POSITION: [15, 12, 0.6, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.nepheleSwarm]),
          TYPE: exports.swarm,
          COLOR_OVERRIDE: 2,
          AUTOFIRE: true
        }
      }
    ]
  }
  exports.nepheleMissile = {
    PARENT: [exports.missile],
    TURRETS: [
      {
        POSITION: [10, 0, 0, 0, 360, 1],
        TYPE: exports.nepheleSwarmLauncher
      }
    ],
    GUNS: []
  }
  exports.nepheleMissileLauncher = {
    PARENT: [exports.auto3gun],
    HAS_NO_RECOIL: true,
    LABEL: '',
    GUNS: [
      {
        POSITION: [21, 10, 1.5, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.skim, g.nepheleMissile, g.fake]),
          TYPE: exports.bullet
        }
      },
      {
        POSITION: [19, 16, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.skim, g.nepheleMissile]),
          TYPE: exports.nepheleMissile
        }
      },
      {
        POSITION: [19, 15, 0.01, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.skim, g.nepheleMissile, g.fake]),
          TYPE: exports.bullet
        }
      },
    ]
  }
  exports.nepheleBody1 = {
    PARENT: [exports.genericTank],
    SHAPE: 4,
    LABEL: '',
    COLOR: 6,
    CONTROLLERS: ['reverseslowspin'],
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    TURRETS: (() => {
      var tr = []
      for (let i = 0; i < 4; i++) {
        tr.push({
          POSITION: [8, 8.5, 0, (360 * i) / 4, 180, 0],
          TYPE: exports.nepheleMissileLauncher
        })
      }
      return tr
    })()
  }
  return {
    PARENT: [exports.semicele],
    NAME: 'Nephele',
    COLOR: 6,
    TURRETS: (() => {
      var tr = [
        {
          POSITION: [10, 0, 0, 0, 360, 1],
          TYPE: exports.nepheleBody1
        }
      ]
      for (let i = 0; i < 6; i++) {
        tr.push({
          POSITION: [8, 8.5, 0, (360 * i) / 6, 180, 0],
          TYPE: exports.autoSpray
        })
      }
      return tr
    })()
  }
})()
// Okeanos
exports.okeanos = (() => {
  g.okeanosEggDrone = [5, 1, 1, 0.75, 2, 1.2, 1.1, 1, 1, 1, 1, 1, 1]
  exports.okeanosEggDrone = {
    PARENT: [exports.drone],
    SHAPE: 0,
    INDEPENDENT: true,
    BODY: {
      FOV: 1.335,
      SPEED: 1.4
    },
    DRAW_HEALTH: true
  }
  exports.okeanosBody1 = {
    PARENT: [exports.genericTank],
    SHAPE: 4,
    LABEL: '',
    COLOR: 0,
    CONTROLLERS: ['reverseslowspin'],
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    GUNS: (() => {
      var gs = []
      for (let i = 0; i < 4; i++) {
        gs.push({
          POSITION: [6.5, 6, 1.4, 5, 0, (360 * i) / 4, 0.25 * i],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.okeanosEggDrone]),
            TYPE: exports.okeanosEggDrone,
            AUTOFIRE: true,
            MAX_CHILDREN: 4,
            COLOR_OVERRIDE: 6
          }
        })
      }
      return gs
    })()
  }
  return {
    PARENT: [exports.semicele],
    NAME: 'Okeanos',
    COLOR: 0,
    TURRETS: (() => {
      var tr = [
        {
          POSITION: [10, 0, 0, 0, 360, 1],
          TYPE: exports.okeanosBody1
        }
      ]
      for (let i = 0; i < 6; i++) {
        tr.push({
          POSITION: [8, 8.5, 0, (360 * i) / 6, 180, 0],
          TYPE: exports.autoSpray
        })
      }
      return tr
    })()
  }
})()
// Celestials
exports.celestial = {
    PARENT: [exports.genericTank],
    TYPE: 'miniboss',
    LABEL: "Celestial",
    DANGER: 50,
    SKILL: skillSet({
        rld: 1,
        dam: 1, 
        pen: 1,
        str: 1,
        spd: 1,
        atk: 1,
        hlt: 1,
        shi: 1,
        rgn: 1,
        mob: 1,        
    }),
    LEVEL: 45,
    SIZE: 45,
    SHAPE: 9, 
    CONTROLLERS: ['nearestDifferentMaster', 'bossminion', 'canRepel'],
    AI: { NO_LEAD: true, },
    BODY: {
       HEALTH: 675,
       DAMAGE: 9,
       SPEED:  base.SPEED * 0.12,
       FOV: 1.5,
        REGEN: base.REGEN * 0.035
    },
    VALUE: 1 * 10e5,
    FACING_TYPE: 'autospin',
    HITS_OWN_TYPE: 'boss',
    BROADCAST_MESSAGE: 'A Celestial has fallen!',
};
exports.eternal = {
    PARENT: [exports.genericTank],
    TYPE: 'miniboss',
    LABEL: "Eternal",
    DANGER: 6,
    SKILL: skillSet({
        rld: 1,
        dam: 1, 
        pen: 1,
        str: 1,
        spd: 1,
        atk: 1,
        hlt: 1,
        shi: 1,
        rgn: 1,
        mob: 1,        
    }),
    LEVEL: 45,
    SIZE: 155,
    SHAPE: 11, 
    CONTROLLERS: ['nearestDifferentMaster', 'bossminion', 'canRepel'],
    AI: { NO_LEAD: true, },
    BODY: {
       HEALTH: 1350,
       DAMAGE: 11,
       SPEED:  base.SPEED * 0.012,
       FOV: 1.5,
        REGEN: base.REGEN * 0.025
    },
    VALUE: 4 * 10e5,
    FACING_TYPE: 'autospin',
    HITS_OWN_TYPE: 'boss',
    BROADCAST_MESSAGE: 'An Eternal has fallen!',
};
    exports.crasherSpawner = {
        PARENT: [exports.genericTank],
        LABEL: 'Spawned',  
        STAT_NAMES: statnames.drone,
        CONTROLLERS: ['nearestDifferentMaster'], 
        COLOR: 5, 
        INDEPENDENT: true, 
        AI: { chase: true, },
        MAX_CHILDREN: 4,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.weak, g.weak]),
                    TYPE: [exports.drone, { LABEL: 'Crasher', VARIES_IN_SIZE: true, DRAW_HEALTH: true }],
                    SYNCS_SKILLS: true,
                    AUTOFIRE: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
    exports.elite = {
        PARENT: [exports.miniboss],
        LABEL: 'Elite Crasher',
        COLOR: 5,
        SHAPE: 3,
        SIZE: 35,
        VARIES_IN_SIZE: true,
        VALUE: 150000,
        BODY: {
            FOV: 2,
            SPEED: base.SPEED * 0.25,
            HEALTH: base.HEALTH * 1.5,
            SHIELD: base.SHIELD * 1.25,
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 2.5,
        },
    };
    // this is like scenexe.io pulsar celestial
    exports.elite_twin = {
      PARENT: [exports.elite],
      GUNS: (()=> {
        let egs = [] //elite guns
        exports.twin.GUNS.forEach(e=>{
          egs.push({
            POSITION: [
              e.POSITION[0] - 10,
              e.POSITION[1],
              e.POSITION[2],
              e.POSITION[3] + 5,
              e.POSITION[4],
              e.POSITION[5] + (360 * 1.5) / 3,
              e.POSITION[6],
            ],
            PROPERTIES: e.PROPERTIES
          })
          egs.push({
            POSITION: [
              e.POSITION[0] - 10,
              e.POSITION[1],
              e.POSITION[2],
              e.POSITION[3] + 5,
              e.POSITION[4],
              e.POSITION[5] + (360 * 2.5) / 3,
              e.POSITION[6],
            ],
            PROPERTIES: e.PROPERTIES
          })
          egs.push({
            POSITION: [
              e.POSITION[0] - 10,
              e.POSITION[1],
              e.POSITION[2],
              e.POSITION[3] + 5,
              e.POSITION[4],
              e.POSITION[5] + (360 * 3.5) / 3,
              e.POSITION[6],
            ],
            PROPERTIES: e.PROPERTIES
          })
        })
        return egs
      })(),
      TURRETS: [{
        POSITION: [10, 0, 0, 0, 360, 1],
        TYPE: [exports.autoTurret, {PARENT: [exports.twin], INDEPENDENT: true}]
      }]
    }
    // blazar from scenexe.io lol
    exports.elite_pounder = {
      PARENT: [exports.elite],
      GUNS: (()=>{
        let elite_pounder_gs = []
        exports.pound.GUNS.forEach(e=>{
          elite_pounder_gs.push({
            POSITION: [
              e.POSITION[0] - 5,
              e.POSITION[1],
              e.POSITION[2],
              e.POSITION[3],
              e.POSITION[4],
              e.POSITION[5] + 60,
              e.POSITION[6],
            ],
            PROPERTIES: e.PROPERTIES
          })
          elite_pounder_gs.push({
            POSITION: [
              e.POSITION[0] - 5,
              e.POSITION[1],
              e.POSITION[2],
              e.POSITION[3],
              e.POSITION[4],
              e.POSITION[5] + 180,
              e.POSITION[6],
            ],
            PROPERTIES: e.PROPERTIES
          })
          elite_pounder_gs.push({
            POSITION: [
              e.POSITION[0] - 5,
              e.POSITION[1],
              e.POSITION[2],
              e.POSITION[3],
              e.POSITION[4],
              e.POSITION[5] - 60,
              e.POSITION[6],
            ],
            PROPERTIES: e.PROPERTIES
          })
        })
        return elite_pounder_gs
      })(),
      TURRETS: [
        {
          POSITION: [10, 0, 0, 0, 360, 1],
          TYPE: [exports.autoTurret, {PARENT: [exports.pound], INDEPENDENT: true}]
        }
      ]
    }
        exports.elite_destroyer = {
            PARENT: [exports.elite],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [    5,    16,     1,      6,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, }, {
                POSITION: [    5,    16,     1,      6,      0,      60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, }, {
                POSITION: [    5,    16,     1,      6,      0,     -60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, },
            ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     0,      0,     180,    360,   0, ], 
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,      60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,     -60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.bigauto4gun, { INDEPENDENT: true, COLOR: 5, }]
                    },
            ],
        };
        exports.gunner_bee = {
          PARENT: [exports.genericTank],
          LABEL: '',
          GUNS: [
            {
              POSITION: [14, 4, 0.6, 0, -3.5, -30, 1.5],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.mach, g.gunner, g.turret]),
                TYPE: exports.bee
              }
            },
            {
              POSITION: [14, 4, 0.6, 0, 3.5, 30, 1.25],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.mach, g.gunner, g.turret]),
                TYPE: exports.bee
              }
            },
            {
              POSITION: [16, 4, 0.6, 0, -3.5, -15, 0.75],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.mach, g.gunner, g.turret]),
                TYPE: exports.bee
              }
            },
            {
              POSITION: [16, 4, 0.6, 0, 3.5, 15, 1],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.mach, g.gunner, g.turret]),
                TYPE: exports.bee
              }
            },
            {
              POSITION: [18, 4, 1, 0, -3.5, 0, 0],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.gunner, g.turret]),
                TYPE: exports.bullet
              }
            },
            {
              POSITION: [18, 4, 1, 0, 3.5, 0, 0.5],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.gunner, g.turret]),
                TYPE: exports.bullet
              }
            }
          ]
        }
        exports.elite_swarmer = {
          PARENT: [exports.elite],
          GUNS: [],
          TURRETS: [
            {
              POSITION: [12, 0, 0, 0, 360, 1],
              TYPE: [exports.autoTurret, {
                PARENT: [exports.hiveshooter],
                INDEPENDENT: true,
                COLOR: 5
              }]
            }
          ]
        }
        for (let i = 0.5; i < 3; i++) {
            exports.elite_swarmer.TURRETS.push({
             POSITION: [12, 6, 0, (360 * i) / 3, 75, 0],
             TYPE: exports.gunner_bee
          })
        }
        exports.elite_gunner = {
            PARENT: [exports.elite],
            CONTROLLERS: ['nearestDifferentMaster', 'bossminion', 'canRepel'],
            FACING_TYPE: 'locksFacing',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  14,    16,      1,      0,      0,     180,     0,   ],
                    }, {
                POSITION: [   4,    16,     1.5,    14,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                        TYPE: [exports.elitepillbox, { INDEPENDENT: true, }],
                    }, }, {                
                POSITION: [   6,    14,     -2,      2,      0,      60,     0,   ],
                    }, {                
                POSITION: [   6,    14,     -2,      2,      0,     300,     0,   ],
                    }
            ],
            AI: { NO_LEAD: false, },
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  14,     8,      0,     60,     180,   0, ], 
                    TYPE: [exports.auto4gun],
                    }, {
                POSITION: [  14,     8,      0,     300,    180,   0, ],
                    TYPE: [exports.auto4gun],
            }],
        };
        exports.elite_sprayer_trio = {
          PARENT: [exports.genericTank],
          LABEL: 'Trio',
          COLOR: 5,
          CONTROLLERS: ['reverseslowspin'],
          GUNS: []
        }
        for (let i = 0; i < 3; i++) {
          exports.elite_sprayer_trio.GUNS.push({
            POSITION: [20, 8, 1.4, 0, 0, (360 * i) / 3, 0],
            PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.lessreload]),
              TYPE: exports.bullet,
              AUTOFIRE: true
            }
          })
        }
        exports.e_spray = {
                PARENT: [exports.autoTurret],
                LABEL: '',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  23,     7,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.gunner, g.lowpower, g.mach, g.morerecoil]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  12,    10,     1.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.mach]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
   
        exports.elite_sprayer = { 
            PARENT: [exports.elite],
            AI: { NO_LEAD: false, },
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  6,     7,      5,     180,     190, 0], 
                    TYPE: [exports.e_spray, { COLOR: 5, }],
                        }, {
                POSITION: [  6,     7,      5,      60,    190, 0], 
                    TYPE: [exports.e_spray, { COLOR: 5, }],
                        }, {
                POSITION: [  6,     7,      5,     -60,    190, 0], 
                    TYPE: [exports.e_spray, { COLOR: 5, }],
                        },
                {
                POSITION: [  6,     7,      -5,     180,     190, 0], 
                    TYPE: [exports.e_spray, { COLOR: 5, }],
                        }, {
                POSITION: [  6,     7,      -5,      60,    190, 0], 
                    TYPE: [exports.e_spray, { COLOR: 5, }],
                        }, {
                POSITION: [  6,     7,      -5,     -60,    190, 0], 
                    TYPE: [exports.e_spray, { COLOR: 5, }],
                        },
                        {
                POSITION: [  6,     0,       0,       0,    360,  1],
                    TYPE: exports.elite_sprayer_trio
                        }
            ],
        };
    exports.elite_launcher = {
      PARENT: [exports.elite],
      GUNS: (() => {
        var gs = []
        for (let i = 0.5; i < 3; i++) {
          gs.push({
            POSITION: [10, 17, -0.5, 8, 0, (360 * i) / 3, 0]
          }, {
            POSITION: [14, 18, 1, 2, 0, (360 * i) / 3, 0],
            PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
              TYPE: exports.minimissile
            }
          })
        }
        return gs
      })(),
      TURRETS: (() => {
        var tr = []
        for (let i = 0; i < 3; i++) {
          tr.push({
            POSITION: [6, 8, 0, (360 * i) / 3, 180, 1],
            TYPE: exports.heavy3gun
          })
        }
        return tr
      })()
    }
    exports.elite_battle_turret = {
      PARENT: [exports.autoTurret],
      COLOR: 5
    }
    exports.elite_battleship = {
      PARENT: [exports.elite],
      GUNS: [],
      TURRETS: []
    }
    for (let i = 0; i < 3; i++) {
      exports.elite_battleship.TURRETS.push({
        POSITION: [4.5, 6.5, 0, (360 * i) / 3, 180, 1],
        TYPE: exports.elite_battle_turret
      })
    }
    for (let i = 0.5; i < 3; i++) {
      exports.elite_battleship.GUNS.push({
        POSITION: [6, 6, 0.6, 5, 0, (360 * i) / 3, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload]),
          TYPE: exports.swarm, AUTOFIRE: true
        }
      }, {
        POSITION: [6, 6, 0.6, 5, -7.5, (360 * i) / 3, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload]),
          TYPE: exports.swarm, AUTOFIRE: true
        }
      }, {
        POSITION: [6, 6, 0.6, 5,  7.5, (360 * i) / 3, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload]),
          TYPE: exports.swarm, AUTOFIRE: true
        }
      })
    }
    exports.elite_spawner_turret = {
      PARENT: [exports.autoTurret],
      LABEL: '',
      COLOR: 5,
      GUNS: [
        {
          POSITION: [17, 6, 1, 0, 5, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.turret]),
            TYPE: exports.bullet
          }
        },  {
          POSITION: [17, 6, 1, 0, -5, 0, 0.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.turret]),
            TYPE: exports.bullet
          }
        }
      ]
    }
    exports.elite_spawner = {
      PARENT: [exports.elite],
      GUNS: [
      {
        POSITION: [13, 17, 1, 0, 0, (360 * 1.5) / 3, 0] 
      }, {
        POSITION: [2.5, 20, 1, 12, 0, (360 * 1.5) / 3, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.halfreload, g.halfreload, g.half_size]),
          TYPE: [exports.sentrySwarm, {BODY: {HEALTH: 0.01, DAMAGE: 0.01, SPEED: 1.4}}],
          AUTOFIRE: true, MAX_CHILDREN: 3
        }
      }, {
        POSITION: [13, 17, 1, 0, 0, (360 * 2.5) / 3, 0] 
      }, {
        POSITION: [2.5, 20, 1, 12, 0, (360 * 2.5) / 3, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.halfreload, g.halfreload, g.half_size]),
          TYPE: [exports.sentryGun, {BODY: {HEALTH: 0.01, DAMAGE: 0.01, SPEED: 1.4}}],
          AUTOFIRE: true, MAX_CHILDREN: 3
        }
      }, {
        POSITION: [13, 17, 1, 0, 0, (360 * 3.5) / 3, 0] 
      }, {
        POSITION: [2.5, 20, 1, 12, 0, (360 * 3.5) / 3, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.halfreload, g.halfreload, g.half_size]),
          TYPE: [exports.sentryTrap, {BODY: {HEALTH: 0.01, DAMAGE: 0.01,  SPEED: 1.4}}],
          AUTOFIRE: true, MAX_CHILDREN: 3
        }
      }
      ],
      TURRETS: [
        {
          POSITION: [10, 0, 0, 0, 360, 1],
          TYPE: exports.elite_spawner_turret
        }
      ]
    }
    exports.elite_streamliner_turret = {
      PARENT: [exports.autoTurret],
      LABEL: "Strealiner",
      COLOR: 5,
      GUNS: (()=>{
        var gs = [];
        exports.stream.GUNS.forEach(e=>{
          gs.push({
            POSITION: [
              e.POSITION[0]-10,
              e.POSITION[1],
              e.POSITION[2],
              e.POSITION[3]+10,
              e.POSITION[4]+e.POSITION[1]/2-20,
              e.POSITION[5],
              e.POSITION[6],
            ],
            PROPERTIES: e.PROPERTIES
          });
          gs.push({
            POSITION: [
              e.POSITION[0]-10,
              e.POSITION[1],
              e.POSITION[2],
              e.POSITION[3]+10,
              e.POSITION[4]-e.POSITION[1]/2+20,
              e.POSITION[5],
              e.POSITION[6],
            ],
            PROPERTIES: e.PROPERTIES
          });
        });
        gs.push(
          {
            POSITION: [5,20,1,10,0,0,0],
            PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.basic,g.pound,g.pound,g.destroy,[2,1,1,1,1,1,1,1,1,1,1,1,1]]),
              TYPE: exports.bullet
            }
          },
          {POSITION: [5,40,1,5,0,0,0]},
          {POSITION: [5,20,2,0,0,0,0]}
        )
        return gs;
      })()
    }
    exports.elite_streamliner = {
      PARENT: [exports.elite],
      GUNS: (()=>{
        var gs = [];
        for (var i=0;i<3;i++){
          gs.push(
            {
              POSITION: [12,12,1,0,0,120*i+60,0],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, [5,0.01,1,1,0.5,1.1,1,1.2,2,2,1,1,1]]),
                TYPE: exports.bullet
              }
            },
            {
              POSITION: [11,14,1,0,0,120*i+60,0.1],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, [5,0.01,1,1,0.5,1.1,1,1.2,2,2,1,1,1]]),
                TYPE: exports.bullet
              }
            },
            {
              POSITION: [10,16,1,0,0,120*i+60,0.2],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, [5,0.01,1,1,0.5,1.1,1,1.2,2,2,1,1,1]]),
                TYPE: exports.bullet
              }
            },
            {
              POSITION: [8, 18,1,0,0,120*i+60,0.3],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, [5,0.01,1,1,0.5,1.1,1,1.2,2,2,1,1,1]]),
                TYPE: exports.bullet
              }
            }
          )
        }
        return gs;
      })(),
      TURRETS: [
        {
          POSITION: [10,15,0,0,190,0],
          TYPE: exports.elite_streamliner_turret
        },
        {
          POSITION: [10,15,0,120,190,0],
          TYPE: exports.elite_streamliner_turret
        },
        {
          POSITION: [10,15,0,240,190,0],
          TYPE: exports.elite_streamliner_turret
        }
      ]
    }
  exports.elite_minigun = {
    PARENT: [exports.elite],
    TURRETS: [
      {
        POSITION: [8, 0, 0, 0, 360, 1],
        TYPE: [exports.autoTurret, { PARENT: [exports.stream] }],
      },
    ],
    GUNS: [],
   };
for (let i = 0; i < 3; i++) {
  exports.elite_minigun.GUNS.push(
    {
      POSITION: [18, 5, 0, 0, -6.5, (360 * i) / 3 + 60, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
        TYPE: exports.bullet,
      },
    },
    {
      POSITION: [15, 5, 0, 0, -6.5, (360 * i) / 3 + 60, 0.25],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
        TYPE: exports.bullet,
      },
    },
    {
      POSITION: [12, 5, 0, 0, -6.5, (360 * i) / 3 + 60, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
        TYPE: exports.bullet,
      },
    },
    {
      POSITION: [18, 5, 0, 0, 6.5, (360 * i) / 3 + 60, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
        TYPE: exports.bullet,
      },
    },
    {
      POSITION: [15, 5, 0, 0, 6.5, (360 * i) / 3 + 60, 0.25],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
        TYPE: exports.bullet,
      },
    },
    {
      POSITION: [12, 5, 0, 0, 6.5, (360 * i) / 3 + 60, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
        TYPE: exports.bullet,
      },
    },
    {
      POSITION: [21, 5, 1, 0, 0, (360 * i) / 3 + 60, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
        TYPE: exports.bullet,
      },
    },
    {
      POSITION: [18, 5, 1, 0, 0, (360 * i) / 3 + 60, 0.25],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
        TYPE: exports.bullet,
      },
    },
    {
      POSITION: [15, 5, 1, 0, 0, (360 * i) / 3 + 60, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
        TYPE: exports.bullet,
      },
    }
  );
}
    exports.palisade = (() => {
        let props = {
            SHOOT_SETTINGS: combineStats([g.factory, g.pound, g.halfreload, g.halfreload]),
            TYPE: exports.minion,
            STAT_CALCULATOR: gunCalcNames.drone,                        
            AUTOFIRE: true,
            MAX_CHILDREN: 2,
            SYNCS_SKILLS: true,   
            WAIT_TO_CYCLE: true,
        };
        return {
            PARENT: [exports.miniboss],
            LABEL: 'Rogue Palisade',
            COLOR: 17,
            SHAPE: 6,
            SIZE: 28,
            VALUE: 500000,
            BODY: {
                FOV: 1.3,
                SPEED: base.SPEED * 0.1,
                HEALTH: base.HEALTH * 2,
                SHIELD: base.SHIELD * 2,
                REGEN: base.REGEN,
                DAMAGE: base.DAMAGE * 3,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   4,      6,    -1.6,     8,      0,      0,      0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     60,      0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     120,     0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                        TYPE: exports.minion,
                        STAT_CALCULATOR: gunCalcNames.drone,                        
                        AUTOFIRE: true,
                        MAX_CHILDREN: 1,
                        SYNCS_SKILLS: true, 
                        WAIT_TO_CYCLE: true,  
                    }, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     240,     0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     300,     0,   ], 
                    PROPERTIES: props, },
            ],
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [   5,    10,      0,      30,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,      90,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     150,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     210,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     270,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     330,    110, 0], 
                    TYPE: exports.trapTurret,
                        },
            ],
        };
    })();
exports.palisade2 = (() => {
        let props = {
            SHOOT_SETTINGS: combineStats([g.factory, g.pound, g.halfreload, g.halfreload]),
            TYPE: exports.minion,
            STAT_CALCULATOR: gunCalcNames.drone,                        
            AUTOFIRE: true,
            MAX_CHILDREN: 2,
            SYNCS_SKILLS: true,   
            WAIT_TO_CYCLE: true,
        };
        return {
            PARENT: [exports.miniboss],
            LABEL: 'Rogue Palisade',
            COLOR: 17,
            SHAPE: 6,
            TYPE: 'tank',
            SIZE: 28,
            VALUE: 500000,
            BODY: {
                FOV: 1.3,
                SPEED: base.SPEED * 0.1,
                HEALTH: base.HEALTH * 2,
                SHIELD: base.SHIELD * 2,
                REGEN: base.REGEN,
                DAMAGE: base.DAMAGE * 3,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   4,      6,    -1.6,     8,      0,      0,      0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     60,      0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     120,     0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                        TYPE: exports.minion,
                        STAT_CALCULATOR: gunCalcNames.drone,                        
                        AUTOFIRE: true,
                        MAX_CHILDREN: 1,
                        SYNCS_SKILLS: true, 
                        WAIT_TO_CYCLE: true,  
                    }, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     240,     0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     300,     0,   ], 
                    PROPERTIES: props, },
            ],
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [   5,    10,      0,      30,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,      90,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     150,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     210,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     270,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     330,    110, 0], 
                    TYPE: exports.trapTurret,
                        },
            ],
        };
    })();
exports.elite_skimmer = {
        PARENT: [exports.elite],
        LABEL: 'Elite Skimmer',
        SHAPE: 3, 
        COLOR: 2,
        FACING_TYPE: 'autospin',
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [  15,     5,      0,     60,     170, 0], 
                TYPE: exports.skimmer,
                    }, {
            POSITION: [  15,     5,      0,     180,    170, 0], 
                TYPE: exports.skimmer,
                    }, {
            POSITION: [  15,     5,      0,     300,    170, 0], 
                TYPE: exports.skimmer,
                    },
        ],
    };
exports.nestkeeper_turret = {
  PARENT: [exports.autoTurret],
  LABEL: 'Twin',
  GUNS: [
    {
      POSITION: [16, 4, 1, 0, 4, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.turret]),
        TYPE: exports.bullet
      }
    },{
      POSITION: [16, 4, 1, 0, -4, 0, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.turret]),
        TYPE: exports.bullet
      }
    }
  ]
}
exports.nestkeeper = {
  PARENT: [exports.miniboss],
  LABEL: 'Nest Keeper',
  SHAPE: 5,
  COLOR: 14,
  SIZE: 54,
  GUNS: [],
  TURRETS: [
    {
      POSITION: [9, 0, 0, 0, 360, 1],
      TYPE: exports.boomer
    }
  ]
}
for (let i = 0; i < 5; i++) {
  exports.nestkeeper.GUNS.push({
    POSITION: [12, 7, 1.3, 0, 0, (360 * i) / 5 + (360 / 5 / 2), 0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.drone, [3, 1, 1, 1, 1.2, 1.1, 1.2, 1, 1, 1, 1, 1, 1]]),
      TYPE: [exports.drone, {BODY: {SPEED: 1.4}}], AUTOFIRE: true, MAX_CHILDREN: 3
    }
  })
  exports.nestkeeper.TURRETS.push({
    POSITION: [8, 9, 0, (360 * i) / 5, 120, 0],
    TYPE: exports.nestkeeper_turret
  })
}

exports.nestWarden = {
    PARENT: [exports.miniboss],
    LABEL: 'Nest Warden',
    VALUE: 3e5,
      SHAPE: 5,
      COLOR: 14,
      SIZE: 54,
    BODY: {
        HEALTH: 300,
        DAMAGE: 8
    },
    TURRETS: (function(output=[]) {
        for (let i = 0; i < 5; i++) {
            output.push({
                POSITION: [9, 9.25, 0, i*(360/5), 180, 0],
                TYPE: [exports.cruiser, { COLOR: 14, CONTROLLERS: ['onlyAcceptInArc', 'mapAltToFire'] }]
            })
        }
        output.push({
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: [exports.riot, { COLOR: 14 }]
        })
        return output
    })(),
    GUNS: (function(output=[]){
        for (let i = 0.5; i < 5; i++) {
            output.push({
                POSITION: [11, 7.25, 1, 0, 0, i*(360/5), 0]
            }, {
                POSITION: [1.25, 7.25, 1.2, 11, 0, i*(360/5), 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct, g.halfreload, g.power, g.power]),
                    TYPE: exports.block, AUTOFIRE: true
                }
            })
        }
        return output
    })()
}
exports.bot = {
    AUTO_UPGRADE: 'random',
    FACING_TYPE: 'looseToTarget',
    BODY: {
        SIZE: 10,
      FOV: 5
    },
    //COLOR: 17,
    NAME: "ai_",
    CONTROLLERS: [
        'nearestDifferentMaster', 'bot', 'fleeAtLowHealth', 'avoid'
    ],
    AI: { STRAFE: true, },
};
exports.botSpawner = {
  PARENT: [exports.genericTank],
  LABEL: 'Bot Spawner',
  MAX_CHILDREN: 20,
  GUNS: [
    {
      POSITION: [14, 20, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
        TYPE: [exports.basic, {PARENT: [exports.bot]}]
      }
    }
  ]
}
exports.mounted = {
  PARENT: [exports.autoTurret],
  LABEL: 'Mounted',
  SHAPE: 4,
  GUNS: [
    {
      POSITION: [2, 16, 1.2, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone]),
        TYPE: exports.drone,
        AUTOFIRE: true
      }
    }
  ],
  MAX_CHILDREN: 5
}

exports.abyssguardian = {
  PARENT: [exports.miniboss],
  LABEL: 'Abyss Guardian',
  COLOR: 36,
  SHAPE: 9,
  HAS_NO_RECOIL: true,
  FACING_TYPE: 'locksFacing',
  SIZE: 25,
  BOSS_SPLIT_TYPE: 'abysslings',
  HITS_OWN_TYPE: 'never',
  CAN_BE_ON_LEADERBOARD: false,
  VALUE: 4120000,
  BODY: {
    HEALTH: 521 * 2,
    DAMAGE: 6,
    SPEED: 22
  },
  TURRETS: [
    {
      POSITION: [23, 0, 0, 0, 0, 0],
      TYPE: [exports.abyssguardianshell = {
        SHAPE: 9,
        COLOR: 17
      }]
    },
    {
      POSITION: [15, 0, 0, 0, 0, 1],
      TYPE: [exports.abyssguardianshell]
    },{
      POSITION: [12, 0, 0, 0, 0, 1],
      TYPE: [exports.abyssguardianbody = {
        SHAPE: 9,
        COLOR: 36
      }]
    },
    {
      POSITION: [8, 0, 0, 0, 0, 1],
      TYPE: [exports.abyssguardianshell]
    },{
      POSITION: [5, 0, 0, 0, 0, 1],
      TYPE: [exports.abyssguardianbody]
    },
    {
      POSITION: [1.5, 9, 0, 0, 360, 1],
      TYPE: [exports.autoTurret]
    },{
      POSITION: [1.5, -9, 0, 0, 360, 1],
      TYPE: [exports.autoTurret]
    },{
      POSITION: [1.5, 0, 9, 0, 360, 1],
      TYPE: [exports.autoTurret]
    },{
      POSITION: [1.5, 0, -9, 0, 360, 1],
      TYPE: [exports.autoTurret]
    },
    {
      POSITION: [1.5, 9, 0, 45, 0, 1],
      TYPE: [exports.mounted]
    },{
      POSITION: [1.5, -9, 0, 45, 0, 1],
      TYPE: [exports.mounted]
    },{
      POSITION: [1.5, 0, 9, 45, 0, 1],
      TYPE: [exports.mounted]
    },{
      POSITION: [1.5, 0, -9, 45, 0, 1],
      TYPE: [exports.mounted]
    },
    {
      POSITION: [1.5, 5, 0, 0, 0, 1],
      TYPE: [exports.mounted]
    },{
      POSITION: [1.5, -5, 0, 0, 0, 1],
      TYPE: [exports.mounted]
    },{
      POSITION: [1.5, 0, 5, 0, 0, 1],
      TYPE: [exports.mounted]
    },{
      POSITION: [1.5, 0, -5, 0, 0, 1],
      TYPE: [exports.mounted]
    },
    {
      POSITION: [3, 0, 0, 0, 360, 1],
      TYPE: [exports.abyssguardianturret = {
        PARENT: [exports.autoTurret],
        GUNS: [
          {
            POSITION: [56, 12, 1, 0, 0, 0, 0],
            PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
              TYPE: exports.bullet
            }
          }
        ]
      }]
    },
  ],
  GUNS: [
    {
      POSITION: [18, 4.5, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.morereload, g.power]),
        TYPE: exports.bullet
      }
    },
    {
      POSITION: [14, 4.5, 1, 0, 0, (360 * 1) / 9, 0]
    },{
      POSITION: [12, 4.5, 1, 0, 0, (360 * 2) / 9, 0]
    },{
      POSITION: [12, 4.5, 1, 0, 0, (360 * 3) / 9, 0]
    },{
      POSITION: [12, 4.5, 1, 0, 0, (360 * 4) / 9, 0]
    },{
      POSITION: [12, 4.5, 1, 0, 0, (360 * 5) / 9, 0]
    },{
      POSITION: [12, 4.5, 1, 0, 0, (360 * 6) / 9, 0]
    },{
      POSITION: [12, 4.5, 1, 0, 0, (360 * 7) / 9, 0]
    },{
      POSITION: [12, 4.5, 1, 0, 0, (360 * 8) / 9, 0]
    },{
      POSITION: [3, 4.5, 1.4, 12, 0, (360 * 1) / 9, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.abysstrap, g.pound]),
        TYPE: exports.trap
      }
    },{
      POSITION: [1, 4.5 * 1.5, 1, 12, 0, (360 * 2) / 9, 10],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
        TYPE: exports.abyssling,
        AUTOFIRE: true,
        MAX_CHILDREN: 1
      }
    },{
      POSITION: [3, 4.5, 1.6, 12, 0, (360 * 3) / 9, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.abysstrap, g.pound]),
        TYPE: exports.trap
      }
    },{
      POSITION: [3, 4.5, 1.6, 12, 0, (360 * 4) / 9, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.abysstrap, g.pound]),
        TYPE: exports.trap
      }
    },{
      POSITION: [3, 4.5, 1.6, 12, 0, (360 * 5) / 9, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.abysstrap, g.pound]),
        TYPE: exports.trap
      }
    },{
      POSITION: [3, 4.5, 1.6, 12, 0, (360 * 6) / 9, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.abysstrap, g.pound]),
        TYPE: exports.trap
      }
    },{
      POSITION: [1, 4.5 * 1.5, 1, 12, 0, (360 * 7) / 9, 10],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
        TYPE: exports.abyssling,
        AUTOFIRE: true,
        MAX_CHILDREN: 1
      }
    },{
      POSITION: [3, 4.5, 1.6, 12, 0, (360 * 8) / 9, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.abysstrap, g.pound]),
        TYPE: exports.trap
      }
    },
  ]
}
// AURA GENERATOR
exports.aura3 = {
  PARENT: [exports.bullet],
  LABEL: 'Aura',
  TYPE: 'aura',
  INTANGIBLE: true,
  HITS_OWN_TYPE: 'none',
  BODY: {
    HEALTH: 1e8,
    DAMAGE: -1.9,
    SHIELD: 1e8,
    REGEN: 1e8,
    SPEED: 0
  },
  MOTION_TYPE: 'healBullet',
  DIE_AT_RANGE: false,
  DAMAGE_EFFECTS: false,
  DRAW_HEALTH: false,
  ALPHA: 0.25,
  CONTROLLERS: ['aura']
}
exports.generator3 = {
  PARENT: [exports.genericTank],
  LABEL: '',
  COLOR: 34,
  SHAPE: -6,
  IGNORED_BY_AI: true,
  CONTROLLERS: ['fastspin']
}
exports.auraGenerator3T = {
  PARENT: [exports.genericTank],
  LABEL: '',
  SHAPE: 0,
  COLOR: 17,
  IGNORED_BY_AI: true,
  TURRETS: (() => {
    var tr = [{
        POSITION: [12, 0, 0, 0, 360, 1],
        TYPE: exports.generator3
      }]
    return tr
  })(),
}
exports.auraGenerator3 = {
  PARENT: [exports.genericTank],
  LABEL: '',
  SHAPE: 6,
  COLOR: 17,
  IGNORED_BY_AI: true,
  CONTROLLERS: ['reversefastspin'],
  GUNS: (() => {
    var gs = []
    for (let i = 0; i < 6; i++) {
      gs.push({
        POSITION: [22, 10, 0.0001, 0, 0, (360 * i) / 6, 0]
      })
    }
    gs.push({
      POSITION: [0, 20, 1, 0, 0, 0, 15000],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.aura2, [1, 1, 1, 0.2, 1, 1, 1, 1, 1, 1, 1, 1, 1]]),
        TYPE: exports.aura3, MAX_CHILDREN: 1, AUTOFIRE: true, COLOR_OVERRIDE: 34
      }
    })
    return gs
  })(),
  TURRETS: (() => {
    var tr = [{
        POSITION: [12, 0, 0, 0, 360, 1],
        TYPE: exports.generator3
      }]
    return tr
  })(),
}
exports.auraGenerator4 = {
  PARENT: [exports.genericTank],
  LABEL: '',
  SHAPE: 6,
  COLOR: 17,
  IGNORED_BY_AI: true,
  CONTROLLERS: ['reversefastspin'],
  GUNS: (() => {
    var gs = []
    gs.push({
      POSITION: [0, 20, 1, 0, 0, 0, 15000],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.aura]),
        TYPE: exports.aura3, MAX_CHILDREN: 1, AUTOFIRE: true, COLOR_OVERRIDE: 34
      }
    })
    return gs
  })(),
  TURRETS: (() => {
    var tr = [{
        POSITION: [12, 0, 0, 0, 360, 1],
        TYPE: exports.generator3
      }]
    return tr
  })(),
}
exports.sanc_turret = {
  PARENT: [exports.genericTank],
  LABEL: 'Shield',
  CONTROLLERS: ['reverseslowspin'],
  GUNS: []
}
for (let i = 0; i < 3; i++) {
  exports.sanc_turret.GUNS.push({
    POSITION: [18, 10, 1, 0, 0, (360 * i) / 3, 0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, [1, 1, 1, 1, 10, 50, 50, 1, 1, 1, 1, 1, 1]]),
      TYPE: exports.bullet, AUTOFIRE: true
    }
  }, {
    POSITION: [18, 10, 1, 0, 0, (360 * i) / 3 + (360 / 3 / 2), 0.5],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, [1, 1, 1, 1, 10, 50, 50, 1, 1, 1, 1, 1, 1]]),
      TYPE: exports.bullet, AUTOFIRE: true
    }
  })
}
exports.healingaurora = {
  PARENT: [exports.genericTank],
  COLOR: 1,
}
exports.healaurora = {
  PARNT: [exports.genericTank],
  LABEL: 'Healer Aurora',
  CONTROLLERS: ['reverseslowspin'],
  TURRETS: [
    {
      POSITION: [8, 0, 0, 0, 0, 1],
      TYPE: exports.healingaurora
    }
  ],
  GUNS: [
    {
      POSITION: [18, 10, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.trap, g.halfreload, g.lowpower]),
        TYPE: exports.trap, AUTOFIRE: true
      }
    },
     {
      POSITION: [18, 10, 1, 0, 0, 120, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.trap, g.halfreload, g.lowpower]),
        TYPE: exports.trap, AUTOFIRE: true
      }
    },
     {
      POSITION: [18, 10, 1, 0, 0, 240, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.trap, g.halfreload, g.lowpower]),
        TYPE: exports.trap, AUTOFIRE: true
      }
    }
  ]
}
exports.sanctuaryP = {
  PARENT: [exports.genericTank],
  LABEL: 'Sanctuary',
  
  ACCEPTS_SCORE: false,
  BODY: {
    HEALTH: 1000,
    DAMAGE: 12.5,
    PUSHABILITY: 0,
    HETERO: 0
  },
  INTANGIBLE: true,
  GUNS: [],
  SKILL: setBuild("0099999000"),
  HITS_OWN_TYPE: 'pushOnlyTeam',
  TURRETS: [
    {
      POSITION: [23, 0, 0, 0, 360, 0],
      TYPE: exports.dominationBody
    }, {
      POSITION: [10, 0, 0, 0, 360, 1],
      TYPE: [exports.auraGenerator3, { AUTOFIRE: true }]
    }, 
  ]
}
exports.riotSanc = {
  PARENT: [exports.sanctuaryP],
  CONTROLLERS: ['mapAltToFire', 'nearestDifferentMaster'],
  HAS_NO_RECOIL: true,
  INTANGIBLE: 1,
  IS_DOMINATOR: true,
  GUNS: [
    {
              POSITION: [26, 8, 1, 0, 0, 0, 0]
            }, {
              POSITION: [20, 8, 1, 0, 0, 0, 0]
            }, {
              POSITION: [14, 8, 1, 0, 0, 0, 0]
            }, {
              POSITION: [3, 8, 1.4, 26, 0, 0, 0],
              PROPERTIES: {
                  SHOOT_SETTINGS: combineStats([g.trap, g.doublereload, g.power]),
                  TYPE: exports.trap
              }
            },{
              POSITION: [3, 8, 1.4, 20, 0, 0, 0.25],
              PROPERTIES: {
                  SHOOT_SETTINGS: combineStats([g.trap, g.doublereload, g.power]),
                  TYPE: exports.trap
              }
            },{
              POSITION: [3, 8, 1.4, 14, 0, 0, 0.5],
              PROPERTIES: {
                  SHOOT_SETTINGS: combineStats([g.trap, g.doublereload, g.power]),
                  TYPE: exports.trap
              }
            }
  ]
}
exports.sanctuary = {
  PARENT: [exports.genericTank],
  LABEL: 'Sanctuary',
  
  ACCEPTS_SCORE: false,
  BODY: {
    HEALTH: 1000,
    DAMAGE: 12.5,
    PUSHABILITY: 0,
    HETERO: 0
  },
  GUNS: [],
  SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  HITS_OWN_TYPE: 'pushOnlyTeam',
  INTANGIBLE: true,
  IS_DOMINATOR: true,
  FACING_TYPE: 'autospin',
  TURRETS: (() => {
    var tr = [{
      POSITION: [10, 0, 0, 0, 360, 1],
      TYPE: [exports.auraGenerator3, { AUTOFIRE: true }]
    }]
    tr.push({
      POSITION: [23, 0, 0, 0, 360, 0],
      TYPE: exports.dominationBody
    })
    return tr
  })()
}
exports.deadsanctuary = {
  PARENT: [exports.genericTank],
  LABEL: 'Sanctuary',
  ACCEPTS_SCORE: false,
  BODY: {
    HEALTH: 1000,
    DAMAGE: 7.5,
    PUSHABILITY: 0,
    HETERO: 0
  },
  FACING_TYPE: 'autospin',
  GUNS: [],
  HITS_OWN_TYPE: 'pushOnlyTeam',
  INTANGIBLE: true,
  IS_DOMINATOR: true,
  TURRETS: [
    {
      POSITION: [23, 0, 0, 0, 360, 0],
      TYPE: exports.dominationBody
    },
  ]
}
for (let i = 0; i < 8; i++) {
  exports.sanctuary.GUNS.push({
    POSITION: [12, 4, 1, 0, 0, (360 * i) / 8, 0]
  }, {
    POSITION: [2, 4, 1.7, 12, 0, (360 * i) / 8, 0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.trapturret, [2.5, 1, 1, 1, 3.5, 1, 1, 1, 0.65, 1, 1, 1, 1]]),
      TYPE: exports.trap, AUTOFIRE: true
    }
  })
}
exports.gunning = {
  PARENT: [exports.genericTank],
  LABEL: 'Gunning',
  GUNS: [
    {          /*LENGTH,  WIDTH, ASPECT,  X,  Y,  ANGLE, DELAY*/
      POSITION: [  16,      6,     1,    0,   -5.5,   0,   0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.puregunner]),
        TYPE: exports.bullet
      }
    },
    {          /*LENGTH,  WIDTH, ASPECT,  X,  Y,  ANGLE, DELAY*/
      POSITION: [  16,      6,     1,    0,   5.5,   0,   0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.puregunner]),
        TYPE: exports.bullet
      }
    }
  ]
}
exports.penta_destroyer = {
  PARENT: [exports.miniboss],
  LABEL: 'Elite Penta',
  SHAPE: 5,
  COLOR: 14,
  GUNS: [],
  TURRETS: [
    {
      POSITION: [10, 0, 0, 0, 360, 1],
      TYPE: [exports.bigauto4gun, {INDEPENDENT: true}]
    }
  ]
}
for (let rush_e = 0.5; rush_e < 5; rush_e++) {
  exports.penta_destroyer.GUNS.push({
    POSITION: [12, 13, 1, 0, 0, (360 * rush_e) / 5, 0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
      TYPE: exports.bullet
    }
  })
}
let u_b_prop = {
  SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
  TYPE: exports.bullet
}
exports.unknownboss = {
  PARENT: [exports.miniboss],
  LABEL: 'Unknown Dark Boss',
  SHAPE: 6,
  COLOR: 19,
  TURRETS: [],
  GUNS: []
}
for (let i = 0; i < 6; i++) {
  exports.unknownboss.TURRETS.push({
    POSITION: [6, 8, 0, (360 * i) / 6 + 30, 0, 1],
    TYPE: exports.trapTurret
  }),
  exports.unknownboss.GUNS.push({
    POSITION: [13, 8, 1.4, 0, 0, (360 * i) / 6, 0],
    PROPERTIES: u_b_prop
  })
}
exports.plasma_turret = {
  PARENT: [exports.autoTurret],
  LABEL: '',
  GUNS: [
    {
      POSITION: [20, 8, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, [1, 1, 1, 1, 1.4, 1.24, 1.67, 1.6, 1, 1, 1, 1, 1]]),
        TYPE: exports.bullet,
        LABEL: 'Highly Photon'
      }
    }, {
      POSITION: [16, 8, 0.6, 0, 0, 0, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, [1, 1, 1, 1, 1.4, 1.24, 1.67, 1.6, 1, 1, 1, 1, 1]]),
        TYPE: exports.swarm,
        LABEL: 'Photon'
      }
    }
  ]
}
exports.plasma_turret2 = {
  PARENT: [exports.autoTurret],
  LABEL: '',
  GUNS: [
    {
      POSITION: [20, 8, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, [1, 1, 1, 1, 2.4, 3.24, 7.26, 1.6, 1, 1, 1, 1, 1]]),
        TYPE: exports.bullet,
        LABEL: 'Highly Photon'
      }
    }, {
      POSITION: [16, 8, 0.6, 0, 0, 0, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, [1, 1, 1, 1, 2.4, 3.24, 7.26, 1.6, 1, 1, 1, 1, 1]]),
        TYPE: exports.bullet,
        LABEL: 'Highly Photon'
      }
    }
  ]
}
exports.plasmabody1 = {
  PARENT: [exports.genericTank],
  LABEL: '',
  SHAPE: 5,
  COLOR: 18,
  CONTROLLERS: ['slowspin'],
  TURRETS: []
}
for (let i = 0.5; i < 5; i++) {
  exports.plasmabody1.TURRETS.push({
    POSITION: [8, 8, 0, (360 * i) / 5, 180, 0],
    TYPE: exports.plasma_turret
  })
}
exports.plasmabody2 = {
  PARENT: [exports.genericTank],
  LABEL: '',
  SHAPE: 7,
  COLOR: 18,
  CONTROLLERS: ['reverseslowspin'],
  TURRETS: []
}
for (let i = 0.5; i < 7; i++) {
  exports.plasmabody2.TURRETS.push({
    POSITION: [8, 8, 0, (360 * i) / 7, 180, 0],
    TYPE: exports.plasma_turret2
  })
}
exports.plasma = {
  PARENT: [exports.celestial],
  NAME: 'Plasma',
  COLOR: 18,
  TURRETS: [
    ...ctta,
    {
      POSITION: [15, 0, 0, 0, 360, 1],
      TYPE: exports.plasmabody2
    }, {
      POSITION: [9.5, 0, 0, 0, 360, 1],
      TYPE: exports.plasmabody1
    }
  ]
}
exports.duoanni = {
  PARENT: [exports.genericTank],
  BODY: {
    ACCELERATION: base.ACCEL * 0.75,
    FOV: 3,
  },
  LABEL: "Annihilator",
  DANGER: 7,
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [20.5, 19.5, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni]),
        TYPE: exports.bullet,
      },
    },
    {
      POSITION: [20.5, 19.5, 1, 0, 0, 180, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni]),
        TYPE: exports.bullet,
      },
    },
  ],
};
exports.plutoautobullet = {
  PARENT: [exports.bullet],
  LABEL: "pluto auto bullet",
},
  exports.plutodrone = {
    PARENT: [exports.swarm],
    LABEL: "pluto auto swarm",
    TURRETS: [
      {
        POSITION: [10, 0, 0, 0, 360, 1],
        TYPE: exports.auto4gun,
      },
    ],
  }
  exports.plutocruiser = {
    PARENT: [exports.autoTurret],
    LABEL: "pluto cruiser",
    CONTROLLERS: ["onlyAcceptInArc", "nearestDifferentMaster"],
    GUNS: [
      {
        POSITION: [15, 8, 0.5, 0, -5.5, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, [2, 1, 1, 1, 2, 2, 2, 2.5, 1, 1, 1, 1, 1]]),
          TYPE: exports.plutodrone,
        },
      },
      {
        POSITION: [15, 8, 0.5, 0, 5.5, 0, 1],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, [2, 1, 1, 1, 2, 2, 2, 2.5, 1, 1, 1, 1, 1]]),
          TYPE: exports.plutodrone,
        },
      },
    ],
  }
exports.plutogunner = {
  PARENT: [exports.autoTurret],
  LABEL: "Pluto gunner",
  CONTROLLERS: ["onlyAcceptInArc", "nearestDifferentMaster"],
  GUNS: [
    {
      POSITION: [20, 14, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.pound,
          g.destroy,
          g.anni,
          g.power,
          [1.5, 1, 1, 1, 3, 4, 6, 2.5, 1, 1, 1, 1, 1],
          g.halfreload,
        ]),
        TYPE: exports.plutoautobullet,
      },
    },
  ],
}
  exports.plutogunnerlayer = {
    PARENT: [exports.genericTank],
    LABEL: "Pluto ceptionist layer",
    SHAPE: 5,
    COLOR: 17,
    SIZE: 40,
    CONTROLLERS: ["slowspin"],
    TURRETS: [
      {
        POSITION: [10, 8, 0, (360 * 1.5) / 5, 180, 0],
        TYPE: exports.plutogunner,
      },
      {
        POSITION: [10, 8, 0, (360 * 2.5) / 5, 180, 0],
        TYPE: exports.plutogunner,
      },
      {
        POSITION: [10, 8, 0, (360 * 3.5) / 5, 180, 0],
        TYPE: exports.plutogunner,
      },
      {
        POSITION: [10, 8, 0, (360 * 4.5) / 5, 180, 0],
        TYPE: exports.plutogunner,
      },
      {
        POSITION: [10, 8, 0, (360 * 5.5) / 5, 180, 0],
        TYPE: exports.plutogunner,
      },
    ],
  }
  exports.plutoswarmlayer = {
    PARENT: [exports.genericTank],
    LABEL: "Pluto cruiser layer",
    SHAPE: 7,
    COLOR: 17,
    SIZE: 40,
    CONTROLLERS: ["reverseslowspin"],
    TURRETS: [
      {
        POSITION: [7, 8, 0, (360 * 1.5) / 7, 180, 0],
        TYPE: exports.plutocruiser,
      },
      {
        POSITION: [7, 8, 0, (360 * 2.5) / 7, 180, 0],
        TYPE: exports.plutocruiser,
      },
      {
        POSITION: [7, 8, 0, (360 * 3.5) / 7, 180, 0],
        TYPE: exports.plutocruiser,
      },
      {
        POSITION: [7, 8, 0, (360 * 4.5) / 7, 180, 0],
        TYPE: exports.plutocruiser,
      },
      {
        POSITION: [7, 8, 0, (360 * 5.5) / 7, 180, 0],
        TYPE: exports.plutocruiser,
      },
      {
        POSITION: [7, 8, 0, (360 * 6.5) / 7, 180, 0],
        TYPE: exports.plutocruiser,
      },
      {
        POSITION: [7, 8, 0, (360 * 7.5) / 7, 180, 0],
        TYPE: exports.plutocruiser,
      },
    ],
  }
  exports.pluto = {
    PARENT: [exports.celestial],
    NAME: "Pluto",
    COLOR: 17,
    TURRETS: [
      ...ctta,
      {
        POSITION: [15, 0, 0, 0, 360, 1],
        TYPE: [exports.plutoswarmlayer, { COLOR: 17 }],
      },
      {
        POSITION: [9, 0, 0, 0, 360, 1],
        TYPE: [exports.plutogunnerlayer],
        COLOR: 17,
      },
    ],
  }
exports.kronosbullet = {
  PARENT: [exports.missile],
  LABEL: "Alpha Missile",
  BODY: {
    RANGE: 1080
  },
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [14, 6, 1, 0, 0, 90, 0],
    },
    {
      POSITION: [4, 6, 1.7, 14, 0, 90, 1],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.trap,
          g.thruster,
          g.morereload,
          g.power,
        ]),
        TYPE: [exports.trap, {PERSISTS_AFTER_DEATH: true}],
        STAT_CALCULATOR: gunCalcNames.trap,
        AUTOFIRE: true,
      },
    },
    {
      POSITION: [14, 6, 1, 0, 0, -90, 0],
    },
    {
      POSITION: [4, 6, 1.7, 14, 0, -90, 1],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.trap,
          g.thruster,
          g.morereload,
          g.power,
        ]),
        TYPE: [exports.trap, {PERSISTS_AFTER_DEATH: true}],
        STAT_CALCULATOR: gunCalcNames.trap,
        AUTOFIRE: true,
      },
    },
    { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  14,     6,      1,      0,     -2.75,     155,     0,   ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            }, }, {
        POSITION: [  14,     6,      1,      0,      2.75,     -155,     0,  ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,    
            }, }, 
  ],
};

exports.kronosmissilelauncher = {
  PARENT: [exports.auto4gun],
  LABEL: "Missile Launcher",
  BODY: {
    FOV: 5,
  },
  COLOR: 6,
  GUNS: [
    {
      POSITION: [14, 4, 5.4, 5, 0, 0, 0],
    },
    {
      POSITION: [15, 16, 1.2, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.pound,
          g.destroy,
          g.halfreload,
          g.arty,
          g.halfreload,
          g.turret,
          [1, 1, 1, 1.2, 2, 2.2, 2.2, 1, 1, 1, 1, 1, 1]
        ]),
        TYPE: exports.kronosbullet,
      },
    },
  ]
};
exports.kronostriplet = {
  PARENT: [exports.auto4gun],
  DANGER: 6,
  BODY: {
    FOV: 9,
  },
  COLOR: 6,
  LABEL: "Triplet",
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [18, 10, 1, 0, 5, 0, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          [1.5, 1, 1, 1, 1.4, 1.2, 1.23, 1, 1, 1, 1, 1, 1],
          g.power,
          g.turret,
        ]),
        TYPE: exports.bullet,
      },
    },
    {
      POSITION: [18, 10, 1, 0, -5, 0, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          [1.5, 1, 1, 1, 1.4, 1.2, 1.23, 1, 1, 1, 1, 1, 1],
          g.power,
          g.turret,
        ]),
        TYPE: exports.bullet,
      },
    },
    {
      POSITION: [21, 10, 1.45, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          [1.5, 1, 1, 1, 1.4, 1.2, 1.23, 1, 1, 1, 1, 1, 1],
          g.power,
          g.mach,
          g.turret,
        ]),
        TYPE: exports.bullet,
      },
    },
  ],
};
exports.kronoscarrier = {
  PARENT: [exports.auto4gun],
  LABEL: "Carrier",
  DANGER: 7,
  STAT_NAMES: statnames.swarm,
  FACING_TYPE: "locksFacing",
  BODY: {
    ACCELERATION: base.ACCEL * 0.75,
    FOV: 2,
  },
  COLOR: 6,
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [7, 7.5, 0.6, 7, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.swarm,
          [1.5, 1, 1, 1, 1.4, 1.2, 1.23, 1, 1, 1, 1, 1, 1],
          g.battle,
          g.carrier,
          g.turret,
        ]),
        TYPE: exports.swarm,
        STAT_CALCULATOR: gunCalcNames.swarm,
      },
    },
    {
      POSITION: [7, 7.5, 0.6, 7, 0, 40, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.swarm,
          [1.5, 1, 1, 1, 1.4, 1.2, 1.23, 1, 1, 1, 1, 1, 1],
          g.battle,
          g.carrier,
          g.turret,
        ]),
        TYPE: exports.swarm,
        STAT_CALCULATOR: gunCalcNames.swarm,
      },
    },
    {
      POSITION: [7, 7.5, 0.6, 7, 0, -40, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.swarm,
          [1.5, 1, 1, 1, 1.4, 1.2, 1.23, 1, 1, 1, 1, 1, 1],
          g.battle,
          g.carrier,
          g.turret,
        ]),
        TYPE: exports.swarm,
        STAT_CALCULATOR: gunCalcNames.swarm,
      },
    },
  ],
};
exports.kronosbody1 = {
  PARENT: [exports.genericTank],
  LABEL: "",
  SHAPE: 5,
  COLOR: 6,
  CONTROLLERS: ["reverseslowspin"],
  SKILL: [9,9,9,9,9,9,9,9,9,9],
  TURRETS: [
    {
      POSITION: [8, 8, 0, (360 * 1.5) / 5, 180, 0],
      TYPE: exports.kronostriplet,
    },
    {
      POSITION: [8, 8, 0, (360 * 2.5) / 5, 180, 0],
      TYPE: exports.kronostriplet,
    },
    {
      POSITION: [8, 8, 0, (360 * 3.5) / 5, 180, 0],
      TYPE: exports.kronostriplet,
    },
    {
      POSITION: [8, 8, 0, (360 * 4.5) / 5, 180, 0],
      TYPE: exports.kronostriplet,
    },
    {
      POSITION: [8, 8, 0, (360 * 5.5) / 5, 180, 0],
      TYPE: exports.kronostriplet,
    },
  ],
};
exports.kronosbody2 = {
  PARENT: [exports.genericTank],
  LABEL: "",
  SHAPE: 7,
  COLOR: 6,
  CONTROLLERS: ["slowspin"],
  SKILL: [9,9,9,9,9,9,9,9,9,9],
  TURRETS: [
    {
      POSITION: [6, 9, 0, (360 * 1.5) / 7, 180, 0],
      TYPE: exports.kronoscarrier,
    },
    {
      POSITION: [6, 9, 0, (360 * 2.5) / 7, 180, 0],
      TYPE: exports.kronoscarrier,
    },
    {
      POSITION: [6, 9, 0, (360 * 3.5) / 7, 180, 0],
      TYPE: exports.kronoscarrier,
    },
    {
      POSITION: [6, 9, 0, (360 * 4.5) / 7, 180, 0],
      TYPE: exports.kronoscarrier,
    },
    {
      POSITION: [6, 9, 0, (360 * 5.5) / 7, 180, 0],
      TYPE: exports.kronoscarrier,
    },
    {
      POSITION: [6, 9, 0, (360 * 6.5) / 7, 180, 0],
      TYPE: exports.kronoscarrier,
    },
    {
      POSITION: [6, 9, 0, (360 * 7.5) / 7, 180, 0],
      TYPE: exports.kronoscarrier,
    },
  ],
};
exports.kronosbody3 = {
  PARENT: [exports.genericTank],
  LABEL: "",
  COLOR: 6,
  SHAPE: 9,
  CONTROLLERS: ["reverseslowspin"],
  SKILL: [9,9,9,9,9,9,9,9,9,9],
  TURRETS: [
    {
      POSITION: [6, 9, 0, (360 * 1.5) / 9, 180, 0],
      TYPE: exports.kronosmissilelauncher,
    },
    {
      POSITION: [6, 9, 0, (360 * 2.5) / 9, 180, 0],
      TYPE: exports.kronosmissilelauncher,
    },
    {
      POSITION: [6, 9, 0, (360 * 3.5) / 9, 180, 0],
      TYPE: exports.kronosmissilelauncher,
    },
    {
      POSITION: [6, 9, 0, (360 * 4.5) / 9, 180, 0],
      TYPE: exports.kronosmissilelauncher,
    },
    {
      POSITION: [6, 9, 0, (360 * 5.5) / 9, 180, 0],
      TYPE: exports.kronosmissilelauncher,
    },
    {
      POSITION: [6, 9, 0, (360 * 6.5) / 9, 180, 0],
      TYPE: exports.kronosmissilelauncher,
    },
    {
      POSITION: [6, 9, 0, (360 * 7.5) / 9, 180, 0],
      TYPE: exports.kronosmissilelauncher,
    },
    {
      POSITION: [6, 9, 0, (360 * 8.5) / 9, 180, 0],
      TYPE: exports.kronosmissilelauncher,
    },
    {
      POSITION: [6, 9, 0, (360 * 9.5) / 9, 180, 0],
      TYPE: exports.kronosmissilelauncher,
    },
  ],
};
exports.kronos = {
  PARENT: [exports.eternal],
  NAME: "Kronos",
  COLOR: 6,
  TURRETS: [
    ...eternalTrapTurretArray,
    {
      POSITION: [15.4, 0, 0, 0, 360, 1],
      TYPE: exports.kronosbody3,
    },
    {
      POSITION: [10.9, 0, 0, 0, 360, 1],
      TYPE: exports.kronosbody2,
    },
    {
      POSITION: [6.9, 0, 0, 0, 360, 1],
      TYPE: exports.kronosbody1,
    },
  ],
};
exports.ragnarok = (() => {
  g.ragnarokMissile = [12, 1, 1, 1, 6, 5.75, 3, 1.3, 0.45, 1, 1, 1, 1]
  g.ragnarokGunnerSwarmStats = [2.3, 1, 1, 1, 0.72, 0.422, 0.445, 2.1121, 1, 1, 1, 1, 1]
  g.ragnarokDrone = [9, 1, 1, 0.45, 4.5, 1.21, 1.23, 1, 1, 1, 1, 1, 1]
  exports.ragnarokDrone = {
    PARENT: [exports.drone],
    FACING_TYPE: 'ragdrspn',
    INDEPENDENT: true,
    DRAW_HEALTH: true,
    BODY: {
      SPEED: 1.45,
      FOV: 2
    },
    SHAPE: 6,
    
  }
  exports.ragnarokMissile = {
    PARENT: [exports.bullet],
    LABEL: 'Auto-Smasher',
    BODY: {
      RANGE: 750
    },
    TURRETS: [
      {
        POSITION: [21.5, 0, 0, 0, 360, 0],
        TYPE: exports.smasherBody
      }, {
        POSITION: [12, 0, 0, 0, 360, 1],
        TYPE: [exports.autoSmasherTurret, { INDEPENDENT: true }]
      }
    ]
  }
  exports.ragnarokMissileLauncher = {
    PARENT: [exports.auto3gun],
    LABEL: '',
    GUNS: [
      {
        POSITION: [20, 12, -0.233, 0, 0, 0, 0]
      }, {
        POSITION: [18, 14, 1.323, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.ragnarokMissile]),
          TYPE: exports.ragnarokMissile
        }
      }
    ]
  }
  exports.ragnarokGunnerSwarm = {
    PARENT: [exports.auto3gun],
    LABEL: 'Gunner Cruiser',
    GUNS: [
      {
                POSITION: [  9.25,    3.5,     0.6,      0,     7.25,    0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.ragnarokGunnerSwarmStats]),
                        TYPE: exports.swarm,
                    }, }, { 
                POSITION: [  9.25,    3.5,     0.6,      0,    -7.25,    0,     0.75, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.ragnarokGunnerSwarmStats]),
                        TYPE: exports.swarm,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,     3.75,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.ragnarokGunnerSwarmStats]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,    -3.75,    0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.ragnarokGunnerSwarmStats]),
                        TYPE: exports.bullet,
                    }, }, 
    ]
  }
  exports.ragnarokBody1 = {
    PARENT: [exports.genericTank],
    LABEL: 'Ragnarok Gunner Cruiser Body',
    SHAPE: 5,
    COLOR: 0,
    CONTROLLERS: ['reverseslowspin'],
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    TURRETS: (() => {
      var tr = []
      for (let i = 0.5; i < 5; i++) {
        tr.push({
          POSITION: [7.25, 9, 0, (360 * i) / 5, 180, 0],
          TYPE: exports.ragnarokGunnerSwarm
        })
      }
      return tr
    })()
  }
  exports.ragnarokBody2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Ragnarok Missile Launcher Body',
    SHAPE: 7,
    COLOR: 0,
    CONTROLLERS: ['slowspin'],
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    TURRETS: (() => {
      var tr = []
      for (let i = 0.5; i < 7; i++) {
        tr.push({
          POSITION: [6.25, 8.425, 0, (360 * i) / 7, 110, 0],
          TYPE: exports.ragnarokMissileLauncher
        })
      }
      return tr
    })()
  }
  exports.ragnarokBody3 = {
    PARENT: [exports.genericTank],
    LABEL: 'Ragnarok Drone Body',
    SHAPE: 9,
    COLOR: 0,
    CONTROLLERS: ['reverseslowspin'],
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    GUNS: (() => {
      var GS = []
      for (let i = 0.5; i < 9; i++) {
        GS.push({
          POSITION: [6, 9.5, 0.35, 5, 0, (360 * i) / 9, 5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.ragnarokDrone]),
            TYPE: exports.ragnarokDrone, AUTOFIRE: true, MAX_CHILDREN: 2
          }
        })
      }
      return GS
    })()
  }
  return {
    PARENT: [exports.eternal],
    NAME: 'Ragnarok',
    COLOR: 0,
    BODY: {
      FOV: 2
    },
    TURRETS: (() => {
      var tr = []
      for (let i = 0.5; i < 11; i++) {
        tr.push({
          POSITION: [4.25, 9, 0, (360 * i) / 11, 0, 0],
          TYPE: exports.celTrapTurret
        })
      }
      tr.push({
        POSITION: [17, 0, 0, 0, 360, 1],
        TYPE: exports.ragnarokBody3
      },{
        POSITION: [11.75, 0, 0, 0, 360, 1],
        TYPE: exports.ragnarokBody2
      },{
        POSITION: [6.773, 0, 0, 0, 360, 1],
        TYPE: exports.ragnarokBody1
      })
      return tr
    })()
  }
})()
exports.sentinelKing = (() => {
   function sentinelKingLayer(number, color, controller, TURRETS = [], GUNS = []) {
    return {
      PARENT: [exports.genericTank],
      LABEL: '',
      SHAPE: 3 + 2*number,
      COLOR: color,
      CONTROLLERS: [`${controller}`],
      SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
      TURRETS: TURRETS,
      GUNS: GUNS
    }
  }
  g.sentinelMissile = [3, 1, 1, 1, 1.5, 1.6, 1.35, 1, 1, 1, 1, 1, 1]
  exports.sentinelTurret1 = {
    PARENT: [exports.genericTank],
    GUNS: [
       {
        POSITION: [15, 13, 1.32307692308, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.pound, g.arty, g.skim, g.fake, g.sentinelMissile, [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]),
          TYPE: exports.bullet
        }
      }, {
        POSITION: [3, 17.2, 0.8, 15, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.pound, g.arty, g.skim, g.sentinelMissile]),
          TYPE: exports.sentinelMissile
        }
      },
      {
        POSITION: [13.5, 17.2, 0.2, 4.5, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.pound, g.arty, g.skim, g.fake, g.sentinelMissile, [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]),
          TYPE: exports.bullet
        }
      },
    ]
  }
  exports.sentinelTurret2 = {
    PARENT: [exports.genericTank],
    SHAPE: 0,
    GUNS: [
      {
        POSITION: [15, 6, 1, 0, 3.25, 0, 0],
         PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.gunner, g.mini]),
          TYPE: exports.bullet
        }
      },
      {
        POSITION: [13, 10, 0.6, 0, 3.25, 0, 0.5],
      },
      {
        POSITION: [15, 6, 1, 0, -3.25, 0, 0],
         PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.gunner, g.mini]),
          TYPE: exports.bullet
        }
      },
      {
        POSITION: [13, 10, 0.6, 0, -3.25, 0, 0.5],
      },
      {
        POSITION: [21, 8, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.gunner, g.mini]),
          TYPE: exports.bullet
        }
      },{
        POSITION: [19, 8, 1, 0, 0, 0, 0.333],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.gunner, g.mini]),
          TYPE: exports.bullet
        }
      },{
        POSITION: [17, 8, 1, 0, 0, 0, 0.667],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.gunner, g.mini]),
          TYPE: exports.bullet
        }
      }
    ]
  }
  exports.sentinelKingBody1 = sentinelKingLayer(1, 14, 'reverseslowspin', (() => {
    var tr = []
    for (let i = 0.5; i < 5; i++) {
      tr.push({
        POSITION: [8, 8.5, 0, (360 * i) / 5, 180, 0],
        TYPE: [exports.auto3gun, { PARENT: [exports.sentinelTurret2], SHAPE: 0 }]
      })
    }
    return tr
  })(), [])
  exports.sentinelKingBody2 = sentinelKingLayer(2, 14, 'slowspin', (() => {
    var tr = []
    for (let i = 0.5; i < 7; i++) {
      tr.push({
        POSITION: [8, 8.5, 0, (360 * i) / 7, 180, 0],
        TYPE: [exports.auto3gun, { PARENT: [exports.sentinelTurret1], SHAPE: 0 }]
      })
    }
    return tr
  })(), [])
  exports.sentinelKingBody3 = sentinelKingLayer(3, 14, 'reverseslowspin', [], (() => {
    var gs = []
    for (let i = 0.5; i < 5; i++) {
      gs.push({
        POSITION: [5.5, 5, 1.4, 6, 0, (360 * i) / 9, 5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.factory, g.halfreload, g.halfreload]),
          TYPE: [exports.sentinelLauncher, { CONTROLLERS: ['hangOutNearMaster'], INDEPENDENT: true, BODY: { HEALTH: 5, SPEED: 1.4, DAMAGE: 1.4} }], AUTOFIRE: true, MAX_CHILDREN: 1
        }
      })
    }
    for (let i = 0.5; i < 4; i++) {
      gs.push({
        POSITION: [5.5, 5, 1.4, 6, 0, (360 * (5 + i)) / 9, 5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.factory, g.halfreload, g.halfreload]),
          TYPE: [exports.sentinelMinigun, { CONTROLLERS: ['hangOutNearMaster'], INDEPENDENT: true, BODY: { HEALTH: 5, SPEED: 1.4, DAMAGE: 1.4} }], AUTOFIRE: true, MAX_CHILDREN: 1
        }
      })
    }
    return gs
  })())
  return {
    PARENT: [exports.eternal],
    NAME: 'Sentinel King',
    SIZE: 178.34,
    COLOR: 14,
    VALUE: 4.8e6,
    BODY: {
      HEALTH: 2350,
      DAMAGE: 11,
        REGEN: base.REGEN * 0.025
    },
    TURRETS: (() => {
      var tr = []
      for (let i = 0.5; i < 11; i++) {
        tr.push({
          POSITION: [6.5, 8, 0, (360 * i) / 11, 0, 0],
          TYPE: [exports.trapTurret, { AUTOFIRE: true }]
        })
      }
      var layers = [exports.sentinelKingBody3, exports.sentinelKingBody2, exports.sentinelKingBody1]
      for (let i = 0; i < 3; i++) {
        tr.push({
          POSITION: [15.25 - (4 * i), 0, 0, 0, 360, 1],
          TYPE: layers[i]
        })
      }
      return tr
    })()
  }
})()
exports.zaphkielskimturret = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: base.FOV * 5,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    LABEL: '',
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  10,    14,    -0.5,     9,      0,      0,      0,  ], 
             }, {
        POSITION: [  17,    15,      1,      0,      0,      0,      0,  ], 
               PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, [5, 1, 1, 1, 10, 5, 2.3, 1.5, 1, 1, 1, 1, 1]]),
                TYPE: exports.hypermissile,
            },  },
    ],
};
exports.zaphkielbody1 = {
  PARENT: [exports.genericTank],
  LABEL: '',
  SHAPE: 5,
  COLOR: 2,
  CONTROLLERS: ['slowspin'],
  TURRETS: []
}
for (let i = 0.5; i < 5; i++) {
  exports.zaphkielbody1.TURRETS.push({
    POSITION: [8, 8, 0, (360 * i) / 5, 180, 0],
    TYPE: exports.zaphkielskimturret
  })
}
exports.zaphkielbody2 = {
  PARENT: [exports.genericTank],
  LABEL: '',
  SHAPE: 7,
  COLOR: 2,
  BODY: {
    FOV: 3
  },
  CONTROLLERS: ['reverseslowspin'],
  GUNS: []
}
for (let i = 0.5; i < 7; i++) {
  exports.zaphkielbody2.GUNS.push({
    POSITION: [11.5, 6, 1.3, 0, 0, (360 * i) / 7, 0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.drone, [5, 1, 1, 1, 1.2, 1.33, 1.02, 0.5, 1, 1, 1, 1, 1]]),
      TYPE: [exports.drone, {INDEPENDENT: true, BODY: {SPEED: 1.3, FOV: 1.3}}], AUTOFIRE: true, MAX_CHILDREN: 4
    }
  })
}
exports.zaphkiel = {
  PARENT: [exports.celestial],
  NAME: "Zaphkiel",
  COLOR: 2,
  TURRETS: [
    ...ctta,
    {
      POSITION: [15, 0, 0, 0, 360, 1],
      TYPE: exports.zaphkielbody2
    }, {
      POSITION: [9.5, 0, 0, 0, 360, 1],
      TYPE: exports.zaphkielbody1
    }
  ]
}
exports.paladinhiveshoot = {
  PARENT: [exports.autoTurret],
  LABEL: "",
  HAS_NO_RECOIL: true,
  BODY: {
    FOV: base.FOV * 1.9,
  },
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [14, 14, -1.2, 5, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.pound,
          g.destroy,
          g.anni,
          g.power,
          g.halfreload,
          g.power,
          g.double_damage,
          g.double_damage,
          g.quadro_damage,
          g.half_damage,
          g.hive,
        ]),
        TYPE: [exports.hive, { MOTION_TYPE: "slowdown" }],
      },
    },
    {
      POSITION: [15, 12, 1, 5, 0, 0, 0],
    },
  ],
};
exports.paladinbody1 = {
  PARENT: [exports.genericTank],
  LABEL: "",
  CONTROLLERS: ["slowspin"],
  SHAPE: 5,
  COLOR: 14,
  TURRETS: [],
};
for (let i = 0; i < 5; i++) {
  exports.paladinbody1.TURRETS.push({
    POSITION: [8, 8, 0, (360 * i) / 5 + 360 / 5 / 2, 180, 0],
    TYPE: exports.paladinhiveshoot,
  });
}
exports.paladinbody2 = {
  PARENT: [exports.genericTank],
  LABEL: "",
  HAS_NO_RECOIL: true,
  CONTROLLERS: ["reverseslowspin"],
  SHAPE: 7,
  COLOR: 14,
  GUNS: [],
};
for (let i = 0; i < 7; i++) {
  exports.paladinbody2.GUNS.push({
    POSITION: [12, 6, 1.4, 0, 0, (360 * i) / 7 + 360 / 7 / 2, 0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([
        g.drone,
        g.double_damage,
        g.over,
        g.halfreload,
      ]),
      TYPE: exports.paladindrone,
      AUTOFIRE: true,
      MAX_CHILDREN: 5,
    },
  });
}
exports.paladin = {
  PARENT: [exports.celestial],
  LABEL: "Celestial",
  NAME: "Paladin",
  SHAPE: 9,
  BODY: {
    HEALTH: base.HEALTH * 15 * 2,
    DAMAGE: base.DAMAGE * 5,
    SPEED: 1.2,
  },
  COLOR: 14,
  VALUE: 1000000,
  TURRETS: [
    ...ctta,
    {
      POSITION: [15, 0, 0, 0, 360, 1],
      TYPE: exports.paladinbody2,
    },
    {
      POSITION: [9.5, 0, 0, 0, 360, 1],
      TYPE: exports.paladinbody1,
    },
  ],
};
exports.freyjaauto4gun = {
  PARENT: [exports.genericTank],
  LABEL: "",
  BODY: {
    FOV: 2,
  },
  CONTROLLERS: [
    "canRepel",
    "onlyAcceptInArc",
    "mapAltToFire",
    "nearestDifferentMaster",
  ],
  COLOR: 16,
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [16, 4, 1, 0, -3.5, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.power,
          g.turret,
          g.double_damage,
          g.double_damage,
          g.quadro_damage,
        ]),
        TYPE: exports.bullet,
      },
    },
    {
      POSITION: [16, 4, 1, 0, 3.5, 0, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.power,
          g.turret,
          g.double_damage,
          g.double_damage,
          g.quadro_damage,
        ]),
        TYPE: exports.bullet,
      },
    },
  ],
};
exports.freyjacruiser = {
  PARENT: [exports.autoTurret],
  LABEL: "Cruiser",
  DANGER: 6,
  FACING_TYPE: "locksFacing",
  STAT_NAMES: statnames.swarm,
  BODY: {
    ACCELERATION: base.ACCEL * 0.75,
    FOV: base.FOV * 1.2,
  },
  GUNS: [
    {
      /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [7, 7.5, 0.6, 7, 4, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.swarm,
          g.power,
          g.lessreload,
          g.double_damage,
          g.double_damage,
          g.quadro_damage,
          g.turret,
          g.double_damage,
          g.power
        ]),
        TYPE: exports.swarm,
        STAT_CALCULATOR: gunCalcNames.swarm,
      },
    },
    {
      POSITION: [7, 7.5, 0.6, 7, -4, 0, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.swarm,
          g.power,
          g.lessreload,
          g.double_damage,
          g.double_damage,
          g.quadro_damage,
          g.turret,
          g.double_damage,
          g.power
        ]),
        TYPE: exports.swarm,
        STAT_CALCULATOR: gunCalcNames.swarm,
      },
    },
  ],
};
exports.freyjabody1 = {
  PARENT: [exports.genericTank],
  LABEL: "",
  SHAPE: 5,
  COLOR: 1,
  CONTROLLERS: ["slowspin"],
  TURRETS: [],
};
for (let i = 0; i < 5; i++) {
  exports.freyjabody1.TURRETS.push({
    POSITION: [8, 8, 0, (360 * i) / 5 + 360 / 5 / 2, 180, 0],
    TYPE: exports.freyjaauto4gun,
  });
}
exports.freyjabody2 = {
  PARENT: [exports.genericTank],
  LABEL: "",
  SHAPE: 7,
  COLOR: 1,
  CONTROLLERS: ["reverseslowspin"],
  TURRETS: [],
};
for (let i = 0; i < 7; i++) {
  exports.freyjabody2.TURRETS.push({
    POSITION: [8, 8.5, 0, (360 * i) / 7 + 360 / 7 / 2, 180, 0],
    TYPE: exports.freyjacruiser,
  });
}
exports.freyja = {
  PARENT: [exports.celestial],
  LABEL: "Celestial",
  NAME: "Freyja",
  VALUE: 1000000,
  SHAPE: 9,
  COLOR: 1,
  BODY: {
    HEALTH: base.HEALTH * 15 * 2,
    DAMAGE: base.DAMAGE * 5,
    SPEED: 1.3,
  },
  TURRETS: [
    ...ctta,
    {
      POSITION: [15, 0, 0, 0, 360, 1],
      TYPE: exports.freyjabody2,
    },
    {
      POSITION: [9.5, 0, 0, 0, 360, 1],
      TYPE: exports.freyjabody1,
    },
  ],
  GUNS: [
    {
      POSITION: [0, 10, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload, g.pound, [1, 1, 1, 0.6, 1, 1, 1, 0, 1, 1, 1, 1, 1]]),
        TYPE: exports.swarm
      }
    }
  ]
};
exports.theiabullet = {
  PARENT: [exports.bullet],
  LABEL: "Twist",
  FACING_TYPE: "turnWithSpeed",
  GUNS: [],
};
for (let i = 0; i < 4; i++) {
  exports.theiabullet.GUNS.push({
    POSITION: [13, 6, 1, 0, 0, (360 * i) / 4, 0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.power]),
      TYPE: exports.bullet,
      AUTOFIRE: true,
    },
  });
}
exports.theiaturret = {
  PARENT: [exports.autoTurret],
  LABEL: "",
  BODY: {
    FOV: base.FOV * 1.8,
  },
  GUNS: [
    {
      POSITION: [21, 8.5, 1.5, 0, 0, 0, 0],
    },
    {
      POSITION: [18, 17, 0.8, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([
          g.basic,
          g.power,
          g.halfreload,
          g.pound,
          g.arty,
          g.smaller,
          g.double_damage,
          g.double_damage,
          g.triple_damage,
          g.quadro_damage,
          g.half_damage,
        ]),
        TYPE: exports.theiabullet,
      },
    },
  ],
};
exports.theiabody1 = {
  PARENT: [exports.genericTank],
  LABEL: "",
  SHAPE: 5,
  CONTROLLERS: ["slowspin"],
  COLOR: 13,
  TURRETS: [],
};
for (let i = 0; i < 5; i++) {
  exports.theiabody1.TURRETS.push({
    POSITION: [8, 8, 0, (360 * i) / 5 + 360 / 5 / 2, 90, 0],
    TYPE: exports.theiaturret,
  });
}
exports.theiabody2 = {
  PARENT: [exports.genericTank],
  LABEL: "",
  SHAPE: 7,
  CONTROLLERS: ["reverseslowspin"],
  COLOR: 13,
  GUNS: [],
};
for (let i = 0; i < 7; i++) {
  exports.theiabody2.GUNS.push({
    POSITION: [12, 7, 1.2, 0, 0, (360 * i) / 7 + 360 / 7 / 2, 0.25 * i],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([
        g.drone,
        g.sunchip,
        g.doublereload,
        g.doublereload,
        g.doublereload,
        g.doublereload,
        g.smaller,
      ]),
      TYPE: exports.autosunchip,
      AUTOFIRE: true,
      MAX_CHILDREN: 5,
    },
  });
}
exports.theia = {
  PARENT: [exports.celestial],
  LABEL: "Celestial",
  NAME: "Theia",
  VALUE: 1000000,
  SHAPE: 9,
  COLOR: 13,
  BODY: {
    HEALTH: base.HEALTH * 15 * 2,
    DAMAGE: base.DAMAGE * 5,
    SPEED: 1.2,
  },
  TURRETS: [
    ...ctta,
    {
      POSITION: [15, 0, 0, 0, 360, 1],
      TYPE: exports.theiabody2,
    },
    {
      POSITION: [9.5, 0, 0, 0, 360, 1],
      TYPE: exports.theiabody1,
    },
  ],
};
exports.daciamissile = {
  PARENT: [exports.missile],
  GUNS: (() => {
    let ms = [] // ms = missile
    exports.missile.GUNS.forEach(e=>{
      ms.push({
        POSITION: [
          e.POSITION[0],
          e.POSITION[1],
          e.POSITION[2],
          e.POSITION[3],
          e.POSITION[4],
          e.POSITION[5], 
          e.POSITION[6],
        ],
        PROPERTIES: e.PROPERTIES
      })
    })
    for (let i = 0.5; i < 2; i++) {
      ms.push({
            POSITION: [14, 8, 1, 0, 0, (360 * i) / 2, 0]
          }, {
            POSITION: [2, 8, 1.3, 18, 0, (360 * i) / 2, 0],
            PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.lowpower, g.lowpower]),
            TYPE: [exports.trap, {PERSISTS_AFTER_DEATH: true}], AUTOFIRE: true
        }
      })
    }
    return ms
  })()
}
exports.body1 = {
  PARENT: [exports.genericTank],
  SHAPE: 5,
  LABEL: '',
  CONTROLLERS: ['slowspin']
}
exports.body2 = {
  PARENT: [exports.genericTank],
  SHAPE: 7,
  LABEL: '',
  CONTROLLERS: ['reverseslowspin']
}
exports.body3 = {
  PARENT: [exports.genericTank],
  SHAPE: 9,
  LABEL: '',
  CONTROLLERS: ['slowspin']
}
exports.body4 = {
  PARENT: [exports.genericTank],
  SHAPE: 11,
  LABEL: '',
  CONTROLLERS: ['reverseslowspin']
}
exports.daciadeployer = {
  PARENT: [exports.autoTurret],
  LABEL: '',
  BODY: {
    FOV: 1.5
  },
  GUNS: [
    {
      POSITION: [18, 5, 3, 0, 0, 0, 0]
    }, {
      POSITION: [15, 15, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, [2, 1, 1, 1, 4.5, 1.75, 2.5, 2, 1, 1, 1, 1, 1]]),
        TYPE: exports.daciamissile
      }
    }
  ]
}
exports.daciaswarmer = {
  PARENT: [exports.autoTurret],
  LABEL: '',
  BODY: {
    FOV: 1.5
  },
  GUNS: [
    {
      POSITION: [14, 6, 0.6, 0, -5.5, 0, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.turret, g.power, [1, 1, 1, 1, 1.5, 1.75, 1.5, 1, 1, 1, 1, 1, 1]]),
        TYPE: exports.swarm
      }
    },{
      POSITION: [14, 6, 0.6, 0,  5.5, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.turret, g.power, [1, 1, 1, 1, 1.5, 1.75, 1.5, 1, 1, 1, 1, 1, 1]]),
        TYPE: exports.swarm
      }
    },
    {
      POSITION: [14, 6, 0.6, 0, 0, 0, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm, g.turret, g.power, [1, 1, 1, 1, 1.5, 1.75, 1.5, 1, 1, 1, 1, 1, 1]]),
        TYPE: exports.swarm
      }
    },
  ]
}
exports.daciabody1 = {
  PARENT: [exports.body1],
  COLOR: 4,
  TURRETS: (()=> {
    let d_b1 = [] //d = dacia, b = body
    for (let i = 0.5; i < 5; i++) {
      d_b1.push({
        POSITION: [8, 8, 0, (360 * i) / 5, 180, 0],
        TYPE: exports.daciadeployer
      })
    }
    return d_b1
  })()
}
exports.daciabody2 = {
  PARENT: [exports.body2],
  COLOR: 4,
  TURRETS: (()=> {
    let d_b2 = [] //d = dacia, b = body
    for (let i = 0.5; i < 7; i++) {
      d_b2.push({
        POSITION: [8, 8, 0, (360 * i) / 7, 180, 0],
        TYPE: exports.daciaswarmer
      })
    }
    return d_b2
  })()
}
exports.dacia = {
  PARENT: [exports.celestial],
  LABEL: "Celestial",
  NAME: "Dacia",
  VALUE: 1000000,
  SHAPE: 9,
  COLOR: 13,
  BODY: {
    HEALTH: base.HEALTH * 15 * 2,
    DAMAGE: base.DAMAGE * 5,
    SPEED: 1.2,
  },
  TURRETS: [
    ...ctta,
    {
      POSITION: [15, 0, 0, 0, 360, 1],
      TYPE: exports.daciabody2
    },{
      POSITION: [9.5, 0, 0, 0, 360, 1],
      TYPE: exports.daciabody1
    }
  ]
};
exports.lucius_company_bullet = {
  PARENT: [exports.bullet],
  GUNS: [
    {
      POSITION: [15,15,1,0,0,0,0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic,g.twin,[0.5,1,1,1,1,1,1,1,1,1,1,1,1]]),
        TYPE: exports.bullet,
        AUTOFIRE: true,
        SYNCS_SKILLS: true
      }
    }
  ]
};
exports.lucius_company = {
  PARENT: [exports.autoTurret],
  LABEL: "company",
  BODY: {FOV: 2},
  HAS_NO_RECOIL: true,
  GUNS: [
    {POSITION:[4,16,0.8,10,0,0,0]},
    {
      POSITION: [2,16,1,14,0,0,0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic,g.pound,g.destroy,[1,1,1,1,1,1,1,1.1,0.7,2,1,1,1]]),
        TYPE: exports.lucius_company_bullet
      }
    },
    {POSITION:[10,16,1,0,0,0,0]},
  ]
};
exports.lucius_shooting = {
  PARENT: [exports.drone],
  GUNS: [
    {
      POSITION: [20,10,1.5,0,0,180,0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster,[0.5,1,1,1,1,1,1,1,1,1,1,1,1]]),
        TYPE: exports.bullet
      }
    }
  ]
};
exports.luciusbody1 = {
  PARENT: [exports.body1],
  COLOR: 7,
  TURRETS: (()=> {
    let l_b1 = [];
    for (let i = 0; i < 5; i++) {
      l_b1.push({
        POSITION: [8, 8, 0, (360 * i+180) / 5, 180, 0],
        TYPE: exports.lucius_company
      })
    }
    return l_b1
  })()
}
exports.luciusbody2 = {
  PARENT: [exports.body2],
  TYPE: "tank",
  COLOR: 7,
  GUNS: (()=> {
    let l_b2 = [];
    for (let i = 0; i < 7; i++) {
      l_b2.push({
        POSITION: [3, 6, 1.1, 10,0,(360 * i+180) / 7,0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.drone,g.over]),
          TYPE: [exports.lucius_shooting, {
            INDEPENDENT: true,
            BODY: {FOV: 2}
          }],
          MAX_CHILDREN: 2,
          WAIT_TO_CYCLE: true,
          AUTOFIRE: true,
          SYNCS_SKILLS: true,
          STAT_CALUCULATOR: gunCalcNames.drone
        }
      })
    }
    return l_b2
  })()
}
exports.lucius = {
  PARENT: [exports.celestial],
  NAME: "Lucius",
  COLOR: 7,
  TURRETS: [
    ...ctta,
    {
      POSITION: [15, 0, 0, 0, 360, 1],
      TYPE: exports.luciusbody2
    },{
      POSITION: [9.5, 0, 0, 0, 360, 1],
      TYPE: exports.luciusbody1
    }]
}
exports.hazardminion = {
  PARENT: [exports.minion],
  SHAPE: 4, 
  BODY: {
    HEALTH: 100,
    DAMAGE: 10, 
  }
}
exports.hazard = { 
    PARENT: [exports.miniboss],//here
    LABEL: 'Hazardness',
    FACING_TYPE: 'locksFacing', 
    CONTROLLERS: ['bot'],
    SHAPE: 5,
    VALUE: 520000, 
    COLOR: 35, 
    TURRETS: [ { /*** size, x, y, ROTATION, angle, arc */
      POSITION: [10,   0,  0,  0,  120,  1],
      TYPE: [exports.hazardspawner = {
        PARENT: [exports.autoTurret],
        LABEL: 'Main Spawner',
        GUNS: [
          {       /*** L   W  AS   X  Y  AN D */
            POSITION: [15, 10, 1.4, 0, 0, 0, 0]
          }, { 
            POSITION: [3,  14,  0.6, 15, 0, 180, 0.1],
            PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.hazard]),
              TYPE: exports.hazardminion,
              MAX_CHILDREN: 4
            }
          },
        ]
      }]
    } ],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  28,     18,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
        }, }, 
    ],
};
exports.twinsniper = {
  PARENT: [exports.autoTurret],
  LABEL: '',
  GUNS: [
    {
      POSITION: [21, 8, 1, 0, -5.5, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.power]),
        TYPE: exports.bullet
      }
    }, {
      POSITION: [21, 8, 1, 0, 5.5, 0, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.power]),
        TYPE: exports.bullet
      }
    }
  ]
}
exports.waterspout = {
  PARENT: [exports.miniboss],
  LABEL: 'Waterspout',
  SHAPE: 5,
  COLOR: 14,
  VALUE: 200000,
  GUNS: (()=> {
    var gs = []
    for (let i = 0.5; i < 5; i++) {
      gs.push({
        POSITION: [11.5, 4, 1.3, 0, 4, (360 * i) / 5, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.drone]),
          TYPE: exports.drone,
          COLOR_OVERRIDE: 5,
          MAX_CHILDREN: 3
        }
      })
    }
    return gs
  })(),
  TURRETS: [
    {
      POSITION: [4, 10, -4, (360 * 1.5) / 5, 90, 0],
      TYPE: exports.twinsniper
    }, {
      POSITION: [4, 10, -4, (360 * 2.5) / 5, 90, 0],
      TYPE: exports.twinsniper
    }, {
      POSITION: [4, 10, -4, (360 * 3.5) / 5, 90, 0],
      TYPE: exports.twinsniper
    }, {
      POSITION: [4, 10, -4, (360 * 4.5) / 5, 90, 0],
      TYPE: exports.twinsniper
    }, {
      POSITION: [4, 10, -4, (360 * 5.5) / 5, 90, 0],
      TYPE: exports.twinsniper
    }, {
      POSITION: [8, 0, 0, 0, 360, 1],
      TYPE: exports.twisterturret
    }
  ]
}
exports.rotatingspike = {
  PARENT: [exports.genericTank]
}
exports.roomkeeper = {
  PARENT: [exports.miniboss],
  LABEL: 'Room Keeper',
  SHAPE: 8,
  COLOR: 6,
  GUNS: [
    {
      POSITION: [19, 7, 1.3, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.sniper]),
        TYPE: exports.bullet
      }
    },{
      POSITION: [19, 7, 1.3, 0, 0, 180, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.sniper]),
        TYPE: exports.bullet
      }
    },
  ]
}
// Testbed Stuff
exports.sentryPage = {
  PARENT: [exports.testbedP],
  LABEL: 'Sentry Page'
}
exports.sentinels = {
  PARENT: [exports.testbedP],
  LABEL: 'Sentinels'
}
exports.page2 = {
  PARENT: [exports.testbedP],
  LABEL: 'Page 2'
}
exports.misc = { 
  PARENT: [exports.testbedP],
  LABEL: 'Miscellaneous'
}
exports.elites = {
  PARENT: [exports.testbedP],
  LABEL: 'Elite Crashers'
}
exports.strangetanks = {
  PARENT: [exports.testbedP],
  LABEL: 'Strange Tanks'
}
exports.strange = {
  PARENT: [exports.testbedP],
  LABEL: 'Strange Bosses'
}
exports.celestials = {
  PARENT: [exports.testbedP],
  LABEL: 'Celestials'
}
exports.semicelestials = {
  PARENT: [exports.testbedP],
  LABEL: 'Semi-Celestials'
}
exports.terrestials = {
  PARENT: [exports.testbedP],
  LABEL: 'Terrestials'
}
exports.roguecelestials = {
  PARENT: [exports.testbedP],
  LABEL: 'Rogue Celestials'
}
exports.eternals = {
  PARENT: [exports.testbedP],
  LABEL: 'Eternals'
}
exports.mysticals = {
  PARENT: [exports.testbedP],
  LABEL: 'Mysticals'
}
exports.nesters = {
  PARENT: [exports.testbedP],
  LABEL: 'Nesters'
}
exports.testbedtanks = {
  PARENT: [exports.testbedP],
  LABEL: 'Testbed Tanks'
}
// Sentries
exports.sentryTwin = makeAuto(exports.sentry, 'Sentry', { type: exports.twin, size: 12, });

exports.sentrySpeeder = makeAuto(exports.sentry, 'Sentry', { type: exports.tri, size: 12, });

exports.sentryHeavy = makeAuto(exports.sentry, 'Sentry', { type: exports.pound, size: 12, });

exports.sentryDestroyer = makeAuto(exports.sentry, 'Sentry', { type: exports.destroy, size: 12, });

exports.sentryBrid = makeAuto(exports.sentry, 'Sentry', { type: exports.hybrid, size: 12, });

exports.sentryInfestor = makeAuto(exports.sentry, 'Sentry', { type: exports.infector, size: 12, });

exports.sentryMachine = makeAuto(exports.sentry, 'Sentry', { type: exports.machine, size: 12, });

exports.sentryBarrier = makeAuto(exports.sentry, 'Sentry', { type: exports.riot, size: 12, });

exports.sentrySpray = makeAuto(exports.sentry, 'Sentry', { type: exports.spray, size: 12, });

exports.sentryScientist = makeAuto(exports.sentry, 'Sentry', { type: exports.engineer, size: 12, });

exports.sentrySprey = makeAuto(exports.sentry, 'Sentry', { type: exports.sprey, size: 12, });

exports.sentryLauncher = makeAuto(exports.sentry, 'Sentry', { type: exports.skim, size: 12, });

exports.sentryOcto = makeAuto(exports.sentry, 'Sentry', { type: exports.octo, size: 12, });

exports.sentryFlank = makeAuto(exports.sentry, 'Sentry', { type: exports.flank, size: 12, });



exports.eliteSentinel = (() => {
  g.eliteSentinelMissile = [4, 1, 1, 1, 1.6, 1.2, 1.3, 1, 1, 1, 1, 1, 1]
  g.eliteSentinelEggSpawn = [0.1, 1, 1, 1.4, 0.77, 0.23, 0.54, 1, 1, 1, 1, 1, 1]
  exports.eliteSentinelEggDrone = {
    PARENT: [exports.sunchip],
    LABEL: "Drone",
    SHAPE: 0,
    TURRETS: [
      {
        POSITION: [10, 0, 0, 0, 360, 1],
        TYPE: exports.autoTurret
      }
    ]
  };
  exports.eliteSentinelSkimmerTurret = {
    PARENT: [exports.autoTurret],
    LABEL: '',
    GUNS: [
      {
        POSITION: [17, 15, -0.233, 0, 0, 0, 0]
      }, {
        POSITION: [15, 17, 1.3, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.eliteSentinelMissile]),
          TYPE: exports.kronosMissile
        }
      }
    ]
  }
  return {
    PARENT: [exports.sentry],
    NAME: "Elite Sentinel",
    SIZE: 25,
    VALUE: 175000,
    BODY: {
      HEALTH: 950,
      DAMAGE: 3,
      FOV: 1.5,
      PUSHABILITY: 0
    },
    FACING_TYPE: 'autospin',
    TURRETS: (() => {
      var tr = []
      tr.push({
        POSITION: [10, 0, 0, 0, 360, 1],
        TYPE: exports.eliteSentinelSkimmerTurret
      })
      return tr
    })(),
    GUNS: (() => {
      var gs = []
      for (let i = 0.5; i < 5; i++) {
        gs.push({
          POSITION: [6.2, 7, 1.4, 5, 0, (360 * i) / 5, (1 / i)],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.eliteSentinelEggSpawn]),
            TYPE: exports.eliteSentinelEggDrone, AUTOFIRE: true, MAX_CHILDREN: 4
          }
        })
      }
      return gs
    })()
  }
})()
exports.eliteSentry = (() => {
  g.eliteSentryMissile = [6, 1, 1, 1, 2.5, 1.2, 1.3, 1, 1, 1, 1, 1, 1]
  g.eliteSentryEggSpawn = [9, 1, 1, 1.4, 4, 0.23, 0.54, 1, 1, 1, 1, 1, 1]
  g.eliteSentrySunchipSpawn = [0.25, 1, 1, 1.4, 3, 0.23, 0.54, 1, 1, 1, 1, 1, 1]
  exports.eliteSentryDrone = {
    PARENT: [exports.sunchip],
    LABEL: "Sentry",
    SHAPE: 3,
    COLOR: 5,
    BODY: {
      SPEED: 1.44
    },
    TURRETS: [
      {
        POSITION: [12, 0, 0, 0, 360, 1],
        TYPE: [exports.heavy3gun, { INDEPENDENT: true }]
      }
    ],
    DRAW_HEALTH: true
  };
  exports.eliteSentryHeavyDrone = {
    PARENT: [exports.sunchip],
    LABEL: "Upgraded Drone",
    SHAPE: 3,
    COLOR: 5,
    BODY: {
      SPEED: 1.44
    },
    TURRETS: [
      {
        POSITION: [12, 0, 0, 0, 360, 1],
        TYPE: [exports.crasher, { INDEPENDENT: true }]
      }
    ],
    DRAW_HEALTH: true
  };
  exports.eliteSentryHeavySunchip = {
    PARENT: [exports.sunchip],
    LABEL: "Upgraded Sunchip",
    SHAPE: 4,
    COLOR: 5,
    BODY: {
      SPEED: 1.44
    },
    TURRETS: [
      {
        POSITION: [12, 0, 0, 0, 360, 1],
        TYPE: [exports.sunchip, { INDEPENDENT: true }]
      }
    ],
    DRAW_HEALTH: true
  };
  exports.eliteSentrySkimmerTurret = {
    PARENT: [exports.autoTurret],
    LABEL: '',
    GUNS: [
      {
        POSITION: [17, 15, -0.233, 0, 0, 0, 0]
      }, {
        POSITION: [15, 17, 1.3, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.eliteSentryMissile]),
          TYPE: exports.kronosMissile
        }
      }
    ]
  }
  return {
    PARENT: [exports.sentry],
    NAME: "Elite Sentry",
    SIZE: 25,
    VALUE: 175000,
    COLOR: 5,
    SHAPE: 3,
    HAS_NO_RECOIL: true,
    BODY: {
      HEALTH: 750,
      DAMAGE: 3,
      FOV: 1.5,
      PUSHABILITY: 0
    },
    FACING_TYPE: 'autospin',
    TURRETS: (() => {
      var tr = []
      tr.push({
        POSITION: [10, 0, 0, 180, 360, 1],
        TYPE: exports.eliteSentrySkimmerTurret
      })
      return tr
    })(),
    GUNS: [
      {
          POSITION: [6.2, 14, 1.4, 5, 0, (360 * 1.5) / 3, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.eliteSentryEggSpawn]),
            TYPE: exports.eliteSentryDrone, AUTOFIRE: true, MAX_CHILDREN: 4
          }
        },
      {
          POSITION: [6.2, 14, 1.4, 5, 0, (360 * 2.5) / 3, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.eliteSentryEggSpawn]),
            TYPE: exports.eliteSentryHeavyDrone, AUTOFIRE: true, MAX_CHILDREN: 4
          }
        },
      {
          POSITION: [6.2, 14, 1.4, 5, 0, (360 * 3.5) / 3, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.eliteSentrySunchipSpawn]),
            TYPE: exports.eliteSentryHeavySunchip, AUTOFIRE: true, MAX_CHILDREN: 6
          }
        }
    ]
  }
})();
exports.xenon = (() => {
  g.xenonDrone = [5, 1, 1, 1.4, 3, 1.22, 1.2523, 1, 1, 1, 1, 1, 1]
  g.xenonMissile = [10, 1, 1, 1, 4, 2, 3, 1, 1, 1, 1, 1, 1]
  g.xenonRecoilGun = [0.25, 1, 1, 1, 0.3, 0.3, 0.3, 1, 1, 1, 1, 1.5, 1]
  exports.xenonDrone = {
    PARENT: [exports.drone],
    SHAPE: 5,
    INDEPENDENT: true,
    BODY: {
      SPEED: 1.043
    },
    GUNS: [
      {
        POSITION: [14, 10, 1.3, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.xenonRecoilGun]),
          TYPE: exports.bullet
        }
      }
    ]
  };
  exports.xenonMissile = {
    PARENT: [exports.bullet],
    LABEL: '',
    GUNS: [
      {
        POSITION: [16, 8, 1, 0, 0, 205, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
          TYPE: exports.bullet, AUTOFIRE: true
        }
      },
      {
        POSITION: [16, 8, 1, 0, 0, 155, 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
          TYPE: exports.bullet, AUTOFIRE: true
        }
      },
      {
        POSITION: [18, 8, 1, 0, 0, 180, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
          TYPE: exports.bullet, AUTOFIRE: true
        }
      }
    ]
  };
  exports.xenonMissileTurret = {
    PARENT: [exports.autoTurret],
    LABEL: '',
    GUNS: [
      {
        POSITION: [18, 18, -0.233, 0, 0, 0, 0]
      }, {
        POSITION: [16, 20, 0.8, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.xenonMissile]),
          TYPE: exports.xenonMissile
        }
      }
    ]
  }
  exports.xenonBody1 = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 5,
    COLOR: 6,
    CONTROLLERS: ['slowspin'],
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    TURRETS: (() => {
      var tr = []
      for (let i = 0.5; i < 5; i++) {
        tr.push({
          POSITION: [8, 8, 0, (360 * i) / 5, 180, 0],
          TYPE: exports.xenonMissileTurret
        })
      }
      return tr
    })()
  }
  exports.xenonBody2 = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 7,
    COLOR: 6,
    CONTROLLERS: ['reverseslowspin'],
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    GUNS: (() => {
      var gs = []
      for (let i = 0.5; i < 7; i++) {
        gs.push({
          POSITION: [6.2, 6, 1.4, 5, 0, (360 * i) / 7, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.xenonDrone]),
            TYPE: exports.xenonDrone, AUTOFIRE: true, MAX_CHILDREN: 3
          }
        })
      }
      return gs
    })()
  }
  return {
    PARENT: [exports.celestial],
    NAME: "Xenon",
    COLOR: 6,
    TURRETS: (() => {
      var tr = []
      for (let i = 0.5; i < 9; i++) {
        tr.push({
          POSITION: [6.5, 9, 0, (360 * i) / 9, 0, 0],
          TYPE: exports.trapTurret
        })
      }
      tr.push({
        POSITION: [14.94, 0, 0, 0, 360, 1],
        TYPE: exports.xenonBody2
      }, {
        POSITION: [8.6, 0, 0, 0, 360, 1],
        TYPE: exports.xenonBody1
      })
      return tr
    })(),
  }
})()
// Ultimate Sentry
exports.superSentinel = (() => {
  exports.sentryMinion = {
    PARENT: [exports.sentryGun],
    BODY: {
      HEALTH: 4,
      DAMAGE: 2
    }
  } 
  exports.sentryMinion2 = {
    PARENT: [exports.sentrySwarm],
    BODY: {
      HEALTH: 4,
      DAMAGE: 2
    }
  } 
  exports.sentryMinion3 = {
    PARENT: [exports.sentryTrap],
    BODY: {
      HEALTH: 4,
      DAMAGE: 2
    }
  }
  exports.sentryMinion4 = {
    PARENT: [exports.sentryAnni],
    BODY: {
      HEALTH: 4,
      DAMAGE: 2
    }
  }
  exports.sentryMinion5 = {
    PARENT: [exports.sentryBarrier],
    BODY: {
      HEALTH: 4,
      DAMAGE: 2
    }
  }
  return {
    PARENT: [exports.sentry],
    LABEL: 'Super Sentinel',
    BODY: {
      HEALTH: 975,
      DAMAGE: 5,
      SPEED: 0.88,
      FOV: 1
    },
    SIZE: 35,
    FACING_TYPE: 'autospin',
    GUNS: [
      {
        POSITION: [7.2, 15, 0.55, 5, 0, (360 * 1.5) / 5 , 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.drone, g.halfreload, g.halfreload, g.halfreload, [2, 1, 1, 0.55, 0.5, 0.2, 0.2, 1, 1, 1, 1, 1, 1]]),
          TYPE: exports.sentryMinion, AUTOFIRE: true, MAX_CHILDREN: 1
        }
      },
      {
        POSITION: [7.2, 15, 0.55, 5, 0, (360 * 2.5) / 5, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.drone, g.halfreload, g.halfreload, g.halfreload, [2, 1, 1, 0.55, 0.5, 0.2, 0.2, 1, 1, 1, 1, 1, 1]]),
          TYPE: exports.sentryMinion2, AUTOFIRE: true, MAX_CHILDREN: 1
        }
      },
  {
        POSITION: [7.2, 15, 0.55, 5, 0, (360 * 3.5) / 5, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.drone, g.halfreload, g.halfreload, g.halfreload, [2, 1, 1, 0.55, 0.5, 0.2, 0.2, 1, 1, 1, 1, 1, 1]]),
          TYPE: exports.sentryMinion3, AUTOFIRE: true, MAX_CHILDREN: 1
        }
      },
  {
        POSITION: [7.2, 15, 0.55, 5, 0, (360 * 4.5) / 5, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.drone, g.halfreload, g.halfreload, g.halfreload, [2, 1, 1, 0.55, 0.5, 0.2, 0.2, 1, 1, 1, 1, 1, 1]]),
          TYPE: exports.sentryMinion4, AUTOFIRE: true, MAX_CHILDREN: 1
        }
      },
  {
        POSITION: [7.2, 15, 0.55, 5, 0, (360 * 5.5) / 5, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.drone, g.halfreload, g.halfreload, g.halfreload, [2, 1, 1, 0.55, 0.5, 0.2, 0.2, 1, 1, 1, 1, 1, 1]]),
          TYPE: exports.sentryMinion5, AUTOFIRE: true, MAX_CHILDREN: 1
        }
      }
    ]
  }
})();
g.sorcerer = [0.5, 1, 1, 0.35, 1, 1, 1, 1, 1, 1, 1, 1, 1]
exports.sorcererDrone = {
  PARENT: [exports.drone],
  LABEL: '',
  SHAPE: 0,
}
// Sorcerer
exports.sorce = {
  PARENT: [exports.miniboss],
  LABEL: 'Sorcerer',
  SHAPE: 0,
  COLOR: 6,
  GUNS: [
    {
      POSITION: [5.4, 8, 1.4, 6, 0, 90, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.sunchip, g.sorcerer]),
        TYPE: exports.sorcererDrone, AUTOFIRE: true, MAX_CHILDREN: 39
      }
    }, {
      POSITION: [5.4, 8, 1.4, 6, 0, -90, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.sunchip, g.sorcerer]),
        TYPE: exports.sorcererDrone, AUTOFIRE: true, MAX_CHILDREN: 39
      }
    }
  ]
}
g.summoner = [0.5, 1, 1, 0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1]
exports.summon = {
  PARENT: [exports.miniboss],
  LABEL: 'Summoner',
  SHAPE: 4,
  COLOR: 13,
  GUNS: (() => {
    var gs = []
    for (let i = 0; i < 4; i++) {
      gs.push({
        POSITION: [6.2, 7, 1.4, 6, 0, (360 * i) / 4, 1 / i],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.sunchip, g.summoner]),
          TYPE: exports.sunchip, AUTOFIRE: true, MAX_CHILDREN: 7
        }
      })
    }
    return gs
  })()
}
g.enchantress = [0.75, 1, 1, 1, 0.75, 0.5, 0.5446, 1, 1, 1, 1, 1, 1]
exports.enchant = {
  PARENT: [exports.miniboss],
  LABEL: 'Enchantress',
  SHAPE: 3,
  COLOR: 2,
  GUNS: (() => {
    var gs = []
    for (let i = 0.5; i < 3; i++) {
      gs.push({
        POSITION: [6.2, 8, 1.4, 6, 0, (360 * i) / 3, 1 / i],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.drone, g.enchantress]),
          TYPE: exports.drone, AUTOFIRE: true, MAX_CHILDREN: 3
        }
      })
    }
    return gs
  })()
}
g.exorcistor = [1.5, 1, 1, 1, 2.5, 2.2, 2.5446, 1, 1, 1, 1, 1, 1]
exports.exorcistorDrone = {
  PARENT: [exports.drone],
  SHAPE: 5,
  BODY: {
      SPEED: 1.8
  }
}
exports.exorcist = {
  PARENT: [exports.miniboss],
  LABEL: 'Exorcistor',
  SHAPE: 5,
  COLOR: 14,
  GUNS: (() => {
    var gs = []
    for (let i = 0.5; i < 5; i++) {
      gs.push({
        POSITION: [6.2, 7, 1.4, 6, 0, (360 * i) / 5, 1 / i],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.sunchip, g.exorcistor]),
          TYPE: exports.exorcistorDrone, AUTOFIRE: true, MAX_CHILDREN: 4
        }
      })
    }
    return gs
  })()
}
exports.oedipus = (() => {
  exports.oedipusNonagonDrone = {
    PARENT: [exports.drone],
    SHAPE: 9
  }
  return {
  PARENT: [exports.eternal],
  TURRETS: (() => {
    var tr = []
    for (let i = 0.5; i < 5; i++) {
      tr.push({
        
      })
    }
  })()
  }
})()
exports.spraey = {
                PARENT: [exports.genericTank],
                LABEL: 'Acceptance',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  30,     7,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.lowpower, g.mach, g.morerecoil]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  19,    10,     1.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  14,    13,     1.8,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  12,    17,     2.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
exports.spreaey = {
                PARENT: [exports.genericTank],
                LABEL: 'Accepecceptance',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  30,     7,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.lowpower, g.mach, g.morerecoil]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  19,    10,     1.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  14,    13,     1.8,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  12,    17,     2.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, },  {
                    POSITION: [  10,    23,     2.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };

exports.spreaeay = {
                PARENT: [exports.genericTank],
                LABEL: 'Accepeccepecceptance',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  30,     7,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.lowpower, g.mach, g.morerecoil]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  19,    10,     1.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  14,    13,     1.8,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  12,    17,     2.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, },  {
                    POSITION: [  10,    23,     2.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  8,    27,     2.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
exports.spreaeaey = {
                PARENT: [exports.genericTank],
                LABEL: 'SUPER ACCEPTANCE',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  30,     7,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.lowpower, g.mach, g.morerecoil]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  19,    10,     1.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  14,    13,     1.8,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  12,    17,     2.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, },  {
                    POSITION: [  10,    23,     2.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  8,    27,     2.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  6,    33,     2.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
exports.spreaeaeay = {
                PARENT: [exports.genericTank],
                LABEL: 'HYPER ACCEPTANCE',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  30,     7,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.lowpower, g.mach, g.morerecoil]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  19,    10,     1.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  14,    13,     1.8,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  12,    17,     2.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, },  {
                    POSITION: [  10,    23,     2.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  8,    27,     2.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  6,    33,     2.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  4,    37,     2.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
exports.spreaeaeaey = {
                PARENT: [exports.genericTank],
                LABEL: 'KILA ACCEPTANCE',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  30,     7,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.lowpower, g.mach, g.morerecoil]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  19,    10,     1.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  14,    13,     1.8,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  12,    17,     2.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, },  {
                    POSITION: [  10,    23,     2.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  8,    27,     2.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  6,    33,     2.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  4,    37,     2.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  2,    43,     2.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
exports.dps = (() => {
  g.dps = [0.2, 0.35, 1, 0.6, 0.7, 0.86, 0.766, 1, 1, 1, 1, 3, 1]
  return {
    PARENT: [exports.genericTank],
    LABEL: 'Stalled',
    GUNS: [
      {
        POSITION: [20, 13, 2, 5, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.dps]),
          TYPE: exports.bullet
        }
      }
    ]
  }
})();
exports.betatester = {
  PARENT: [exports.testbedP],
  LABEL: 'Beta Tester'
}
// AURA GENERATOR
exports.aura = {
  PARENT: [exports.bullet],
  LABEL: 'Aura',
  TYPE: 'aura',
  INTANGIBLE: true,
  HITS_OWN_TYPE: 'none',
  BODY: {
    HEALTH: 1e8,
    DAMAGE: 1.9,
    SHIELD: 1e8,
    REGEN: 1e8,
    SPEED: 0
  },
  DIE_AT_RANGE: false,
  DAMAGE_EFFECTS: false,
  DRAW_HEALTH: false,
  ALPHA: 0.25,
  CONTROLLERS: ['aura']
}
exports.generator = {
  PARENT: [exports.genericTank],
  LABEL: '',
  COLOR: 12,
  SHAPE: 3,
  CONTROLLERS: ['reverseslowspin']
}
exports.auraGenerator = {
  PARENT: [exports.genericTank],
  LABEL: '',
  SHAPE: 0,
  COLOR: 17,
  GUNS: [
    {
      POSITION: [0, 20, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.aura]),
        TYPE: exports.aura, MAX_CHILDREN: 1, AUTOFIRE: true, COLOR_OVERRIDE: 12
      }
    }
  ],
  TURRETS: [
    {
      POSITION: [12, 0, 0, 0, 360, 1],
      TYPE: exports.generator
    }
  ]
}
exports.aura2 = {
  PARENT: [exports.genericTank],
  LABEL: 'Aura',
  TYPE: 'aura',
  INTANGIBLE: true,
  HITS_OWN_TYPE: 'none',
  BODY: {
    HEALTH: 1e8,
    DAMAGE: 1.223,
    SHIELD: 1e8,
    REGEN: 1e8,
    SPEED: 0
  },
  DAMAGE_EFFECTS: false,
  DRAW_HEALTH: false,
  
  ALPHA: 0.25,
  CONTROLLERS: ['aura']
}
exports.auraGenerator2 = {
  PARENT: [exports.genericTank],
  LABEL: '',
  SHAPE: 0,
  COLOR: 17,
  GUNS: [
    {
      POSITION: [0, 20, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.aura]),
        TYPE: exports.aura2, MAX_CHILDREN: 1, AUTOFIRE: true, COLOR_OVERRIDE: 12
      }
    }
  ],
  TURRETS: [
    {
      POSITION: [12, 0, 0, 0, 360, 1],
      TYPE: exports.generator
    }
  ]
}
// SQUARE DREADNOUGHTS
exports.layer0S = {
  SHAPE: 4,
  COLOR: 9
}
exports.layer1S = {
  SHAPE: 3,
  COLOR: 9
}
exports.planetaryLayer0 = {
  SHAPE: 4,
  GUNS: (() => {
          var gs = []
          for (let i = 0; i < 4; i++) {
            gs.push({
              POSITION: [16, 11, 1, 0, 0, (360 * i) / 4, 0],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunturret, g.pound]),
                TYPE: exports.bullet,
              }
            })
          }
          return gs
        })(),
  TURRETS: [
    {
      POSITION: [14, 0, 0, 0, 0, 1],
      TYPE: [exports.square, { COLOR: 13 }]
    },{
      POSITION: [8, 0, 0, 0, 0, 1],
      TYPE: exports.auraGenerator
    },{
      POSITION: [4, 8, 0, 45, 0, 1],
      TYPE: exports.auraGenerator
    }, {
      POSITION: [4, 8, 0, 135, 0, 1],
      TYPE: exports.auraGenerator
    }, {
      POSITION: [4, 8, 0, 225, 0, 1],
      TYPE: exports.auraGenerator
    }, {
      POSITION: [4, 8, 0, 315, 0, 1],
      TYPE: exports.auraGenerator
    }
  ]
}
exports.planetary = {
  PARENT: [exports.genericTank],
  LABEL: 'Planetary-Interstellar',
  TYPE: 'dreadnought',
  SHAPE: [[-0,-0]],
  COLOR: 13,
  BODY: {
    HEALTH: 750,
    DAMAGE: 4,
    SPEED: 1.3
  },
  SIZE: 25,
  TURRETS: [
    {
      POSITION: [20, 0, 0, 0, 0, 1],
      TYPE: [exports.planetaryLayer0, { SHAPE: 4, COLOR: 13 }]
    },  {
      POSITION: [21.5, 0, 0, 0, 0, 0],
      TYPE: exports.layer0S
    }, 
  ],
};
exports.executorLayer0 = {
  SHAPE: 4,
  GUNS: (() => {
          var gs = []
          for (let i = 0; i < 4; i++) {
            gs.push({
              POSITION: [16, 8, 1, 0, 0, (360 * i) / 4, 0],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunturret]),
                TYPE: exports.bullet,
              }
            })
          }
          return gs
        })(),
  TURRETS: [
    {
      POSITION: [14, 0, 0, 0, 0, 1],
      TYPE: [exports.square, { COLOR: 13 }]
    },{
      POSITION: [8, 0, 0, 0, 0, 1],
      TYPE: exports.auraGenerator
    }, {
      POSITION: [4, 8, 0, 45, 0, 1],
      TYPE: exports.auraGenerator
    }, {
      POSITION: [4, 8, 0, 135, 0, 1],
      TYPE: exports.auraGenerator
    }, {
      POSITION: [4, 8, 0, 225, 0, 1],
      TYPE: exports.auraGenerator
    }, {
      POSITION: [4, 8, 0, 315, 0, 1],
      TYPE: exports.auraGenerator
    }
  ]
}
exports.executor = {
  PARENT: [exports.genericTank],
  LABEL: 'Mercury-Interstellar',
  TYPE: 'dreadnought',
  SHAPE: [[-0,-0]],
  COLOR: 13,
  BODY: {
    HEALTH: 750,
    DAMAGE: 4,
    SPEED: 1.3
  },
  SIZE: 25,
  TURRETS: [
    {
      POSITION: [20, 0, 0, 0, 0, 1],
      TYPE: [exports.executorLayer0, { SHAPE: 4, COLOR: 13 }]
    },  {
      POSITION: [21.5, 0, 0, 0, 0, 0],
      TYPE: exports.layer0S
    }, 
  ],
};
exports.asteroidLayer0 = {
  SHAPE: 4,
  GUNS: (() => {
          var gs = []
          for (let i = 0; i < 4; i++) {
            gs.push({
              POSITION: [16, 8, 1, 0, -5, (360 * i) / 4, 0],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunturret]),
                TYPE: exports.bullet,
              }
            },{
              POSITION: [16, 8, 1, 0, 5, (360 * i) / 4, 0.5],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunturret]),
                TYPE: exports.bullet,
              }
            })
          }
          return gs
        })(),
  TURRETS: [
    {
      POSITION: [14, 0, 0, 0, 0, 1],
      TYPE: [exports.square, { COLOR: 13 }]
    },{
      POSITION: [8, 0, 0, 0, 0, 1],
      TYPE: exports.auraGenerator
    }, {
      POSITION: [4, 8, 0, 45, 0, 1],
      TYPE: exports.auraGenerator
    }, {
      POSITION: [4, 8, 0, 135, 0, 1],
      TYPE: exports.auraGenerator
    }, {
      POSITION: [4, 8, 0, 225, 0, 1],
      TYPE: exports.auraGenerator
    }, {
      POSITION: [4, 8, 0, 315, 0, 1],
      TYPE: exports.auraGenerator
    }
  ]
}
exports.asteroid = {
  PARENT: [exports.genericTank],
  LABEL: 'Asteroid-Interstellar',
  TYPE: 'dreadnought',
  SHAPE: [[-0,-0]],
  COLOR: 13,
  BODY: {
    HEALTH: 750,
    DAMAGE: 4,
    SPEED: 1.3
  },
  SIZE: 25,
  TURRETS: [
    {
      POSITION: [20, 0, 0, 0, 0, 1],
      TYPE: [exports.asteroidLayer0, { SHAPE: 4, COLOR: 13 }]
    },  {
      POSITION: [21.5, 0, 0, 0, 0, 0],
      TYPE: exports.layer0S
    }, 
  ],
};
exports.deathstarLayer0 = (() => {
  g.auraDroneSize = [1, 1, 1, 2.144, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  g.weakDrone = [1, 1, 1, 1, 0.25, 0.55, 0.445, 1, 1, 1, 1, 1, 1];
  exports.auraDrone = {
    PARENT: [exports.drone],
    SHAPE: 1,
    COLOR: 5,
    TURRETS: [
      {
        POSITION: [20, 0, 0, 0, 0, 1],
        TYPE: [exports.droneLayer = {
          SHAPE: 3,
          COLOR: 5
        }]
      },{
        POSITION: [14, 0, 0, 0, 0, 1],
        TYPE: [exports.droneLayer]
      }, {
        POSITION: [10, 0, 0, 0, 0, 1],
        TYPE: exports.auraGenerator2
      }
    ]
  }
  return {
    PARENT: [exports.genericTank],
    SHAPE: 4,
    GUNS: (() => {
      var gs = []
      for (let i = 0; i < 4; i++) {
          gs.push({
            POSITION: [6.5, 4, 1.3, 6, -5, (360 * i) / 4, 0],
            PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.drone, g.weakDrone]),
              TYPE: exports.drone, AUTOFIRE: true, MAX_CHILDREN: 3, COLOR_OVERRIDE: 5
            }
          },{
            POSITION: [6.5, 4, 1.3, 6, 5, (360 * i) / 4, 0],
            PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.drone, g.pound, g.auraDroneSize]),
              TYPE: [exports.auraDrone, { BODY: { SPEED: 1.4 } }], AUTOFIRE: true, MAX_CHILDREN: 1, COLOR_OVERRIDE: 5
            }
          })    
      }
      return gs
    })(),
    TURRETS: [
      {
        POSITION: [15.5, 0, 0, 0, 0, 1],
        TYPE: exports.layer0S
      },
      {
        POSITION: [14, 0, 0, 0, 0, 1],
        TYPE: [exports.square, { COLOR: 13 }]
      },{
        POSITION: [4, 8, 0, 45, 0, 1],
        TYPE: exports.auraGenerator
      }, {
        POSITION: [4, 8, 0, 135, 0, 1],
        TYPE: exports.auraGenerator
      }, {
        POSITION: [4, 8, 0, 225, 0, 1],
        TYPE: exports.auraGenerator
      }, {
        POSITION: [4, 8, 0, 315, 0, 1],
        TYPE: exports.auraGenerator
      }
    ]
  }
})()
exports.deathstar = {
  PARENT: [exports.genericTank],
  LABEL: 'Deathstar-Exosphere',
  TYPE: 'dreadnought',
  SHAPE: [[-0,-0]],
  COLOR: 13,
  BODY: {
    HEALTH: 750,
    DAMAGE: 4,
    SPEED: 1.45
  },
  SIZE: 25,
  TURRETS: [
    {
      POSITION: [20, 0, 0, 0, 0, 1],
      TYPE: [exports.deathstarLayer0, { SHAPE: 4, COLOR: 13 }]
    },  {
      POSITION: [21.5, 0, 0, 0, 0, 0],
      TYPE: exports.layer0S
    }, 
  ],
};
exports.mothershipLayer0 = (() => {
  g.mothershipAuraDroneSize = [5, 1, 1, 2.117, 10, 0.4, 0.4, 1, 1, 1, 1, 1, 1];
  exports.mothershipAuraDrone = {
    PARENT: [exports.drone],
    SHAPE: 1,
    COLOR: 5,
    DRAW_HEALTH: true,
    TURRETS: [
      {
        POSITION: [20, 0, 0, 0, 0, 1],
        TYPE: [exports.droneLayer]
      },{
        POSITION: [14, 0, 0, 0, 0, 1],
        TYPE: [exports.droneLayer]
      }, {
        POSITION: [10, 0, 0, 0, 0, 1],
        TYPE: [exports.droneLayer]
      }, {
        POSITION: [6, 0, 0, 0, 0, 1],
        TYPE: exports.auraGenerator2
      }
    ]
  }
  return {
    PARENT: [exports.genericTank],
    SHAPE: 4,
    GUNS: (() => {
      var gs = []
      for (let i = 0; i < 4; i++) {
          gs.push({
            POSITION: [6.5, 8, 1.3, 6, 0, (360 * i) / 4, 0],
            PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.drone, g.mothershipAuraDroneSize]),
              TYPE: [exports.mothershipAuraDrone, { BODY: { SPEED: 1.4 } }], AUTOFIRE: true, MAX_CHILDREN: 1, COLOR_OVERRIDE: 5
            }
          })    
      }
      return gs
    })(),
    TURRETS: [
      {
        POSITION: [15.5, 0, 0, 0, 0, 1],
        TYPE: exports.layer0S
      },
      {
        POSITION: [14, 0, 0, 0, 0, 1],
        TYPE: [exports.square, { COLOR: 13 }]
      },{
        POSITION: [4, 8, 0, 45, 0, 1],
        TYPE: exports.auraGenerator
      }, {
        POSITION: [4, 8, 0, 135, 0, 1],
        TYPE: exports.auraGenerator
      }, {
        POSITION: [4, 8, 0, 225, 0, 1],
        TYPE: exports.auraGenerator
      }, {
        POSITION: [4, 8, 0, 315, 0, 1],
        TYPE: exports.auraGenerator
      }
    ]
  }
})()

exports.mothership = {
  PARENT: [exports.genericTank],
  LABEL: 'Mothership-Exosphere',
  TYPE: 'dreadnought',
  SHAPE: [[-0,-0]],
  COLOR: 13,
  BODY: {
    HEALTH: 750,
    DAMAGE: 4,
    SPEED: 1.45
  },
  SIZE: 25,
  TURRETS: [
    {
      POSITION: [20, 0, 0, 0, 0, 1],
      TYPE: [exports.mothershipLayer0, { SHAPE: 4, COLOR: 13 }]
    },  {
      POSITION: [21.5, 0, 0, 0, 0, 0],
      TYPE: exports.layer0S
    }, 
  ],
};
exports.cometLayer0 = (() => {
  g.cometMinionSize = [5, 1, 1, 1, 1.5, 0.8, 0.8, 1, 1, 1, 1, 1, 1];
  exports.cometMinion = {
    PARENT: [exports.minion],
    SHAPE: 0,
    COLOR: 5,
    BODY: {
      SPEED: 1.4
    },
    DRAW_HEALTH: true,
    GUNS: [ {
      POSITION: [10, 8, 1.4, 8, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.minion]),
        TYPE: exports.bullet
      }
    }   ],
    TURRETS: [
      {
        POSITION: [15, 0, 0, 0, 0, 1],
        TYPE: [exports.egg, {COLOR: 13}]
      },{
        POSITION: [11, 0, 0, 0, 0, 1],
        TYPE: [exports.egg, {COLOR: 13}]
      },{
        POSITION: [7, 0, 0, 0, 0, 1],
        TYPE: [exports.egg, {COLOR: 13}]
      }
    ]
  }
  return {
    PARENT: [exports.genericTank],
    SHAPE: 4,
    GUNS: (() => {
      var gs = []
      for (let i = 0; i < 4; i++) {
          gs.push({
            POSITION: [6.5, 14, 0.6, 6, 0, (360 * i) / 4, 0],
            PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.drone, g.cometMinionSize]),
              TYPE: [exports.cometMinion, { BODY: { SPEED: 1.4 } }], AUTOFIRE: true, MAX_CHILDREN: 3
            }
          }, {
            POSITION: [11, 10, 1.4, 0, 0, (360 * i) / 4, 0],
          })    
      }
      return gs
    })(),
    TURRETS: [
      {
        POSITION: [15.5, 0, 0, 0, 0, 1],
        TYPE: exports.layer0S
      },
      {
        POSITION: [14, 0, 0, 0, 0, 1],
        TYPE: [exports.square, { COLOR: 13 }]
      },{
        POSITION: [4, 8, 0, 45, 0, 1],
        TYPE: exports.auraGenerator
      }, {
        POSITION: [4, 8, 0, 135, 0, 1],
        TYPE: exports.auraGenerator
      }, {
        POSITION: [4, 8, 0, 225, 0, 1],
        TYPE: exports.auraGenerator
      }, {
        POSITION: [4, 8, 0, 315, 0, 1],
        TYPE: exports.auraGenerator
      }
    ]
  }
})()

exports.comet = {
  PARENT: [exports.genericTank],
  LABEL: 'Comet-Exosphere',
  TYPE: 'dreadnought',
  SHAPE: [[-0,-0]],
  COLOR: 13,
  BODY: {
    HEALTH: 750,
    DAMAGE: 4,
    SPEED: 1.45
  },
  SIZE: 25,
  TURRETS: [
    {
      POSITION: [20, 0, 0, 0, 0, 1],
      TYPE: [exports.cometLayer0, { SHAPE: 4, COLOR: 13 }]
    },  {
      POSITION: [21.5, 0, 0, 0, 0, 0],
      TYPE: exports.layer0S
    }, 
  ],
};
// EGG DREADNOUGHTS
exports.malwareringLayer0 = {
  SHAPE: 0,
  GUNS: (() => {
          var gs = []
          for (let i = 0; i < 2; i++) {
            gs.push({
              POSITION: [16, 10, 1, 0, 0, (360 * i) / 2, 0],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunturret, g.pound]),
                TYPE: exports.bullet,
              }
            })
          }
          return gs
        })(),
  TURRETS: [
    {
      POSITION: [14, 0, 0, 0, 0, 1],
      TYPE: exports.egg
    }, {
      POSITION: [10, 0, 0, 0, 0, 1],
      TYPE: exports.auraGenerator
    }
  ]
}
exports.malware_ring = {
  PARENT: [exports.genericTank],
  LABEL: 'Malware-Ring',
  TYPE: 'dreadnought',
  SHAPE: [[-0,-0]],
  COLOR: 6,
  BODY: {
    HEALTH: 450,
    DAMAGE: 4,
    SPEED: 1.45
  },
  SIZE: 15,
  TURRETS: [
    {
      POSITION: [20, 0, 0, 0, 0, 1],
      TYPE: [exports.malwareringLayer0, { SHAPE: 4, COLOR: 6 }]
    }
  ],
}
exports.malwareLayer0 = {
  SHAPE: 0,
  GUNS: (() => {
          var gs = []
          for (let i = 0; i < 2; i++) {
            gs.push({
              POSITION: [16, 10, 1, 0, 0, (360 * i) / 2, 0],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunturret, g.pound]),
                TYPE: exports.bullet,
              }
            })
          }
          return gs
        })(),
}
exports.malware = {
  PARENT: [exports.genericTank],
  LABEL: 'Malware',
  TYPE: 'dreadnought',
  SHAPE: [[-0,-0]],
  COLOR: 6,
  BODY: {
    HEALTH: 450,
    DAMAGE: 4,
    SPEED: 1.45
  },
  SIZE: 15,
  TURRETS: [
    {
      POSITION: [20, 0, 0, 0, 0, 1],
      TYPE: [exports.malwareLayer0, { SHAPE: 4, COLOR: 6 }]
    }
  ],
}
exports.dwarfLayer0 = {
  SHAPE: 0,
  GUNS: (() => {
          var gs = []
          for (let i = 0; i < 2; i++) {
            gs.push({
              POSITION: [16, 8, 1, 0, 0, (360 * i) / 2, 0],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunturret]),
                TYPE: exports.bullet,
              }
            })
          }
          return gs
        })(),
}
exports.dwarf = {
  PARENT: [exports.genericTank],
  LABEL: 'Dwarf',
  TYPE: 'dreadnought',
  SHAPE: [[-0,-0]],
  COLOR: 6,
  BODY: {
    HEALTH: 450,
    DAMAGE: 4,
    SPEED: 1.45
  },
  SIZE: 15,
  TURRETS: [
    {
      POSITION: [20, 0, 0, 0, 0, 1],
      TYPE: [exports.dwarfLayer0, { SHAPE: 4, COLOR: 6 }]
    }
  ],
}
exports.rogueLayer0 = {
  SHAPE: 0,
  GUNS: (() => {
          var gs = []
          for (let i = 0; i < 2; i++) {
            gs.push({
              POSITION: [6, 8, 1.4, 5.5, 0, (360 * i) / 2, 0],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.gunturret]),
                TYPE: exports.drone, AUTOFIRE: true, MAX_CHILDREN: 4
              }
            })
          }
          return gs
        })(),
}
exports.rogue = {
  PARENT: [exports.genericTank],
  LABEL: 'Rogue',
  TYPE: 'dreadnought',
  SHAPE: [[-0,-0]],
  COLOR: 6,
  BODY: {
    HEALTH: 450,
    DAMAGE: 4,
    SPEED: 1.45
  },
  SIZE: 15,
  TURRETS: [
    {
      POSITION: [20, 0, 0, 0, 0, 1],
      TYPE: [exports.rogueLayer0, { SHAPE: 4, COLOR: 6 }]
    }
  ],
}
exports.dreadnoughtLayer0 = {
  SHAPE: 0,
}
exports.dreadnought = {
  PARENT: [exports.genericTank],
  LABEL: 'Dreadnought',
  TYPE: 'dreadnought',
  SHAPE: [[-0,-0]],
  COLOR: 6,
  BODY: {
    HEALTH: 450,
    DAMAGE: 4,
    SPEED: 1.45
  },
  SIZE: 15,
  TURRETS: [
    {
      POSITION: [20, 0, 0, 0, 0, 1],
      TYPE: [exports.dreadnoughtLayer0, { SHAPE: 4, COLOR: 6 }]
    }
  ],
}
exports.dwarfringLayer0 = {
  SHAPE: 0,
  GUNS: (() => {
          var gs = []
          for (let i = 0; i < 2; i++) {
            gs.push({
              POSITION: [16, 8, 1, 0, 0, (360 * i) / 2, 0],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunturret]),
                TYPE: exports.bullet,
              }
            })
          }
          return gs
        })(),
  TURRETS: [
    {
      POSITION: [14, 0, 0, 0, 0, 1],
      TYPE: exports.egg
    }, {
      POSITION: [10, 0, 0, 0, 0, 1],
      TYPE: exports.auraGenerator
    }
  ]
}
exports.dwarf_ring = {
  PARENT: [exports.genericTank],
  LABEL: 'Dwarf-Ring',
  TYPE: 'dreadnought',
  SHAPE: [[-0,-0]],
  COLOR: 6,
  BODY: {
    HEALTH: 450,
    DAMAGE: 4,
    SPEED: 1.45
  },
  SIZE: 15,
  TURRETS: [
    {
      POSITION: [20, 0, 0, 0, 0, 1],
      TYPE: [exports.dwarfringLayer0, { SHAPE: 4, COLOR: 6 }]
    }
  ],
}
exports.rogueringLayer0 = {
  SHAPE: 0,
  GUNS: (() => {
          var gs = []
          for (let i = 0; i < 2; i++) {
            gs.push({
              POSITION: [6, 8, 1.4, 5.5, 0, (360 * i) / 2, 0],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone]),
                TYPE: exports.drone, AUTOFIRE: true, MAX_CHILDREN: 4
              }
            })
          }
          return gs
        })(),
  TURRETS: [
    {
      POSITION: [14, 0, 0, 0, 0, 1],
      TYPE: exports.egg
    }, {
      POSITION: [10, 0, 0, 0, 0, 1],
      TYPE: exports.auraGenerator
    }
  ]
}
exports.rogue_ring = {
  PARENT: [exports.genericTank],
  LABEL: 'Rogue-Ring',
  TYPE: 'dreadnought',
  SHAPE: [[-0,-0]],
  COLOR: 6,
  BODY: {
    HEALTH: 450,
    DAMAGE: 4,
    SPEED: 1.45
  },
  SIZE: 15,
  TURRETS: [
    {
      POSITION: [20, 0, 0, 0, 0, 1],
      TYPE: [exports.rogueringLayer0, { SHAPE: 4, COLOR: 6 }]
    }
  ],
}
// TRIANGLE DREADNOUGHTS
exports.hypershipLayer0 = (() => {
  g.hypershipMinionSize = [5, 1, 1, 1, 3.2, 0.8, 0.8, 1, 1, 1, 1, 1, 1];
  exports.hypershipMinion = {
    PARENT: [exports.minion],
    SHAPE: [[-1.5, 0], [0.75, 1.299], [0.75, -1.299]],
    COLOR: 5,
    BODY: {
      SPEED: 1.4
    },
    DRAW_HEALTH: true,
    GUNS: [ {
        POSITION: [15, 8, 1, 0, 0, 0, 0]
    }, {
      POSITION: [3, 8, 1.7, 15, 0, 0, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.trap, g.minion]),
        TYPE: exports.trap
      }
    },{
      POSITION: [8, 8, 1.4, 6, 0, 120, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.minion]),
        TYPE: exports.drone, AUTOFIRE: true, MAX_CHILDREN: 1
      }
    }, {
      POSITION: [8, 8, 1.4, 6, 0, 240, 0.5],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.drone, g.minion]),
        TYPE: exports.drone, AUTOFIRE: true, MAX_CHILDREN: 1
      }
    }  ],
    TURRETS: [
      {
        POSITION: [11, 0, 0, 60, 0, 1],
        TYPE: [exports.triangle, {COLOR: 2}]
      },{
        POSITION: [7, 0, 0, 60, 0, 1],
        TYPE: [exports.triangle, {COLOR: 2}]
      }
    ]
  }
  return {
    PARENT: [exports.genericTank],
    SHAPE: 3,
    GUNS: (() => {
      var gs = []
      for (let i = 0.5; i < 3; i++) {
          gs.push({
            POSITION: [8.5, 15, 0.6, 6, 0, (360 * i) / 3, 0],
            PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.drone, g.hypershipMinionSize]),
              TYPE: [exports.hypershipMinion, { BODY: { SPEED: 1.4 } }], AUTOFIRE: true, MAX_CHILDREN: 2
            }
          },{
            POSITION: [15, 6, 1, 0, 0, (360 * i) / 3, 0],
          }, {
            POSITION: [12, 6, 1, 0, 0, (360 * i) / 3, 0],
          }, {
            POSITION: [9, 10, 1.65, 0, 0, (360 * i) / 3, 0],
          })    
      }
      return gs
    })(),
    TURRETS: [
    {
      POSITION: [15, 0, 0, 0, 0, 1],
      TYPE: [exports.triangle, { COLOR: 2 }]
    },{
      POSITION: [8, 0, 0, 0, 0, 1],
      TYPE: exports.auraGenerator
    }, {
      POSITION: [4, 9, 0, 120, 0, 1],
      TYPE: exports.auraGenerator
    },  {
      POSITION: [4, 9, 0, 240, 0, 1],
      TYPE: exports.auraGenerator
    }, {
      POSITION: [4, 9, 0, 0, 0, 1],
      TYPE: exports.auraGenerator
    }
  ]
  }
})()

exports.hypership = {
  PARENT: [exports.genericTank],
  LABEL: 'Hypership-Nova',
  TYPE: 'dreadnought',
  SHAPE: [[-0,-0]],
  COLOR: 2,
  BODY: {
    HEALTH: 750,
    DAMAGE: 4,
    SPEED: 1.45
  },
  SIZE: 25,
  TURRETS: [
    {
      POSITION: [20, 0, 0, 0, 0, 1],
      TYPE: [exports.hypershipLayer0, { SHAPE: 4, COLOR: 2 }]
    },  {
      POSITION: [21.5, 0, 0, 0, 0, 0],
      TYPE: exports.layer1S
    }, 
  ],
};
exports.interplanetaryLayer0 = {
  SHAPE: 3,
  GUNS: (() => {
          var gs = []
          for (let i = 0.5; i < 3; i++) {
            gs.push({
              POSITION: [14, 8, 1, 0, -5, (360 * i) / 3, 0.5],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.gunturret]),
                TYPE: exports.bullet,
              }
            },{
              POSITION: [14, 8, 1, 0, 5, (360 * i) / 3, 0.5],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.gunturret]),
                TYPE: exports.bullet,
              }
            },{
              POSITION: [16, 8, 1, 0, 0, (360 * i) / 3, 0],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.gunturret]),
                TYPE: exports.bullet,
              }
            })
          }
          return gs
        })(),
  TURRETS: [
    {
      POSITION: [15, 0, 0, 0, 0, 1],
      TYPE: [exports.triangle, { COLOR: 2 }]
    },{
      POSITION: [8, 0, 0, 0, 0, 1],
      TYPE: exports.auraGenerator
    }, {
      POSITION: [4, 9, 0, 120, 0, 1],
      TYPE: exports.auraGenerator
    },  {
      POSITION: [4, 9, 0, 240, 0, 1],
      TYPE: exports.auraGenerator
    }, {
      POSITION: [4, 9, 0, 0, 0, 1],
      TYPE: exports.auraGenerator
    }
  ]
}
exports.interplanetary = {
  PARENT: [exports.genericTank],
  LABEL: 'Interplanetary-Nova',
  TYPE: 'dreadnought',
  SHAPE: [[-0,-0]],
  COLOR: 2,
  BODY: {
    HEALTH: 1000,
    DAMAGE: 4,
    SPEED: 1.3
  },
  SIZE: 32,
  TURRETS: [
    {
      POSITION: [20, 0, 0, 0, 0, 1],
      TYPE: [exports.interplanetaryLayer0, { SHAPE: 4, COLOR: 2 }]
    },  {
      POSITION: [21.5, 0, 0, 0, 0, 0],
      TYPE: exports.layer1S
    }, 
  ],
};

exports.supergiantLayer0 = {
  SHAPE: 3,
  GUNS: (() => {
          var gs = []
          for (let i = 0.5; i < 3; i++) {
            gs.push({
              POSITION: [14, 16, 1, 0, 0, (360 * i) / 3, 0],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.gunturret]),
                TYPE: exports.bullet,
              }
            })
          }
          return gs
        })(),
  TURRETS: [
    {
      POSITION: [15, 0, 0, 0, 0, 1],
      TYPE: [exports.triangle, { COLOR: 2 }]
    },{
      POSITION: [8, 0, 0, 0, 0, 1],
      TYPE: exports.auraGenerator
    }, {
      POSITION: [4, 9, 0, 120, 0, 1],
      TYPE: exports.auraGenerator
    },  {
      POSITION: [4, 9, 0, 240, 0, 1],
      TYPE: exports.auraGenerator
    }, {
      POSITION: [4, 9, 0, 0, 0, 1],
      TYPE: exports.auraGenerator
    }
  ]
}
exports.supergiant = {
  PARENT: [exports.genericTank],
  LABEL: 'Supergiant-Nova',
  TYPE: 'dreadnought',
  SHAPE: [[-0,-0]],
  COLOR: 2,
  BODY: {
    HEALTH: 1000,
    DAMAGE: 4,
    SPEED: 1.3
  },
  SIZE: 32,
  TURRETS: [
    {
      POSITION: [20, 0, 0, 0, 0, 1],
      TYPE: [exports.supergiantLayer0, { SHAPE: 4, COLOR: 2 }]
    },  {
      POSITION: [21.5, 0, 0, 0, 0, 0],
      TYPE: exports.layer1S
    }, 
  ],
};
// PENTAGON DREADNOUGHTS
exports.layer2S = {
  SHAPE: 5,
  COLOR: 9
}
exports.starshipLayer0 = (() => {
  g.starshipMinionSize = [5, 1, 1, 1, 6.4, 0.8, 0.8, 1, 1, 1, 1, 1, 1];
  g.starshipMinionDroneSize = [5, 1, 1, 3, 5, 1, 1, 1, 1, 1, 1, 1, 1];
  exports.starshipMinionDrone0 = {
    PARENT: [exports.drone],
    SHAPE: 5,
    BODY: {
      SPEED: 1.3
    },
    DRAW_HEALTH: true
  }
  exports.starshipMinionDrone = {
    PARENT: [exports.drone],
    SHAPE: 5,
    BODY: {
      SPEED: 1.3
    },
    DRAW_HEALTH: true
  }
  exports.starshipMinion = {
    PARENT: [exports.minion],
    SHAPE: 5,
    COLOR: 14,
    BODY: {
      SPEED: 1.4
    },
    DRAW_HEALTH: true,
    GUNS: (() => {
      var gs = []
      gs.push({
        POSITION: [5, 8, 1.4, 7, 0, 180, 1.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.drone, g.starshipMinionDroneSize, g.minion]),
          TYPE: exports.starshipMinionDrone0, AUTOFIRE: true, MAX_CHILDREN: 1
        }
      })
      
      for (let i = -1.5; i < 2; i++) {
        gs.push({
          POSITION: [13, 8, 1, 0, 0, (360 * i) / 5, 0]
        },{
          POSITION: [3, 8, 1.7, 13, 0, (360 * i) / 5, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap]),
            TYPE: exports.trap
          }
        })
      }
      return gs
    })(),
    TURRETS: [
      {
        POSITION: [14, 0, 0, 0, 0, 1],
        TYPE: [exports.pentagon]
      },{
        POSITION: [11, 0, 0, 0, 0, 1],
        TYPE: [exports.pentagon]
      },{
        POSITION: [7, 0, 0, 0, 0, 1],
        TYPE: [exports.pentagon]
      }
    ]
  }
  exports.starshipMinion2 = {
    PARENT: [exports.minion],
    SHAPE: 5,
    COLOR: 14,
    BODY: {
      SPEED: 1.4
    },
    DRAW_HEALTH: true,
    GUNS: (() => {
      var gs = []
      for (let i = 0.5; i < 3; i++) {
        gs.push({
          POSITION: [15, 8, 0.001, 0, 0, (360 * (1 + i)) / 5, 0]
        },{
          POSITION: [5, 8, 1.4, 7, 0, (360 * (1 + i)) / 5, 1.5],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.starshipMinionDroneSize, g.minion]),
            TYPE: exports.starshipMinionDrone, AUTOFIRE: true, MAX_CHILDREN: 1
          }
        })
      }
      for (let i = 0; i < 3; i++) {
        gs.push({
          POSITION: [18 - (i * 3.25), 8, 1, 0, 0, 0, 0]
        },{
          POSITION: [3, 8, 1.7, 18 - (i * 3.25), 0, 0, 0 + (i * 0.333)],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.power]),
            TYPE: exports.trap
          }
        })
      }
      return gs
    })(),
    TURRETS: [
      {
        POSITION: [14, 0, 0, 0, 0, 1],
        TYPE: [exports.pentagon]
      },{
        POSITION: [11, 0, 0, 0, 0, 1],
        TYPE: [exports.pentagon]
      },{
        POSITION: [7, 0, 0, 0, 0, 1],
        TYPE: [exports.pentagon]
      }
    ]
  }
  return {
    PARENT: [exports.genericTank],
    SHAPE: 5,
    GUNS: (() => {
      var gs = []
      for (let i = 0.5; i < 2; i++) {
          gs.push({
            POSITION: [8.5, 15, 0.6, 6, 0, (360 * i) / 5, 0],
            PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.drone, g.hypershipMinionSize]),
              TYPE: exports.starshipMinion, AUTOFIRE: true, MAX_CHILDREN: 2
            }
          },{
            POSITION: [15, 6, 1, 0, 0, (360 * i) / 5, 0],
          }, {
            POSITION: [12, 6, 1, 0, 0, (360 * i) / 5, 0],
          }, {
            POSITION: [5, 6, 1.65, 6, 0, (360 * i) / 5, 0],
          })    
      }
      for (let i = 0; i < 3; i++) {
          gs.push({
            POSITION: [8.5, 15, 0.6, 6, 0, (360 * (2.5 + i)) / 5, 0],
            PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.drone, g.hypershipMinionSize]),
              TYPE: exports.starshipMinion2, AUTOFIRE: true, MAX_CHILDREN: 2
            }
          },{
            POSITION: [15, 6, 1, 0, 0, (360 * (2.5 + i)) / 5, 0],
          }, {
            POSITION: [12, 6, 1, 0, 0, (360 * (2.5 + i)) / 5, 0],
          }, {
            POSITION: [5, 6, 1.65, 6, 0, (360 * (2.5 + i)) / 5, 0],
          })    
      }
      return gs
    })(),
    TURRETS: (() => {
    var tr = [
      {
        POSITION: [15, 0, 0, 0, 0, 1],
        TYPE: [exports.pentagon, { COLOR: 14 }]
      },
      {
        POSITION: [8, 0, 0, 0, 0, 1],
        TYPE: exports.auraGenerator
      }
    ]
    for (let i = 0; i < 5; i++) {
      tr.push(
        {
          POSITION: [4, 8, 0, (360 * i) / 5, 0, 1],
          TYPE: exports.auraGenerator
        }
      )
    }
    return tr
  })()
  }
})()

exports.starship = {
  PARENT: [exports.genericTank],
  LABEL: 'Starship-Supernova',
  TYPE: 'dreadnought',
  SHAPE: [[-0,-0]],
  COLOR: 14,
  BODY: {
    HEALTH: 1700,
    DAMAGE: 4,
    SPEED: 1.45
  },
  SIZE: 40,
  TURRETS: [
    {
      POSITION: [20, 0, 0, 0, 0, 1],
      TYPE: [exports.starshipLayer0, { SHAPE: 4, COLOR: 14 }]
    },  {
      POSITION: [21.5, 0, 0, 0, 0, 0],
      TYPE: exports.layer2S
    }, 
  ],
};
exports.galacticLayer0 = {
  SHAPE: 5,
  GUNS: (() => {
          var gs = []
          for (let i = 0.5; i < 5; i++) {
            gs.push({
              POSITION: [12, 4, 1, 0, -4, (360 * i) / 5, 0.5],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.gunturret]),
                TYPE: exports.bullet,
              }
            },{
              POSITION: [12, 4, 1, 0, 4, (360 * i) / 5, 0.5],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.gunturret]),
                TYPE: exports.bullet,
              }
            },{
              POSITION: [14, 4, 1, 0, -2, (360 * i) / 5, 0.25],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.gunturret]),
                TYPE: exports.bullet,
              }
            },{
              POSITION: [14, 4, 1, 0, 2, (360 * i) / 5, 0.25],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.gunturret]),
                TYPE: exports.bullet,
              }
            },{
              POSITION: [16, 4, 1, 0, 0, (360 * i) / 5, 0],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.gunturret]),
                TYPE: exports.bullet,
              }
            })
          }
          return gs
        })(),
  TURRETS: (() => {
    var tr = [
      {
        POSITION: [15, 0, 0, 0, 0, 1],
        TYPE: [exports.pentagon, { COLOR: 14 }]
      },
      {
        POSITION: [8, 0, 0, 0, 0, 1],
        TYPE: exports.auraGenerator
      }
    ]
    for (let i = 0; i < 5; i++) {
      tr.push(
        {
          POSITION: [4, 8, 0, (360 * i) / 5, 0, 1],
          TYPE: exports.auraGenerator
        }
      )
    }
    return tr
  })()
}
exports.galactic = {
  PARENT: [exports.genericTank],
  LABEL: 'Galactic-Supernova',
  TYPE: 'dreadnought',
  SHAPE: [[-0,-0]],
  COLOR: 14,
  BODY: {
    HEALTH: 1700,
    DAMAGE: 4,
    SPEED: 1.3
  },
  SIZE: 40,
  TURRETS: [
    {
      POSITION: [20, 0, 0, 0, 0, 1],
      TYPE: [exports.galacticLayer0, { SHAPE: 4, COLOR: 14 }]
    },  {
      POSITION: [21.5, 0, 0, 0, 0, 0],
      TYPE: exports.layer2S
    }, 
  ],
};
exports.hypergiantLayer0 = {
  SHAPE: 5,
  GUNS: (() => {
          var gs = []
          for (let i = 0.5; i < 5; i++) {
            gs.push({
              POSITION: [14, 13, 1, 0, 0, (360 * i) / 5, 0],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni, g.gunturret]),
                TYPE: exports.bullet,
              }
            })
          }
          return gs
        })(),
  TURRETS: (() => {
    var tr = [
      {
        POSITION: [15, 0, 0, 0, 0, 1],
        TYPE: [exports.pentagon, { COLOR: 14 }]
      },
      {
        POSITION: [8, 0, 0, 0, 0, 1],
        TYPE: exports.auraGenerator
      }
    ]
    for (let i = 0; i < 5; i++) {
      tr.push(
        {
          POSITION: [4, 8, 0, (360 * i) / 5, 0, 1],
          TYPE: exports.auraGenerator
        }
      )
    }
    return tr
  })()
}
exports.hypergiant = {
  PARENT: [exports.genericTank],
  LABEL: 'Hypergiant-Supernova',
  TYPE: 'dreadnought',
  SHAPE: [[-0,-0]],
  COLOR: 14,
  BODY: {
    HEALTH: 1700,
    DAMAGE: 4,
    SPEED: 1.3
  },
  SIZE: 40,
  TURRETS: [
    {
      POSITION: [20, 0, 0, 0, 0, 1],
      TYPE: [exports.hypergiantLayer0, { SHAPE: 4, COLOR: 14 }]
    },  {
      POSITION: [21.5, 0, 0, 0, 0, 0],
      TYPE: exports.layer2S
    }, 
  ],
};
exports.hypergiant_medicLayer0 = {
  SHAPE: 5,
  GUNS: (() => {
          var gs = []
          for (let i = 0.5; i < 5; i++) {
            gs.push({
              POSITION: [14, 13, 1, 0, 0, (360 * i) / 5, 0],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni, g.gunturret]),
                TYPE: exports.bullet,
              }
            })
          }
          return gs
        })(),
  TURRETS: (() => {
    var tr = [
      {
        POSITION: [15, 0, 0, 0, 0, 1],
        TYPE: [exports.pentagon, { COLOR: 14 }]
      },
    ]
    for (let i = 0; i < 5; i++) {
      tr.push({
        POSITION: [4, 8, 0, (360 * i) / 5, 360, 1],
        TYPE: exports.auraGenerator4
      })
    }
    tr.push({
        POSITION: [9, 0, 0, 0, 360, 1],
        TYPE: exports.auraGenerator4
      })
    return tr
  })()
}
exports.hypergiant_medic = {
  PARENT: [exports.genericTank],
  LABEL: 'Hypergiant-Medic',
  TYPE: 'dreadnought',
  SHAPE: [[-0,-0]],
  COLOR: 14,
  BODY: {
    HEALTH: 1700,
    DAMAGE: 4,
    SPEED: 1.3
  },
  SIZE: 40,
  TURRETS: [
    {
      POSITION: [20, 0, 0, 0, 0, 1],
      TYPE: [exports.hypergiant_medicLayer0, { SHAPE: 4, COLOR: 14 }]
    },  {
      POSITION: [21.5, 0, 0, 0, 0, 0],
      TYPE: exports.layer2S
    }, 
  ],
};
exports.sanctuationSwarm = {
  PARENT: [exports.swarm],
  SHAPE: 5,
  GUNS: [
    {
      POSITION: [18, 10, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic]),
        TYPE: exports.bullet
      }
    }, {
      POSITION: [18, 10, 1, 0, 0, 180, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic]),
        TYPE: exports.bullet
      }
    }
  ]
    
}
exports.sanctuation = {
  PARENT: [exports.genericTank],
  LABEL: 'Sanctuation',
  GUNS: [
    {
      POSITION: [18, 10, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm]),
        TYPE: exports.sanctuationSwarm
      }
    }, {
      POSITION: [18, 10, 1, 0, 0, 180, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.swarm]),
        TYPE: exports.sanctuationSwarm
      }
    }
  ]
}
// Miscellaneous Bosses
exports.juggernaut = {
  PARENT: [exports.miniboss],
  LABEL: 'Juggernaut',
  SHAPE: 8,
  SIZE: 35,
  COLOR: 34,
  HAS_NO_RECOIL: true,
  BODY: {
    HEALTH: 850,
    DAMAGE: 5
  },
  GUNS: (() => {
    var gs = []
    for (let i = 0; i < 4; i++) {
      gs.push({
        POSITION: [15, 5, 1, 0, 0, (360 * i) / 4, 0]
      }, {
        POSITION: [3, 5, 1.7, 15, 0, (360 * i) / 4, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.trapturret]),
          TYPE: exports.trap, AUTOFIRE: true
        }
      }, {
        POSITION: [15, 7, 1, 0, 0, (360 * (i + .5)) / 4, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
          TYPE: exports.bullet, AUTOFIRE: true
        }
      })
    }
    return gs
  })(),
  TURRETS: (() => {
    exports.juggernautTurret1 = {
      PARENT: [exports.auto3gun],
      HAS_NO_RECOIL: true,
      GUNS: [
        {
          POSITION: [18, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.turret]),
              TYPE: exports.bullet
          } }, {
          POSITION: [15, 13, 1, 0, 0, 0, 0.25],
            PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.turret]),
              TYPE: exports.bullet
          } },
      ]
    }
    exports.juggernautTurret2 = {
      PARENT: [exports.auto3gun],
      HAS_NO_RECOIL: true,
      GUNS: [
        {
          POSITION: [21, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.turret]),
              TYPE: exports.bullet
          } }, {
          POSITION: [18, 10, 1, 0, 0, 0, 0.333],
            PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.turret]),
              TYPE: exports.bullet
          } }, {
          POSITION: [15, 10, 1, 0, 0, 0, 0.667],
            PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.turret]),
              TYPE: exports.bullet
          } },
      ]
    }
    var tr = [
      {
        POSITION: [8, 0, 0, 0, 360, 1],
        TYPE: exports.auraGenerator
      }
    ]
    for (let i = 0; i < 4; i++) {
      tr.push({
        POSITION: [4.5, 8, 0, (360 * i) / 4, 90, 1],
        TYPE: exports.juggernautTurret1
      },{
        POSITION: [4.5, 8, 0, (360 * (i + .5)) / 4, 90, 1],
        TYPE: exports.juggernautTurret2
      })
    }
    return tr
  })()
}
// True Final Bosses.
// Chaos(s)
exports.zyraethos = {
    PARENT: [exports.genericTank],
    TYPE: 'miniboss',
    LABEL: "Zyraethos",
    DANGER: 500,
    SKILL: skillSet({
        rld: 1,
        dam: 1, 
        pen: 1,
        str: 1,
        spd: 1,
        atk: 1,
        hlt: 1,
        shi: 1,
        rgn: 1,
        mob: 1,        
    }),
    LEVEL: 45,
    SIZE: 280,
    SHAPE: 17, 
    CONTROLLERS: ['nearestDifferentMaster', 'bossminion', 'canRepel'],
    AI: { NO_LEAD: true, },
    BODY: {
       HEALTH: 9000,
       DAMAGE: 18.4,
       SPEED:  base.SPEED * 0.006,
       FOV: 2.5
    },
    VALUE: 5 * 10e10,
    FACING_TYPE: 'autospin',
    HITS_OWN_TYPE: 'boss',
    BROADCAST_MESSAGE: 'A Zyraethos has fallen!',
};
exports.zeus = (() => {
  // Miscellaneous (Functions)
  function zeusLayer(number, color, controller, TURRETS = [], GUNS = []) {
    return {
      PARENT: [exports.genericTank],
      LABEL: '',
      SHAPE: 3 + 2*number,
      COLOR: color,
      CONTROLLERS: [`${controller}`],
      SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
      TURRETS: TURRETS,
      GUNS: GUNS
    }
  }
  // Stats
  g.zeusDrone = [6, 1, 1, 1, 4.3, 1.4, 1.22, 1, 1, 1, 1, 1, 1];
  g.zeusSwarmDrone = [5.5, 1, 1, 1, 2.2, 3.2, 1.2, 1, 1, 1, 1, 1, 1];
  g.zeusMinion = [8.5, 1, 1, 1, 2, 0.7, 0.12, 0.88, 1.2, 1, 1, 1, 1]
  // Buff stats for some Semi-Celestial turrets
  g.zeusBuffedMissile = [5.55, 1, 1, 1, 1.55, 1.145, 1.255, 1, 1, 1, 1, 1, 1]
  // munitions
  exports.zeusDrone = {
    PARENT: [exports.drone],
    SHAPE: 10,
    COLOR: 19,
    INDEPENDENT: true
  }
  exports.zeusMinion1 = {
    PARENT: [exports.elite],
    INDEPENDENT: true,
    CONTROLLERS: ['hangOutNearMaster'],
    SHAPE: 3,
    TURRETS: (() => {
      var tr = []
      for (let i = 0.5; i < 3; i++) {
        tr.push({
          POSITION: [12, 6, 0, (360 * i) / 3, 190, 0],
          TYPE: [exports.autoTurret, { PARENT: [exports.pound] }]
        })
      }
      return tr
    })()
  }
  exports.zeusPentagonSwarm = {
    SHAPE: 5,
    PARENT: [exports.swarm]
  }
  // turrets
  exports.zeusCarrier = {
    PARENT: [exports.auto4gun],
    LABEL: '',
    GUNS: [
      {
                    POSITION: [   7,    7.5,    0.6,     7,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,          
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      2,      40,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier, g.zeusSwarmDrone, g.power]),
                            TYPE: exports.zeusPentagonSwarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,    
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -2,     -40,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier, g.zeusSwarmDrone, g.power]),
                            TYPE: exports.zeusPentagonSwarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,    
                        }, }
    ]
  }
  exports.zeusMissileTurret = {
    PARENT: [exports.auto3gun],
    HAS_NO_RECOIL: true,
    LABEL: '',
    GUNS: [
      {
        POSITION: [21, 10, 1.5, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.skim, g.nepheleMissile, g.zeusBuffedMissile, g.fake]),
          TYPE: exports.bullet
        }
      },
      {
        POSITION: [19, 16, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.skim, g.nepheleMissile, g.zeusBuffedMissile]),
          TYPE: exports.nepheleMissile
        }
      },
      {
        POSITION: [19, 15, 0.01, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.skim, g.nepheleMissile, g.zeusBuffedMissile, g.fake]),
          TYPE: exports.bullet
        }
      },
    ]
  }
  exports.zeusMissileTurret2 = {
    PARENT: [exports.auto3gun],
    LABEL: '',
    GUNS: [
      {
        POSITION: [21, 10, 1.5, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.skim, g.phobosMissile, g.zeusBuffedMissile, g.fake]),
          TYPE: exports.bullet
        }
      },
      {
        POSITION: [19, 16, 1, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.skim, g.phobosMissile, g.zeusBuffedMissile]),
          TYPE: exports.phobosMissile
        }
      },
      {
        POSITION: [17, 0.15, 100, 0, 0, 0, 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.skim, g.phobosMissile, g.zeusBuffedMissile, g.fake]),
          TYPE: exports.bullet
        }
      },
    ]
  }
  exports.zeusHiveTurret1 = {
    PARENT: [exports.genericTank],
    LABEL: 'Mini Swarmer',
    BODY: {
        FOV: 2,
    },
    CONTROLLERS: [
        "canRepel",
        "onlyAcceptInArc",
        "mapAltToFire",
        "nearestDifferentMaster",
    ],
    GUNS: [
      {
            POSITION: [14, 14, -1.2, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfreload, g.halfreload, g.power, g.power, g.pound, g.destroy, g.hive, g.zeusBuffedMissile]),
                TYPE: exports.aresHive,
            },
        },
        {
            POSITION: [15, 12, 1, 0, 0, 0, 0],
        },
    ]
  }
  // layers
  exports.zeusBody1 = zeusLayer(1, 31, "slowspin", (() => {
    var tr = []
    for (let i = 0.5; i < 5; i++) {
      tr.push({
        POSITION: [8, 8.5, 0, (360 * i) / 5, 180, 0],
        TYPE: exports.zeusCarrier
      })
    }
    return tr
  })(), [])
  exports.zeusBody2 = zeusLayer(2, 31, "reverseslowspin", [], (() => {
    var gs = []
    for (let i = 0.5; i < 7; i++) {
      gs.push({
        POSITION: [6, 6, 1.25, 5.5, 0, (360 * i) / 7, 6],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.drone, g.zeusDrone]),
          TYPE: exports.zeusDrone, 
          AUTOFIRE: true,
          MAX_CHILDREN: 1
        }
      })
    }
    return gs
  })())
  exports.zeusBody3 = zeusLayer(3, 31, "slowspin", (() => {
    var tr = []
    for (let i = 0.5; i < 9; i++) {
      tr.push({
        POSITION: [7, 8.5, 0, (360 * i) / 9, 180, 0],
        TYPE: exports.zeusHiveTurret1
      })
    }
    return tr
  })(), [])
  exports.zeusBody4 = zeusLayer(4, 31, "reverseslowspin", [], (() => {
    var gs = []
    for (let i = 0.5; i < 11; i++) {
      gs.push({
        POSITION: [5.5, 4, 1.25, 5.5, 0, (360 * i) / 11, 6],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.drone, g.zeusMinion]),
          TYPE: exports.zeusMinion1,
          COLOR_OVERRIDE: 5,
          AUTOFIRE: true, 
          MAX_CHILDREN: 1
        }
      })
    }
    return gs
  })())
  exports.zeusBody5 = zeusLayer(5, 31, "slowspin", (() => {
    var tr = []
    for (let i = 0.5; i < 13; i++) {
      tr.push({
        POSITION: [5.7, 8.5, 0, (360 * i) / 13, 180, 0],
        TYPE: exports.zeusMissileTurret
      })
    }
    return tr
  })(), [])
  exports.zeusBody6 = zeusLayer(6, 31, "reverseslowspin", (() => {
    var tr = []
    for (let i = 0.5; i < 15; i++) {
      tr.push({
        POSITION: [4.85, 8.5, 0, (360 * i) / 15, 180, 0],
        TYPE: exports.zeusMissileTurret2
      })
    }
    return tr
  })(), [])
  return {
    PARENT: [exports.zyraethos],
    NAME: "Zeus",
    COLOR: 31,
    TURRETS: (() => {
      let tr = [
        {
          POSITION: [16.94, 0, 0, 0, 360, 1],
          TYPE: exports.zeusBody6
        },
        {
          POSITION: [14.94, 0, 0, 0, 360, 1],
          TYPE: exports.zeusBody5
        },
        {
          POSITION: [12.94, 0, 0, 0, 360, 1],
          TYPE: exports.zeusBody4
        },
        {
          POSITION: [10.94, 0, 0, 0, 360, 1],
          TYPE: exports.zeusBody3
        },
        {
          POSITION: [8.94, 0, 0, 0, 360, 1],
          TYPE: exports.zeusBody2
        },
        {
          POSITION: [6.94, 0, 0, 0, 360, 1],
          TYPE: exports.zeusBody1
        }
      ]
      for (let i = 0.5; i < 17; i++) {
        tr.push({
            POSITION: [4, 9, 0, (360 * i) / 17, 0, 0],
            TYPE: [exports.trapTurret, { INDEPENDENT: true, AUTOFIRE: true }],
        })
      }
      return tr
    })()
  }
})()
    
// Thor


// DEVELOPER TESTS! (ONLY TrickyArrasGames CAN TOUCH!)
// LAYER OPTIMIZATION TESTS
exports.layerTest = {
  PARENT: [exports.miniboss],
  SHAPE: 9,
  SIZE: 65,
  TURRETS: (() => {
    var tr = []
    var layers = [exports.gersemiBody2, exports.gersemiBody1]
    for (let i = 0; i < 2; i++) {
      tr.push({
        POSITION: [14.94 - (7 * i), 0, 0, 0, 360, 1],
        TYPE: layers[i]
      })
    }
    return tr
  })()
}
exports.florrIoStingerBuild = (() => {
  g.stinger = [3, 1, 1, 8, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  exports.florrIoStinger = {
    PARENT: [exports.bullet],
    LABEL: 'Mythic Stinger',
    SHAPE: 0,
    TYPE: 'entity', // Prevent it from healing
    COLOR: 17,
    LAYER: 18,
    DIE_AT_RANGE: false,
    BODY: {
      SPEED: 0
    },
    CONTROLLERS: ['aura'],
  }
  exports.stingerSpawner = {
    SHAPE: [[0, 0]],
    HAS_NO_RECOIL: true,
    GUNS: (() => {
      var gs = []
        gs.push({
          POSITION: [0, 1, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.stinger]),
            TYPE: exports.florrIoStinger, AUTOFIRE: true, COLOR_OVERRIDE: 6, MAX_CHILDREN: 1
          }
        })
      return gs
    })()
  }
  return {
    PARENT: [exports.genericTank],
    LABEL: '',
    TURRETS: (() => {
      var gs = []
      for (let i = 0; i < 10; i++) {
        gs.push({
          POSITION: [10, 60, 0, (360 * i) / 10, 0, 0],
          TYPE: exports.stingerSpawner
        },)
      }
      return gs
    })()
  }
})()
exports.florrRiceBuild = (() => {
  g.rice = [0.1, 1, 1, 8, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  exports.florrIoRice = {
    PARENT: [exports.bullet],
    LABEL: 'Mythic Stinger',
    SHAPE: 0,
    TYPE: 'entity', // Prevent it from healing
    COLOR: 17,
    LAYER: 18,
    DIE_AT_RANGE: false,
    BODY: {
      SPEED: 0,
      HEALTH: 1,
      DAMAGE: 1
    },
    CONTROLLERS: ['aura'],
  }
  exports.riceSpawner = {
    SHAPE: [[0, 0]],
    HAS_NO_RECOIL: true,
    GUNS: (() => {
      var gs = []
        gs.push({
          POSITION: [0, 1, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.rice]),
            TYPE: exports.florrIoRice, AUTOFIRE: true, COLOR_OVERRIDE: 6, MAX_CHILDREN: 1
          }
        })
      return gs
    })()
  }
  return {
    PARENT: [exports.genericTank],
    LABEL: '',
    TURRETS: (() => {
      var gs = []
      for (let i = 0; i < 5; i++) {
        gs.push({
          POSITION: [10, 60, 0, (360 * (i-2)) / 20, 0, 0],
          TYPE: exports.riceSpawner
        },)
      }
      return gs
    })()
  }
})()
exports.florrIoMob = {
  PARENT: [exports.minion],
  LABEL: 'Larry',
  SHAPE: 0,
  COLOR: 17,
  SIZE: 340,
  VALUE: 7e9,
  TYPE: 'tank',
  DRAW_HEALTH: true,
  NAME: "Larry",
  SKILL: Array(10).fill(9),
  GUNS: [],
  BODY: {
    HEALTH: 20000,
    DAMAGE: 72,
    SPEED: 1.2
  }
}
exports.triteam = {
            PARENT: [exports.genericTank],
            LABEL: 'Tri-Angle',
            BODY: {
                HEALTH: base.HEALTH * 0.8,
                SHIELD: base.SHIELD * 0.8,
                DENSITY: base.DENSITY * 0.6,
            },
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.tonsmorrecoil]),
                        TYPE: exports.bullet,
                        LABEL: 'Front',
                        AUTOFIRE: true
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        AUTOFIRE: true,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        AUTOFIRE: true,
                        LABEL: gunCalcNames.thruster,
                    }, },
            ],
        }; 
exports.teamertank ={
  PARENT: [exports.genericTank],
  LABEL: 'Teamer Police WOOP WOOP',
  GUNS: (() => {
    // spawnable tri-angle that spins fast as f
    exports.spin2team = {
      PARENT: [exports.bullet],
      SHAPE: 0,
      BODY: {
        RANGE: 300
      },
      HAS_NO_RECOIL: true,
      FACING_TYPE: 'superfastspin',
      GUNS: (() => {
        var gs = []
        exports.triteam.GUNS.forEach(e => [
          gs.push({
            POSITION: [
              e.POSITION[0],
              e.POSITION[1],
              e.POSITION[2],
              e.POSITION[3],
              e.POSITION[4],
              e.POSITION[5],
              e.POSITION[6]
            ],
            PROPERTIES: e.PROPERTIES, AUTOFIRE: true
          })
        ])
        return gs
      })()
    }
    var gs = []
    var xGS = [3, -3], // Positions (X pos)
      xGS2 = [5.5, -5.5], // Positions (X pos)
      xSP = [4, -4], // Positions (X pos)
      statsB = [g.basic, g.pound], // Stats (Spinning Tri-Angle)
      statsG = [g.basic, g.gunner, g.puregunner], // Gunner Stats
      statsT = [g.basic, g.twin], // Twin Stats
      statsA = [g.basic, g.pound, g.destroy, g.anni], // Annihilator Stats
      delays = [0, 0.5], // Delays
      angles = [0, 180]; // Angles
     
    for (let i = 0; i < 2; i++) {
      gs.push({
         POSITION: [16, 20, 1, 0, 0, angles[i], 0],
         PROPERTIES: {
           SHOOT_SETTINGS: combineStats(statsA),
           TYPE: exports.bullet
         }
       })
    }
    for (let i = 0; i < 2; i++) {
      gs.push({
         POSITION: [18, 6, 1, 0, xGS2[i], 0, delays[i]],
         PROPERTIES: {
           SHOOT_SETTINGS: combineStats(statsT),
           TYPE: exports.bullet
         }
       })
    }
    for (let i = 0; i < 2; i++) {
      gs.push({
        POSITION: [16, 5, 1, 0, xGS[i], 0, delays[i]],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats(statsG),
          TYPE: exports.bullet
        }
      })
    }
    g.thruster2 = [0.25, 1.4, 1, 0.6, 0.3, 0.2, 0.4, 0.4, 1, 1, 1, 1, 1]
    gs.push({
      POSITION: [20, 13, 2, 5, 0, 180, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.thruster2]),
        TYPE: exports.bullet
      }
    }, {
      POSITION: [22, 8, 1, 0, 0, 0, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
        TYPE: exports.bullet
      }
    })
    exports.ception = {
      PARENT: [exports.bullet],
      GUNS: [
        {
          POSITION: [18, 8, 1, 0, 0, 0, 0],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet
          }
        }
      ]
    }
    let angles2 = [90, -90],
        angles3 = [75, -75],
        angles4 = [105, -105]
    for (let i = 0; i < 2; i++) {
      gs.push( {
        POSITION: [16, 8, 1, 0, 0, angles3[i], 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, [1,1,1,1,2,1,1,1,1,1,1,1,1], g.halfreload]),
          TYPE: exports.ception
        }
      },{
        POSITION: [16, 8, 1, 0, 0, angles4[i], 0.5],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, [1,1,1,1,2,1,1,1,1,1,1,1,1], g.halfreload]),
          TYPE: exports.ception
        }
      },{
        POSITION: [18, 8, 1, 0, 0, angles2[i], 0],
        PROPERTIES: {
          SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, [1,1,1,1,2,1,1,1,1,1,1,1,1], g.halfreload]),
          TYPE: exports.ception
        }
      })
    }
    gs.push({
      POSITION: [15, 20, 2, 5, 0, 180, 0],
      PROPERTIES: {
        SHOOT_SETTINGS: combineStats(statsB),
        TYPE: exports.spin2team
       }
    })
    
    return gs
  })()
}
// DEVELOPER UPGRADES
exports.zyraethos_s = {
  PARENT: [exports.testbedP],
  LABEL: 'Zyraethos(s)'
}
exports.testbedbosses = {
  PARENT: [exports.testbedP],
  LABEL: 'Testbed Bosses'
}
exports.miscellaneous = {
  PARENT: [exports.testbedP],
  LABEL: 'Miscellaneous Bosses'
}
exports.petal = {
  LABEL: 'Petal',
  TYPE: 'drone',
  ACCEPTS_SCORE: false,
  TYPE: 'tank',
  DANGER: 2,
  BODY: {
      PENETRATION: 1.6,
      PUSHABILITY: .6,
      ACCELERATION: 0.05,
      HEALTH: 1,
      DAMAGE: 1,
      SPEED: 3.8,
      RANGE: 9000,
      DENSITY: .03,
      RESIST: 1.5,
  },
  DRAW_HEALTH: true,
  CLEAR_ON_MASTER_UPGRADE: true,
  BUFF_VS_FOOD: true,
  CAN_BE_ON_LEADERBOARD: false,
  ALWAYS_ACTIVE: true,
  MOTION_TYPE: 'chase',
  FACING_TYPE: 'petalToTarget',
  CAN_GO_OUTSIDE_ROOM: true,
  HITS_OWN_TYPE: 'never',
  CONTROLLERS: ['florrPetalMovement'],
}
exports.bullet2 = {
    PARENT: [exports.bullet],
    GUNS: (() => {
            var gs = []
            for (let i = 0; i < 3; i++) {
              gs.push({
                POSITION: [0, 8, 1, 0, 0, (360 * i) / 3, 0],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, [0.1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]),
                    TYPE: exports.petal, 
                    AUTOFIRE: true, 
                    MAX_CHILDREN: 1
                }
              })
            }
            return gs
          })()
}
exports.testFlorrTank = {
  PARENT: [exports.genericTank],
  LABEL: 'Test',
  HAS_NO_RECOIL: true,
  GUNS: (() => {
    var gs = []
    for (let i = 0; i < 15; i++) {
      gs.push({
        POSITION: [0, 8, 1, 0, 0, (360 * i) / 15, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.petal, 
            AUTOFIRE: true, 
            MAX_CHILDREN: 1
        }
      })
    }
    return gs
  })()
}
exports.basic2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Basic',
    GUNS: [
        {
            POSITION: [18, 8, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: exports.bullet2
            }
        }
    ]
}
exports.turretFacingTest = (() => {
  var scaleFactor = 20
  exports.shapeTurret = {
    SHAPE: 5,
    INSTANT_TURRET_TURN: true
  }

  return {
    PARENT: [exports.genericTank],
    LABEL: 'TEST',
    SHAPE: 5,
    TURRETS: [
      {
        POSITION: [scaleFactor * 0.75, 0, 0, 0, 0, 1],
        TYPE: exports.shapeTurret
      }
    ]
  }
})()

exports.betatester.UPGRADES_TIER_0 = [exports.mysticals, exports.elites, exports.strange, exports.misc, exports.testbedtanks]
exports.testbed.UPGRADES_TIER_0 = [
  exports.basic,
  exports.bosses,
  exports.misc,
  exports.testbedtanks,
  exports.florrIoStingerBuild,
  exports.florrRiceBuild,
  exports.testFlorrTank
];
exports.testbed.UPGRADES_TIER_0.push(
  exports.sentryPage,
)
exports.misc.UPGRADES_TIER_0 = [
  exports.gunner_bee,
  exports.cobra,
  exports.layerTest,
  exports.dreadnought,
  exports.sanctuation,
    exports.basic2
]
exports.dreadnought.UPGRADES_TIER_0 = [
  exports.dwarf,
  exports.malware,
  exports.rogue
]
exports.rogue.UPGRADES_TIER_0 = [
  exports.rogue_ring
]
exports.rogue_ring.UPGRADES_TIER_0 = [
  exports.mothership,
  exports.deathstar,
  exports.comet
]
exports.comet.UPGRADES_TIER_0 = [
  exports.hypership
]
exports.hypership.UPGRADES_TIER_0 = [
  exports.starship
]
exports.dwarf.UPGRADES_TIER_0 = [
  exports.dwarf_ring,
]
exports.malware.UPGRADES_TIER_0 = [
  exports.malware_ring
]
exports.malware_ring.UPGRADES_TIER_0 = [
  exports.planetary
]
exports.dwarf_ring.UPGRADES_TIER_0 = [
  exports.executor,
  exports.asteroid
]
exports.planetary.UPGRADES_TIER_0 = [
  exports.supergiant
]
exports.asteroid.UPGRADES_TIER_0 = [
  exports.interplanetary,
]
exports.interplanetary.UPGRADES_TIER_0 = [
  exports.galactic
]
exports.supergiant.UPGRADES_TIER_0 = [
  exports.hypergiant, exports.hypergiant_medic
]
exports.testbed.UPGRADES_TIER_0.push(exports.sentinels);
// exports.bosses.UPGRADES_TIER_1 = [exports.elite_battleship, exports.elite_sprayer, exports.palisade, exports.elite_destroyer, exports.elite_gunner]
exports.sentryPage.UPGRADES_TIER_0 = [
  exports.sentryGun, exports.sentrySwarm, exports.sentryTrap, exports.sentryFactory, exports.sentryhexagon,
  exports.sentryring, exports.sentryDirector, exports.sentryAnni, exports.superSentinel, exports.eliteSentinel, exports.eliteSentry
]
exports.sentinels.UPGRADES_TIER_0 = [exports.sentinelLauncher, exports.sentinelMinigun]
// exports.bosses.UPGRADES_TIER_1 = [
//   exports.elite_spawner,
//   exports.elite_twin,
//   exports.elite_pounder,
//   exports.elite_swarmer,
//   exports.elite_minigun,
//   exports.nestkeeper,
//   exports.elite_skimmer,
//   exports.bosses2
// ]
// BOSSES TESTBED UPGRADES
exports.bosses.UPGRADES_TIER_0 = [exports.zyraethos_s, exports.celestials, exports.semicelestials, exports.strange, exports.elites, exports.mysticals, exports.eternals, exports.roguecelestials, exports.nesters, exports.terrestials, exports.miscellaneous]
// terrestrials
exports.terrestials.UPGRADES_TIER_0 = [exports.ezekiel, exports.ares, exports.gersemi, exports.eris, exports.athena]
// eternals
exports.eternals.UPGRADES_TIER_0 = [exports.kronos, exports.sentinelKing, exports.ragnarok]
// zyraethos's
exports.zyraethos_s.UPGRADES_TIER_0 = [exports.zeus]
// celestials
exports.celestials.UPGRADES_TIER_0 = [exports.plasma, exports.pluto, exports.zaphkiel, exports.dacia, exports.theia, exports.xenon, exports.freyja, exports.lucius, exports.rogueZaphkiel]
// semi celestials
exports.semicelestials.UPGRADES_TIER_0 = [exports.okeanos, exports.nephele, exports.phobos, exports.groxphy]
// strange bosses
exports.strange.UPGRADES_TIER_0 = [exports.elite_skimmer, exports.waterspout, exports.penta_destroyer, exports.unknownboss, exports.palisade]
// rogue celestials
exports.roguecelestials.UPGRADES_TIER_0 = [exports.alviss, exports.rogueZaphkiel]
// mysticals
exports.mysticals.UPGRADES_TIER_0 = [exports.sorce, exports.exorcist, exports.summon, exports.enchant]
// nesters
exports.nesters.UPGRADES_TIER_0 = [exports.nestkeeper, exports.nestWarden]
// elite crashers
exports.elites.UPGRADES_TIER_0 = [exports.elite_spawner, exports.elite_twin, exports.elite_pounder, exports.elite_swarmer, exports.elite_minigun, exports.elite_streamliner, exports.elite_destroyer, exports.elite_gunner, exports.elite_sprayer, exports.elite_battleship, exports.elite_launcher]
// miscellaneous bosses
exports.miscellaneous.UPGRADES_TIER_0 = [exports.juggernaut]
// other upgrades
exports.testbedtanks.UPGRADES_TIER_0 = [exports.spraey, exports.dps, exports.spreaey, exports.spreaeay, exports.spreaeaeay, exports.spreaeaeaey, exports.teamertank]
// exports.bosses.UPGRADES_TIER_1.push(exports.penta_destroyer, 
//   exports.unknownboss, exports.plasma, 
//   exports.pluto, exports.hazard, exports.kronos, exports.abysslingP,
//   exports.zaphkiel,
//   exports.dacia,
//   exports.lucius,
// )
// exports.bosses2.UPGRADES_TIER_1 = [ 
//   exports.peacekeeper1, exports.peacekeeper2,
//   exports.peacekeeper3, exports.roomkeeper, exports.waterspout,
//   exports.paladin, exports.freyja, exports.theia, exports.kronos,
//   exports.xenon, exports.elite_streamliner, exports.elite_streamliner
// ]
