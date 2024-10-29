
# Client

This is a React Application. This layout is best build for Mobile but still can be used pretty well in bigger screens ( with vertical whitespaces on both sides... Lol ! I will try to fix that later. )

### Tech Used
- React -> For the core of the Application
- Material UI -> For styling and components
- Redux Toolkit -> For managing states
- axios -> For HTTP requests
- react-router-dom -> For Routing between pages
- realm -> For Real Time Sync

The Real Time Sync is enabled due to the Realm library which keeps the logs of changes in a particular collection in the MongoDb Database. When any changes takes place it updates the states and using this state change as a reference we can easily update our applications states by an API to get the fresh data.

You can also use Socket.io for the real time data communication between the connection that socket establishes. 

This has been deployed to vercel. Here is the link - 


You can also run locally by cloning this Repo


## Run Locally

After cloning go to the Client directory:
```bash
  cd client
```

Then you need to install the dependencies:
```bash
  npm install
```

Then You can start the project:
```bash
  npm run start
```
    


## Project Structure
