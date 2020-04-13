/*
 	作者：福建京奥通信技术有限公司 研发中心
 	时间：20200330
 	描述: 多屏光纤
*/

//引入VUE 对象方法
var toast = new Vue({
	el: '',
	mounted() {

	}
});


var url = window.location.pathname;



var d = document.createElement('link');
d.setAttribute('rel', 'shortcut icon');
d.setAttribute('href', 'assets/images/helios.ico');
document.getElementsByTagName('head')[0].appendChild(d);
var loading = document.createElement("div");
let tagname = sessionStorage.getItem("equipment");

/* sessionStorage.setItem("equipment", "au"); */


var util = {
	warning: function(msg) {
		toast.$message({
			message: msg,
			showClose: true,
			type: 'warning'
		});
	},
	info: function(msg) {
		toast.$message({
			message: msg
		});
	},
	success: function(msg) {
		toast.$message({
			message: msg,
			type: 'success',
			duration: 1000
		});
	},
	error: function(msg) {
		toast.$message({
			message: msg,
			showClose: true,
			type: 'error'
		});
	},
	copy: function() {
		return "Copyright © 2006-2020 福建京奥通信技术有限公司";
	},
	Tablocation: function() {
		$("#Tablocation").html(
			`
		<li >
			<a href="javascript:window.location.href='Basicinfo.html'" click="">设备基础信息</a> 
		</li>
		<li class="" >
			<a href="javascript:window.location.href='configuration.html'">设备配置 </a>
		</li>`
		);
	},
	//登录
	login: function(user, pwd) {
		$("#loginBtn").attr("disabled", "disabled").css({
			"cursor": "no-drop",
			"background": "#3c6485",
			"color": "#c3bfbf"
		}).html('<i class="el-icon-loading"></i> 进入系统中,请稍后...');
		sessionStorage.setItem('$session', user);
		setTimeout(() => {
			window.location.href = "index.html";
		}, 1000);
		/*   $.ajax({
					url: "../cgi-bin/doaction.cgi",
					data: JSON.stringify({
						"action": "login",
						"username": user,
						"password": pwd,
						"type": 4,
						"band": 1,
						"link": 2,
						"mimo": 0,
						"siteno": 0,
						"id": 0,
						"equipid": 0,
					}),
					type: "post",
					success: function(data, status) {
						var rsp = JSON.parse(data);
						if (rsp.status == 'success') {

							util.getmods(0, function() {
								sessionStorage.setItem('$user', user);
								sessionStorage.setItem('$session', rsp.data);
								sessionStorage.setItem('$power', rsp.power);
								$("#loginBtn").attr("disabled", "disabled").css({
									"cursor": "no-drop",
									"background": "#3c6485",
									"color": "#c3bfbf"
								}).html('<i class="el-icon-loading"></i> 进入系统中,请稍后...');

								setTimeout(() => {
									window.location.href = "index.html";
								}, 1000);
							})
						} else {
							util.error("用户名或密码错误!请再试一次");
						}
					}
				});
			 */
	},

	//读取
	getattrajax: function(url2, callback) {
		var p = new Promise(function(resolve, reject) {
			$.ajax({
				url: url2,
				dataType: "json",
				type: "get",
				//async: false,
				success: function(data, status) {
					var rsp = data;
					console.log(data);
					console.log(status);
					if (rsp.status == 'success') {
						callback(rsp);
						resolve(rsp);
					} else {
						if (rsp.data == "401") {
							alert("not authorized");
							window.location.href = "../login.html";
						} else {
							// util.error(rsp.data);
							callback(rsp);
							resolve(rsp);
						}
					}
				},
				error: function(req, status, err) {
					console.log(req);
					console.log(status);
					console.log(err);
					callback(err);
					resolve(err);
					//reject(err);
				}
			});

		});
		return p;
	},

	//修改
	postattrajax: function(url2, callback, data) {
		var p = new Promise(function(resolve, reject) {
			$.ajax({
				url: url2,
				data: JSON.stringify(data),
				type: "post",
				//async: false,
				success: function(data, status) {
					console.log(data);
					console.log(status);
					var rsp = JSON.parse(data);
					if (rsp.status == 'success') {
						callback(rsp.data);
						resolve(rsp.data);
					} else {
						if (rsp.data == "401") {
							alert("not authorized");
							window.location.href = "../login.html";
						} else {
							// util.error(rsp.data);
							callback(rsp.data);
							resolve(rsp.data);
						}
					}
				},
				error: function(req, status, err) {
					/*  reject(err); */
					console.log(status);
					console.log(err);
					resolve(status);
					callback(err);

				}
			});
		});
		return p;
	},

}
util.Tablocation();

