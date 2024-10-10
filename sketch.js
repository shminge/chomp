let width, height, sideLength
let chocArray = []

function setup() {
	let s = getURLParams()
	width = s.width ? size.width : 5
	height = s.height ? size.height : 4
	sideLength = 590/max(width, height)
	for (let i = 0; i < height; i++){
		chocArray.push([])
		for (let j = 0; j < width; j++){
			chocArray[i].push(1)
		}
	}
	createCanvas(600, 600);
	background(255);
}

function draw() {
	background(255)
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++){
			if (chocArray[y][x]) {
				drawSquare((x+0.5)*sideLength + 5, (y+0.5)*sideLength + 5, x+y==0)
			}
		}
	}
	let [px, py] = convertToGrid(mouseX, mouseY)
	drawGhost((px+0.5)*sideLength + 5, (py+0.5)*sideLength + 5)
}

function drawSquare(x,y, poison = false){
	let side = sideLength
	push()
	strokeWeight(3)
	if (poison){
		stroke('darkgreen')
		fill('green')
	} else {
		stroke('rgb(87,31,0)')
		fill('rgb(165,77,42)')
	}
	rectMode(CENTER)
	rect(x,y,side,side)
	rect(x,y, side/1.5, side/1.5)
	
	pop()
}

function drawGhost(x,y) {
	push()
	rectMode(CENTER)
	noStroke()
	fill(240,30)
	rect(x, y, sideLength, sideLength)
	pop()
}

function convertToGrid(x, y){
	let gx = floor(x/sideLength)
	let gy = floor(y/sideLength)
	return [gx, gy]
}

function mouseClicked(){
	let [px, py] = convertToGrid(mouseX, mouseY)
	if (chocArray[py] && chocArray[py][px]){
		bite(px,py)
	}
}

function bite(x,y){
	for (let i = x; i < width; i++) {
		for (let j = y; j < height; j++){
			chocArray[j][i] = 0
		}
	}
}
