var test; // testing output
for (var i=0; i<9; i++) {
    var row = document.querySelector("table").insertRow(-1);
    for (var j=0; j<6; j++) {
        var letter = String.fromCharCode("A".charCodeAt(0)+j-1);
        row.insertCell(-1).innerHTML = i&&j ? "<input id='"+ letter+i + "'/>" : i||letter;
      test = letter + i + " ";
      document.getElementById("demo").innerHTML += test; // testing output
    }
  document.getElementById("demo").innerHTML += "</br>"; // testing output
}

var DATA={}, INPUTS=[].slice.call(document.querySelectorAll("input"));

INPUTS.forEach(function(elm) {
    elm.onfocus = function(e) {
        e.target.value = localStorage[e.target.id] || "";
      //document.getElementById("demo").innerHTML += "foucs " + e.target.id + " "; // testing
    };
    elm.onblur = function(e) {
        localStorage[e.target.id] = e.target.value;
        computeAll();
      //document.getElementById("demo").innerHTML += "blur " + e.target.id + " "; // testing
    };
    var getter = function() {
        var value = localStorage[elm.id] || "";
        if (value.charAt(0) == "=") { // this change the equation into jawapan equation
          
          if (value.substring(1,5) == "sum("){
            var a1 = value.substring(5,6);
            var a2 = value.substring(6,7);
            var b1 = value.substring(8,9);
            var b2 = value.substring(9,10);
            
            a1 = a1.toUpperCase();
            b1 = b1.toUpperCase();
            
            var sum = 0, a;
            for (i = a2; i <= b2; i++) {
              a = a1+i;
              sum += parseFloat(localStorage[a]);
            }
            return sum;
          }
            with (DATA) return eval(value.substring(1));
          
        } else {
      //isNaN(parseFloat(value)) ? document.getElementById("demo").innerHTML += "</br>true" : document.getElementById("demo").innerHTML += "</br>false"; // testing cond ? aaa:bbb;
          return isNaN(parseFloat(value)) ? value : parseFloat(value); }
    };
    Object.defineProperty(DATA, elm.id, {get:getter});
    Object.defineProperty(DATA, elm.id.toLowerCase(), {get:getter});
  
  document.getElementById("demo").innerHTML += localStorage[elm.id] || "";
  
  //document.getElementById("demo").innerHTML += DATA[elm.id] + "|"; // testing
});

(window.computeAll = function() {
  INPUTS.forEach(function(elm) {
    try {
      //document.getElementById("demo").innerHTML += DATA[elm.id] + "-"; // testing
      elm.value = DATA[elm.id];
      //document.getElementById("demo").innerHTML += elm.value + "/"; // testing
    }
    catch(e) {} });
})();