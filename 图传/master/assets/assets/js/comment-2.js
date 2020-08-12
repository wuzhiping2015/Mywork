/*
 	作者：福建京奥通信技术有限公司
 	时间：20200330
 	描述: 多屏光纤
*/

var toast = new Vue({
	el: '',
	mounted() {},
});

var url = window.location.pathname;
var d = document.createElement('link');
d.setAttribute('rel', 'shortcut icon');
d.setAttribute('href', 'assets/images/helios.ico');
document.getElementsByTagName('head')[0].appendChild(d);

var new_element = document.createElement('link');
new_element.setAttribute('rel', 'stylesheet');
new_element.setAttribute('href', 'assets/css/iconfont2/iconfont.css');
document.getElementsByTagName('head')[0].appendChild(new_element);

let tagname = sessionStorage.getItem("equipment");
let SITE_NO = sessionStorage.getItem("SITE_NO");
let $session = sessionStorage.getItem("$session");
let heliosUser = ["Factory", "Agent", "Admin", "User"];



sessionStorage.getItem("url", "Status");

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
			duration: 500
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
		var adr = [276]; /* 152 状态 */
		var obj = {
			"data": adr.join(),
			"action": "READ"
		};
		var Version = "";
		util.getattrajax(obj, function(data) {
			data.data.forEach(function(v, i, attr) {
				switch (v.adr) {
					case 276:
						Version = "Fujian Jingao Communication Technology Co. LTD  M-DOTS &#8482; " + v.value;
						document.querySelector(".login-footer").innerHTML = Version;
						break;
				}
			});
		});
	},
	//登录
	login: function(user, pwd) {
		var obj = {
			"data": [283].join(),
			"action": "READ"
		};
		var HeliosDev = false;
		util.getattrajax(obj, function(data) {
			if (283 == data.data[0].adr) {
				if ("1" === data.data[0].value) {
					HeliosDev = true;
					util.GetHeliosDevMsg();

					$.ajax({
						url: "../cgi-bin/doaction.cgi",
						data: {
							"action": "PASSWORD",
							"user": user,
							"pwd": pwd,
						},
						type: "post",
						success: function(data, status) {
							if (status == 'success') {
								sessionStorage.setItem('$session', user);
								sessionStorage.setItem('url', "Status");
								Helios.pwd == "";
								Helios.user == "";
								$("#loginBtn").attr("disabled", "disabled").css({
									"cursor": "no-drop",
									"background": "#3c6485",
									"color": "#c3bfbf"
								}).html('<i class="el-icon-loading"></i> Into the system...');
								setTimeout(() => {
									window.location.href = "Index.html";
								}, 2000);

							} else {
								$(".el-input__inner").val("");
								Helios.pwd == "";
								Helios.user == "";
								util.error("Wrong username or password!Please try again");
							}
						}
					});

				} else {
					toast.$message({
						message: `[Device is restarted and restored] It is expected to take 1 minute!`,
						type: 'error',
						showClose: true,
						offset: 13000
					});
					window.location.href = "login.html";
				}

			}
		});

	},

	//读取
	getattrajax: function(attr, callback) {
		var p = new Promise(function(resolve, reject) {
			$.ajax({
				url: "../cgi-bin/doaction.cgi",
				data: attr,
				type: "get",
				success: function(data, status) {
					var rsp = JSON.parse(data);
					if (typeof rsp == "string") {
						toast.$message.error("Error：" + attr.data);
					} else {
						callback(rsp);
						resolve(rsp);
						//window.location.href = "../login.html";
					}
				},
				error: function(req, status, err) {
					console.log(req);
					console.log(status);
					console.log(err);
					callback(err);
					resolve(err);
					reject(err);
				}
			});
		});
		return p;
	},
	//修改
	postattrajax: function(attr, callback) {
		/* console.log(attr); */
		var p = new Promise(function(resolve, reject) {
			$.ajax({
				url: "../cgi-bin/doaction.cgi",
				data: attr,
				type: "post",
				dataType: "text",

				success: function(data, status) {
					var rsp = JSON.parse(data);
					if (rsp.code == 1) {
						callback(rsp.code);
						resolve(rsp.code);
					} else {
						callback(rsp);
						resolve(rsp);
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

	//修改
	postattrajax1: function(attr, callback) {
		/* console.log(attr); */
		var p = new Promise(function(resolve, reject) {
			$.ajax({
				url: "../cgi-bin/doaction.cgi",
				data: attr,
				type: "post",
				dataType: "text",
				success: function(data, status) {
					/* console.log(data);
					console.log(status);
					console.log(data); */
					if (status == "success") {
						callback(status);
						resolve(status);
					} else {
						callback(status);
						resolve(status);
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

	//没有数组 真假转换
	ResTruefalse(name, adr, value) {
		let obj = {
			name: "",
			adr: "",
			agent: "",
			enbale: "",
		}
		obj.adr = adr;
		obj.name = name;
		if ("0" == value) {
			obj.agent = false;
			obj.enbale = false;
		}
		if ("1" == value) {
			obj.agent = false;
			obj.enbale = true;
		}
		if ("2" == value) {
			obj.agent = true;
			obj.enbale = false;
		}
		if ("3" == value) {
			obj.agent = true;
			obj.enbale = true;
		}
		return obj
	},
	//没有数组 真假转换为数字
	resnumber(agent, enbale) {
		if (agent == false && enbale == false) {
			return "0";
		} else if (agent == false && enbale == true) {
			return "1";
		} else if (agent == true && enbale == false) {
			return "2";
		} else if (agent == true && enbale == true) {
			return "3";
		}
	},
	//进制转换
	hex2int(hex) {

		var len = hex.length,
			a = new Array(len),
			code;
		for (var i = 0; i < len; i++) {
			code = hex.charCodeAt(i);
			if (48 <= code && code < 58) {
				code -= 48;
			} else {
				code = (code & 0xdf) - 65 + 10;
			}
			a[i] = code;
		}
		return a.reduce(function(acc, c) {
			acc = 16 * acc + c;
			return acc + "";
		}, 0);
	},



	//获取
	GetHeliosDevMsg() {
		var adr = [46, 82, 83]; /* 152 状态 */
		var obj = {
			"data": adr.join(),
			"action": "READ"
		};

		function DevType() {
			let devType = "";
			switch (arguments[0]) {
				case "231":
					// devType = sessionStorage.setItem("equipment", "au");
					sessionStorage.setItem("equipment", "au");
					devType = "au";
					break;
				case "230":
					/* sessionStorage.setItem("equipment", "eu"); */
					sessionStorage.setItem("equipment", "eu");
					devType = "eu";
					break;
				case "229":
					/* sessionStorage.setItem("equipment", "ru"); */
					sessionStorage.setItem("equipment", "ru");
					devType = "ru";
					break;
				default:
					sessionStorage.setItem("equipment", "au");
					devType = "au";
					break;
			}
			return devType;
		}
		util.getattrajax(obj, function(data) {
			let Data2 = [];
			data.data.forEach(function(v, i, attr) {
				switch (v.adr) {
					case 46:
						var HeliosDev = {
							adr: v.adr,
							value: (v.value),
							devType: DevType(v.value),
						};
						break;
					case 82:
						var HeliosDev = {
							adr: v.adr,
							value: (v.value),

						}
						Data2.push(HeliosDev);
						break;
					case 83:
						var HeliosDev = {
							adr: v.adr,
							value: (v.value),

						}
						Data2.push(HeliosDev);
						break;
				}
			});
			localStorage.setItem("MDOTS", JSON.stringify(Data2));
		});
	},

	//设置location
	SetHeliosDevMsg() {
		let MDOTS = JSON.parse(localStorage.getItem("MDOTS"));
		var obj = {
			"data": JSON.stringify(MDOTS),
			"action": "SET"
		}
		util.postattrajax(obj, function(data) {
			localStorage.setItem("MDOTS", JSON.stringify(MDOTS));

			if (1 != data) {
				toast.$message({
					message: ' Error:' + data.message,
					type: 'error',
					showClose: true,
					offset: 80
				});
			} else {
				localStorage.setItem("MDOTS", JSON.stringify(MDOTS));

			}
		});
	},
}

util.GetHeliosDevMsg();

/****************  头部 start****************/
Vue.component('el-main-header', {
	data: function() {
		return {
			action: 0,
			aa: "abc",
			url: sessionStorage.getItem(url),
			tagurl: "",
			menuList: [{
					url: "Dashboard.html",
					isActive: false,
					name: "Dashboard"
				},
				{
					url: "Index.html",
					isActive: false,
					name: "Topology"
				},
				{
					url: "Status.html",
					isActive: false,
					name: "Device"
				},
				{
					url: "javascript:void(0);",
					isActive: false,
					name: "Network"
				},
				{
					url: "Alarm.html",
					isActive: false,
					name: "Alarm"
				},
				{
					url: "Equipment.html",
					isActive: false,
					name: "Equipment"
				},

				{
					url: "Tools.html",
					isActive: false,
					name: "Tools"
				},
				{
					url: "Report.html",
					isActive: false,
					name: "Report"
				},
				{
					url: "system.html",
					isActive: false,
					name: "System"
				},

				{
					url: "Cluster.html",
					isActive: false,
					name: "Cluster",
				},
			],
			SysType: sessionStorage.getItem('$SysType'),
			logUserName: sessionStorage.getItem('$session')
		}
	},
	mounted: function() {
		this.$nextTick(function() {
			$.each(this.menuList, function(i, t) {
				if (url.indexOf(t.url) > 0) {
					t.isActive = true;
					return false;
				}
			});
			if (url.indexOf(sessionStorage.getItem("url"))) {
				this.tagurl = sessionStorage.getItem("url");
			} else {
				this.tagurl = sessionStorage.getItem("url");
			}
			this.action = sessionStorage.getItem("url");

			util.SetHeliosDevMsg();

		});
	},
	/*props: ['loguser'], */
	updated() {
		/*Vue.couponShow */
	},
	methods: {
		quit() {
			sessionStorage.removeItem("$session");
			sessionStorage.removeItem("url");
			sessionStorage.removeItem("equipment");
			sessionStorage.removeItem("AlarmData");
			localStorage.removeItem("MDOTS");
			let dataadr = [{
				adr: 83,
				value: "0"
			}];
			var obj = {
				"data": JSON.stringify(dataadr),
				"action": "SET"
			}
			util.postattrajax(obj, function(data1) {
				if (1 != data1) {
					/* toast.$message({
						message: ' Error',
						type: 'error',
						showClose: true,
						offset: 80
					}); */
					//window.location.href = "login.html";
				} else {
					toast.$message({
						message: "success",
						type: 'success',
						showClose: true,
						offset: 80
					});
					setTimeout(function() {
						window.location.href = "login.html";
					}, 1500);
				}

			});
		},
	},

	template: ` <header class="main-header">
	    <a href="Index.html" class="logo" title="Helios">
	        <span class="logo-mini"><img src="assets/images/logo1.png" alt="whelios"  width="36"> </span>
	        <span class="logo-lg" title="Whelios"><img src="assets/images/logo.png" alt="whelios" > </span>
	    </a>
	  <div class="navbar navbar-static-top">
	        <div class="avatar"><img src="assets/images/user-pic.png" alt=""> <span class="user-name">{{logUserName}}</span> 
	                <em class="el-icon-arrow-down el-icon--right" style="color:#fff"></em>
	            <ul class="avatar-more">
	                <li><a  href="userupdate.html"><i class="fa fa-fw icon iconfont icon-gerenzhongxinxuanzhong"></i>User</a></li>
					<li><a  href="equi.html"><i class="fa fa-fwicon iconfont icon-guangxianxiangduanzi"></i> Equipment</a></li>
	                <li @click="quit"><a href="javascript:;"><i class="fa fa-fw icon iconfont icon-tuichu"></i>Safety Exit</a></li>
	            </ul>
	        </div>
	        <div class="tagerLink">
				 <ul>
					<li v-for="(v,i) in menuList" > 
					 <a :href="v.url" :class="{active:v.isActive}" v-if="v.name!='Network'">{{v.name}}</a>
					 <a :href="v.url" :class="{active:v.isActive}" v-if="v.name=='Network'">{{v.name}}<em class="el-icon-arrow-down el-icon--right" ></em> </a>
					 <ol class="ol-list" v-if="v.name=='Network'">
						 <li><a href="Ethernet.html">Ethernet</a></li>
						 <li><a href="Modem.html">Modem</a></li>
						 <li><a href="SNMP.html">SNMP</a></li>
						 <li><a href="VPN.html">VPN</a></li>
					 </ol>	
					</li>
				 </ul>
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


/**************** 侧导航 status****************/
let sidebar;
Vue.component("el-main-sidebar", {
	props: ['siteno'],
	data: function() {
		return {
			defaultProps: {
				children: 'children',
				label: 'label'
			},
			/* tagname: tagname.toUpperCase() + " - " + this.MDOTStype(), */
			tagname: tagname.toUpperCase() + " - " + this.MDOTStype(),
			menu: [],
		}
	},


	beforeMount() {

		this.MDOTStype();

		let tempMenu = []; //主菜单
		var param = [];
		var sitelist;
		var currentStation = 0;
		var currentPort = 0;
		var stationlist = [];
		var vue = this;
		let tempMenu1 = [];
		var obj = {};
		var portlist = new Array(8);
		portlist.fill(0);
		$.ajax({
			type: "GET",
			url: "http://192.168.93.245:80/topology.json",
			dataType: "json",
			success: function(data1) {

				//设置第一条AU
				data1.sites[0].device.splice(0, 0, {
					"device_id": "0",
					"route": 0,
					"type": "au",
					"site_no": data1.sites[0].site_no
				});

				let j = 0;
				let setNodata = data1.sites[0].device;
				let data = [];
				//沿用旧项目处理方式
				while (j < setNodata.length) {
					let obj2 = {
						equipid: setNodata[j].device_id,
						offline: 0,
						route: setNodata[j].route,
						station: "0",
						status: 0,
						type: 0,
						site_no: data1.sites[0].site_no
					}
					data.push(obj2);
					j++;
				}
				currentStation = data[0].station;
				var offset = 0;
				obj = {};
				obj.label = currentStation;
				obj.children = [];

				obj.offline = 0;
				obj.station = 0;
				obj.equipid = 0;
				obj.type = 0;
				obj.DEVtype = "au";
				obj.site_no = data1.sites[0].site_no;
				tempMenu1.push(obj);

				$.each(data, function(idx, item) {
					if (currentStation == item.station) {

					} else {

						obj = {};
						obj.label = item.station;
						obj.offline = 0;
						obj.station = 0;
						obj.equipid = 0;
						obj.children = [];
						obj.type = 1;
						obj.site_no = data1.sites[0].site_no;
						tempMenu1.push(obj);
						currentStation = item.station;
					}
					if (item.route == "0") {
						obj = {};
						obj.offline = item.offline;
						obj.route = item.route;
						obj.equipid = item.equipid;
						obj.type = item.type;
						obj.station = item.station;
						obj.site_no = data1.sites[0].site_no;
						obj.stationlist = [];
						tempMenu.push(obj);
						stationlist.push(currentStation);
						tempMenu1[tempMenu1.length - 1].equipid = item.equipid;
						tempMenu1[tempMenu1.length - 1].station = item.station;
						tempMenu1[tempMenu1.length - 1].offline = item.offline;
					}
				});

				currentStation = stationlist[1];
				currentpoint = 0;
				$.each(data, function(idx, item) {

					if (item.route != "0") {
						if (currentStation == item.station) {
							obj1 = {};
							obj1.offline = item.offline;
							obj1.station = item.station;
							obj1.route = item.route;
							obj1.equipid = item.equipid;
							obj.site_no = data1.sites[0].site_no;
							obj1.type = item.type;
							tempMenu[currentpoint].stationlist.push(obj1);

						} else {
							currentpoint = stationlist.findIndex(function(value) {
								return value == item.station
							});
							currentStation = item.station;
							obj1 = {};
							obj1.offline = item.offline;
							obj1.station = item.station;
							obj1.route = item.route;
							obj1.equipid = item.equipid;
							obj.site_no = data1.sites[0].site_no;
							obj1.type = item.type;
							tempMenu[currentpoint].stationlist.push(obj1);
						}
					} else {
						//console.log(item);
					}

				});

				for (var i = 0; i < tempMenu.length; i++) {
					portlist.fill(0);
					currentPort = 0;
					$.each(tempMenu[currentpoint].stationlist, function(idx, item) {

						//赋值
						var str = item.route.toString();
						str = str.substr(0, 1);
						//console.log(parseInt(str) + "-" + portlist[parseInt(str)]);

						if (portlist[parseInt(str)] == 0) {
							obj = {};
							//obj.label = str;
							obj.label = item.route;
							obj.type = 1;
							obj.offline = 0;
							obj.station = 0;
							obj.equipid = item.equipid;
							obj.site_no = data1.sites[0].site_no;
							obj.children = [];
							obj.DEVtype = "eu";

							tempMenu1[currentpoint].children.push(obj);

							//站点赋值进去
							currentPort = tempMenu1[currentpoint].children.length;
							portlist[parseInt(str)] = currentPort;
							obj = {};
							obj.label = item.route;

							if (item.offline == 1) {
								obj.type = 2;
							} else {
								obj.type = 3;
								obj.offline = 1;
								obj.station = item.station;
								obj.equipid = item.equipid;
								obj.site_no = data1.sites[0].site_no;
								obj.children = [];
							}
							//tempMenu1[currentpoint].children[currentPort - 1].children.push(obj);
						} else {
							currentPort = portlist[parseInt(str)];
							obj = {};
							obj.label = item.route;
							if (item.offline == 1) {
								obj.type = 2;
							} else {
								obj.DEVtype = "ru";
								obj.type = 3;
								obj.offline = item.offline;
								obj.station = item.station;
								obj.equipid = item.equipid;
								obj.site_no = data1.sites[0].site_no;
								obj.children = [];
								tempMenu1[currentpoint].children[currentPort - 1].children.push(obj);
							}
						}
					});
				}
				vue.menu = tempMenu1;
				//vue.menuList1 = tempMenu;
			},
		});
	},

	methods: {
		handleNodeClick(data) {
			var tagurl = (data.DEVtype).toLowerCase();
			sessionStorage.setItem("url", "Status");
			sessionStorage.setItem("equipment", tagurl);
			let obj = [{
					adr: 82,
					value: util.hex2int(data.site_no)
				},
				{
					adr: 83,
					value: util.hex2int(data.equipid)
				},
			];
			var MDOTS = {
				"data": JSON.stringify(obj),
				"action": "SET"
			}
			localStorage.setItem("MDOTS", JSON.stringify(obj));
			util.postattrajax(MDOTS, function(data1) {
				if (1 != data1) {
					toast.$message({
						message: ' Error:' + data1.message,
						type: 'error',
						showClose: true,
						offset: 80
					});
				} else {
					setTimeout(function() {
						window.location.href = "Status.html";
					}, 900);
					toast.$message({
						message: "success",
						type: 'success',
						showClose: true,
						offset: 80
					});
				}
			});
			//	util.EquipmentID();
			//window.location.reload();
		},

		MDOTStype() {
			let MDOTDATA;
			let MDOTS = JSON.parse(localStorage.getItem("MDOTS"));
			MDOTS.forEach(function(v, i, attr) {
				switch (v.adr) {
					case 83:
						MDOTDATA = (v.value);
						break;
				}
			});
			return MDOTDATA;
		}

	},
	/* sidebar   menu*/
	template: ` <div class="main-sidebar">
		 <div class="box-header with-border">
		 	<h3 class="box-title"><i class="icon iconfont icon-caijishebeixinxichaxun"></i> {{tagname}}  {{siteno}} </h3>
		 </div>
		 
		<div class="sidebar">  
			<el-tree :data="menu" default-expand-all  :props="defaultProps" @node-click="handleNodeClick">
					 <span class="custom-tree-node" slot-scope="{ node, data }">
					 <i v-if="data.type=='0' ? true :false" class="icon iconfont icon-jierujiedian"></i> 
					 <i v-else-if="data.type=='1' ? true :false" class="icon iconfont icon-jierushipeiqileixing"></i> 
					 <i v-else-if="data.type=='3' ? true :false" class="icon iconfont icon-LTEjizhanyanshou"></i> 
					 {{node.label }} 
					</span>
			</el-tree>
		</div>
	</div>`
});
if ($("#comp-sidebar").length > 0) {
	let helios_sidebar;
	let data = {
		sitenodata: ""
	}
	let MDOTStype = "";
	helios_sidebar = new Vue({
		el: "#comp-sidebar",
		data: data,
		beforeMount() {
			//helios_sidebar.sitenodata = 1222; 
			//this.SITE_NO();
		},
		methods: {
			//获取站点编号，设备ID
			/* SITE_NO() {
				var obj1 = [82, 83];
				var obj = {
					"data": obj1.join(),
					"action": "READ"
				}
				util.getattrajax(obj, function(data) { 
					for (var i = 0; i < data.data.length; i++) {
						if (data.data[i].adr == 83) { 
							var Data = (data.data[i].value); 
							helios_sidebar.sitenodata = Data;
						}
					}
				});
			} */
			//helios_sidebar.sitenodata = Data; 

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
							<font style="font-size:16px;">
								/ 3
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
								<p class="label alert-danger">Alarm</p>&nbsp;&nbsp;
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
								<p class="label alert-danger">Alarm</p>&nbsp;&nbsp;
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
								<p class="label alert-danger">Alarm</p>&nbsp;&nbsp;
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


//DEVICE 菜单
Vue.component("device", {
	data: function() {
		return {
			activeName: "Status",
			equipment: sessionStorage.getItem("equipment"),
			url: sessionStorage.getItem("url"),
			active: 0,
			tagurl: "",
			children: [
				/* {
						"tab": "Topology"
					}, */
				{
					"tab": "Status"
				},
				{
					"tab": "ParaSet"
				},
				{
					"tab": "Device Info"
				},

			]
		}
	},
	methods: {
		moreState(event) {
			this.tagurl = event;
			util.SetHeliosDevMsg();
			if (this.equipment == "au") {
				if (event == "Status") {
					sessionStorage.setItem("url", event);
					document.getElementById("iframe1").setAttribute("src", "status_page.html");
				}
				if (event == "ParaSet") {
					sessionStorage.setItem("url", event);
					document.getElementById("iframe1").setAttribute("src", "paraset.html");
				}
				if (event == "Band") {
					sessionStorage.setItem("url", event);
					document.getElementById("iframe1").setAttribute("src", "roc.html");
				}
				if (event == "Device Info") {
					sessionStorage.setItem("url", event);
					document.getElementById("iframe1").setAttribute("src", "deviceinfo.html");
				}
			} else if (this.equipment == "eu") {
				if (event == "Status") {
					sessionStorage.setItem("url", event);
					document.getElementById("iframe1").setAttribute("src", "status_pageeu.html");
				}
				if (event == "ParaSet") {
					sessionStorage.setItem("url", event);
					document.getElementById("iframe1").setAttribute("src", "paraseteu.html");
				}
				if (event == "Device Info") {
					sessionStorage.setItem("url", event);
					document.getElementById("iframe1").setAttribute("src", "deviceinfo.html");
				}
			} else if (this.equipment == "ru") {
				if (event == "Status") {
					sessionStorage.setItem("url", event);
					document.getElementById("iframe1").setAttribute("src", "status_pageru.html");
				}
				if (event == "ParaSet") {
					sessionStorage.setItem("url", event);
					document.getElementById("iframe1").setAttribute("src", "parasetru.html");
				}
				if (event == "Band") {
					sessionStorage.setItem("url", event);
					document.getElementById("iframe1").setAttribute("src", "rocru.html");
				}
				if (event == "Device Info") {
					sessionStorage.setItem("url", event);
					document.getElementById("iframe1").setAttribute("src", "deviceinfo.html");
				}
			}
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
					"tab": "Band"
				});
			}
			/* 	$.each(this.menuList, function(i, t) {
					if (url.indexOf(t.url) > 0) {
						t.isActive = true;
						return false;
					}
				}); */
		});
	},

	template: `  <div style="position:relative"> 
			<div class="nav-tabs-custom">
				<ul class="nav nav-tabs"  >
					 <li v-for="item in children"  :class="{active: item.tab == tagurl}"  @click="moreState(item.tab)">
						<a href="javascript:void(0);">
						<span v-if=" item.tab == 'Status' ? true :false"  class="icon iconfont icon-zhuangtai1"></span> 
						<span v-if=" item.tab == 'ParaSet' ? true :false"  class="icon iconfont icon-shezhi"></span> 
						<span v-if=" item.tab == 'Band' ? true :false"  class="icon iconfont icon-kongzhitai"></span> 
						<span v-if=" item.tab == 'Device Info' ? true :false"  class="icon iconfont icon-caijishebeixinxichaxun"></span> 
						{{item.tab}}
					  </a>
					 </li>
				</ul>
			</div>
			 </div>`
});
//DEVICE 菜单 END



function ShowInvalidLoginMessage() {
	// 清除sessionstorage中的登录ID
	// 退到登陆界面
	window.location.href = "login.html";
}

function check_ev() {
	if (!window.sessionStorage) {
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
		}, 5000);

	};
};
