//--------BASIC CLASSES----------
class MovingObject {
    constructor(texture, x, y, radius) {
        this.texture = texture;
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.animation_frame = 0;  // Animation frame
    }

    move() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }

    changeDirection() {}

    draw() {
        if (this.x > 0 && this.y > 0 && this.x < fieldWidth && this.y < fieldHeight) {
            ctx.drawImage(
                this.texture,
                ANIMATED_IMAGE_WIDTH * this.animation_frame,
                0,
                ANIMATED_IMAGE_WIDTH,
                ANIMATED_IMAGE_HEIGHT,
                this.x - this.radius,
                this.y - this.radius,
                2 * this.radius,
                2 * this.radius)
//            this.animation_frame = (this.animation_frame + 1) % N_ANIMATION_FRAMES;
        }
    }
}
class Antibody {
    constructor(x, y, color){
        this.x = x;
        this.y = y;
        this.color = color;
        this.age = 0;
        this.longevity = ANTIBODY_LONGEVITY;
        this.attached = null;
    }
    
    draw(){
        ctx.beginPath();
        ctx.strokeStyle = bacteriaColors[this.color]["colorCode"];
        ctx.moveTo(this.x, this.y-5);
        ctx.lineTo(this.x, this.y);
        ctx.lineTo(this.x+2, this.y+2);
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x-2, this.y+2);
        ctx.stroke();
    }
    
    move(){
        if (this.attached == null){
            this.age++;
            this.x += randomUniform(-2, 2);
            this.x = clip(this.x, playableFieldX, playableFieldX+playableFieldWidth);
            this.y += randomUniform(-2, 2);
            this.y = clip(this.y, playableFieldY, playableFieldY+playableFieldHeight);
            bacteria.forEach((bacterium) =>{
                if (bacterium.color === this.color && doCirclesIntersect(bacterium.x, bacterium.y, bacterium.radius, this.x, this.y, 5)){
                    this.attached = bacterium;
                    this.attached.baseSpeed *=ANTIBODY_SLOWING_COEFFICIENT;
                } 
        });
        } else {
            this.x = this.attached.x + randomUniform(-this.attached.radius, this.attached.radius);
            this.y = Math.sqrt(Math.pow(this.attached.radius, 2) - Math.pow(this.x, 2))*randomChoice([1, -1]);
        }
    }
    
}
class ImmuneCell extends MovingObject {
    constructor(texture, x, y, radius, baseSpeed, damage, longevity=BASE_IMMUNITY_CELL_LONGEVITY) {
        super(texture, x, y, radius);
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.target = undefined;
        this.realBaseSpeed = baseSpeed;
        this.realDamage = damage;
        this.baseSpeed = this.realBaseSpeed*BASE_GAME_SPEED;
        this.damage = this.realDamage*BASE_GAME_SPEED;
        this.age = 0;
        this.longevity = longevity;
        this.movingout = true;
//        this.iteration = 0;
    }
    
    isIntersected(x, y) {
        return Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2) < Math.pow(this.radius, 2);
    }
    
    changeDirection(targetsList, nCandidates=randomTargetNumber) {
        this.baseSpeed = this.realBaseSpeed*BASE_GAME_SPEED;
        this.damage = this.realDamage*BASE_GAME_SPEED;
        if (this.y < playableFieldY + this.radius && this.x < spleen.x) {
            // Get away from shop
            this.xSpeed = randomUniform(-0.5, 0.5);
            this.ySpeed = this.baseSpeed * 3;
        } else {
            if (targetsList.length > 0) {
                // Move to the random bacterium
                if (this.target == null || this.target.health <= 0 || this.target.x > playableFieldX+playableFieldWidth)  
                {
                    this.target = findTarget(this.x, this.y, targetsList, Math.min(nCandidates, targetsList.length));
                }
                
                if (this.target != null) {
                    var x_sign = (this.target.x - this.x)/Math.abs(this.target.x - this.x);
                    var y_sign = (this.target.y - this.y)/Math.abs(this.target.y - this.y);
                    var ratio = (this.target.y - this.y)/(this.target.x - this.x);
                    
                    // Real calculation: speed is equal to base speed, direction is 'to the closest bacterium'
                    this.xSpeed = x_sign * this.baseSpeed / Math.sqrt(ratio*ratio + 1);                
                    this.ySpeed = y_sign * Math.abs(ratio * this.xSpeed);   
                }
                    
            }
            else {
                this.target = null;
                this.xSpeed = 0;
                this.ySpeed = 0;
            }
            this.xSpeed += randomUniform(-this.baseSpeed * 2, this.baseSpeed * 2);
            this.ySpeed += randomUniform(-this.baseSpeed * 2, this.baseSpeed * 2);
        }
    }

    move() {
        if (this.y > playableFieldY + this.radius){
            this.movingout = false;
        }
        if (garbagePiles.some((pile) => doCirclesIntersect(this.x, this.y, this.radius, pile.x, pile.y, pile.radius))){
            this.x += this.xSpeed*garbagePileSlowingCoefficient;
            this.y += this.ySpeed*garbagePileSlowingCoefficient;
            
        }
        else{
            super.move();
        }
        if (!this.movingout){
            this.x = clip(this.x, playableFieldX+this.radius, playableFieldX + playableFieldWidth - this.radius);
            this.y = clip(this.y, playableFieldY+this.radius, playableFieldY + playableFieldHeight - this.radius);
            
        }
        
    }
    live(){
        if (this.y > playableFieldY){
            this.age += 1*BASE_GAME_SPEED;
        }
    }
}
class Neutrophil extends ImmuneCell {
    constructor(x, y) {
        super(NEUTROPHILS_IMAGE, x, y, 20, NEUTROPHIL_SPEED, NEUTROPHIL_DAMAGE);
    }

