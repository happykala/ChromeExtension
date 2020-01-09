
// var campaign_id = '';
// var time = 0;
// var day = 0;
// var session = 0;
// var second = 0;
// var logged_in_at = 0;
// var user_type = '';
// (function () {
//     var popupDiv = document.createElement('div');
//     $(popupDiv).attr({id: "showPopouDiv"})
//     if(document.body != null){
//         document.body.appendChild(popupDiv);
//     }
//     this.LoadConfigInfo();
// })();

// function LoadConfigInfo(product_name = '') {
//     $.ajax({
//         type: "POST",
//         url: "/user/popup/load-config-info",
//         contentType: 'application/x-www-form-urlencoded;charset=utf-8',
//         data: {product_name: ''},
//         dataType: "json",
//         success: function (data) {
//             if (data) {
//                 var popup_conditions = data.popup_conditions;
//                 if(popup_conditions == undefined){
//                     return false;
//                 }
//                 if (!popup_conditions.hasOwnProperty('is_popup')) {
//                     return false;
//                 }
//                 var is_popup = popup_conditions.is_popup;
//                 if (is_popup == 0) {
//                     return false;
//                 }
//                 var plugin_id = data.plugin_id;
//                 if (plugin_id != '') {
//                     var isChrome = navigator.userAgent.indexOf('Chrome') > -1;
//                     if (isChrome) {
//                         if (chrome.runtime && chrome.runtime.sendMessage) {
//                             try {
//                                 chrome.runtime.sendMessage(plugin_id,
//                                     {message: 'version'},
//                                     response => {
//                                         if (response) {
//                                             return false;
//                                         }
//                                     });
//                             } catch (e) {
//                                 showDialog(data);
//                             }
//                         } else {
//                             showDialog(data);
//                         }
//                     }
//                 } else {
//                     showDialog(data);
//                 }
//             }
//         }
//     });
// }

// function showDialog(data) {
//     user_type = data.user_type;
//     campaign_id = data.campaign_id;
//     popup_conditions = data.popup_conditions,
//         logged_in_at = data.logged_in_at;
//     var trigger_type = popup_conditions.trigger_type;
//     var is_popup = popup_conditions.is_popup;
//     time = popup_conditions.conditions['time'];
//     day = popup_conditions.conditions['day'];
//     session = popup_conditions.conditions['session'];

//     $("#showPopouDiv").append(data.template_html);
//     $("#popup-content").attr("class", "popup-border-sign popup-hidden");
//     if (trigger_type == 1 && is_popup == 1) {
//         if (session != 0 && day != 0) {
//             popupByDayAndSession(day, session, logged_in_at);
//         } else {
//             popupOnlyOnce();
//         }
//         if (data.hasOwnProperty('scoreslist')) {
//             popupPage(data.scoreslist);
//         }
//     }
//     if (trigger_type == 2 && is_popup == 1) {
//         popupByClose();
//     }
// }

// function waitLoadConfigInfo(){

// }

// function interval() {
//     if (time > 0) {
//         second++;
//         if (second == time) {
//             $("#popup-content").attr("class", "popup-border-sign popup-border-fixed-sign");
//             var grayScreen = "<div id='gray-mask' style='position:fixed;width:100%;height:100%;top:0;left:0;right: 0;bottom: 0; background:rgba(0,0,0,0.3);z-index:9998;'></div>";
//             $("body").append(grayScreen);
//             return false;
//         }
//         window.setTimeout("interval();", 1000);
//     }
// }

// function popupByDayAndSession(day, session, logged_in_at) {
//     if (day != 0) {
//         if (session != 0) {
//             now_time = '<?= time()?>';
//             time_diff = (now_time - logged_in_at) / 60;
//             if (time_diff < session) {
//                 return false;
//             } else {
//                 window.setTimeout("interval();", 1000);
//                 return false;
//             }
//         }
//     }
// }

// function popupOnlyOnce() {
//     window.setTimeout("interval();", 1000);
//     return false;
// }

// function popupByClose() {
//     window.onbeforeunload = onbeforeunload_handler;

//     function onbeforeunload_handler() {
//         $("#popup-content").attr("class", "popup-border-sign popup-border-fixed-sign");
//         var grayScreen = "<div id='gray-mask' style='position:fixed;width:100%;height:100%;top:0;left:0;right: 0;bottom: 0; background:rgba(0,0,0,0.3);z-index:9998;'></div>";
//         $("body").append(grayScreen);
//         return false;
//     }
// }

