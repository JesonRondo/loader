var test = {
    print: function() {
        $('body').append('<p>document ready call</p>');
    }
};

$(document).ready(function() {
    test.print();
});