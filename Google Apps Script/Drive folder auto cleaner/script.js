getElement = (id) => {
    return document.getElementById(id);
}

validate = (evt, id) => {
    var theEvent = evt || window.event;

    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }

    if(getElement(id).value!="") var regex = /[0-9]/;
    else var regex = /[1-9]/;

    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
}

