App: Contact Details
Single page web application where we can see contact information with searching, sorting, and filtering. Also have add, edit, delete functionality for contact.

This single page application is showing the contact list of user in table format.User consist data of first name, last name, email, phone, status(active/inactive).
Application having header with application name. 
Below the header, application having button for add new contact. 
On left side, there is list of status i.e. Active and Inactive which is used for filtering purpose.
And on right hand side, table of contact information with pagination is displayed with edit and delete button on each row. Also provided sorting for every column.
On top table, there is search bar for search purpose(I can make it for generic purpose but because of time concern I implemented for firstname)
*For this assignment I am using dummy data

Current project folder structure:
src:
	App.css 
	App.test.js
	index.css 
	logo.svg 
	serviceWorker.js
	App.js
	index.js
	setupTests.js

	utils(For resusable and common functionality of javascript) 
		paginate.js
	
	components
			common (For resusable and common components)
					form.jsx 
					input.jsx 
					listGroup.jsx 
					pagination.jsx 
					searchBox.jsx
					select.jsx 
					table
						index.jsx  
						tableBody.jsx 
						tableHeader.jsx
			contacts
					contactForm.jsx  
					contactTable.jsx  index.jsx	
					
			notFound
					notFound.jsx
					
	services
		fakeContactService.js


Folder structure I mostly flow:
src:
	App
	components (Only responsilble for displaying data)
		common : for most reusable components
			Ex. : Table (Table folder with two file: index.js and index.css)
		ContactTable : index.js and index.css
				
	containers :		(Mostly in this folder we keep components that are connected to reducer )
			Contacts  : index.js and index.css : In this index.js,we write our logic for conneting to reducer and for dispatching an action. Its also responsilble for passing data to components which are only responsilble for display purpose
	
	action: (This folder contins different action files responsilble for individual. Ex. User : userAction.js(containg action like:getUsers,addUser,etc ), Contact: contactAction.js)
			contactAction.js
	reducer: (This forlder contains different reducer files similar like action which are responsilble for updating store) and we combine all store in one(index.js or main.js)
			index.js
			contactReducer.js
	saga(This forlder contains different saga files similar like action which are responsilble for fetching data from server) 
		
	assets : for static data files

	utils : common and most reusable functionality code 	
			

 To run project:
 1. Clone project from git repo
 2.  Run command : npm install (To install dependecies)
 3.  Run command : npm start (To run project)          