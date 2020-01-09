document.getElementById("testJquery").addEventListener('click',function(e){
    chrome.devtools.inspectedWindow.eval(
        "jQuery.fn.jquery",
        function(result, isException){
        var html = "";
        if(isException){
            html = "当前页面没有使用Jquery";
        }else{
            html = "当前页面使用的Jquery版本是" + result;
        }
        var obj = e.target;
        obj.innerHTML = html;
    });
})

document.getElementById("openResource").addEventListener('click',function(e){
    chrome.devtools.inspectedWindow.eval('window.location.href',function(result, isException){
        chrome.devtools.panels.openResource(result, 20, function(){
            var obj = e.target;
            obj.innerHTML = "already open resource";
        })
    });
})

document.getElementById("viewElement").addEventListener('click',function(e){
    chrome.devtools.inspectedWindow.eval('inspect(document.images[0])',function(result,isException){})
})

document.getElementById("seeAllResource").addEventListener('click',function(e){
    chrome.devtools.inspectedWindow.getResources(function(resources){
        // alert(JSON.stringify(resources));
        myconsole._log(resources);
    })
})

var myconsole = 
{
	_log: function(obj)
	{
		// 不知为何，这种方式不行
		chrome.devtools.inspectedWindow('console.log('+JSON.stringify(obj)+')');
	},
	log: function(obj)
	{
		// 这里有待完善
		chrome.tabs.executeScript(chrome.devtools.inspectedWindow.tabId, {code: 'console.log(' + JSON.stringify(obj) + ')'}, function(){});
	}
};

