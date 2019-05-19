##嵌套读取文件
##如果回调层数太多，称为回调地狱
##使用es6中的promise来解决回调地狱的问题
##promise的本质是干什么？
###：目的就是单纯的解决回调地狱的问题
1. Promise 是一个构造函数，既然是构造函数，那么，我们就可以new Promise（） 得到一个Promise实例；
2. 在Promise上，有两个函数，分别叫做resolve（成功之后的回调函数）和reject（失败后的回调函数）
3. 在Promise构造函数的 Prototype 属性上，有一个 .then()方法，也就是说，只要是Promise 构造函数创建的实例，都可以访问到 .then()方法
4. 如果Promise 表示一个异步操作；每当我们 new  一个Promise 的实例，就表示一个具体的异步操作
5. 既然 Promise 创建的实例是一个异步操作，那么这个异步操作的结果只能有  两种状态：
* 5.1 状态一：异步执行成功了，需要在内部调用 成功的回调函数 resolve 把结果返回给调用者
* 5.2 状态二：异步执行失败了，需要在内部调用 成功的回调函数 reject 把结果返回给调用者 
* 5.3 由于Promise的实例，是一个异步操作，所以内部拿到操作的 结果 后 ，无法使用 return 把操作结果返回给调用者，这时候，只能使用回调函数的形式，来把成功 或 失败的结果，返回给调用者
6. 我们可以在 new 出来的 Promise 实例上，调用 .then（）方法，【预先】为这个Promise 异步操作，指定 成功（resolve）和失败（reject）回调函数

```
//这是一个具体的异步操作，其中 ，使用function 指定一个具体的异步操作
//每当new一个Promise实例的时候，就会立即执行这个异步操作中的代码
//也就是说，new的时候，除了能够得到一个promise实例之外，还会立即调用 我们为promise构造函数传递的那个function，然后执行这个function中的异步操作代码
var promise=new Promise(function(){
    //这个function内部就是具体的异步操作！！
})
```
* 使用resolve  reject  .then（）方法
```
function getFileByPath(fpath){
    var promise=new Promise(function(resolve,reject){
        fs.readFile(fpath,'utf-8',(err,dataStr)=>{
            if(err) return reject(err)
            resolve(dataStr)
        })
    })
    //如果没有返回值，函数外面拿不到函数里面的东西，只能拿到返回的东西
    return promise
}
var p=getFileByPath('./files/2.txt')
//通过.then 指定成功 失败的回调
p.then(function(data){
    console.log(data)
},function(err){
    console.log(err.message)
})
```

##使用promise解决回调地狱
* 回调地狱
```
//嵌套读取文件
//如果回调层数太多，称为回调地狱
//使用es6中的promise来解决回调地狱的问题
getFileByPath(path.join(__dirname,'./files/1.txt'),(data)=>{
    console.log(data)
    getFileByPath(path.join(__dirname,'./files/2.txt'),(data)=>{
        console.log(data)
        getFileByPath(path.join(__dirname,'./files/3.txt'),(data)=>{
            console.log(data)
        })
    })
})

```
1. 封装的promise函数
```
const fs = require('fs')
function getFileByPath(fpath){
    return new Promise(function(resolve,reject){
        fs.readFile(fpath,'utf-8',(err,dataStr)=>{
            if(err) return reject(err)
            resolve(dataStr)
        })
    })
}
```
2. 解决回调地狱
```
先读取文件1，再读文件二，在读取文件三
注意：通过.then 指定 回调函数的时候，必须传 成功的回调函数，但是失败的回调函数可以不传
再上一个 .then 中，返回一个新的 promise 实例，可以继续使用下一个  .then 来处理

getFileByPath('./files/1.txt').then(function(data){
    console.log(data)
    return getFileByPath('./files/2.txt')
}).then(function(data){
    console.log(data)
    return getFileByPath('./files/3.txt')
}).then(function(data){
    console.log(data)
})
```
3. 抛出异常
* 1.  如果 ，前面的promise 执行失败，我们不想让后面的promise操作被终止，可以为每一个promise 手动指定失败的回调
```
getFileByPath('./files/11.txt').then(function(data){
    console.log(data)
    return getFileByPath('./files/2.txt')
},function(err){//指定失败的回调
    console.log('这是失败的结果'+err.message);
    //return 一个新的promise,不耽误后续的执行
    return getFileByPath('./files/2.txt')
}).then(function(data){
    console.log(data)
    return getFileByPath('./files/3.txt')
}).then(function(data){
    console.log(data)
})
```
* 2. 有时候,我们有这样的需求，同上面的需求刚好相反：如果 后续的promise执行，依赖于 前面promise执行的结果，如果前面的失败了，则后面的就没有执行下去的必要了，此时，我们想要实现，一旦有报错，就立即终止 promise 的执行
> 使用catch： catch 的作用：如果前面的有任何的 promise 执行失败，则立刻终止所有的promise 的执行，并马上进入 catch 去处理 promise 中抛出的异常
```
getFileByPath('./files/1.txt').then(function(data){
    console.log(data)
    return getFileByPath('./files/6.txt')
}).then(function(data){
    console.log(data)
    return getFileByPath('./files/3.txt')
}).then(function(data){
    console.log(data)
})
//catch 的作用：如果前面的有任何的 promise 执行失败，则立刻终止所有的promise 的执行，并马上进入 catch 去处理 promise 中抛出的异常
.catch(function(err){
    console.log('这是自己的处理方式：'+ err.message)
})

```


## jquery中的promise

```
    <script>
        $(function(){
            $('#btn').on('click',function(){
                $.ajax({
                    url:'',
                    type:'get',
                    dataType:'json',
                    // //往常的写法
                    // success:function(data){
                    //     console.log(data)
                    // }
                })
                    .then(function(data){
                        console.log(data)
                    })
            })
        })
    </script>
```