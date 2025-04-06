# Breakable Toy by Diego Escalante Maldonado 

This project was developed using React for the front-end and Java for the back-end (Spring boot).
All the app run from the [App]("src/App.tsx) component and inside of it I put other components.
# Components breakdown
## Search Filter Controls
Is the top of the app. Here you can search the tasks that exist in the database (well, were not using a database right now, it's just a list in the api).
You can search by the <b>name of the task</b> (totally or partially), the <b>priority</b> and if is <b>completed or not</b>.
You need to click the <b>search button</b> to receive that data from the api. 
There's also a <b>List all button</b> so you can show again all the tasks without needing ro refresh the browser.
## New To Do
The <b>New To Do component</b> it's the button used to show the modal where we can fill the form to create a new task.
### New To Do Modal
This modal appears in front of everything and blocks everything behind it. Here you need to enter the name of the task,
the priority and the due date (you can leave this field empty, the other two are required).
When you click the <b>Add to do button</b> the data is sent to the api (using <i>fetch</i>).
## Task Table
This component shows all the tasks that are currently in the api. Here, you can interact with them: 
Edit, delete, change page (a page shows only 10 tasks), consult the metrics, mark as done, etc.
The row background color changes depending on how close to the due date you are (red = 1 week, yellow = 2 weeks, green more than 2 weeks).
The tasks with no due date have a gray background.
## Metrics Panel
In the client request, the metrics panel is in the bottom of the page (below the task table) but I thought that looks kind of
cramped, so I decided to put sideways panel with the metrics. If the client wants the original idea I can change it to that.
It shows you the average time that takes you to complete your tasks (all tasks and by priority level).
## React Context
I decided to use React context, that way I can access the task data from anywhere in the app (avoiding the <i>prop drilling</i>).
In this context I interact with the api and with the data (some process are controlled by this app, other ones are made on the api)... (Also because Redux is harder than this...).
## Validations
Most of the validations for the tasks (the name is required, the priority is required, etc.) are made here, in the React app, so they are not required in the api.
Anyway, I also wrote some validations in the api, but the data should be sent ready to be stored. 


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