    move() {
        super.move();
        
        bacteria.forEach((bacterium) => {
            if(doCirclesIntersect(this.x, this.y, this.radius, bacterium.x, bacterium.y, bacterium.radius) && bacterium.mode === "enemy") {
                bacterium.health -= this.damage;
            }
        });
    }

    draw() {
        ctx.globalAlpha = 0.8;
        super.draw();
        ctx.globalAlpha = 1;
    }
}
class Macrophage extends ImmuneCell {
    constructor(x, y) {
        super(MACROPHAGES_IMAGE, x, y, 40, MACROPHAGE_SPEED, MACROPHAGE_DAMAGE);
        this.texture = MACROPHAGES_IMAGE;
    }
    move(){
        super.move();
        garbagePiles.forEach((pile) => {
            if(doCirclesIntersect(this.x, this.y, this.radius, pile.x, pile.y, pile.radius)) {
                pile.health -= this.damage;
            }
        });
    }
}
class Eosinophile extends ImmuneCell {
    constructor(x, y) {
        super(EOSINOPHILES_IMAGE, x, y, 10, EOSINOPHILE_SPEED, EOSINOPHILES_DAMAGE);
    } 
    move() {
        super.move();
        helmintes.forEach((helmint) => {
            if(
                helmint.parts.some(
                (part) => {return doCirclesIntersect(this.x, this.y, this.radius, part.x, part.y, part.radius)})
                )
                {helmint.health -= this.damage;}
        });
    }
    changeDirection(targetsList, nCandidates=randomTargetNumber){
        if (this.y < playableFieldY) {
            // Get away from shop
            this.xSpeed = randomUniform(-0.5, 0.5);
            this.ySpeed = this.baseSpeed * 3;
        } else {
            if (targetsList.length > 0) {

                
                // Move to the random target
                if (this.target == null || this.target.helmint.health <= 0 || this.target.x > playableFieldX+playableFieldWidth || !this.target.helmint.parts.includes(this.target))  
                {
                    if (this.target != null && this.target.helmint.health > 0 && this.target.x < playableFieldX+playableFieldWidth && helmintes.includes(this.target.helmint)){
                            targetsList = this.target.helmint.parts;
                        } else {
                            targetsList = randomChoice(targetsList).parts;
                        }
                    
                    this.target = findTarget(this.x, this.y, 
                                             targetsList, 
                                             targetsList.length);
                }
                if (this.target != null) {
                    // helper variables
                    var x_sign = (this.target.x - this.x)/Math.abs(this.target.x - this.x);
                    var y_sign = (this.target.y - this.y)/Math.abs(this.target.y - this.y);
                    var ratio = (this.target.y - this.y)/(this.target.x - this.x);
                    
                    // Real calculation: speed is equal to base speed, direction is 'to the closest bacterium'
                    this.xSpeed = x_sign * this.baseSpeed / Math.sqrt(ratio*ratio + 1);                
                    this.ySpeed = y_sign * Math.abs(ratio * this.xSpeed);   
                }

                    
            }
            else {
                this.target = null;
                this.xSpeed = 0;
                this.ySpeed = 0;
            }

            this.xSpeed += randomUniform(-this.baseSpeed * 2, this.baseSpeed * 2);
            this.ySpeed += randomUniform(-this.baseSpeed * 2, this.baseSpeed * 2);
        }
    }
}
class NaturalKiller extends ImmuneCell {
    constructor(x, y) {
        super(NK_IMAGE, x, y, 25, NK_SPEED, NK_DAMAGE);
//        this.iteration = 0;
    }

