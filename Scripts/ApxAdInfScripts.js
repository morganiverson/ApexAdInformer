
/**
*/
//SHOW FILE IN FILE VIEWER
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
//SHOW ORIGINAL IMAGE IN VIEWER
document.getElementById("org_img_thumb").addEventListener("click", function() {showFile("org_img_thumb")});
//SHOW MOBILE PDF IN VIEWER
document.getElementById("mob_pdf_thumb").addEventListener("click", function() {showFile("mob_pdf_thumb")});
document.getElementById("mob_pdf_ttl").addEventListener("click", function() {showFile("mob_pdf_thumb")});
//SHOW DESKTOP PDF IN VIEWER
//document.getElementById("desk_pdf_thumb").addEventListener("click", function() {showFile("desk_pdf_thumb")});
//document.getElementById("desk_pdf_ttl").addEventListener("click", function() {showFile("desk_pdf_thumb")});

//HIDE FILE VIEWER
function hideViewer(){
    //HIDE VIEWER
    document.getElementById("viewer_div").style.display = "none";

    //UNLOCK SCROLLING
    document.body.style.overflowY = "auto";

    //CLEAR SOURCES
    document.getElementById("pdf_view_src").style.display = "none";
    document.getElementById("img_view_src").style.display = "none";

}
//ON CLICK - CLOSE VIEWER
document.getElementById("exit_view").addEventListener("click", function() {
    hideViewer();
    console.log("...Viewer Closed")
});

//set onload
var initial_header_height = 0;
var initial_desk_thumb_height = 0;
var initial_mob_thumb_height = 0;
var initial_org_img_cont_HGT = 0;

//SET INITIAL VALUES, MARGINS AND HEIGHTS ON LOAD
window.addEventListener("load", function() {
    initial_header_height = parseInt(window.getComputedStyle(document.getElementsByClassName("header")[0]).height);
    initial_mob_thumb_height = parseInt(window.getComputedStyle(document.getElementById("mob_pdf_thumb")).height);
    initial_desk_thumb_height = 0; //parseInt(window.getComputedStyle(document.getElementById("desk_pdf_thumb")).height);
    initial_org_img_cont_HGT = parseInt(window.getComputedStyle(document.getElementsByClassName("org_img")[0]).height);

    console.log("INITIAL VALUES:: ");
    console.log("header-height: " + initial_header_height);
    console.log("mob-thumb-height: " + initial_mob_thumb_height);
    console.log("desk-thumb-height: " + initial_desk_thumb_height);

    adjustMargin();
    adjustThumbSpanHeight();
    setOrgImgMargins();
});

//CHECK IF TH EHEIGHT OF AN OBJECT HAS CHANGED
function objectHeightChanged(object_id){
    var return_value = false;
    var which = "HMD";

    //HEADER OR MOPB/DESK THUMBNAIL
    switch(true){
        case object_id.indexOf("header") >= 0: 
            return_value = (parseInt(document.getElementsByClassName(object_id)[0].style.height) != initial_header_height);
            which = "H";
            break;
        case object_id.indexOf("mob") >= 0: 
            return_value = (parseInt(document.getElementById(object_id).style.height)!= initial_mob_thumb_height);
            which = "M";
            break;
        case object_id.indexOf("org") >= 0:
            return_value = (parseInt(document.getElementByClassName(object_id)[0].style.height)!= initial_org_img_cont_HGT);
            which = "O";
    }

    //    console.log("HEIGHT CHANGE CHECK: " + return_value + " - " + which);

    if(return_value) {
        switch(which){
            case "H": initial_header_height = parseInt(document.getElementsByClassName("header")[0].style.height);
                break;
            case "M": initial_mob_thumb_height = parseInt(window.getComputedStyle(document.getElementById("mob_pdf_thumb")).height);
                break;
        }
    }
    return return_value;
}

//ADJUST MARGIN TOP OF DESC TXT BOX BASED ON HEIGHT OF HEADER 
var prev_desc_box_removal = 0; 
var new_margin = 0;

