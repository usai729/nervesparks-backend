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

- `/api/ud/cars [GET]`<br>

- `/api/ud/cars/:dealer [GET]`<br>
- `/api/ud/deals/:dealer [GET]`<br>

  /api/user - To user actions - Create REST endpoints for user<br>

- `/api/user/dealer/:car [GET]`<br>
- `/api/user/cars [GET]`<br>
- `/api/user/deals/:car [GET]`<br>

  /api/dealer - to dealer actions - Create REST endpoints for dealership<br>

- `/api/dealer/add/car [POST]`<br>
- `/api/dealer/add/deal [POST]`<br>
- `/api/dealer/sold [GET]`<br>
  <br>
  Steps to start the backend server:<br>
- `npm install`
- `nodemon`
  <br>
  .env contents<br>

```
CONN_STR = ""
DB = ""
SECRET_JWT = ""
PORT =
```
