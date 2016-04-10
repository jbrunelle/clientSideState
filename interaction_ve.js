/**
Test cmd:

phantomjs --local-to-remote-url-access=yes rasterize.js "[URL]" 
"./junk.png" "./junk.html" "./junk.missing" "interactiveGuys.txt"
/**/

var fs = require('fs');
var server = require('webserver').create();
var theresources = [];
var index = 0;
var thecodes = [];
var theurls = [];

var page = require('webpage').create(),
    address, output, size;

console.log("Length: " + phantom.args.length);

if (phantom.args.length < 5 || phantom.args.length > 5) {
    console.log('Usage: interaction.js URL httpLogFile htmlFile interactionFile');
    phantom.exit();
} else {
    	address = phantom.args[0];
    	pngOutput = phantom.args[1];
    	htmlOutput = phantom.args[2];
    	httpOutput = phantom.args[3];
    	interactionOutput = phantom.args[4];


    	page.viewportSize = { width: 1024, height: 777 }; 

	//create the file
	console.log("writing 1");
	fs.write(httpOutput, "", "w");
	fs.write(htmlOutput, "", "w");
	fs.write(interactionOutput, "", "w");


	/**header monitoring**/
	page.onResourceReceived = function (res) {
		theresources[res.url] = res.url;
		//console.log("Response " + res.id + ", " + res.url);
		
		//console.log("writing 2");
		fs.write(httpOutput, (res.status + ", " + res.url + "\n"), "a");
	    };

	//page.onResourceReceived = function(response) {
	//    console.log('Response (#' + response.id + ', stage "' + response.stage + '"): ' + JSON.stringify(response));
	//};


    //page.clearHttpCacheForAllWebPages();
    page.settings.forceRefresh = true;

    page.open(address, function (status) {

        if (status !== 'success') {
            console.log('Unable to load the address!');
	    phantom.exit();
        } else {

		var veScript = "function playThatFunctionVEwhiteBoy(){"
			+ "var url = 'http://localhost/clientSideState/VisualEvent/builds/VisualEvent_Loader.js';"
			+ "var pairs;"
        		+ "if( typeof VisualEvent!='undefined' ) {"
			+ " if ( VisualEvent.instance !== null ) {"
			+ "        VisualEvent.close();"
			+ " }"
			+ " else {"
			+ "         new VisualEvent();"
			+ " }"
			+ " }"
			+ "else {"
			+ "        var n=document.createElement('script');"
			+ "        n.setAttribute('language','JavaScript');"
			+ "        n.setAttribute('src',url+'?rand='+new Date().getTime());"
			+ "        document.body.appendChild(n);"
			+ "}";

		//console.log(veScript);

		/** this is new...**/
		page.injectJs("http://code.jquery.com/jquery-1.9.1.js");
		//page.injectJs(veScript);
		//page.injectJs("http://192.168.1.10/clientSideState/whiteboyfile.js");
		//page.injectJs("http://192.168.1.10/clientSideState/VisualEvent/builds/VisualEvent_Loader.js?rand=1433377763484");
		//page.injectJs("http://192.168.1.10/clientSideState/VisualEvent/builds/VisualEvent-1433300542/js/VisualEvent.js");
		page.injectJs("https://raw.github.com/douglascrockford/JSON-js/master/json2.js");
		
		console.log("JS Loaded");

            window.setTimeout(function () {
                page.render(pngOutput);

		console.log("waiting for...\n");
		waitFor(
		    page,
		    "jbrunellesSuperSneakyDiv", // wait for this object to appear
		    (new Date()).getTime() + 20000, // timeout at 20 seconds from now
		    function (status) {
			//system.stderr.writeLine( "- submission status: " + status );
			console.log( "- submission status: " + status );
		 
			if ( status ) {
			    // success, element found by waitFor()
			    console.log("success, element found by waitFor()");

			    var pageContent = page.evaluate(function() { 
				    var content = document.body.parentElement.outerHTML; 
				    return content;
			    }, 1000);

			    //console.log("writing...\n" + htmlOutput + ", " + pageContent + ", " + pngOutput);
			    writeOut(htmlOutput, pageContent, pngOutput, interactionOutput);

			    //page.render( "/tmp/results.png" );
			    //process_rows( page );
			} else {
			    // waitFor() timed out
			    //phantom.exit( 1 );
				console.log("\nwaitFor timed out!!\nexiting...\n\n");
				/**
				setTimeout(
					console.log("writing out first");
					writeOut(htmlOutput, pageContent, pngOutput, interactionOutput);
			    	}, 11000); // wait for the write to finish, then timeout.
				/**/
				console.log("Writing after timeout...");
				writeOut(htmlOutput, pageContent, pngOutput, interactionOutput);
			    //phantom.exit( 1 );
			}
		    }
		);

		var pageContent = page.evaluate(function() { 
		    function playThatFunctionVEwhiteBoy(){
			var url = 'http://localhost/clientSideState/VisualEvent/builds/VisualEvent_Loader.js';
			var pairs;
			 if( typeof VisualEvent!='undefined' ) {
			        if ( VisualEvent.instance !== null ) {
			               VisualEvent.close();
			        }
			        else {
			                new VisualEvent();
			        }
 			}
			else {
			        var n=document.createElement('script');
			        n.setAttribute('language','JavaScript');
			        n.setAttribute('src',url);
			        //n.setAttribute('src',url+'?rand='+new Date().getTime());
			        document.body.appendChild(n);


			        var n1=document.createElement('script');
			        n1.setAttribute('language','JavaScript');
			        n1.setAttribute('src','http://localhost/clientSideState/VisualEvent/builds/VisualEvent-1435105889/js/VisualEvent.js');
			        document.body.appendChild(n1);


			        var n2=document.createElement('script');
			        n2.setAttribute('language','JavaScript');
			        n2.setAttribute('src','http://localhost/clientSideState/VisualEvent/builds/VisualEvent-1435105889/js/VisualEvent-jQuery.js');
			        document.body.appendChild(n2);



				/**jb new testing**
			        var n3=document.createElement('div');
			        n3.setAttribute('id','jbrunellesSuperSneakyDiv');
			        document.body.appendChild(n3);
				/**jb new testing**/

			}

		   }


		    playThatFunctionVEwhiteBoy();


		    var content = document.body.parentElement.outerHTML; 
		    return content;
		}, 3000);

		console.log("written to " + pngOutput + "\n\n");
		//console.log("OUT: " + pageContent);



		console.log("pausing");
		setTimeout(function(){
                        //do-nothing wait to let things	run and	assign events
                }, 9000); // assuming 3 seconds are enough time for the request




		/////////////////////////////////////////////////////////

		var sizeArr = page.evaluate(function () {
		     var pageWidth = document.body.clientWidth;
		     var pageHeight = document.body.clientHeight;

			//window.VisualEvent_Loader();
		     return [pageWidth, pageHeight];
		  });



		console.log("scrolling down...");
		var myDiv = page.evaluate(function() {
        		  // Scrolls to the bottom of page
        		  window.document.body.scrollTop = document.body.scrollHeight;

			targets = document.getElementById('jbrunellesSuperSneakyDiv');
			targets = targets.innerHTML;
			return targets;
        	});
		console.log("div: " + myDiv);


		/////////////////////////////////////////////////////////


		var pageContent = page.evaluate(function() { 
		    //playThatFunctionVEwhiteBoy();
		    var content = document.body.parentElement.outerHTML; 
		    return content;
		    //console.log("content written");
		});

		//console.log("page:" + pageContent);


		/**
		http://stackoverflow.com/questions/25925365/how-to-trigger-ajax-request-for-filling-a-form-out-and-wait-until-dom-changes
		check that link for an explanation of hwo to wait for Ajax during PhantomJS DOM Manipulations.
		**/
		setTimeout(function(){
			console.log("writing out");
			writeOut(htmlOutput, pageContent, pngOutput, interactionOutput);
	    	}, 11000); // assuming 3 seconds are enough time for the request

		/**
		console.log("writing 4");
		fs.write(htmlOutput, pageContent, "w");
		
		
		console.log("written to " + output + ".2.png\n\n");
                page.render(pngOutput + ".2.png");
		/**/

                //phantom.exit();
            }, 10000);
        }
    });

}
 