// function callZbasePopupOpen(popup_campaign_id) {
//     var load = $('#loading').length;
//     if(load == 0){
//         var loadingDiv = document.createElement('div');
//         $(loadingDiv).attr({id: "loading",style: "position:fixed;top:0;bottom:0;right:0;left:0;background-color:black;opacity:0.4;z-index:5000;"});
//         var loadGif = "<img src='https://t.uncledesk.com/static/imgs/loading.gif' style='position:fixed;height:128px;width:128px;left:45%;top:50%;margin-left:-26px;margin-top:-26px;z-index:5001;'>"
//         // $(loadGif).attr({style:"position:fixed;height:254px;width:254px;background:url('https://t.uncledesk.com/static/imgs/loading.gif') no-repeat;left:40%;top:40%;margin-left:-26px;margin-top:-26px;z-index:1001;"});
//         $(loadingDiv).append(loadGif);
//         document.body.appendChild(loadingDiv);
//     }
//     $('#loading').show();
//     $.get('/user/popup/zbase-popup?call_popup=' + popup_campaign_id, function (res) {
//         $('#loading').hide();
//         var elem = document.getElementById('showPopouDiv');
//         var gray = document.getElementById('gray-mask');
//         if (elem != null || elem) {
//             elem.parentNode.removeChild(elem);
//         }
//         if (gray != null || gray) {
//             gray.parentNode.removeChild(gray);
//         }
//         var popupDiv = document.createElement('div');
//         $(popupDiv).attr({id: "showPopouDiv"})
//         document.body.appendChild(popupDiv);
//         $("#showPopouDiv").append(res.template_html);
//         $("#popup-content").attr("class", "popup-border-sign popup-border-fixed-sign");
//         var grayScreen = "<div id='gray-mask' style='position:fixed;width:100%;height:100%;top:0;left:0;right: 0;bottom: 0; background:rgba(0,0,0,0.3);z-index:9998;'></div>";
//         $("body").append(grayScreen);
//         if (res.hasOwnProperty('scoreslist')) {
//             popupPage(res.scoreslist);
//         }
//         return false;
//     }, 'json');
// }

// function closeClick() {
//     $("#popup-content").attr("class", "popup-border-sign popup-hidden");
//     $('#gray-mask').css('display', 'none');
//     // $.ajax({
//     //     type: "POST",
//     //     url: "/user/popup/close-click",
//     //     contentType: 'application/x-www-form-urlencoded;charset=utf-8',
//     //     data: {campaign_id: campaign_id, user_type: user_type},
//     //     dataType: "json",
//     // });
//     $('#loading').hide();
// }

// function shareClick(network, networkUrl, title) {
//     $.ajax({
//         type: "POST",
//         url: "/user/popup/share-click",
//         contentType: 'application/x-www-form-urlencoded;charset=utf-8',
//         data: {campaign_id: campaign_id},
//         dataType: "json",
//     });
//     if (network == 'custom') {
//         window.open(networkUrl);
//     } else {
//         sharePopup(network, networkUrl, title);
//     }
// }

// function buttonCopy() {
//     var inputUrl = document.getElementById('popup-link-url-sign');
//     inputUrl.select();
//     document.execCommand("Copy");
//     return false;
// }

// function sharePopup(type, networkUrl, title) {
//     var toOpen = function (url) {
//         var option = 'toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=1000, height=600,top=100,left=350';
//         window.open(
//             url, '_blank', option,
//         );
//     };
//     if (networkUrl == '') {
//         networkUrl = encodeURIComponent(document.location.href);
//     }
//     if (title == '') {
//         title = encodeURIComponent(document.location.href);
//     }
//     switch (type) {
//         case 'facebook':
//             toOpen('http://www.facebook.com/sharer.php?u=' + networkUrl + '&t=' + title);
//             break;
//         case 'google':
//             toOpen('https://plus.google.com/share?url=' + networkUrl + '&t=' + title);
//             break;
//         case 'twitter':
//             toOpen('http://twitter.com/share?url=' + networkUrl + '&text=' + title);
//             break;
//         case 'linkedin':
//             toOpen('http://www.linkedin.com/shareArticle?mini=true&url=' + networkUrl + '&title=' + title);
//             break;
//     }
// }

