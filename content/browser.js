/**
 *  Register window load listener which adds event listeners for tab,
 *  location, and state changes. 
 **/

var urls_found = new Array();

function check_url(url, link_node) {

		var replace_node = link_node;
	  
	    var xmlHttpRequest = new XMLHttpRequest();
		
		if(urls_found[url]!=true){
		
			urls_found[url]=true;
							    		
			xmlHttpRequest.open("GET","http://lrtest01.learningregistry.org/harvest/getrecord?by_resource_id=TRUE&request_id=" + escape(url), true);
			xmlHttpRequest.onreadystatechange=function(){
	      
				if (xmlHttpRequest.readyState==4){
									
					var my_JSON_object = JSON.parse(xmlHttpRequest.responseText);
					
					if(my_JSON_object.getrecord.record!=""){
						
						var id_string = "node_" + Math.floor(Math.random()*5000);

						var marker_div = document.createElement("A");	
						marker_div.style.minHeight="20px";
						marker_div.style.backgroundColor="#fff";
						marker_div.style.color="#000";
						marker_div.style.fontWeight="bold";
						marker_div.style.display="inline";
						marker_div.setAttribute("onclick",'content.document.getElementById("' + id_string + '").style.display="block";');
						newtext=document.createTextNode('+');
						marker_div.appendChild(newtext);												
						replace_node.parentNode.insertBefore(marker_div, replace_node);
						
						
						var content_div = document.createElement("DIV");	
						content_div.style.clear="left";
						content_div.style.float="left";
						content_div.style.position="relative";
						content_div.style.minWidth="100%";
						content_div.style.backgroundColor="#fff";
						content_div.style.color="#000";
						content_div.style.border="1px solid #000";
						content_div.style.display="none";
						
						for(x = 0; x<my_JSON_object.getrecord.record.length; x++){
						
							var record_string = "";
																							
							xml_data = my_JSON_object.getrecord.record[x].resource_data.resource_data;
														
							if (window.DOMParser){
							
								parser=new DOMParser();
								xmlDoc=parser.parseFromString(xml_data,"text/xml");
								
							}
							
							n = xmlDoc;
							rootNode = n;
							
							while (n) {
																					
								switch(n.nodeName){
								
									case "description" : if(n.firstChild.nextSibling.firstChild.nodeValue!=""){results_para = document.createElement("P");results_para.style.display="block";newtext=document.createTextNode("Description " + n.firstChild.nextSibling.firstChild.nodeValue + "\n");results_para.appendChild(newtext);content_div.appendChild(results_para);}; break;
									case "rights" : if(n.firstChild.nextSibling.firstChild.nodeValue!=""){results_para = document.createElement("P");results_para.style.display="block";newtext=document.createTextNode("Rights " + n.firstChild.nextSibling.firstChild.nodeValue + "\n");results_para.appendChild(newtext);content_div.appendChild(results_para);}; break;
									case "keyword" : if(n.firstChild.nextSibling.firstChild.nodeValue!=""){results_para = document.createElement("P");results_para.style.display="block";newtext=document.createTextNode("Keywords " + n.firstChild.nextSibling.firstChild.nodeValue + "\n");results_para.appendChild(newtext);content_div.appendChild(results_para);}; break;
									case "usageDataSummary" : for(y=0;y<n.childNodes.length;y++){

																	if(n.childNodes[y].nodeName=="integer"){
																	
																		results_para = document.createElement("P");
																		results_para.style.display="block";
																		newtext=document.createTextNode(n.childNodes[y].attributes.getNamedItem('type').nodeValue + " " + n.childNodes[y].attributes.getNamedItem('dateTimeEnd').nodeValue + " " + n.childNodes[y].childNodes[0].nodeValue + "\n");
																		results_para.appendChild(newtext);
																		content_div.appendChild(results_para);
																	
																	}

															  }
															  
															  break;
								
								}
									
								if (n.v) {
								
									n.v = false;
									
									if (n == rootNode) {
										break;
									}
									
									if (n.nextSibling) {
									
										n = n.nextSibling;
										
									}else{
									
										n = n.parentNode;
										
									}
									
								}else{
								
									if (n.firstChild) {
									
										n.v = true;
										n = n.firstChild;
										
									}else if (n.nextSibling) {
									
										n = n.nextSibling;
											
									}else{
									
										n = n.parentNode;
											
									}
																		
								}
								
							}							
						
						}
						
						content_div.id = id_string;		

						replace_node.parentNode.parentNode.parentNode.parentNode.appendChild(content_div);											
																	
					}		
					
				}
			
			};
					
	    xmlHttpRequest.send();
		
	}
		
}

var document_node = "";

var page_process = new function page_process() {

		this.init = function (content_passed) {
				
			var n = content_passed;			
			
			document_node = content_passed;
					
			if(content_passed.location.toString().indexOf("www.google")!=-1){				
				
				var n = content_passed.getElementById("search");
			
			}
			
			if(content_passed.location.toString().indexOf("search.yahoo.com")!=-1){	
			
				var n = content_passed.getElementById("results");
			
			}
			
			if(content_passed.location.toString().indexOf("bing.com")!=-1){	
				
				var n = content_passed.getElementById("web");
			
			}
			
			var rootNode = n;
			
			while (n) {
	
				if(n.hasAttributes()){
				
					if(n.hasAttribute("href")){
					
						if(n.href.toString().indexOf("google")==-1){
				
							check_url(n.href,n);
						
						}
					
					}
				
				}

				if (n.v) {
					n.v = false;
					if (n == rootNode) {
						break;
					}
					if (n.nextSibling) {
						n = n.nextSibling;
					}
					else {
						n = n.parentNode;
					}
				}
				else {
					if (n.firstChild) {
						n.v = true;
						n = n.firstChild;
					}
					else 
						if (n.nextSibling) {
							n = n.nextSibling;
						}
						else {
							n = n.parentNode;
						}
				}
				
			}
			
			urls_found = new Array();

		}; 
		
};
		