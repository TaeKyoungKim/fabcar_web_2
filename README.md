fabcar_web_2

OS : ubuntu1.8 버전

##### Install Samples, Binaries and Docker Images

```shell
# curl -sSL http://bit.ly/2ysbOFE | bash -s -- <fabric_version> <fabric-ca_version> <thirdparty_version>
curl -sSL http://bit.ly/2ysbOFE | bash -s -- 1.4.7 1.4.7 0.4.21
```



- `configtxgen`,
- `configtxlator`,
- `cryptogen`,
- `discover`,
- `idemixgen`,
- `orderer`,
- `peer`,
- `fabric-ca-client`,
- `fabric-ca-server`

필요 라이브러리 포함



프로젝트 생성

```shell
mkdir fabcar_web_2 && cd fabacar_web_2 && npm init -y 
```



fabcar_web_2 폴더에 네트워크 및 체인코드 최소 필요 파일을 fabric-samples 폴더에서 복사해서 붙여넣는다.

최소 필요 폴더 

![](C:\Users\pc\Desktop\수업관련이미지\folder.PNG)



nodejs를 활용한 웹 구성을 위한 구조생성

![](C:\Users\pc\Desktop\수업관련이미지\folder_1.PNG)



models , public , routes , scripts , views  , utils을 mkdir 명령을 이용한 폴더 생성

wallet 은 node enrollAdmin.js를 실행하면 생성되는 폴더





### 테스트 

fabcar 폴더로 이동 

./startFabric.sh javascript 실행



cd javascript 실행

javascript폴더에 wallet폴더가 존재하면 삭제후 다음을 실행

node enrollAdmin.js

Wallet path: /home/bstudent/fabcar_web_2/fabcar/javascript/wallet
Successfully enrolled admin user "admin" and imported it into the wallet ㅎ



node registerUser.js

Wallet path: /home/bstudent/fabcar_web_2/fabcar/javascript/wallet
Successfully registered and enrolled admin user "user1" and imported it into the wallet



node query.js 



node invoke.js



다시 fabcar 폴더의 ./startFabric.sh javasript 실행을 통해서 네트워크 초기화 및 다시 네트워크 구성



enrollAdmin.js파일에 fabcar/javascript/enrollAdmin.js 파일을 복사 붙여넣기 한후 

```javascript
const ccpPath = path.resolve(__dirname, '..', '..', 'basic-network', 'connection.json');

```

을



```javascript
const ccpPath = path.resolve(__dirname, 'basic-network', 'connection.json');

```

다음과 같이 수정



registerUser.js파일에 fabcar/javascript/registerUser.js파일을 복사 붙여넣기 한후 

```javascript
const ccpPath = path.resolve(__dirname, '..', '..', 'basic-network', 'connection.json');

```

을



```javascript
const ccpPath = path.resolve(__dirname, 'basic-network', 'connection.json');

```

다음과 같이 수정



```shell
node enrollAdmin.js 
```

실행

Successfully enrolled admin user "admin" and imported it into the wallet 메세지 확인

admin 등록





```shell
node registerUser.js 
```

실행

Wallet path: /home/bstudent/fabcar_web_2/wallet
Successfully registered and enrolled admin user "user1" and imported it into the wallet 메세지 확인

User 등록(user1)





app.js파일 코드 추가

```javascript
var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var ejs = require('ejs')
var app = express()
require('dotenv').config()
//templetes file settings
app.set('views', path.resolve(__dirname + '/views'))
app.set('view engine', 'ejs')

//body-parser

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


//cors 처리
var cors  = require('cors')
app.use(cors())


app.get('/',(req, res , next)=>{
    res.send("Success")
})

var port = process.env.PORT || 3000
app.listen(port , ()=>{
    console.log(`Server is Starting at http://localhost:${port}`)
})
```



routes/Router.js 코드 추가

```javascript
var router = require('express').Router()

router.get('/',(req, res , next)=>{
    res.render('index')
})

module.exports = router;
```



views/_header.ejs

```ejs
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

    <title>BlockChain</title>
