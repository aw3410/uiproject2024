function advancedsearch() {
    var advancedsearchdiv = $('#advancedsearch')
    
    const isVisible = advancedsearchdiv.is(':visible');

    if (isVisible) {
        advancedsearchdiv.hide(); 
    }
    else {
        advancedsearchdiv.show(); 
    }
}


$(document).ready(function () {
    console.log("Document ready!");

    $('#filterbutton').click(function () {
        console.log("Filter button clicked!");
        advancedsearch();
    });
});
