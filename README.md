# fabcar_web_2
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


