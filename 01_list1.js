const COLORS = [ 'crimson', 'forestgreen', 'yellow',
   'royalblue', 'saddlebrown', 'hotpink', 'darkorange',
   'darkmagenta' ];
const N_DISKS = COLORS.length;
const BASE_LENGTH = 200;
const C_WIDTH  = 3.732 * BASE_LENGTH;
const C_HEIGHT = 3.500 * BASE_LENGTH;
const DISK_R = 0.9 * BASE_LENGTH;
const POLE_R = 15;
const POSITIONS = { 'Source'      : [0.268, 0.714],
                    'Auxiliary'   : [0.500, 0.286],
                    'Destination' : [0.732, 0.714] };

class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Disk {
  constructor(level) {
    this.level = level;
    this.color = COLORS[level];
    this.r = (DISK_R-POLE_R)*(N_DISKS-level)
                / N_DISKS + POLE_R;
  }
}

class Tower {
  constructor(name, disks, direction=null) {
    this.name = name;
    this.disks = [];
    for (var i = 0; i < disks; i++) 
      { this.disks.push(new Disk(i)); }
    this.direction = direction;
    var rx, ry;
    [rx,ry] = POSITIONS[name];
    this.pos = new Position(rx*C_WIDTH, ry*C_HEIGHT);
  }
}

var src = new Tower('Source', N_DISKS);
var aux = new Tower('Auxiliary',   0, src);
var dst = new Tower('Destination', 0, src);
// 円盤の数(N_DISKS)が奇数のときはDestinationを、
// そうでないときはAuxiliaryを向くようにする
src.direction = (N_DISKS % 2 == 1) ? dst : aux;

function setup() {
  createCanvas(C_WIDTH, C_HEIGHT);
  frameRate(30);
}

function draw() {
  // put drawing code here
}