    move() {
        super.move();
        if(this.target != null && doCirclesIntersect(this.x, this.y, this.radius, this.target.x, this.target.y, this.target.size / 2)) {
            if (this.target.virus != null || this.target.vaccine != null || this.target.nMutations >= cancerMutationsThreshold){
                this.target.health -= this.damage;    
            } else{
                this.target = null;
            }
            
        }
    }
    
    changeDirection(targetsList){
        super.changeDirection(targetsList, 10);
    }
}
class BLymphocyte extends ImmuneCell {
    constructor(x, y, mode="naive", color="#FFFFFF") {
        if (color == "#FFFFFF"){
        super(LYMPHOCYTES_DEFAULT_IMAGE, x, y, 20, BLYMPHOCYTE_SPEED, BLYMPHOCYTE_DAMAGE);
        } else {
        super(bacteriaColors[color]["lymphocyteImage"], x, y, 20, BLYMPHOCYTE_SPEED, BLYMPHOCYTE_DAMAGE);
            
        }
        this.mode = mode;
        this.shootingRadius = 40;
//        this.iteration = 0;
        this.color = color;
        this.label = new Label(this);
        this.killed = false;
        this.upgradePrice = PLASMATIC_CELL_UPGRADE_PRICE;
        this.counter = 0;
    }

    upgrade(){
        this.label.active = false;
        if (this.mode === "mature"){
            this.mode = "plasmatic";
            this.texture = bacteriaColors[this.color]["plasmaticImage"];
            this.damage = 0;
            this.upgradePrice = MEMORY_CELL_UPGRADE_PRICE;
            this.target = null;
            historyObject.cellsBought["Plasmatic"] += 1;
        } else if (this.mode === "plasmatic"){
            this.mode = "memory";
            this.texture = bacteriaColors[this.color]["memoryImage"];
            this.longevity = BASE_IMMUNITY_CELL_LONGEVITY*10;
            this.baseSpeed = 0;
            this.upgradePrice = 0;
            B_LYMPHOCYTE_SHOP.pockets.push(
                new Pocket(
                    B_LYMPHOCYTE_SHOP,
                    B_LYMPHOCYTE_SHOP.x + B_LYMPHOCYTE_SHOP.width*0.0486 + BACTERIA_COLORS.indexOf(this.color)*B_LYMPHOCYTE_SHOP.width*0.9028/BACTERIA_COLORS.length,
                    shopY + B_LYMPHOCYTE_SHOP.height - B_LYMPHOCYTE_SHOP.height*0.02,
                    this.color)) 
            this.killed = false;
            historyObject.cellsBought["BMemory"] += 1;
        }
    }
    
    move() {
        if (this.mode != "memory"){
            super.move();
        }
        if (this.mode === "mature"){
            bacteria.forEach((bacterium) => {
                if(doCirclesIntersect(this.x, this.y, this.shootingRadius, bacterium.x, bacterium.y, bacterium.radius) && bacterium.mode === "enemy" && bacterium.color === this.color) {
                    bacterium.health -= this.damage;
                    if (!this.killed && bacterium.health <= 0){
                        this.killed = true;
                    }
                }
            })    
        }
        if (this.mode === "plasmatic"){
            this.y = clip(this.y, playableFieldY+this.radius, playableFieldY+playableFieldHeight-this.radius);
            this.counter += 1*BASE_GAME_SPEED;
            if (this.counter > ANTIBODY_PRODUCTION_FREQUENCY)
            {
                this.counter = 0;
                antibodies.push(new Antibody(this.x, this.y, this.color));
            }
        }
    }

    goToSpleen(){
        this.baseSpeed = this.realBaseSpeed*BASE_GAME_SPEED;
        if (this.y < (shopY + shopHeight) + (playableFieldY-(shopY + shopHeight))/2) {
            // Get away from shop
            this.xSpeed = 0;
            this.ySpeed = this.baseSpeed * 3;}
        else if (this.y >= shopHeight){
            this.xSpeed = 0.5*BASE_GAME_SPEED;
            this.ySpeed = 0;
        } else{
            super.changeDirection()
        }
    }
    
