const mockData = [
	{
		title: 'How to Loop Through an Array',
		details:
			'You can loop through an array in JavaScript using various methods. One common way is using a `for` loop.\n\n```javascript\nconst arr = [1, 2, 3];\nfor(let i = 0; i < arr.length; i++) {\n  console.log(arr[i]);\n}\n```',
		// timestamp: 1672651947710,
	},

	{
		title: 'Undefined vs Null',
		details:
			"In JavaScript, `undefined` means a variable has been declared but hasn't been assigned a value. `null` is an assignment value that represents no value or no object.\n\n```javascript\nlet a;\nconsole.log(a); // undefined\n\nlet b = null;\nconsole.log(b); // null\n```",
		// timestamp: 1672651943710,
	},
	{
		title: 'How to Clone an Array',
		details:
			'To clone an array in JavaScript, you can use the `slice` method or spread syntax.\n\n```javascript\n// Using slice\nconst originalArray = [1, 2, 3];\nconst cloneArray = originalArray.slice();\n\n// Using spread syntax\nconst cloneArray2 = [...originalArray];\n```',
		// timestamp: 1672351947710,
	},
	// ... add more notes
];

export default mockData;