// function popupAccordion() {
//     var acc = document.getElementById("popupAccordion");
//     var panel = acc.nextElementSibling;
//     if (panel.style.maxHeight) {
//         panel.style.maxHeight = null;
//     } else {
//         panel.style.maxHeight = panel.scrollHeight + "px";
//         panel.style.boxShadow = "0px 20px 10px 5px #999";
//         panel.className = 'popup-panel pull-panel';
//     }
// }
// ;(function ($, window, document, undefined) {
//     'use strict';
//     function Paging(element, options) {
//         this.element = element;
//         this.options = {
//             nowPage: options.nowPage || 1, // 当前页码
//             pageNum: options.pageNum, // 总页码
//             canJump: options.canJump || 0, // 是否能跳转。0=不显示（默认），1=显示
//             showOne: options.showOne || 1,//只有一页时，是否显示。0=不显示,1=显示（默认）
//             buttonNum: (options.buttonNum>=5?options.buttonNum:5) || 7,// 页面显示页码数量
//             callback: options.callback // 回调函数
//         };
//         this.init();
//     }
//     Paging.prototype =  {
//         constructor : Paging,
//         init : function() {
//             this.createHtml();
//             this.bindClickEvent();
//             this.disabled();
//         },
//         createHtml : function(){
//             var me = this;
//             var nowPage = this.options.nowPage;
//             var pageNum = this.options.pageNum;
//             var buttonNum = this.options.buttonNum;
//             var canJump = this.options.canJump;
//             var showOne = this.options.showOne;
//             var content = [];
//             //对nowPage进行判断
//             nowPage = nowPage > pageNum ? pageNum : nowPage;
//             nowPage = nowPage < 1 ? 1 : nowPage;
//             //如果只有一页并且设置为不显示，则不进行渲染
//             if(showOne && pageNum === 1){
//                 return '';
//             }
//             content.push("<ul>");
//             content.push("<li class='xl-prevPage'>\<</li>");
//             //页面总数小于等于当前要展示页数总数，展示所有页面
//             if(pageNum <= buttonNum){
//                 for(var i=1; i<=pageNum; i++){
//                     if (nowPage !== i) {
//                         content.push("<li>"+i+"</li>");
//                     } else {
//                         content.push("<li class='xl-active'>"+i+"</li>");
//                     }
//                 }
//             }else if(nowPage <= Math.floor(buttonNum / 2)){
//                 //当前页面小于等于展示页数总数的一半（向下取整），从1开始
//                 for(var i=1;i<= buttonNum-2;i++){
//                     if (nowPage !== i) {
//                         content.push("<li>"+i+"</li>");
//                     } else {
//                         content.push("<li class='xl-active'>"+i+"</li>");
//                     }
//                 }
//                 content.push("<li class='xl-disabled'>...</li>");
//                 content.push("<li>" + pageNum + "</li>");
//             }else  if(pageNum - nowPage <= Math.floor(buttonNum / 2)){
//                 //当前页面大于展示页数总数的一半（向下取整）
//                 content.push("<li>"+1+"</li>");
//                 content.push("<li class='xl-disabled'>...</li>");
//                 for(var i=pageNum-buttonNum+3; i<=pageNum; i++){
//                     if (nowPage !== i) {
//                         content.push("<li>"+i+"</li>");
//                     } else {
//                         content.push("<li class='xl-active'>"+i+"</li>");
//                     }
//                 }
//             }else{
//                 //前半部分页码
//                 if(nowPage - Math.floor(buttonNum / 2) <= 0){
//                     for(var i=1;i<= Math.floor(buttonNum / 2);i++){
//                         if (nowPage !== i) {
//                             content.push("<li>"+i+"</li>");
//                         } else {
//                             content.push("<li class='xl-active'>"+i+"</li>");
//                         }
//                     }
//                 }else{
//                     content.push("<li>"+1+"</li>");
//                     content.push("<li class='xl-disabled'>...</li>");
//                     for(var i=nowPage-Math.floor(buttonNum / 2)+(buttonNum % 2 == 0 ? 3: 2); i<=nowPage; i++){
//                         if (nowPage !== i) {
//                             content.push("<li>"+i+"</li>");
//                         } else {
//                             content.push("<li class='xl-active'>"+i+"</li>");
//                         }
//                     }

//                 }
//                 //后半部分页码
//                 if(pageNum - nowPage <= 0){
//                     for(var i=nowPage+1;i<=pageNum;i++){
//                         content.push("<li>" + i + "</li>");
//                     }
//                 }else{
//                     for(var i=nowPage+1; i<=nowPage+Math.floor(buttonNum / 2)-2; i++){
//                         content.push("<li>"+i+"</li>");
//                     }
//                     content.push("<li class='xl-disabled'>...</li>");
//                     content.push("<li>" + pageNum + "</li>");
//                 }
//             }
//             content.push("<li class='xl-nextPage'>\></li>");
//             // if(canJump){
//             //  content.push("<li class='xl-jumpText xl-disabled'>跳转到<input type='number' id='xlJumpNum'>页</li>");
//             //  content.push("<li class='xl-jumpButton'>确定</li>");
//             // }
//             content.push("</ul>");
//             me.element.html(content.join(''));
//              // DOM重新生成后每次调用是否禁用button
//             setTimeout(function () {
//                 me.disabled();
//             }, 20);
            
