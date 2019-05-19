//需求： 你要封装一个方法，我给你一个要读取文件的路径，你这个方法能帮我读文件，并把内容返回给我

const fs = require('fs')
const path = require('path')
//两个回调函数（成功的succCb，失败的errCb）
function getFileByPath(fpath,succCb,errCb){
    fs.readFile(fpath,'utf-8',(err,dataStr)=>{
        if(err) return errCb(err)
        succCb(dataStr)
    })
}
getFileByPath(path.join(__dirname,'./files/1.txt'),(data)=>{
    console.log(data+"成功了！")
},(err)=>{
    console.log('失败的结果'+err.message)
}
)

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
