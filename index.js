var sslexp = require("check-ssl-expiration");
// var jsonfile = require("jsonfile");
// var fs = require("fs-extra");
var lbl = require("line-by-line");
var lr = new lbl("hosts.txt");
// var checked = [];

lr.on('error', function(err){
 console.log(err);
});

lr.on('line', function(line){
 var host = line;
 checkExpiration(host, 'days', 5);
});

lr.on('end', function(){
 console.log('EOF');
});

function checkExpiration(domain, unit, warning) {
 // var fn = "data/"+ domain +".json";
 sslexp(domain, unit, function(err, remaining){
  if(remaining < warning) {
   console.log(domain +" has "+ remaining +" " + unit);
  }
  temp = {};
  temp.hostname = domain;
  temp.days_remaining = remaining;

  console.log(temp);
  // return temp;
 });
}
