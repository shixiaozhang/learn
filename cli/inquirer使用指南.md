#! /usr/bin/env node

// #! 符号的名称叫 Shebang，用于指定脚本的解释程序
// Node CLI 应用入口文件必须要有这样的文件头
// 如果是Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755
// 具体就是通过 chmod 755 cli.js 实现修改

// 用于检查入口文件是否正常执行
console.log('my-node-cli working~')
const inquirer=require('inquirer')

// inquirer.prompt([{
//     type:'input',
//     name:'name',
//     message:'you name?',
//     default:'diy-cli'
// },{
//     type:"list",

// }]).then(answer=>{
//     console.log(answer);
// })

var prompList = [
	{
		type:'input',
		message:'姓名',
		name:'name'
	},{
		type:'input',
		message:'手机号',
		name:'phone',
		validate:val=>{
			if(val.match(/\d{11}/g)){
				return true
			}
			return '请输入11位数字'
		}
	},{
		type:'confirm',
		message:'是否参加本次考核？',
		name:'assess',
		prefix:'前缀'
	},{
		type:'confirm',
		message:'是否同意本次考核须知？',
		name:'notice',
		suffix:'后缀',
		when:answers=>{
			return answers.assess
		}
	},{
		type:'list',
		message:'欢迎来到本次考核，请选择学历：',
		name:'eductionBg',
		choices:[
			"大专",
			"本科",
			"本科以上"
		],
		filter:val=>{//将选择的内容后面加学历
			return val+'学历'
		}
	},{
		type:'rawlist',
		message:'请选择你爱玩的游戏：',
		name:'game',
		choices:[
			"LOL",
			"DOTA",
			"PUBG"
		]
	},{
		type:'expand',
		message:'请选择你喜欢的水果：',
		name:'fruit',
		choices: [
			{
				key: "a",
				name: "Apple",
				value: "apple"
			},
			{
				key: "O",
				name: "Orange",
				value: "orange"
			},
			{
				key: "p",
				name: "Pear",
				value: "pear"
			}
		]
	},{
		type:'checkbox',
		message:'请选择你喜欢的颜色：',
		name:'color',
		choices:[
			{
				name: "red"
			},
			new inquirer.Separator(), // 添加分隔符
			{
				name: "blur",
				checked: true // 默认选中
			},
			{
				name: "green"
			},
			new inquirer.Separator("--- 分隔符 ---"), // 自定义分隔符
			{
				name: "yellow"
			}
		]
	},{
		type:'password',
		message:'请输入你的游戏密码：',
		name:'pwd'
	}

]

inquirer.prompt(prompList).then(answers=>{
	console.log(answers);
})


