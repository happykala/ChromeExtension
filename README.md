1、扩展定义文件：manifest.json  
在每一个扩展代码文件夹的根目录下需要有上述的json文件，用来定义当前的扩展基本信息和组织定义工程结构  

```json
{
	"manifest_version": 2,
	"name": "测试处理",//名称
	"version": "1.0",//版本
	"description": "this is a test operation",//描述
	"author": "happykala",//作者
	"icons"://展示图标
	{
		"48": "icon.png",
		"128": "icon.png"
	},
	"browser_action": 
	{
		"default_icon": "icon.png",
		"default_popup": "popup.html"
	},
	"permissions":[//权限控制
		"contextMenus",
		"notifications",
		"tabs"
	],
	"background":{//后台常驻js或者是html
		"scripts":["js/background.js"]
	},
	"content_scripts": 
	[
		{
			"matches": ["https://www.baidu.com/*"],
			"js": ["content-script.js"]
		}
	],
	"web_accessible_resources": 
	[
		"inject.js"
	],
	"devtools_page":"devtools.html"//控制台工具栏处理
}
```
