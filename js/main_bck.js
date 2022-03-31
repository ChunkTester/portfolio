
function ColorSelect() {

  this.red = 0;
  this.green = 0;
  this.blue = 0;

  this.h = 0;
  this.s = 0;
  this.b = 0;

  this.getAbs = function(a) {
    return (a <= 0.0) ? 0.0 - a : a;
  }

  this.getHSB = function() {
    let hsb = [];

    // Convert RGB to procentage
    this.r = this.red / 255;
    this.g = this.green / 255;
    this.b = this.blue / 255;

    // Red bigger as Green ( CMAX )
    let cmax = (this.r > this.g) ? this.r : this.g;

    // Blue bigger as CMAX
    if (this.b > cmax) cmax = this.b;

    // Red bigger as Green ( CMIN )
    let cmin = (this.r > this.g) ? this.g : this.r;

    // Blue smaller as CMIN
    cmin = (this.b < cmin) ? this.b : cmin;

    let delta = cmax - cmin;

    this.h = 0;
    this.b = cmax;
    this.s = cmax == 0 ? 0 : (cmax - cmin) / cmax;

    if (delta != 0) {
      if (this.r == cmax) {
        this.h = (this.g - this.b) / delta;
      } else {
        if (this.g == cmax) {
          this.h = 2 + (this.b - this.r) / delta;
        } else {
          this.hue = 4 + (this.r - this.g) / delta;
        }
      }

      this.h *= 60;

      if (this.h < 0) this.h += 360;

    }

    hsb[0] = this.h;
    hsb[1] = this.s * 100;
    hsb[2] = this.b * 100;

    return hsb;
  }
}

/******************************************************/
/******************************************************/
/******************************************************/
/******************************************************/

function Cell(i, j, w, h) {
  this.i = i;
  this.j = j;

  this.w = w;
  this.h = h;

  this.x = i * w;
  this.y = j * h;

  // test blue
  this.hue = 250;
  this.sat = 100;
  this.bri = 50;

  // test red
  this.filling = color(255, 0, 0);
  this.alpha = 255;

  /***********************************************************/

  this.update = function(f) {
    this.filling = f;
  }

  /***********************************************************/

  this.show = function() {
    fill(this.filling);

    rect(this.x, this.y, this.w, this.h);
  }
}


/******************************************************/
/******************************************************/
/******************************************************/
/******************************************************/

function runLoop() {
	loop();
}

function stopLoop() {
	noLoop();
	//remove();
}

/******************************************************/
/******************************************************/
/******************************************************/
/******************************************************/

let grid, cols, rows, w, h, r, g, b, hue, sat, bri;
let mapping;


let briUp = true;
let hueUp = true;
let satUp = true;

let easing = 0.05;
let newSat = 0;

let a = 0;
let t = 0;
let inc;
let adder;
let proportion;
let lineThickness;
let newRows;

let hsb = [];
let colors;
let shift = 0;

/******************************************************/

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

/******************************************************/

function flow() {

  ///////////////////////////// Hue Flow
  if (hueUp)
  {
    // up
    if (hue < 260)
    {
      hue = hue + 2;
    }
    else
    {
      hueUp = false;
    }
  }
  else
  {
    // down
    if (hue > 30)
    {
      hue = hue - 1;
    }
    else
    {
      hueUp = true;
    }
  }

  ///////////////////////////// Sat Flow
  if (satUp)
  {
    // up
    if (sat <= 1)
    {
      sat = sat + 0.01;
    }
    else
    {
      satUp = false;
    }
  }
  else
  {
    // down
    if (sat >= 0.8)
    {
      sat = sat - 0.01;
    }
    else
    {
      satUp = true;
    }
  }

  let targetX = sat;
  let dx = targetX - newSat;
  newSat += dx * easing;

  ///////////////////////////// Bri Flow
  if (briUp)
  {
    // up
    if (bri < 100)
    {
      bri = bri + 1;
    }
    else
    {
      briUp = false;
    }
  }
  else
  {
    // down
    if (bri > 80)
    {
      bri = bri - 1;
    }
    else
    {
      briUp = true;
    }
  }

  //console.log(newSat);

  hsb[0] = map(mouseX, 0, width, 0, 360);	//hue
  hsb[1] = map(mouseY, 0, height, 20, 100);	//sat
  hsb[2] = map((10 * sin(millis() / 500)), 0, height, 50, 100);	//bri

  // change grid by hsb color
  //pattern(a, b, hsb);
  
  /*
  this.size = 20 + 14 * sin(millis() / 500);
    rect(this.positionX - this.size / 2, this.positionY - this.size / 2, this.size, this.size, this.curvature, this.curvature, this.curvature, this.curvature);*/

/*
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
			if (i % 3)
			{
				grid[i][j].filling = color(hsb);
			}
    }
  }*/

  // count cols
  if (a >= cols - 1) {
    a = 0;
    shift++;
		// count rows
		if (b >= rows - 1) {
			b = 0;
		} else {
			if (shift > 1) {
				b++;
			}
		}
  } else {
		a++;
  }
  
  if (a % shift == 0) {
		grid[a][b].filling = color(hsb);
	}
  if (b % shift - 1 == 2) {
		grid[a][b].filling = color(hsb);
	}
	
	
	if (shift > 8) {
		shift = 0;
	}
  
}

function pattern(a, b, h) {
  adder = 8;
  proportion = a / adder;
  newRows = 4 - b;

  //console.log(proportion + "  " + newRows);

  console.log(newRows + b);

  lineThickness = 2;
  for (let p = 0; p < proportion; p++) {
    for (let t = 0; t < lineThickness; t++) {

      if( grid[p][t] !== undefined )
      {
          //console.error("FILLING");
          grid[p][t].filling = color(h);
      }
    }
    newRows += adder;
  }
  proportion = 0;
}

/******************************************************/

function init() {
  cols = 0;
  rows = 0;

  w = 10;
  h = 10;

  r = 100;
  g = 100;
  b = 100;

  hue = 0;
  sat = 0;
  bri = 0;

  a = 0;
  b = 0;

  inc = TWO_PI / width;

  value = 0;

  colors = new ColorSelect();
  colors.red = 100;
  hsb = colors.getHSB();

  // console.log( hsb );
}

/******************************************************/

function setup() {
	noLoop();
  createCanvas(200, 200);
  colorMode(HSB, 360, 100, 100);

  frameRate(60);
  noStroke();

  init();

  cols = floor(width / w);
  rows = floor(height / h);

  //console.log("Columns : " + cols + " | Rows : " + rows);
  grid = make2DArray(cols, rows);

  console.log(grid);

  // Init
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, w, h);
      grid[i][j].filling = color(hsb);
    }
  }
}

function draw() {

  background(10, 100, 100);

  flow();

  // Update
  /*
  for ( let i = 0; i < cols; i++ )
  {
      for ( let j = 0; j < rows; j++ )
      {
          value = value + 1;
          mapping = map( value, 0, width, 0, 360 );

          let ns = map( sin(a) * 100 , 0, width, 0, 100 );

          grid[ i ][ j ].hue = 240;
          grid[ i ][ j ].sat = value;
          grid[ i ][ j ].bri = 100;

          a = a + inc;
      }
  }*/

  // Show
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }

}
