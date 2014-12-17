function doClick(e) {
    alert($.label.text);
}


function report(evt) {
    Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
}

//$.index.activity.actionBar.hide();

$.index.open();
