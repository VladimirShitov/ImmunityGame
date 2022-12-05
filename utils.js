//------------RANDOM-------------
function randomInteger(low, high){
    return Math.round(randomUniform(low, high));
}
function randomUniform(low, high) {
    var u = Math.random() * (high - low);
    return u + low;
}
function randomChoice(array, inputProbs = null){
    
    // If "inputProbs" is not supplied, choose with uniform probabilities
    if (inputProbs === null){
        inputProbs = Array(array.length).fill(1);
    } 
    // Normalize probabilities
    var sum = 0;
    inputProbs.forEach((prob) => {sum += prob;})
    var probs = inputProbs.slice(0, inputProbs.length);
    for (var i = 0; i < inputProbs.length; i++){
        probs[i] = inputProbs[i]/sum;
    }
    
    var num = Math.random(),
        s = 0,
        lastIndex = probs.length - 1;

    for (var i = 0; i < lastIndex; i++) {
        s += probs[i];
        if (num < s) {
            return array[i];
        }
    }
    return array[lastIndex];
}

//------------DRAWING-------------
function circle(x, y, radius, fillCircle){
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2);
    if (fillCircle){
        ctx.fill();
    } else {
        ctx.stroke();
    }
}
function square(x, y, size){
    ctx.style = "black";
    ctx.fillRect(x, y, size, size);
    ctx.strokeRect(x, y, size, size);
}
function star(cx, cy, nSpikes, outerRadius, innerRadius, color){
      var rot=Math.PI/2*3;
      var x=cx;
      var y=cy;
      var step=Math.PI/nSpikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy-outerRadius)
      for(i=0;i<nSpikes;i++){
        x=cx+Math.cos(rot)*outerRadius;
        y=cy+Math.sin(rot)*outerRadius;
        ctx.lineTo(x,y)
        rot+=step

        x=cx+Math.cos(rot)*innerRadius;
        y=cy+Math.sin(rot)*innerRadius;
        ctx.lineTo(x,y)
        rot+=step
      }
      ctx.lineTo(cx,cy-outerRadius);
      ctx.closePath();
      ctx.lineWidth=1;
      ctx.strokeStyle='black';
      ctx.stroke();
      ctx.fillStyle=color;
      ctx.fill();
    }
function roundRect(ctx, x, y, width, height, leftRadius, rightRadius, fill = false, stroke = true, bottomLeftRadius=null) {
    if (bottomLeftRadius == null){
          bottomLeftRadius = leftRadius;
      }
      if (typeof leftRadius === 'number') {
        radius = {tl: leftRadius, tr: rightRadius, br: rightRadius, bl: bottomLeftRadius};
      } else {
        radius = {...{tl: 0, tr: 0, br: 0, bl: 0}, ...radius};
      }
      ctx.beginPath();
      ctx.moveTo(x + radius.tl, y);
      ctx.lineTo(x + width - radius.tr, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
      ctx.lineTo(x + width, y + height - radius.br);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
      ctx.lineTo(x + radius.bl, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
      ctx.lineTo(x, y + radius.tl);
      ctx.quadraticCurveTo(x, y, x + radius.tl, y);
      ctx.closePath();
      if (fill) {
        ctx.fill();
      }
      if (stroke) {
        ctx.stroke();
      }
    }

function drawBlackScreen(alpha, highlight_x, highlight_y, highlight_width, highlight_height, radius) {
    ctx.globalAlpha = alpha;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, fieldWidth, fieldHeight);

    ctx.fillStyle = "white";
    roundRect(ctx, highlight_x, highlight_y, highlight_width, highlight_height,
         leftRadius=radius, rightRadius=radius, fill=true);

    ctx.globalAlpha = 1;
}

//--------OTHER SUPPORT----------
function clip(x, min, max) {
    return Math.min(Math.max(min, x), max);
}
function moveTo(xFrom, yFrom, xTo, yTo, speed){
    if (xTo === xFrom && yTo === yFrom){
        return [0, 0];
    } 
    var x_sign = (xTo - xFrom)/Math.abs(xTo - xFrom);
    var y_sign = (yTo - yFrom)/Math.abs(yTo - yFrom);
    var ratio = (yTo - yFrom)/(xTo - xFrom);

    // Real calculation: speed is equal to base speed, direction is 'to the xTo yTo'
    var xSpeed;
    var ySpeed;
    if (Math.abs(xTo - xFrom) < 1){xSpeed = 0;} else {xSpeed = x_sign * speed / Math.sqrt(ratio*ratio + 1)}
    if (Math.abs(yTo - yFrom) < 1){ySpeed = 0;} else {ySpeed = y_sign * Math.abs(ratio * speed)} 
    return [xSpeed, ySpeed];
}

//-------SUPPORT FOR CELLS-------
function findTarget(x, y, targetList, n) {
    if (targetList.length > 0 && !(targetList[0] instanceof TissueCell)){
        var distances = [];
        targetList.forEach((target) => {
            distances.push(1/Math.abs(Math.pow(x - target.x, 2) + Math.pow(y - target.y, 2)));
        })
        return randomChoice(targetList, distances); 
    } else if (targetList.length > 0 && targetList[0] instanceof TissueCell){
        var number = Math.floor(randomUniform(0, n));
        var res = targetList.sort(function(a, b){
            var da = Math.abs(Math.pow(x - a.x, 2) + Math.pow(y - a.y, 2));
            var db = Math.abs(Math.pow(x - b.x, 2) + Math.pow(y - b.y, 2));
            return da-db;
        })[number]
        return res;            
    }
    else {return -1;}
}
function findRandomTarget(targetsList) {
    if (targetsList.length > 0){
        var idx = Math.round(randomUniform(0, targetsList.length));
        return targetsList[idx];
    }
    else {
        return -1;
    }
}
function doCirclesIntersect(x1, y1, r1, x2, y2, r2) {
    centersDistance = Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
    return (centersDistance <= Math.pow(r1 + r2, 2));
}
function tissueCellsDistance(c1, c2){
    return (Math.abs(c1.x - c2.x) + Math.abs(c1.y-c2.y))/(tissueCellSize + spaceBetweenTissueCellsHorizontal);
}


