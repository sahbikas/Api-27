## NODE API SERVER

-API ==> Application Programming interface

## Response Format
    - should be in json format
     - the json should contain:
     ...{
      result: <any>
      message: <string>
      meta: null | object
     ....}
a.request
   -method
   -endpoint
     protocol://url/params/queryString
     http==> 80
     https ==> 443
     fip ==> 21
     sftp ==> 22
     smtp ==> 25
   -data
      - url
         -params
         -query string
     - body
         -multipar/form-data
         - x-www-urlencoded
         -application/json
 - http package
   -node server enviromemt
- express package
  - server program
- http package 
  - express application (server side)
   - socket
   - graph
   -smtp


 Ports ===> 0-2^16-1 => 0-65535

 Ecommerce 
    -Banner
       -CRUD
          - detail id
          - list all
          - list by home
    - user
       -CRUD
          - detail id
          - list all
          - based on seller
    -Product
       -CRUD
          - detail id
          - list all
          - based on seller
    - Brand
        -CRUD
         
          - list all
          - detail id
    -Category
       -CRUD
    - Order
        -CRUD
    - review
        -CRUD
    -Blogs
      -CRUD
    - Transaction
         -CRUD

 # Monolithic
 ## MicroService

 # desing Mvc pattern

     -model
        ---> database operation
    -View
       --> Presentation 
    -Controller
        --> Business Logic

e.g. 
  url ===> Login implete
  Server
     Route =====> controller =====> Model ====> Db server ===> View / response


     close  Route ===> Middleware ==> controller ==> Service/Repository ===> Model ====> Db server 


## Express js

    .use('url), callbackfunction(requrest, rersponse)

## Middleware
   - Every function /actions mounting on express app is a middleware 
    - At least 3 arguments or eles 4
       - first: always request or error object
       - second: always response or request
       - third: always  net scope (cb function) or response
       - fourth: nothing or next scope(cb)

       e.g (req, res, next)
       or
       (error, req, res, next)

a. application level middleware

## Controller

## REST API

Representation Stateless transfer
 CRUD
   - Create
      .post(url, callback)
    - Read
       .get(url, callback)
    - Update 
      .put(url, callback), .patch(url, callback)
    - Delete
      .delete(url, callback)


## Project  Model
### Auth and  Authorization

 - register
 - virify Token/opt
 - User Activate

 - Forget password Email
 - Reset Password

 - Login
 - logout
 - Profile access
 - User Upadate


 Register User 
   ---> Payload get (name, email, role, Tood: image)
      ---> User Register
        --->validate
          ---> Modelling opt code generate
            ----> DB Store
               ---> Email / SMS Sent
                 ---> Response Success
Error Responses:
422 ===> validation exception with body
400 ==> validation  exception without body

name: 
---> string min 2, max: 50, should be only alpha value with space, and phonnetic sounds chearacters(a)

token / opt
 -> data --> Validate --> (token generate) --> Modelling --> DB store --> Notification
             ------> notification email
             ------> notification email , sms
                    ---> email ===> SMTP
                    ----> SMS ===> Country?Interntional GSM Service (purchased package)
                          ------> NTC< NEELL< Smartcell



login flow
  --> Data --> validate --> DB Check
                             --> email, statuse = inaciteve
      node server            SMTP Server
      connection ------------> Ack
      Email Data -------------> Queue
                     ---------->Process ====> Receiver Mail send (Internet)
      Email Send <------------- Ack <-------


## Storage

### Files json, cvs, excel
### Database Server
   --> Foramt/ systematic order
   --> Process/Manipulate
       --> Relational DB MS
         Sql, my, postgreaql, mssql, oracle,
           - table
               row-column
            - table
          ---> Non-Relational DBMS
          Nosql
            - mongodb , couchdb, orientdb, marklogic server
              document
      
      user
        ====> seller
      product

      product ===> seller

      product ====> order <=== Customer 


      seller

        

      Customer

   Nosql
     - Redundacy 
Mongodb
       =====> in forms core driver
  -mongodb core driver
  - mongoose ODM Proivder
pgsql

    - pgsql mysql, mssql, oracle
       -----> sequelize
        -----> typeorm (ts)
        ------> prism (js, ts)
        ORM


Mongodb
   -free
       - 1 account 512mb of storage
         - configure
            - 1vcpu. 128mb Ram,
            mongodb hosted latest
      - entreprise 
         - custom



protocol     mongodb
url             127.0.0.1, localhost => ::1
port          27017
auth
   username      not required
   password       nor required


protocol 
     localhost: mongodb
     Atlas : mongodb+Srv
   Host: 
      localhost: 127.0.0.1
      Atlas: cluster0.nssla.mongodb.net/
   port :
      localhost: 27017,
      Atlas: <DBUserName>
   password: 
     localhost: not needded
     Atlas: <DBUserName-password>


Database
   table ---> Collection
   row ---> Document
   (Dataset)
   Column --> keys
   bson data type


   CRUD
      Create
        -> insertOne()
        -> insertMany()

        e.g
          <activeDbConnectionobj>.collection("user).insertMany
           <activeDbConnectionobj>.collection("user).insertOne


shell
  db.users.insertOne
  db,users.insertMany

Read
   --> find(fillter, projection, options)
   --> findOne(fillter, projection, options)



### Filter
  where clause
     --> conditions
        -> json format


   E.g db.users.find({role: "seller}, statuse: "active");
   SQL:

   --> SELECT* FROM users WHERE role = 'seller', AND status = 'active'


$gt ==> Greater than
$gte ===> Greater than or equal to
$it ===> Less than
$lte ===> Equals to
