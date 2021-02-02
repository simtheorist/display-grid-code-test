# Setup
I built this demo app using create-react-app and yarn, nothing fancy, so setup should be easy. App.js passes in the rows and columns and the Grid component does the work.

from root directory, run:
npx create-react-app display-grid-code-test

Copy files to new display-grid-code-test directory.

navigate to new directory display-grid-code-test, then run:
yarn

to run the app:
yarn start

# Features
- I implemented the required features as well as the extra credit editable fields.
- The grid component is completely generic and reusable. You can pass in completely different columns and rows and it will work. If you've already been using the app and you want to try different starting data, change the rows and columns json in App.js and either clear local storage in dev tools or uncomment this line in app.js and refresh the browser once: localStorage.clear(); 
	- Rows: The json required for the code test. Can be any array of JSON objects with string or integer properties. 
	- Columns: Array of JSON objects that determine which columns appear, with the following fields:
		- name: name of the field. Will be used to populate column headers as well as matching for the fields in the row objects. One field 			must be called id, with unique values.
		- searchable: whether the column is searchable via the search box at the top
		- editable: whether the column values are editable. Changes are persisted to local storage and will survive browser refresh.
		- boldText: When the value in a particular column matches this text, it will be bolded.
		- widthPct: Relative width percentage for a particular column, is used for the CSS grid layout. The values for all columns should total 	100 for the grid to display correctly.
		Sample Columns:
		const columns = [
			{name: 'id', widthPct: 20},
			{name: 'manufacturer', searchable: true, editable: true, boldText: 'Ford', widthPct: 40},
			{name: 'model', searchable: true, editable: true, upperCase: true, widthPct: 40}
		]
		If you have a field in your rows that isn't in the columns, that's fine, it just won't show up in the grid. 

- For styling I used styled-components, though I focused more on functionality than style. Companies will usually have their own specific way of styling components, such as a specific Sass implementation or something from their style guide platform.

# TODO - things I would add/change with more time
- If more functionality is needed I would split Grid.js into multiple files and components. 
- Given more requirements I would do something more specific with the styling.
- Also given more requirements/time I would adjust the behavior when the user enters a lot of text into a field. Should the column width expand? Should it wrap?
- Exception Handling: I would assume exception handling would be performed in the container code for this component, probably based on an environment variable. Normally debug environments give the developer the specifics and production environments provide something more user-friendly.
- Typescript: I ran out of time for this exercise but I would implement types for the component, integrating with whatever compile process the application uses. 
- Additional complexity may merit a switch from useState to useReducer.
- More refactoring for performance, if complexity increases maybe look at memoization for some things, for example.