/****************  头部 start****************/
Vue.component('el-main-header', {
	data: function() {
		return {
			action: 0,
			aa: "abc",
			url: sessionStorage.getItem(url),
			tagurl: "",
			urls: [{
					name: 'Home',
					children: [{
						"url": "Index.html",
						"tab": "Index"
					}, ]
				},
				{
					name: 'Device',
					children: [{
							"url": "Status.html",
							"tab": "Status"
						},

					]
				},
				{
					name: 'Network',
					children: [{

							"tab": "Ethernet"
						},
						{

							"tab": "Modem"
						},
						{

							"tab": "SNMP"
						},
						{

							"tab": "VPN"
						},

					]
				},

				{
					name: 'Hardware',
					children: [{

						"tab": "Alarm"
					}, ]
				},

			],
			SysType: sessionStorage.getItem('$SysType'),
			logUserName: sessionStorage.getItem('$session')
		}
	},
	mounted: function() {
		this.$nextTick(function() {
			if (url.indexOf(sessionStorage.getItem("url"))) {
				this.tagurl = sessionStorage.getItem("url");
			} else {
				this.tagurl = sessionStorage.getItem("url");
			}


			this.action = sessionStorage.getItem("url");
			/* 	$.each(this.menuList, function(i, t) {
					if (url.indexOf(t.url) > 0) {
						t.isActive = true;
						return false;
					}
				}); */
		});
	},
	/*props: ['loguser'], */
	updated() {
		/*Vue.couponShow */
	},
	methods: {
		quit() {
			sessionStorage.removeItem("$session");
			sessionStorage.removeItem("listType");
			sessionStorage.removeItem("lookmax");
			sessionStorage.removeItem("setmax");
			window.location.href = "login.html";
		},
		logout(url) {

			const children = ["Status", "ParaSet", "Roc", "Deviceinfo"];
			if (url == children[0] || url == children[1] || url == children[2] || url == children[3]) {
				sessionStorage.setItem("url", url);
				sessionStorage.setItem("equipment", "au");
				window.location.href = "Status.html"
			} else {
				sessionStorage.setItem("url", url);
				window.location.href = url + ".html"
			}
			
			this.action = sessionStorage.getItem("url");

		}
	},
	template: ` <header class="main-header">
    <a href="index.html" class="logo" title="Helios">
        <span class="logo-mini"><img src="assets/images/logo1.png" alt="whelios"  width="36"> </span>
        <span class="logo-lg"><img src="assets/images/logo.png" alt="whelios" > </span>
    </a>
    <div class="navbar navbar-static-top">
	     
        <div class="avatar"><img src="assets/images/user-pic.png" alt=""> <span class="user-name">{{logUserName}}</span> 
                <em class="fa fa-fw fa-sort-desc" style="color:#fff"></em>
            <ul class="avatar-more">
                <!--li><a class="" href="userupdate.html"><i class="fa fa-fw fa-user"></i>用户信息</a></li-->
                <li @click="quit"><a href="javascript:;"><i class="fa fa-fw fa-power-off"></i>安全退出</a></li>
            </ul>
        </div>
        <div class="tagerLink">
			  <el-dropdown @command="logout" v-for="item in urls" :class="action">
				     <span class="el-dropdown-link" >
						{{item.name}} <i class="el-icon-arrow-down el-icon--right"></i>
				     </span>
					 <el-dropdown-menu slot="dropdown" >
						 <el-dropdown-item   v-for=" (itmes,i) in item.children"  :command="itmes.tab" :class="{action: itmes.tab == tagurl}" > 
							 {{itmes.tab}}      
						 </el-dropdown-item>
					 </el-dropdown-menu>
			 </el-dropdown> 
		
			 
         </div>
    </div>
</header>`
});


