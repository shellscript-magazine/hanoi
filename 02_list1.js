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
const FLASH_CTR = 20;

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

  draw(pos) {
    stroke('black');
    fill(this.color);
    ellipse(pos.x, pos.y, 2*this.r);
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

    this.exchanging = false;
    this.flash_ctr = 0;
  }

  draw() {
    var pos  = this.pos;
    var pos2 = this.direction.pos;
    var sx, sy, dx, dy, r;

    // 円盤を描く
    this.disks.forEach(function(d) { d.draw(pos) })

    // 支柱を描く
    stroke('brown');
    fill(this.exchanging & (this.flash_ctr < FLASH_CTR/2) 
      ? 'gold' : 'white');
    ellipse(pos.x, pos.y, 2*POLE_R);

    // 向きを描く
    stroke('navy');
    [sx, sy] = [pos.x,  pos.y ];
    [dx, dy] = [pos2.x, pos2.y];
    r = POLE_R / Math.sqrt((dx-sx)*(dx-sx)+(dy-sy)*(dy-sy));
    [dx, dy] = [(dx-sx)*r+sx, (dy-sy)*r+sy];
    line(sx, sy, dx, dy);
  }

  flash_pole() {
    this.exchanging = (this.direction.direction === this);
    this.flash_ctr++;
    this.flash_ctr %= FLASH_CTR;
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
  background('beige');
  [src, aux, dst].forEach(function(t) { 
    t.draw(); 
    t.flash_pole();
  })
}
