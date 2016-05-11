//
// PROBLEM: Parse a CSV (comma separated values) formatted string into an array of values.
// Use comma (,) as the field separator and pipe (|) as the line or record separator.
// Special characters delimited by quotes (") or preceeded by the escape character (\) should be printed verbatim.
//

// Main fuction which takes a CSV formatted string as input and returns an array of array of strings
function csvparser(input) {
	
	// Initialize field, record and parsed output
	var field = '';
	var record = [];
	var parsed = [];

	// Special tokens for the parser
	var t = {
		'QUOTE': '\"',
		'ESCAPE': '\\',
		'FIELD_SEP': ',',
		'RECORD_SEP': '|'
	};

	// States for the finite state machine (FSM)
	var s = {
		'REGULAR': 0,
		'ESCAPED': 1,
		'QUOTED': 2
	};

	var current_state = s.REGULAR;
	var previous_state;

	// Current character
	var c = '';

	// Index of current character
	var i = 0;

	// Keep reading characters from input string
	while ((c=input.charAt(i++)) !== '') {
		
		// Run FSM
		switch (current_state) {

			case s.REGULAR:
				previous_state = current_state;
				if (c === t.QUOTE) {
					current_state = s.QUOTED;
				}
				else if (c === t.ESCAPE) {
					current_state = s.ESCAPED;
				}
				else if (c === t.FIELD_SEP) {
					record.push(field);
					field = '';
				}
				else if (c === t.RECORD_SEP) {
					record.push(field);
					parsed.push(record);
					field = '';
					record = [];
				}
				else {
					field += c;
				}
				break;

			case s.ESCAPED:
				field += c;
				current_state = previous_state;
				break;

			case s.QUOTED:
				previous_state = current_state;
				if (c === t.QUOTE) {
					current_state = s.REGULAR;
				}
				else if (c === t.ESCAPE) {
					current_state = s.ESCAPED;
				}
				else {
					field += c;
				}
				break;

			default:
				current_state = s.REGULAR;
		}
	}

	// When there are no more characters in the input, remember to close the last field and record
	record.push(field);
	parsed.push(record);

	return parsed;
}

// Run test case
var test_input = 'First field,Second field,This field contains an escaped line separator\\|, This field contains quoted field separators ",,,"|This is the first field in a new line, This field contains an escaped quote character within a quoted segment "Quote: \\"",Another field with escaped \\"quotes\\"';
var test_output = csvparser(test_input);

console.log(test_input);
console.log(test_output);
