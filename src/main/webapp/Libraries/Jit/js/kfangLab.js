/**
 * Personal Library
 * 
 * Email: kuinai.fang@gmail.com
 * LinkedIn: https://ca.linkedin.com/in/kuinaifang
 * 
 * All Rights Reserved
 * 
 * @author Kenny Fang
 * 
 */

//http://philogb.github.io/jit/static/v20/Jit/Examples/Spacetree/example1.html

$(document).ready(function() {

	
var labelType, useGradients, nativeTextSupport, animate;

(function() {
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport 
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();

var Log = {
  elem: false,
  write: function(text){
    if (!this.elem) 
      this.elem = document.getElementById('log');
    this.elem.innerHTML = text;
//    this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
  }
};


$(window).load(function() {

	generateTheDiagram();

});


function generateTheDiagram() {
    
    /************** 1. Create a new ST instance********/
    var st = new $jit.ST({
        
        injectInto: 'theDiagram', 		//id of viz container element
        
        duration: 300,					//animation delay
       
        transition: $jit.Trans.Quart.easeInOut,  // animation transition type
        
        levelsToShow: 1,				// how many nodes to show

        levelDistance: 80,				// distance between node and its children
        
        offsetX: 0,					// Distance From The Center of The Canvas
        offsetY: 0,
        
        // Tree 
        multitree: false,
        orientation: 'left',  
        subtreeOffset: 8,  
        siblingOFfset: 5,  
        indent: 100000,
        
        Margin: {  
        		  top: 100,  
        		  left: 100,  
        		  right: 100,  
        		  bottom: 100  
        		},
        
        //enable panning
        Navigation: {
        	type: "auto",
	        enable: true,
//	        panning: true,
//	        zooming: 20,
//	        panning: true,
        },
        
        
        // Style For Each Node
        Node: {
        	
            height: 20,
            width: 180,
            
            type: 'rectangle', //  ‘circle’, ‘rectangle’, ‘square’, ‘ellipse’, ‘triangle’, ‘star’
            color: '#aaa',
            align: "center", 
            
            angularWidth: 50,
            span: 50,
            
            dim: 5,
            overridable: true,
            
            alpha: 2,
            transform: true,
            
            autoHeight: false,
            autoWidth: false,
        },
        
        Label: {  
       		  overridable: true,  
       		  type: 'HTML', //'SVG', 'Native', 'HTML'  
       		  style: '',  
       		  size: 20,  
       		  family: 'sans-serif',  
       		  textAlign: 'center',  
       		  textBaseline: 'alphabetic',  
       		  color: '#fff'  
       	},
        
        // Styles For Each Connection
        Edge: {
        	
            type: 'arrow', // ‘line’, ‘hyperline’, ‘arrow’, "bezier"
            lineWidth: 2,
            dim: 8,
            overridable: true,
            
            alpha: 20,
            epsilon: 170,
            
            withLabels: true,
        },
        
        // Tooltips When Hover
        Tips: {  
        	
       		enable: false,  
       		type: 'auto',  
       		offsetX: 15,  
       		offsetY: 15,  
       		onShow: function(tip, node) {  
       		    tip.innerHTML = node.name;  
       		},  
       		  
       		onHide: function(tip, node) {
       		 
       		}  
       		 
       	},
       		
        
        // Before Doing The Animation
        onBeforeCompute: function(node){
        	
            Log.write("loading " + node.name + " ... ");
            
        },
        
        
        // After Finishing The Animation
        onAfterCompute: function(){
        	
            Log.write("done");
          
        },
        
        
        // Click Listener For Each Node
        onCreateLabel: function(label, node) {
        	
            label.id = node.id;            
            label.innerHTML = node.name;
            
            // When Click On The Node
            label.onclick = function(){
            	
            	
            	// Actions For Normal Or Root Mode
            	if(normal.checked) {
            		st.onClick(node.id);
//            		            		st.setRoot(node.id, 'animate');
            	} 
            	else {
//            		st.onClick(node.id);
            		st.loadJSON(kennyJSON);
            		st.setRoot(node.id, 'animate');
            	}
            };
            
            // When Double Click On The Node
            label.ondblclick = function(){
            	
            	alert('More Info For "' + node.id + '" Coming Soon');
            	
            };
            
            
            // Customize Label Styles
            var style = label.style;
            style.width = '180px';
            style.height = '18px';            
            style.cursor = 'pointer';
            style.color = '#333';
            //            style.background = "#4862A3";
            
            style.paddingTop = '30px';
            
            style.fontSize = '0.8em';
            style.textAlign= 'center';
            style.paddingTop = '3px';
        },
        
        // For All The Node
        onBeforePlotNode: function(node){
        	
        	// Make Colors Depending On The Numbers Of Children
            if (node.selected) {
                node.data.$color = "#4862A3";
//                node.data.$color = "#FAC090";
            }
            else {
            	
                delete node.data.$color;
                //if the node belongs to the last plotted level

                if(!node.anySubnode("exist")) {
                    
                	// 1. Get The Number of Children
                	
                    var count = 0;
                    node.eachSubnode(function(n) { count++; });

                    // 2. Assign The Depth Of Color Based On The Number Of Children
                    node.data.$color = ['#4862A3', '#baa', '#caa', '#daa', '#eaa', '#faa'][count];       
//                    node.data.$color = ['#4862A3', '#4862A3', '#4862A3', '#4862A3', '#4862A3', '#4862A3'][count];    
                }
            }
        },
        
        onCreatePlotLine: function(line) {
        	alert("something");
        },
        
        // Customize The Connection
        onBeforePlotLine: function(adj){
        	
        	// If From And To Are Clicked, Change The Line Style
            if (adj.nodeFrom.selected && adj.nodeTo.selected) {
            	
                //adj.data.$color = "#eed";
                adj.data.$lineWidth = 2.5;
                adj.data.$dim = 12;
            }
            else {
	                //delete adj.data.$color;
				    delete adj.data.$lineWidth;
				    delete adj.data.$dim;
            }
        }
        
        
        
    });

    /************** 2. Execute The ST instance********/
    // 1. Load The JSON Data To The Instance
    //    st.loadJSON(theOriginalJSON);
    st.loadJSON(kennyJSON);
    
    //compute node positions and layout
    st.compute();
    //optional: make a translation of the tree
    st.geom.translate(new $jit.Complex(-200, 0), "current");
    //emulate a click on the root node.
    st.onClick(st.root);
    //    st.onClick('node283');

    
    //Add event handlers to switch spacetree orientation.
    var top = $jit.id('r-top'), 
        left = $jit.id('r-left'), 
        bottom = $jit.id('r-bottom'), 
        right = $jit.id('r-right'),
        normal = $jit.id('s-normal');
        
    
    function changeHandler() {
        if(this.checked) {
            top.disabled = bottom.disabled = right.disabled = left.disabled = true;
            st.switchPosition(this.value, "animate", {
                onComplete: function(){
                    top.disabled = bottom.disabled = right.disabled = left.disabled = false;
                }
            });
        }
    };
    
    top.onchange = left.onchange = bottom.onchange = right.onchange = changeHandler;

}
//end of generateTheDiagram() 

	
});


