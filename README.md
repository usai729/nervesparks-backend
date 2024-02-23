<h1>
    ENDPOINTS
</h1>

<br>

/api/auth - To auth actions <br>

- `/api/auth/login [POST]`<br>
- `/api/auth/register [POST]`<br>
- `/api/auth/changepwd [PUT]`<br>
- `/api/auth/logout [POST]`<br>

  /api/ud - The actions common to user and dealer - Create common REST endpoints for both user and dealership:<br>

- `/api/ud/cars [GET]` To view all cars.<br>
- `/api/ud/cars/:dealer [GET]` To view all cars in a certain dealership. <br>
- `/api/ud/deals/:dealer [GET]` To view all deals from a certain dealership. <br>
- `/transac?car=&dealer= [POST]` To add new vehicle to the list of owned/sold vehicles at user/dealership end after a deal is complete. <br>

  /api/user - To user actions - Create REST endpoints for user<br>

- `/api/user/dealer/:car [GET]` To view dealerships with a certain car<br>
- `/api/user/cars [GET]` To view all vehicles owned by user along with dealer info. <br>
- `/api/user/deals/:car [GET]` To view all deals on a certain car.<br>

  /api/dealer - to dealer actions - Create REST endpoints for dealership<br>

- `/api/dealer/add/car [POST]` To add cars to dealership.<br>
- `/api/dealer/add/deal [POST]` To add deals to dealership.<br>
- `/api/dealer/sold [GET]` To view all vehicles dealership has sold along with owner info.<br>
  <br>
  Steps to start the backend server:<br>

```
  npm install
  nodemon
```

  <br>
  .env contents

```
CONN_STR = ""
DB = ""
SECRET_JWT = ""
PORT =
```