</head>
<body>
```

views/_footer.ejs

```ejs
</body>
</html>
```





views/index.ejs 생성 및 코드 추가

```ejs
<%- include('_header.ejs') -%>
<h1>Index Page</h1>

<%- include('_footer.ejs') -%>
```



app.js 파일 수정

``` javascript
app.get('/',(req, res , next)=>{
    res.send("Success")
})
삭제
```

```javascript
....
var apiRouter = require('./routes/Router')
...

//routing파일 등록
app.use('/', apiRouter)
```

추가



메뉴바 작성

views/_header.ejs 파일 수정

```ejs
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">
    <link href="css/sb-admin-2.min.css" rel="stylesheet">
    <link href="vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet">
    <title>BlockChain</title>
</head>
<body>
        <nav class="navbar navbar-expand-lg navbar-light bg-warning">
                <a class="navbar-brand" href="/">FabCar</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
              
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                      <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="/createcar">CreateCar</a>
                    </li>
                    
                    <li class="nav-item">
                      <a class="nav-link " href="/changeowner">ChangeOwner</a>
                    </li>
                  </ul>
                  <form name="myForm" onsubmit="return validateForm()" class="form-inline my-2 my-lg-0" method="GET" action="/searchdata">
                    <input class="form-control mr-sm-2" name="search" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                  </form>
                  <script>
                  function validateForm() {
                        var x = document.forms["myForm"]["search"].value;
                        var dataX = x.slice(0,3)
                        
                        if (dataX != "CAR") {
                            alert("CAR + 넘버의형태로 입력해야 합니다");
                            return false;
                        }
                            return true
                        
                        }
                  </script>
                </div>
              </nav>
```



views/_footer.ejs

```ejs
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
<!-- Bootstrap core JavaScript-->
<script src="vendor/jquery/jquery.min.js"></script>
<script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

<!-- Core plugin JavaScript-->
<script src="vendor/jquery-easing/jquery.easing.min.js"></script>

<!-- Custom scripts for all pages-->
<script src="js/sb-admin-2.min.js"></script>

<!-- Page level plugins -->
<script src="vendor/datatables/jquery.dataTables.min.js"></script>
<script src="vendor/datatables/dataTables.bootstrap4.min.js"></script>

<!-- Page level custom scripts -->
<script src="js/demo/datatables-demo.js"></script>
</body>
</html>
```





utils/Util.js 파일에   network에 query 및 invoke 코드 추가하기 위해 fabcar/query.js 와  invoke.js 파일을 참조해서 응용

query.js 있는 



```javascript
/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..', '..', 'basic-network', 'connection.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