    changeDirection(targetsList, nCandidates=randomTargetNumber){
        if (this.mode === "naive"){
            if (this.x < spleen.x){
                this.goToSpleen();
            } else if (spleen.sections.filter((section)=> section.antigen != null).length > 0){
                super.changeDirection(spleen.sections.filter((section)=> section.antigen != null), nCandidates=spleen.sections.length);
            } else {
                super.changeDirection(spleen.sections, spleen.sections.length);
            }
            if (this.target != null && doCirclesIntersect(this.x, this.y, this.radius, this.target.x, this.target.y, this.target.size/2)){
                if (this.target.antigen != null && doCirclesIntersect(this.target.x, this.target.y, this.target.size/2, this.target.antigen.x, this.target.antigen.y, this.target.antigen.radius) && randomUniform(0, 1) < trainingProbability){
                    this.texture = bacteriaColors[this.target.antigen.color]["lymphocyteImage"];
                    this.color = this.target.antigen.color;
                    this.mode = "mature";
                    this.target = null;
                }
                else{
                    this.target = null;
                }
            }
        } else if (this.mode === "mature") {
            var targets = targetsList.filter((target) => target.color === this.color);
            if (this.movingout)
                {
                    this.xSpeed = 0;
                    this.ySpeed = this.baseSpeed * 3;
                }   
            else {
                super.changeDirection(targets, nCandidates);
            }
        } else if (this.mode === "plasmatic"){
            super.changeDirection(targetsList, 1000);
            if(this.target != null && doCirclesIntersect(this.x, this.y, this.radius, this.target.x, this.target.y, this.target.size / 2)){
                this.target = null;
            }
        }
        
    }
    
    draw() {
        var color;
        var alpha;
        if (this.mode == "naive"){
            color = this.color;
            alpha = 0.2;
        } else if (this.mode == "memory") {
            color = "#2C363E";
            alpha = 0.4;
        } else {
            color = bacteriaColors[this.color]["colorCode"]; 
            alpha = 0.2;   }
        ctx.fillStyle = color;
        
        // Visualize shooting radius
        if (this.x > 0 && this.y > 0 && this.x < fieldWidth && this.y < fieldHeight) {
            ctx.globalAlpha = alpha;
            circle(this.x, this.y, this.shootingRadius, true);
            circle(this.x, this.y, this.shootingRadius, false);
            ctx.globalAlpha = 1;
            super.draw();
        }
    }
}
class TLymphocyte extends ImmuneCell {
    constructor(x, y, mode="killer", color=null, active=false) {
        if (color === null){
            var probs = []
            BACTERIA_COLORS.forEach((color) => {
                probs.push(tissueCells.filter((tissueCell) => tissueCell.vaccine === color).length);
            })
            for (var i = 0; i < probs.length; i++){
                probs[i] += tissueCells.filter((tissueCell) => tissueCell.vaccine == null).length/4;                
            }
            color = randomChoice(BACTERIA_COLORS, probs);
        } 
        super(VIRUSES_CLASSIFICATION[color]["TLymphocyteImage"], x, y, 25, TLYMPHOCYTE_SPEED, TLYMPHOCYTE_DAMAGE);
        this.iteration = 0;
        
        this.color = color;
        this.active = active;
        this.label = new Label(this);
        this.mode = mode;
        this.upgradePrice = MEMORY_CELL_UPGRADE_PRICE;
    }
    
    upgrade(){
        this.label.active = false;
        if (this.mode === "killer"){
            this.mode = "memory";
            this.texture = VIRUSES_CLASSIFICATION[this.color]["MemoryImage"];
            this.longevity = BASE_IMMUNITY_CELL_LONGEVITY*10;
            this.baseSpeed = 0;
            this.upgradePrice = 0;
            
            let pocketX = T_LYMPHOCYTE_SHOP.x + T_LYMPHOCYTE_SHOP.width*0.0486 + BACTERIA_COLORS.indexOf(this.color) * T_LYMPHOCYTE_SHOP.width*0.9028 / BACTERIA_COLORS.length;
            T_LYMPHOCYTE_SHOP.pockets.push(
                new Pocket(T_LYMPHOCYTE_SHOP, 
                           pocketX, 
                           shopY + T_LYMPHOCYTE_SHOP.height - T_LYMPHOCYTE_SHOP.height*0.02,
                           this.color));
            this.active = false;
            historyObject.cellsBought["TMemory"] += 1;
            
        }

    }
    
