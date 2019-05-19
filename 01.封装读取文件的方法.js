//需求： 你要封装一个方法，我给你一个要读取文件的路径，你这个方法能帮我读文件，并把内容返回给我

const fs = require('fs')
const path = require('path')

//这是普通读取文件方式
// fs.readFile(path.join(__dirname,'./files/1.txt'),'utf-8',(err,dataStr)=>{
//     if(err) throw err
//     console.log(dataStr)
// })


//错误的方法

// function getFileByPath(fpath){
//     fs.readFile(fpath,'utf-8',(err,dataStr)=>{
//         if(err) throw err
//         // console.log(dataStr);
//         //readFile方法是异步函数，不在主线程执行，所以不能直接返回数据
//         return dataStr//输出undefined
//     })
// }
// var result = getFileByPath(path.join(__dirname,'./files/1.txt'))
// console.log(result);

//callback 回调函数
//初衷： 给定文件路径，返回读到的内容
// 我们可以规定一下，callback中，有两个参数，第一个是失败的结果，第二个是成功的结果
// 同时，我们规定了：若果成功后，返回的结果，应该位于callback参数的第二个位置，此时，第一个位置 由于没有出错，所以，放一个null；若果失败了，则在第一个位置放置一个Error对象，第二个位置放置一个undefined
function getFileByPath(fpath,callback){
    fs.readFile(fpath,'utf-8',(err,dataStr)=>{
        //如果报错了，进入if分支后，if后面的的代码就没有必要执行了
        if(err) return callback(err)
        callback(null,dataStr)
    })
}
getFileByPath(path.join(__dirname,'./files/1.txt'),(err,dataStr)=>{
    if(err) return console.log(err.message)
    console.log(dataStr)
})