function writeOut(htmlOutput, pageContent, pngOutput, interactionOutput){
	console.log("writing DOM to " + htmlOutput);
	fs.write(htmlOutput, pageContent, "w");


	console.log("written to " + pngOutput + "\n\n");
        page.render(pngOutput + "");


	//here, we will create the .csv file
	var tHtml = page.evaluate(function() {
		targets = document.getElementById('jbrunellesSuperSneakyDiv');
		if(targets == null)
		{
			return "None Available";
		}
		tHtml = targets.innerHTML;
		return tHtml;
	});

	fs.write(interactionOutput, tHtml, "a");

	console.log("exiting...");
        phantom.exit();
}

function findPos(obj) {
        var curleft = curtop = 0;
        if (obj.offsetParent) {
		do {
		                curleft += obj.offsetLeft;
		                curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
        	return [curleft,curtop];
	}
}

/**/
function getNumTags(tagName)
{
	var num = page.evaluate(function(tagName) {
	    return document.getElementsByTagName(tagName).length;
	}, tagName);

	return num;
}
function getNumClass(tagName, content)
{
	var num = page.evaluate(function(tagName) {
		/**/
		var counter = 0;
		var elems = document.getElementsByTagName('*');
		for (var i = 0; i < elems.length; i++) {
			if((' ' + elems[i].className + ' ').indexOf(' ' + tagName + ' ') > -1) 
			{
				counter++;
			}
		}
		/**/
		return counter;
	}, tagName);

	return num;
}

function isInteractive(obj)
{
	// from http://blogs.telerik.com/aspnet-ajax/posts/09-02-27/client---side-events-in-javascript.aspx
	var theProps = [
			"onabort",
			"onblur",
			"onchange",
			"onclick",
			"ondblclick",
			"onerror",
			"onfocus",
			"onkeydown",
			"onkeypress",
			"onkeyup",
			"onload",
			"onmousedown",
			"onmousemove",
			"onmouseout",
			"onmouseover",
			"onmouseup",
			"onreset",
			"onresize",
			"onselect",
			"onsubmit",
			"onunload"
			];
	for(var i = 0; i < theProps.length; i++)
	{
		if (obj.hasOwnProperty(theProps[i])) { 
			return true;
		}
	}
	return false
}

function getNumTagByClass(tagName, styleName, content)
{
	var num = page.evaluate(function(tagName, styleName) {
		/**/
		var counter = 0;
		var elems = document.getElementsByTagName(tagName);
		for (var i = 0; i < elems.length; i++) {
			if((' ' + elems[i].className + ' ').indexOf(' ' + styleName + ' ') > -1) 
			{
				counter++;
			}
		}
		/**/
		return counter;
	}, tagName, styleName);

	return num;
}
function getNumID(tagName)
{
	var num = page.evaluate(function(tagName) {
	    var theThing = document.getElementById(tagName);
	    if(theThing == null)
		return 0;
	    return 1;
	}, tagName);

	return num;
}
/**/

function getAllClasses(content)
{
	var num = page.evaluate(function() {
		/**/
		var myClasses = Array();
		var elems = document.getElementsByTagName('*');
		for (var i = 0; i < elems.length; i++) {
			if((elems[i].className == "") || (elems[i].className == null))
			{
				//do nothing
			}
			else
			{
				myClasses.push(elems[i].className);
			}
		}
		/**/
		return myClasses;
	});

	return num;
}



/**
waitFor function defined according to
https://newspaint.wordpress.com/2013/04/05/waiting-for-page-to-load-in-phantomjs/
/**/
function waitFor( page, selector, expiry, callback ) {
    console.log( "- waitFor( " + selector + ", " + expiry + " )" );
 
    // try and fetch the desired element from the page
    var result = page.evaluate(
        function (selector) {
            return document.getElementById( selector );
        }, selector
    );
 
    // if desired element found then call callback after 50ms
    if ( result ) {
        console.log( "- trigger " + selector + " found" );
        window.setTimeout(
            function () {
                callback( true );
            },
            50
        );
        return;
    }
 
    // determine whether timeout is triggered
    var finish = (new Date()).getTime();
    if ( finish > expiry ) {
        console.log( "- timed out" );
        callback( false );
        return;
    }
 
    // haven't timed out, haven't found object, so poll in another 100ms
    window.setTimeout(
        function () {
            waitFor( page, selector, expiry, callback );
        },
        100
    );
}




