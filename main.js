class ReflectTimer{
      constructor(){
            this.state = "stop";
            this.value = 0;
            this.timeoutId;
            this.stopGame = false;
            this.timer = ms => new Promise(res => setTimeout(res, ms));
            this.reflexes = false;
            this.startTime;
            this.startCounter = true;
            this.scoresTable = [];
            this.clickedByUser = false;
            this.bestTimeGlobal = Infinity;
      }

      userReaction(){
            if (this.startCounting == true){
                  this.startCounting = false;
                  this.reactionTime = Date.now() - this.startTime;
                  this.updateScores(this.reactionTime);
                  this.clickedByUser = true;
            }
      }
      updateScores(nextReactionTime){
            console.log(nextReactionTime);
            this.scoresTable.push(nextReactionTime);
      }
      average(array) {
            if (array.length != 0){
                  var sum = 0;
                  var counter = 0;
      
                  array.forEach(function(entry) {
                        sum = sum + entry;
                        counter++;
                      });
      
                  return sum / counter;
            }
            else{
                  return null;
            }
      }
      publishScores(){
            console.log('My Times');
            var bestReactionTime = Math.min.apply(null,this.scoresTable);
            var worstReactionTime = Math.max.apply(null,this.scoresTable);
            var averageReactionTime = this.average(this.scoresTable);
            document.getElementById("t1").innerHTML = bestReactionTime +' ms';
            document.getElementById("t2").innerHTML = worstReactionTime +' ms';
            document.getElementById("t3").innerHTML = Math.round(averageReactionTime) +' ms';
            if (bestReactionTime < this.bestTimeGlobal){
                  this.bestTimeGlobal = bestReactionTime;
            }
            document.getElementById("t4").innerHTML = this.bestTimeGlobal;
      }

      updateColor(color){
            document.getElementById("reactionButton").style.background = color;
      }

      generatetRandomColor() {
            var chars = '0123456789ABCDEF';
            var randomColor = '#';
            for (var i = 0; i < 6; i++) {
              randomColor += chars[Math.floor(Math.random() * 16)];
            }
            return randomColor;
          }
      async changeColor () { 
      for (var i = 0; i < 5; i++) {
            if (this.stopGame == false){
            let randomInterval = Math.random();
            this.clickedByUser = false;
            this.updateColor(this.generatetRandomColor())
            this.startCounting = true;
            this.startTime = Date.now();
            await this.timer(randomInterval * 10000); 
            }
            else{
                  break;
            }
            if (!this.clickedByUser){
            this.startCounting = false;
            this.updateScores(Date.now() - this.startTime);
            }
      }
      if (this.stopGame == false){
            this.publishScores();
      }
      }
      start(){
            if(this.state == "stop"){
                  this.state = "running"
                  this.stopGame = false;  
                  this.changeColor();
                  document.getElementById("t1").innerHTML = '';
                  document.getElementById("t2").innerHTML = '';
                  document.getElementById("t3").innerHTML = '';
                  document.getElementById("t4").innerHTML = '';

            }

      }
      stop(){
            if(this.state == "running"){
                  this.state = "stop"
                  this.stopGame = true;
                  document.getElementById("reactionButton").style.background = '#ffffff';
                  this.scoresTable = [];
            }
      }
}
reflectTimer = new ReflectTimer();
