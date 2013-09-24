module.exports = function(position, velocity, ground, dt) {

	var dot = require("./dot.js")
	var reflect = require("./reflect.js")
	
	var nextPosition = position
	var nextVelocity = velocity
  
	// Compute next state here
	var i = 0
	while( i < position.length){
	
		
		nextPosition[i] = [position[i][0] + dt * velocity[i][0] , position[i][1] + dt * velocity[i][1]]
		
		if ( nextPosition[i][0] < -1 ){
			var t = ( -1 - position[i][0])/velocity[i][0]
			nextPosition[i][0] = -1
			nextVelocity[i][0] = velocity[i][0] * -1
			nextPosition[i][0] = nextPosition[i][0] + (dt-t) * nextVelocity[i][0]
		}
		else if ( nextPosition[i][0] > 1 ){
			var t = ( 1 - position[i][0])/velocity[i][0]
			nextPosition[i][0] = 1
			nextVelocity[i][0] = velocity[i][0] * -1
			nextPosition[i][0] = nextPosition[i][0] + (dt-t) * nextVelocity[i][0]
		}
		else if( nextPosition[i][1] > 1 ){
			var t = ( 1 - position[i][1])/velocity[i][1]
			nextPosition[i][1] = 1
			nextVelocity[i][1] = velocity[i][1] * -1
			nextPosition[i][1] = nextPosition[i][1] + (dt-t) * nextVelocity[i][1]
		}
		else if( ground[0] * nextPosition[i][0] + ground[1] * nextPosition[i][1] < 0 ){
			
			var t = (-(ground[0]/ground[1])*position[i][0] - position[i][1]) / ( velocity[i][1] + (ground[0]/ground[1])*velocity[i][0])
			nextPosition[i] = [ position[i][0] + velocity[i][0] * t , position[i][1] + velocity[i][1] * t ]
			nextVelocity[i] = reflect(velocity[i],ground)
			nextPosition[i] = [nextPosition[i][0] + (dt-t) * nextVelocity[i][0] , nextPosition[i][1] + (dt-t) * nextVelocity[i][1]]
			
		}
		else {
			nextVelocity[i] = velocity[i]
		}
		
		
		
		
		
		i++
	}
  
  return {
    position: nextPosition,
    velocity: nextVelocity
  }
}