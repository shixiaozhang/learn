/*
 * @Author: your name
 * @Date: 2021-01-21 16:32:55
 * @LastEditTime: 2021-01-21 16:40:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\my-electron-app\main.js
 */
const {app,BrowserWindow}=require('electron')

function createWindow() {
    const win=new BrowserWindow({
        width:800,
        height:600,
        webPreferences:{
            nodeIntegration:true
        }
    })
    win.loadFile('index.html')
}

app.whenReady().then(createWindow)
app.on('window-all-closed',()=>{
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate',()=>{
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})