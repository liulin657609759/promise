const fs = require('fs')
function getFileByPath(fpath){
    return new Promise(function(resolve,reject){
        fs.readFile(fpath,'utf-8',(err,dataStr)=>{
            if(err) return reject(err)
            resolve(dataStr)
        })
    })
}

//先读取文件1，再读文件二，在读取文件三
//注意：通过.then 指定 回调函数的时候，必须传 成功的回调函数，但是失败的回调函数可以不传
//再上一个 .then 中，返回一个新的 promise 实例，可以继续使用下一个  .then 来处理

// getFileByPath('./files/1.txt').then(function(data){
//     console.log(data)
//     return getFileByPath('./files/2.txt')
// }).then(function(data){
//     console.log(data)
//     return getFileByPath('./files/3.txt')
// }).then(function(data){
//     console.log(data)
// })


//如果 ，前面的promise 执行失败，我们不想让后面的promise操作被终止，可以为每一个promise 手动指定失败的回调

// getFileByPath('./files/11.txt').then(function(data){
//     console.log(data)
//     return getFileByPath('./files/2.txt')
// },function(err){//指定失败的回调
//     console.log('这是失败的结果'+err.message);
//     //return 一个新的promise,不耽误后续的执行
//     return getFileByPath('./files/2.txt')
// }).then(function(data){
//     console.log(data)
//     return getFileByPath('./files/3.txt')
// }).then(function(data){
//     console.log(data)
// })


//有时候,我们有这样的需求，同上面的需求刚好相反：如果 后续的promise执行，依赖于 前面promise执行的结果，如果前面的失败了，则后面的就没有执行下去的必要了，此时，我们想要实现，一旦有报错，就立即终止 promise 的执行

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