if ($("#comp-header").length > 0) {
	new Vue({
		el: '#comp-header',
		data: function() {
			return {
				logUserName: '',
			}
		},
	});
}
/****************  头部 end****************/



//左侧菜单
Vue.component("el-main-sidebar", {
	props: ['msg'],
	data: function() {
		return {
			//菜单数据
			sidebar: [{
				label: 'AU',
				type: 0,
				children: [{
						type: 1,
						label: 'EU 1',
						children: [{
								type: 2,
								label: 'RU 1-2-1'
							},
							{
								type: 2,
								label: 'RU 1-2-1'
							},
							{
								type: 2,
								label: 'RU 1-3-1'
							},
						],
					},
					{
						type: 1,
						label: 'EU 2-1',
						children: [{
								type: 2,
								label: 'RU 2-2-1'
							},
							{
								type: 2,
								label: 'RU 2-2-1'
							},
							{
								type: 2,
								label: 'RU 2-3-1'
							},
						],
					}
				],

			}],

			defaultProps: {
				children: 'children',
				label: 'label'
			},
			tagname: tagname
		}
	},
	methods: {
		handleNodeClick(data) {
			if (data.type == 0) {
				sessionStorage.setItem("equipment", "au");
			} else if (data.type == 1) {
				sessionStorage.setItem("equipment", "eu");
			} else if (data.type == 2) {
				sessionStorage.setItem("equipment", "ru");
			}
			sessionStorage.setItem("url", "Status");
			window.location.href = "Status.html"
		}
	},
	mounted: function() {
		/* 	console.log(this.tagname);
			this.$nextTick(function() {
				console.log(this.tagname);
			}); */
	},
	template: ` <div class="main-sidebar">
		 <div class="box-header with-border">
		 	<h3 class="box-title"><i class="el-icon-location"></i> {{tagname}} </h3>
		 </div>
		 
		<div class="sidebar">
			<el-tree :data="sidebar" default-expand-all  :props="defaultProps" @node-click="handleNodeClick">
					 <span class="custom-tree-node" slot-scope="{ node, data }">
						 <span > 
						   <img  v-if='data.type==0? true :false' align="absMiddle" src="assets/images/root.gif">
							<img  v-if='data.type==1? true :false' align="absMiddle" src="assets/images/folder.gif">
							 <img  v-if='data.type==2? true :false' align="absMiddle" src="assets/images/file.gif">
						   {{ node.label }}  
						</span>     
					</span>
			</el-tree>
		</div>
	</div>`
});
if ($("#comp-sidebar").length > 0) {
	new Vue({
		el: "#comp-sidebar",
		data: function() {
			return {}
		}
	})
}
/**************** 侧导航 end****************/


//首页左边AU LIST  START
Vue.component("el-index-slidebar", {
	data: function() {
		return {

		}
	},
	methods: {
		link() {
			sessionStorage.setItem("url", "Status");
			sessionStorage.setItem("equipment", "au");
			window.location.href = "Status.html"
		}
	},
	template: `
				<div class="main-sidebar">
					<div class="box-header with-border">
						<h3 class="box-title">
							AU List
							<font style="color: #fd397a !important;font-size:14px;">
								(3)
							</font>
						</h3>

					</div>
					<div class="products-list product-list-in-box">
						<li class="item" title="Site No AU1" @click="link">
							<div class="product-img">
								<img src="assets/images/111.png" alt="Product Image">
							</div>
							<div class="product-info">
								<a href="javascript:void(0)" class="product-title">Site No AU1
								</a>
								<p class="label label-warning">Alarm</p>&nbsp;&nbsp;
								<p class="label bg-olive">
									Static
								</p>
							</div>
						</li>
						<li class="item" title="Site No AU2"  @click="link">
							<div class="product-img">
								<img src="assets/images/111.png" alt="Product Image">
							</div>
							<div class="product-info">
								<a href="javascript:void(0)" class="product-title">Site No AU2
								</a>
								<p class="label label-warning">Alarm</p>&nbsp;&nbsp;
								<p class="label bg-olive">
									Static
								</p>
							</div>
						</li>
						<li class="item" title="Site No AU3"  @click="link">
							<div class="product-img">
								<img src="assets/images/111.png" alt="Product Image">
							</div>
							<div class="product-info">
								<a href="javascript:void(0)" class="product-title">Site No AU3
								</a>
								<p class="label label-warning">Alarm</p>&nbsp;&nbsp;
								<p class="label bg-olive">
									Static
								</p>
							</div>
						</li>
					</div>
				</div>
`

});

