# Usage Guide

Follow the following instructions to run the application locally.

### Step 1

Open command prompt(`cmd`) in folder where you want to add the project.

### Step 2

Run the following command to clone the repository:
```
git clone https://github.com/rakibul58/batch-3-assignment-2.git
```

### Step 3

Open the cloned folder or run the following in cmd:

```
cd batch-3-assignment-2
```

### Step 4

In the cloned folder run the following command on cmd:

```
npm install
```

### Step 5

On the root directory add a `.env` file and add your database url and other environment variables bellow:

```
NODE_ENV=development
PORT=5000
DATABASE_URL=
```

### Step 6

Run the following code to start the development server:

```
npm run start:dev
```

Other commands can be found in package.json scripts