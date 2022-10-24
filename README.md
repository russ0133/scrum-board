
# Firebase Scrum Board with Drag'n'drop.
### Important: I recommend logging in the default email and password (test@test.com / 123456) instead of registering a new account, since the Firebase database is unsecured. If needed to register a new account, use mock email and password (there's no validation).

👀 Displays a list of tasks in a scrum/kanban board style, allows the user to delete/add and drag task cards to different lists using the mouse. 

🚕 Supposed to mimic the UI from apps like Trello. 

#### 🚀 Deployed [here](https://scrum-board-c19b4.web.app/app) on Firebase Deployment.

## API Reference
### Interfaces:
#### Interface ColumnObject:
Model of data inside each column (column = to-do, done...) 

    order: number;                // The order for the column to be displayed in relation to the others, lower values shows more to the left. Unique value.
    title: string;                // Title of the column.
    items: Array of Task;         // The task cards that are currently inside this column.



#### Interface Task:
Models the data inside each task card (task = "wash dishes", "swipe the floors"...) 

    id: string;                // Unique identifier. Generated with UUIDv4
    content: string;          // Title of the task card.


### Firebase:
#### -> getUser(ownerId: string)
Gets all data from 'user' collection where document field uuid equals to {ownerId}

#### -> updateUserColumns(uid: string, column: ColumnObject)
Updates the field 'columns' with the data from {column} from the 'users' collection where document field uuid equals to {uid}

#### -> logInWithEmailAndPassword(email: string, password: string) 
Calls Firebase's method signInWithEmailAndPassword to check if there's a registered user with {email} and {password}.

#### -> registerWithEmailAndPassword(name: string, email: string, password: string)
Calls Firebase's method createUserWithEmailAndPassword to create a user with {email} and {password}, also adds a document in collection 'users' with a field {name} and default columns/task cards.

### State Management:

    userData.loggedIn: boolean;                // True if authenticated, false if not.
    userData.uid: string;                      // UID returned by Firebase after authentication.
    userData.columns: Column[]                  // Array of columns for the logged-in user, returned by Firebase.

#### -> setColumn(column: ColumnObject)
Sets the data in userData.columns to the values passed to the function.

#### -> addTask(columnId: string, content: string)
Adds a new task card to the column with id {columnId} with the content as {content}.

#### -> deleteTask(columnId: string, cardIndex: number)
Removes the task card with index {cardIndex} from column with id {columnId}.

#### -> login()
Sets userData.uid to the uid returned by firebase and userData.loggedIn to true after it's own authentication method is called.

#### -> logout()
Sets userData.uid to null and userData.loggedIn after Firebase's own logout method is called.



## Run Locally

Clone the project

Go to the project directory

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Tech Stack

**Client:** React, Typescript, Mantine, React-beautiful-dnd, Zustand, Immer


## Authors

- [@russ0133](https://www.github.com/russ0133)