async function main() {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('user1');
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');

        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        const result = await contract.evaluateTransaction('queryAllCars');
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

main();

```

 

```javascript
/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');


const ccpPath = path.resolve(__dirname, '..', 'basic-network', 'connection.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);


async function query_all_data() {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('user1');
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');

        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction('queryAllCars');
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        return result.toString();
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

module.exports=query_all_data;
```



이부분을 추가 

```javascript
ccpPath 부분에서 __dirname, '..', 'basic-network', 'connection.json' 부분을basic-network 경로를 상대적으로 설정을 해줘야 한다.

contract.evaluateTransaction('queryAllCars'); 
queryAllCars는 chaincode 함수로 정의 내려진 부분이고 이 함수는 조회를 하는 함수이므로 
evaluateTransaction()메소드를 사용하였다.
```



routes/Router.js파일에 

```javascript
router.get('/',(req, res , next)=>{
    res.render('index')
})
```



이부분에 Util.js 파일에 함수를 활용한다.



```javascript
....
var Util = require('../utils/Util')
....

router.get('/', async (req, res , next)=>{
    var result  = await queryUtil()
    var resultData  = await JSON.parse(result)
    
    console.log(resultData)
    // res.send(resultData)
    res.render('index', {data:resultData})
})
```

으로 수정



테스트를 진행하기 위해 

```shell
node app.js 
실행
```

클라이언트에서 http://localhost:8000 get방식으로 접속하고 

console창을 확인해서 데이터가 잘 받아지는 확인한다.



index.ejs에서 Table에 받아온 데이터를 보여주기 위해 다음과 같이 코딩

```ejs
<%- include('_header.ejs') -%>
<!-- DataTales Example -->
  <div class="card shadow mb-4">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-primary">Car Example</h6>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
          <thead>
            <tr>
                <th>NO</th>
                <th>KEY</th>
                <th>COLOR</th>
                <th>DOCTYPE</th>
                <th>MAKE</th>
                <th>MODEL</th>
                <th>OWNER</th>
                <th>비고</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
                <th>NO</th>
                <th>KEY</th>
                <th>COLOR</th>
                <th>DOCTYPE</th>
                <th>MAKE</th>
                <th>MODEL</th>
                <th>OWNER</th>
                <th>비고</th>
            </tr>
          </tfoot>
          <tbody>
              <% for(i=0;i<data.length; i++) {%>
                  <tr>
                    <td><%= i+1 %></td>
                    <td><%= data[i].Key %></td>
                    <td><%= data[i].Record.color %></td>
                    <td><%= data[i].Record.docType %></td>
                    <td><%= data[i].Record.make %></td>
                    <td><%= data[i].Record.model %></td>
                    <td><%= data[i].Record.owner %></td>
                    <td><button>수정</button></td>
                  </tr>
                  <% } %>
            </tbody>
</table>
          <%- include('_footer.ejs') -%>
```





수정

http://localhost:8000 클라이언트에서 접소

![](C:\Users\pc\Desktop\수업관련이미지\localhost8000.PNG)

페이지 확인



static 파일을 등록해서  

app.js

```javascript
//static file 등록
app.use(express.static(__dirname +'/public'))
```



public 폴더에 필요한 static 파일 등록후 사용

![](C:\Users\pc\Desktop\수업관련이미지\static.PNG)

등의 형식으로 사용



CAR 조회 기능 추가

Util.js 파일 수정

```javascript
/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..', 'basic-network', 'connection.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);


async function query_all_data() {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('user1');
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');

        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction('queryAllCars');
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        return result.toString();
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}
async function query_data(searchdata) {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('user1');
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');

        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction('queryCar', searchdata);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        return result.toString();
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

var query ={
    queryAllData: query_all_data,
    queryData : query_data
}
module.exports=query;
```

Router.js

```javascript
var router = require('express').Router()
var queryUtil = require('../utils/Util')

router.get('/', async (req, res , next)=>{
    var result  = await queryUtil.queryAllData()
    var resultData  = await JSON.parse(result)
    
    console.log(resultData)
    // res.send(resultData)
    res.render('index', {data:resultData})
})

router.get('/searchdata', async (req, res , next)=>{
    console.log(req.query.search)
    var searchdata = req.query.search
    var result  = await queryUtil.queryData(searchdata)
    var resultData  = await JSON.parse(result)
    
    console.log(resultData)
    // res.send(resultData)
    res.render('searchdata', {data:resultData, KEY:searchdata})
})

module.exports = router;
```



과 같이 수정



views/searchdata.ejs 생성 및 코드 추가

```ejs
<%- include('_header.ejs') -%>
    
        <!-- Begin Page Content -->
        <div class="container-fluid">

                <!-- Page Heading -->
                <div class="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 class="h3 mb-0 text-gray-800">Search Data</h1>
                </div>
      
                <div class="row">
      
                  <!-- Earnings (Monthly) Card Example -->
                  <div class="col-xl-3 col-md-6 mb-4">
                    <div class="card border-left-primary shadow h-100 py-2">
                      <div class="card-body">
                        <div class="row no-gutters align-items-center">
                          <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">COLOR</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800"><%= data.color %></div>
                          </div>
                          <div class="col-auto">
                            <i class="fas fa-calendar fa-2x text-gray-300"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
      
                  <!-- Earnings (Annual) Card Example -->
                  <div class="col-xl-3 col-md-6 mb-4">
                    <div class="card border-left-success shadow h-100 py-2">
                      <div class="card-body">
                        <div class="row no-gutters align-items-center">
                          <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">docType</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800"><%= data.docType %></div>
                          </div>
                          <div class="col-auto">
                            <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
      
            <!-- Tasks Card Example -->
            <div class="col-xl-3 col-md-6 mb-4">
                    <div class="card border-left-info shadow h-100 py-2">
                      <div class="card-body">
                        <div class="row no-gutters align-items-center">
                          <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-info text-uppercase mb-1">제조사</div>
                            <div class="row no-gutters align-items-center">
                              <div class="col-auto">
                                <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800"><%= data.make %></div>
                              </div>
                              <div class="col">
                                <div class="progress progress-sm mr-2">
                                  <div class="progress-bar bg-info" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-auto">
                            <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
      
                  <!-- Pending Requests Card Example -->
                  <div class="col-xl-3 col-md-6 mb-4">
                    <div class="card border-left-danger shadow h-100 py-2">
                      <div class="card-body">
                        <div class="row no-gutters align-items-center">
                          <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-danger text-uppercase mb-1">차소유주</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800"><%= data.owner %></div>
                          </div>
                          <div class="col-auto">
                            <i class="fas fa-comments fa-2x text-gray-300"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                 <!-- Pending Requests Card Example -->
                 <div class="col-xl-3 col-md-6 mb-4">
                    <div class="card border-left-warning shadow h-100 py-2">
                      <div class="card-body">
                        <div class="row no-gutters align-items-center">
                          <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">모델</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800"><%= data.model %></div>
                          </div>
                          <div class="col-auto">
                            <i class="fas fa-comments fa-2x text-gray-300"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
               
                 <a href="/savedata/<%= KEY %>" class="btn btn-danger btn-icon-split">
                    <span class="icon text-white-50">
                      <i class="fas fa-exclamation-triangle"></i>
                    </span>
                    <span class="text">Save At my DB</span>
                  </a>
                
<%- include('_footer.ejs') -%>

```

과 같이 추가





utils/Util.js



Router.js파일에 

```javascript
router.get('/create' ,(req, res , next)=>{
    res.render('create')
})
```

views/create.ejs

```ejs
<%- include('_header.ejs') -%>
<form method="POST" , action="/create">
    <div class="form-group">
      <label for="exampleInputEmail1">Unique Key</label>
      <input type="text" name="KEY" value=""class="form-control"  required >
    </div>
    <div class="form-group">
            <label for="exampleInputEmail1">COLOR</label>
            <input type="text" name="color" value=""class="form-control"  required>
          </div>
    <div class="form-group">
        <label for="exampleInputEmail1">MAKE</label>
        <input type="text" name="make" value=""class="form-control"  required>
        </div>
    <div class="form-group">
        <label for="exampleInputEmail1">MODEL</label>
        <input type="text" name="model" value=""class="form-control"  required>
    </div>
    <div class="form-group">
        <label for="exampleInputEmail1">OWNER</label>
        <input type="text" name="owner" value=""class="form-control"  required>
    </div>

   
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>

<%- include('_footer.ejs') -%>
```

utils/Util.js



```javascript
var create_car = async (KEY ,color,make,model,owner)=>{
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('user1');
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');

        // Submit the specified transaction.
        
        await contract.submitTransaction('createCar', KEY ,color,make,model,owner);
        const result = await contract.evaluateTransaction('queryCar', KEY);
        console.log('Transaction has been submitted'+ result.toString());

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}
```

추가

```javascript
var query ={
    queryAllData: query_all_data,
    queryData : query_data,
    createCar :create_car
}
```



수정



Router.js



```javascript
router.post('/create' ,async (req, res , next)=>{
    console.log(req.body.KEY)
    var KEY = req.body.KEY
    var color = req.body.color
    var make = req.body.make
    var model = req.body.model
    var owner =  req.body.owner

    await queryUtil.createCar(KEY ,color,make,model,owner)
    
    await res.redirect("/")
})
```

추가한다.