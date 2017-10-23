
window.onload = function(){ 
	
	document.getElementById("append").onclick = function() {
		
		var txtToAdd = "something";
		
		var expressionEditor =  document.getElementsByClassName("expressionEditor")[0];
		var cursorPosition = expressionEditor.selectionStart;
		var expressionValue = expressionEditor.value;
		expressionValue = expressionValue.substring(0, cursorPosition) + txtToAdd + expressionValue.substring(cursorPosition);
		expressionEditor.value = expressionValue;
		
	}
}


