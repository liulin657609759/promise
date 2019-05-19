
// 1. Promise 是一个构造函数，既然是构造函数，那么，我们就可以new Promise（） 得到一个Promise实例；
// 2. 在Promise上，有两个函数，分别叫做resolve（成功之后的回调函数）和reject（失败后的回调函数）
// 3. 在Promise构造函数的 Prototype 属性上，有一个 .then()方法，也就是说，只要是Promise 构造函数创建的实例，都可以访问到 .then()方法
// 4. 如果Promise 表示一个异步操作；每当我们 new  一个Promise 的实例，就表示一个具体的异步操作
// 5. 既然 Promise 创建的实例是一个异步操作，那么这个异步操作的结果只能有  两种状态：
// 5.1 状态一：异步执行成功了，需要在内部调用 成功的回调函数 resolve 把结果返回给调用者
// 5.2 状态二：异步执行失败了，需要在内部调用 成功的回调函数 reject 把结果返回给调用者 
// 5.3 由于Promise的实例，是一个异步操作，所以内部拿到操作的 结果 后 ，无法使用 return 把操作结果返回给调用者，这时候，只能使用回调函数的形式，来把成功 或 失败的结果，返回给调用者
// 6. 我们可以在 new 出来的 Promise 实例上，调用 .then（）方法，【预先】为这个Promise 异步操作，指定 成功（resolve）和失败（reject）回调函数



//注意：这里new 出来的promise，只是代表【形式上】的一个异步操作，但是具体做什么事情，目前还不清楚
// var promise=new Promise()


const fs = require('fs')
//这是一个具体的异步操作，其中 ，使用function 指定一个具体的异步操作
//每当new一个Promise实例的时候，就会立即执行这个异步操作中的代码
//也就是说，new的时候，除了能够得到一个promise实例之外，还会立即调用 我们为promise构造函数传递的那个function，然后执行这个function中的异步操作代码
var promise=new Promise(function(){
    //这个function内部就是具体的异步操作！！
    fs.readFile('./files/2.txt','utf-8',(err,dataStr)=>{
        if(err) return err
        console.log(dataStr)
    })
})


//为了使他不立即执行，需要用函数包裹
// function getFileByPath(fpath){
//     var promise=new Promise(function(){
//         fs.readFile(fpath,'utf-8',(err,dataStr)=>{
//             if(err) throw err
//             console.log(dataStr)
//         })
//     })
// }
// getFileByPath('./files/2.txt')

//使用resolve  reject
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



//优化以上代码
//使用resolve  reject
// function getFileByPath(fpath){
//     return new Promise(function(resolve,reject){
//         fs.readFile(fpath,'utf-8',(err,dataStr)=>{
//             if(err) throw reject(err)
//             resolve(dataStr)
//         })
//     })
// }
// getFileByPath('./files/2.txt').then(function(data){
//     console.log(data)
// },function(err){
//     console.log(err.message)
// })