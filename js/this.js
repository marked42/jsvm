(function () {
	let a = function () {
		console.log("this: ", this);
	};

	with ({ a }) {
		a();
	}
})();