//         },
//         bindClickEvent: function(){
//             var me = this;
//             me.element.off('click', 'li');
//             me.element.on('click', 'li', function () {
//                 var cla = $(this).attr('class');
//                 var num = parseInt($(this).html());
//                 var nowPage = me.options.nowPage;
//                 if( $(this).hasClass('xl-disabled') || cla === 'xl-jumpText'){
//                     return '';
//                 }
//                 if (cla === 'xl-prevPage') {
//                     if (nowPage !== 1) {
//                         me.options.nowPage -= 1;
//                     }
//                 } else if (cla === 'xl-nextPage') {
//                     if (nowPage !== me.options.pageNum) {
//                         me.options.nowPage += 1;
//                     }
//                 }else if(cla === 'xl-jumpButton'){
//                     me.options.nowPage = Number($('#xlJumpNum').val());
//                 }else{
//                     me.options.nowPage = num;
//                 }
//                 me.createHtml();
//                 if (me.options.callback) {
//                     me.options.callback(me.options.nowPage);
//                 }
//             });

//         },
//         disabled: function () {
//             var me = this;
//             var nowPage = me.options.nowPage;
//             var pageNum = me.options.pageNum;
//             if (nowPage === 1) {
//                 me.element.children().children('.xl-prevPage').addClass('xl-disabled');
//             } else if (nowPage === pageNum) {
//                 me.element.children().children('.xl-nextPage').addClass('xl-disabled');
//             }
//         }
//     }
//     $.fn.paging = function (options) {
//         return new Paging($(this), options);
//     }
// })(jQuery, window, document);
// function popupPage(scoreslist) {
//     if (scoreslist.total == 0) {
//         return '';
//     }
//     popupPageData = scoreslist.data;
//     var popupPageHtml = '<tr><td>积分</td><td>任务</td><td>时间</td></tr>';
//     for (var i = 0; i < popupPageData.length; i++) {
//         if (popupPageData[i].scores > 0) {
//             popupPageData[i].scores = '+' + popupPageData[i].scores;
//         }
//         popupPageHtml += '<tr><td>' + popupPageData[i].scores + '</td><td>' + popupPageData[i].title + '</td><td>' + popupPageData[i].time + '</td></tr>'
//     }
//     document.getElementById("popup-page-content").innerHTML = popupPageHtml;
//     $("#popup-page").paging({
//         nowPage: scoreslist.currentpage, // 当前页码
//         pageNum: scoreslist.page, // 总页码
//         buttonNum: scoreslist.total, //要展示的页码数量
//         callback: function (num) { //回调函数
//             var popupPageData = {};
//             $.ajax({
//                 type: "GET",
//                 url: "/user/popup/pop-scores-list",
//                 contentType: 'application/x-www-form-urlencoded;charset=utf-8',
//                 data: {page: num},
//                 dataType: "json",
//                 success: function (data) {
//                     var popupPageData = data.data;
//                     var popupPageHtml = '<tr><td>积分</td><td>任务</td><td>时间</td></tr>';
//                     for (var i = 0; i < popupPageData.length; i++) {
//                         if (popupPageData[i].scores > 0) {
//                             popupPageData[i].scores = '+' + popupPageData[i].scores;
//                         }
//                         popupPageHtml += '<tr><td>' + popupPageData[i].scores + '</td><td>' + popupPageData[i].title + '</td><td>' + popupPageData[i].time + '</td></tr>'
//                     }
//                     document.getElementById("popup-page-content").innerHTML = popupPageHtml;
//                 }
//             });
//         }
//     });
// }

chrome.contextMenus.create({
    title:"right menu",
    onclick:function(){
        chrome.notifications.create(null,{
            type:"basic",
            iconUrl:"image/icon.png",
            title:"alter",
            message:"this is a live notification"
        })
    }
})

chrome.contextMenus.create({
    title:"use baidu search: %s",
    contexts:["selection"],
    onclick:function(params){
        chrome.tabs.create({url:"https://www.baidu.com/s?ie=utf-8&wd=" + encodeURI(params.selectionText)});
    }
})

