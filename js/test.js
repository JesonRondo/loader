var test = {
	print: function() {
		if (console && console.log) {
			console.log('for test');
		} else {
			alert('for test');
		}
	}
};

$(document).ready(function() {
	test.print();
});