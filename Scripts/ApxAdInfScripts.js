document.getElementById("org_img_thumb").addEventListener("click", function() {showFile("org_img_thumb")});
document.getElementById("mob_pdf_thumb").addEventListener("click", function() {showFile("mob_pdf_thumb")});
document.getElementById("desk_pdf_thumb").addEventListener("click", function() {showFile("desk_pdf_thumb")});
document.getElementById("exit_view").addEventListener("click", function() {
    hideViewer();
});


function showFile(obj_id) {
    console.log("ID:: " + obj_id);
    console.log("SRC:: " + document.getElementById(obj_id).src);
    
    //SET OUTPUT SRC TO IMG
    if(obj_id.indexOf("pdf") < 0) {
        
        document.getElementById("img_view_src").src = document.getElementById(obj_id).src;
       
        console.log(">>> IMG");
        console.log("SRC CHNGE:: " + document.getElementById("img_view_src"));
        document.getElementById("img_view_src").style.display = "inline";
    }
    //SET OUTPUT SRC TO PDF
    else {
        var mob_src = "PDF_Files/ApxMobView.pdf";
        var desk_src = "";
        
        console.log(">>> PDF");
        
        if(obj_id.indexOf("mob") < 0){
            document.getElementById("pdf_view_src").src = desk_src;
            console.log("SRC CHNGE:: " + document.getElementById("pdf_view_src").src);
        }
        else {
            document.getElementById("pdf_view_src").src = mob_src;
            console.log("SRC CHNGE:: " + document.getElementById("pdf_view_src").src);
        }
        document.getElementById("pdf_view_src").style.display = "inline";
    }
    
    //SHOW VIEWER
    document.getElementById("viewer_div").style.display = "inline";
    //LOCK SCROLLING
    document.body.style.overflowY = "hidden";
    
    console.log("...Showing Viewer");
}

function hideViewer(){
    //HIDE VIEWER
    document.getElementById("viewer_div").style.display = "none";
   
    //UNLOCK SCROLLING
    document.body.style.overflowY = "auto";
    
    //CLEAR SOURCES
    document.getElementById("pdf_view_src").style.display = "none";
    document.getElementById("img_view_src").style.display = "none";
    
}