function adjustMargin(){
    //COMPUTED STYLES NOT SET
    var header_top = parseInt(window.getComputedStyle(document.getElementsByClassName("header")[0]).top);
    var header_height = parseInt(window.getComputedStyle(document.getElementsByClassName("header")[0]).height);
    var container_top = parseInt(window.getComputedStyle(document.getElementsByClassName("cont_div")[0]).marginTop);
    var description_box_padding_top = parseInt(window.getComputedStyle(document.getElementsByClassName("desc_box")[0]).paddingTop);

    var temp_marg = (header_top - container_top + header_height - description_box_padding_top + 10);
    if(temp_marg != new_margin) {
        new_margin = temp_marg;

        document.getElementsByClassName("desc_box")[0].style.marginTop = new_margin + "px"; //ADD TO TOP

        var curr_desc_bx_height = parseInt(window.getComputedStyle(document.getElementsByClassName("desc_box")[0]).height) + prev_desc_box_removal; //ADD PREV REMOAVL (OUT OF ORIGINAL WHOLE)
        //            console.log("...DB height:: " + curr_desc_bx_height);

        document.getElementsByClassName("desc_box")[0].style.height = (curr_desc_bx_height - new_margin) + "px";
        //            console.log("...NEW DB height:: " + document.getElementsByClassName("desc_box")[0].style.height);
        prev_desc_box_removal = new_margin;
        //SUBTRACT FROM BOTTOM

        //        + "px";
        //    console.log("header-top: " + header_top);
        //    console.log("header-height: " + header_height);
        //    console.log("container-top: " + container_top);
        //    console.log("desc_box_pad-top: " + description_box_padding_top);

        console.log(">> NEW desc text top margin: " + new_margin);
        console.log(">> NEW desc text height: " + (curr_desc_bx_height - new_margin));
    }
}

//VERTICALLY CENTRE ORG IMG 
function setOrgImgMargins(){
    var cont_HGT = parseInt(window.getComputedStyle(document.getElementsByClassName("org_img")[0]).height);
    var thumb_HGT = parseInt(window.getComputedStyle(document.getElementById("org_img_thumb")).height);
    console.log("...org img cont HT: " + cont_HGT);
    var new_org_marg = (cont_HGT - thumb_HGT) / 2;

    document.getElementById("org_img_thumb").style.marginTop = new_org_marg + "px";
    document.getElementById("org_img_thumb").style.marginBottom = new_org_marg + "px";
    console.log(">> NEW org img margin top/bottom: " + new_org_marg);
}

//CONTROL HEIGHT OF THUMB SPAN
function adjustThumbSpanHeight(){
    //TITLE AREA
    var desk_ttl_ht = parseInt(window.getComputedStyle(document.getElementById("desk_pdf_ttl")).height);
    var mob_ttl_ht = parseInt(window.getComputedStyle(document.getElementById("mob_pdf_ttl")).height);

    var lg = (desk_ttl_ht > mob_ttl_ht) ? desk_ttl_ht: mob_ttl_ht;

    //    console.log("Larger: " + desk_ttl_ht)
    document.getElementById("desk_pdf_ttl").style.height = lg + "px";
    document.getElementById("mob_pdf_ttl").style.height = lg + "px";


    //THUMBNAIL AREA 
    var new_height = (initial_mob_thumb_height + (80));
    initial_mob_thumb_height = new_height;

    new_height+= "px";

    document.getElementsByClassName("mob_viewer")[0].style.height = new_height;
    document.getElementsByClassName("desk_viewer")[0].style.height = new_height;

    console.log(">> NEW mobile/desktop viewer height: " + new_height);

}

window.addEventListener("resize", function() {
    if(objectHeightChanged("header"))
        adjustMargin();
    if(objectHeightChanged("mob_pdf_thumb"))
        adjustThumbSpanHeight();
    setOrgImgMargins();
});
                        // --- CHNAGE OPACITY OF HEADER AFTER SCROL POSITION ---
                        var saf_body = document.body;
                        var body = document.documentElement;

                        window.addEventListener("scroll", function(){
    var scroll_pos = (saf_body.scrollTop == 0) ? body.scrollTop: saf_body.scrollTop;
    //    console.log("SCROLL:: " + scroll_pos);
    if(scroll_pos > 15){
        makeOpaque();
    }
    else{
        makeSolid();
    }
    if(scroll_pos > 160){
        //        console.log(">> DB scroll reset");
    }
});
//MAKE HEADER OPAQUE
function makeOpaque(){
    var header_ref = document.getElementsByClassName("header")[0];
    header_ref.style.transition = "opacity 1s";
    header_ref.style.opacity = "50%";
    console.log(">> OPAQUE header")
}
//MAKE HEADER SOLID
function makeSolid(){
    var header_ref = document.getElementsByClassName("header")[0];
    //    header_ref.style.transition = "opacity 3s";
    header_ref.style.opacity = "100%";
    console.log(">> NOT OPAQUE header");
}