if ($("#index-sidebar").length > 0) {
	new Vue({
		el: "#index-sidebar",
		data: function() {
			return {}
		}
	});
}

//首页左边AU LIST  START


//Device 菜单
Vue.component("device", {
	data: function() {
		return {
			activeName: "Status",
			equipment: sessionStorage.getItem("equipment"),
			active: 0,
			tagurl: "",
			children: [{
					"tab": "Status"
				},
				{
					"tab": "ParaSet"
				},
				{
					"tab": "Deviceinfo"
				},
			]
		}
	},
	methods: {
		moreState(event) {
			this.tagurl = event;
			if (event == "Status") {
				if (this.equipment == "au") {
					sessionStorage.setItem("url", "status_page");
					document.getElementById("iframe1").setAttribute("src", "status_page.html");
				} else if (this.equipment == "eu") {
					sessionStorage.setItem("url", "status_pageeu");
					document.getElementById("iframe1").setAttribute("src", "status_pageeu.html");
				} else {
					sessionStorage.setItem("url", "status_pageru");
					document.getElementById("iframe1").setAttribute("src", "status_pageru.html");
				}

			} else if (event == "Deviceinfo") {
				sessionStorage.setItem("url", event);
				document.getElementById("iframe1").setAttribute("src", event + ".html");
			} else {
				sessionStorage.setItem("url", event);
				if (sessionStorage.getItem("equipment") == "au") {
					document.getElementById("iframe1").setAttribute("src", event + ".html");
				} else if (sessionStorage.getItem("equipment") == "eu") {
					document.getElementById("iframe1").setAttribute("src", event + "eu.html");
				} else {
					document.getElementById("iframe1").setAttribute("src", event + "ru.html");
				}
			}
			//	$(this).addClass("active").siblings("li").removeClass("active")
			//window.location.href = "index.html"
		}
	},
	mounted() {
		this.$nextTick(function() {
			if (url.indexOf(sessionStorage.getItem("url"))) {
				this.tagurl = sessionStorage.getItem("url");
			} else {
				this.tagurl = sessionStorage.getItem("url");
			}
			//au 开启 roc 网页
			if (this.equipment != "eu") {
				this.children.splice(2, 0, {
					"url": "Roc.html",
					"tab": "Roc"
				});
			}
			/* 	$.each(this.menuList, function(i, t) {
					if (url.indexOf(t.url) > 0) {
						t.isActive = true;
						return false;
					}
				}); */


			console.log(this.equipment);
			console.log(this.tagurl);
		});
	},
	beforeCreate() {
		/* console.log("创建前：");*/

	},
	beforeMount() {

	},


	template: `  <div style="position:relative"> 
			 
			<div class="nav-tabs-custom">
				<ul class="nav nav-tabs"  >
					 <li v-for="item in children"  :class="{active: item.tab == tagurl}"  @click="moreState(item.tab)">
						<a href="javascript:void(0);" >{{item.tab}}</a>
					 </li>
				</ul>
				
				
			</div>
			    </div>`
})
//DEVICE 菜单 END



function ShowInvalidLoginMessage() {
	// 清除sessionstorage中的登录ID
	// 退到登陆界面
	window.location.href = "login.html";
}

function check_ev() {
	if (!window.sessionStorage) {
		//alert("the browser version is too low");
		window.location.href = "login.html";
		return;
	}
	var url = window.location.href;
	var session = sessionStorage.getItem('$session');
	if (!session && url.indexOf('login.html') == -1) {
		window.location.href = "login.html";
		return;
	}
}
window.onload = function() {
	var url = window.location.href;
	if (url.indexOf('login.html') == -1) {
		setTimeout(function() {
			check_ev();
		}, 100)
		var maxTime = 300; // seconds
		var time = maxTime;
		document.body.addEventListener("mousemove", function() {
			time = maxTime; // reset
		}, false);
		var intervalId = setInterval(function() {
			time--;
			if (time <= 0) {
				ShowInvalidLoginMessage();
				clearInterval(intervalId);
			}
		}, 100000000);

	};
};
