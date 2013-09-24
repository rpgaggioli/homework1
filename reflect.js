module.exports = function(v,n){
	var dot = require("./dot.js")
	
	var temp1 =  dot(n,v)/dot(n,n)
	var temp = [ 2*n[0]*temp1 , 2*n[1]*temp1]
	var vreflect = [v[0] - temp[0], v[1] - temp[1]]
	
	return vreflect 
  }