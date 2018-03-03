$( document ).ready(function() {


function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

// Start file download.
// download("hello.txt","This is the content of my file :)");
var textToWrite = ""; 

document.getElementById('downloadButton').onclick = function()
{
  download("output.txt",textToWrite);
}

	function onXlabsReady() {	
	    xLabs.setConfig( "system.mode", "learning" );
	    xLabs.setConfig( "browser.canvas.paintLearning", "0" );
	    console.log('in1')
	    // ants = new XLabsAnts();
	    // ants.init( function() {
	    // document.addEventListener( "click", function(e) { ants.onClick(e); } );
	    //   	XLabsAntsts.mainLoop();
	    // });
  	}

  function onXlabsUpdate() {
  	// console.log('in2');
    var trackingSuspended = parseInt( xLabs.getConfig( "state.trackingSuspended" ) );
    var calibrationStatus = parseInt( xLabs.getConfig( "calibration.status" ) );

    if( ( calibrationStatus == 0 ) || ( trackingSuspended == 1 ) ) {
      // console.log( "cs: "+calibrationStatus + " ts="+trackingSuspended );
      // return;	
    }

    var d = new Date();
    var xEstimate = parseFloat( xLabs.getConfig( "state.gaze.estimate.x" ) ); // screen coords
    var yEstimate = parseFloat( xLabs.getConfig( "state.gaze.estimate.y" ) ); // screen coords
    var c = parseFloat( xLabs.getConfig( "state.calibration.confidence" ) ); 
    // console.log(xEstimate+','+yEstimate+','+c+','+d);
    textToWrite = textToWrite+xEstimate+','+yEstimate+','+c+','+d+'\n';

    var x = xLabs.scr2docX( xEstimate );
	var y = xLabs.scr2docY( yEstimate );

    var d = document.getElementById('circle');
	d.style.position = "absolute";
	d.style.left = x+'px';
	d.style.top = y+'px';
  }

  xLabs.setup( onXlabsReady, onXlabsUpdate, null, "842a5b00-94bf-4b18-ae0b-41d6aafac24f" );
});