    move() {
        if (this.mode != "memory"){
            super.move();
            if(this.target != null && doCirclesIntersect(this.x, this.y, this.radius, this.target.x, this.target.y, this.target.size / 2)) {
            if ((this.target.virus !=  null && this.target.virus.color === this.color) || (this.target.vaccine === this.color)){
                this.target.health -= this.damage;  
                if (!this.active){
                    this.active = true;
                    for (var i = 0; i < TlymphocyteReproductionNumber; i++){
                        immunityCells.push(new TLymphocyte(this.x, this.y, "killer", this.color, true));
                    }
                }
            } else{
                this.target = null;
            }
            
        }
        }
    }
    
    changeDirection(targetsList){
        super.changeDirection(targetsList, 10);
    }
    
    draw(){
        ctx.fillStyle = VIRUSES_CLASSIFICATION[this.color]["colorCode"];
//        ctx.globalAlpha = 0.4;
//        circle(this.x, this.y, 30, true);
//        circle(this.x, this.y, 30, false);
//        ctx.globalAlpha = 1;
        super.draw();
    }
}

class THelper extends ImmuneCell {
    constructor(x, y) {
        super(T_HELPER_IMAGE, x, y, 20, TLYMPHOCYTE_SPEED, 0);

        this.place = this.choosePlace();
        this.placeReached = false;
        this.cooldown = HELPER_BUYING_COOLDOWN;
        this.timeFromTheLastPurchase = 0;
        this.longevity = BASE_IMMUNITY_CELL_LONGEVITY*3.1;
    }

    choosePlace() {
        const ROWS = 4;
        const COLS = 12;

        const gridCellWidth = Math.floor(playableFieldWidth / COLS);
        const gridCellHeight = Math.floor(playableFieldHeight / ROWS);
        
        const col = Math.floor(randomUniform(0, COLS));
        const row = Math.floor(randomUniform(0, ROWS));

        var place = [playableFieldX + col * gridCellWidth + randomUniform(-10, 10), 
                     playableFieldY + row * gridCellHeight + randomUniform(-10, 10)];
        place[0] = clip(place[0], playableFieldX + this.radius, playableFieldX+playableFieldWidth - this.radius);
        place[1] = clip(place[1], playableFieldY + this.radius, playableFieldY + playableFieldHeight - this.radius);

        return place;
    }

    changeDirection(){
        if (this.y < shopHeight) {
            // Get away from shop
            this.xSpeed = randomUniform(-0.5, 0.5);
            this.ySpeed = this.baseSpeed * 3;
        }
        else {
            
            if(this.placeReached) {
                // Mess around the place
                this.xSpeed = randomUniform(-0.1, 0.1);
                this.ySpeed = randomUniform(-0.1, 0.1);
            }
            else {
                // Move closer to place
                [this.xSpeed, this.ySpeed] = moveTo(this.x, this.y, this.place[0], this.place[1], this.baseSpeed);

                this.xSpeed += randomUniform(-0.1, 0.1);
                this.ySpeed += randomUniform(-0.1, 0.1);
            }
            
        }
    }

    move() {
        if(doCirclesIntersect(this.x, this.y, this.radius, this.place[0], this.place[1], 10)) {
            this.placeReached = true;
        }

        super.move();
    }

    act() {
        // Evaluate, which type of pathogen is threatening the body
        var infectedCells = tissueCells.filter((cell) => {return(cell.virus != null)});
        var infectionRatio = infectedCells.length / tissueCells.length;
        var shopToBuy;

        if(infectionRatio > 0.1) {
            shopToBuy = T_LYMPHOCYTE_SHOP;
            T_LYMPHOCYTE_SHOP
        }
        else {
            shopToBuy = B_LYMPHOCYTE_SHOP;
        }

        shopToBuy.discount += 1;

        // Buy the cell once in a cooldown
        if(this.timeFromTheLastPurchase < this.cooldown) {
            this.timeFromTheLastPurchase += 1*BASE_GAME_SPEED;
        }
        else {
            this.timeFromTheLastPurchase = 0;
    
            // Buy the corresponding lymphocyte
            money += shopToBuy.price;
            shopToBuy.buy();
        }
    }

    draw() {
        super.draw();

        // Draw the progress of buying a lymphocyte
        if(this.placeReached) {
            ctx.lineWidth = 2;
            ctx.strokeStyle = "black";
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius + 5, 0, Math.PI*2 * this.timeFromTheLastPurchase / this.cooldown);
            ctx.stroke();
        }
    }
}