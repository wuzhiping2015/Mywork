var flag;
var flag_Relay_das = sessionStorage.getItem('$SysType') == "Relay das" ? true : false;
var flag_DMR = sessionStorage.getItem('$SysType') == "DMR" ? true : false;

var flag_BroadBand_multi = sessionStorage.getItem('$SysType') == "BroadBand_multi" ? true : false;
var flag_bandSelect10 = flag_BroadBand_multi || flag_Relay_das;



Vue.component('footercom', {
	template: `<footer class="main-footer" ><div class="pull-right hidden-xs">
		<b>Helios</b> 2.4.0
		</div>
		<strong>Copyright © 2018<a href="http://www.heliostelecom.com/" target="_blank"> Helios</a>.</strong> Technology. All rights reserved.`
});


Vue.component('comheader', {
	template: `<header class="main-header">
				<a href="index2.html" class="logo">
					<span class="logo-mini"><img src="../images/logo-icon.png"></span>
					<span class="logo-lg"><img src="../images/Helios.png"></span>
				</a>
				<nav class="navbar navbar-static-top">
					<!-- Sidebar toggle button-->
					<a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
						<span class="sr-only">Toggle navigation</span>
					</a>

					<div class="navbar-custom-menu">
						<ul class="nav navbar-nav">
							   <li>
									<a href="../login.html">
							 		 <i class="fa fa-fw fa-user"></i><span class="hidden-xs">Logout</span>
							   </a>
							  </li>
						</ul>
					</div>
				</nav>
			</header>`
});



Vue.component('comleft', {

	data: function () {
		return {
			version: "Version:" + App.version,
			isRight: sessionStorage.getItem('$user') == "Factory" ? 3 : sessionStorage.getItem('$user') == "User" ? 1 : 2,
			isRelay: sessionStorage.getItem('$SysType') == "Relay das" ? true : false,
			//isRelay: true,
			relayHtml: "Index1.html",
			//24
			menuList: [],
		}
	},
	mounted: function () {
		$('#sidebars').tree();
		this.$nextTick(function () {
			var menulist = JSON.parse(sessionStorage.getItem('$Menulist'));

			let tempMenu = [];
			var tempChild = [];
			var obj = {};
			var obj1 = {};

			//首页
			if (sessionStorage.getItem('$SysType') == "Relay das") {

				tempChild = [];
				obj1 = {};
				obj1.name = "Master unit";
				obj1.url = "Index2.html";
				obj1.icon = "fa-info-circle";
				obj1.RightLevel = 2;
				obj1.isActive = false;
				tempChild.push(obj1);
				obj1 = {};
				obj1.name = "Remote unit";
				obj1.url = menulist[20].value + ".html";
				obj1.icon = "fa-info-circle";
				obj1.RightLevel = 2;
				obj1.isActive = false;
				tempChild.push(obj1);

				obj = {};
				obj.name = "Dashboard";
				obj.url = "Index1.html";
				// obj.url="#";
				obj.icon = "fa-dashboard";
				obj.isActive = true;
				obj.RightLevel = 1;
				obj.children = tempChild;
				tempMenu.push(obj);

			}
			else {
				obj = {};
				obj.name = "Dashboard";
				obj.url = "index.html";
				obj.icon = "fa-dashboard";
				obj.isActive = false;
				obj.RightLevel = 1;
				obj.children = [];
				tempMenu.push(obj);
			}


			//信道页面
			if (sessionStorage.getItem('$SysType') != "Malaysia") {

				tempChild = [];

				obj1 = {};
				obj1.name = "General Settings";
				obj1.url = menulist[2].value + ".html";
				obj1.icon = "fa-cog";
				obj1.RightLevel = 2;
				obj1.isActive = false;
				tempChild.push(obj1);


				if (((sessionStorage.getItem('$power') != "2") && (sessionStorage.getItem('$user') != "User"))) {
					obj1 = {};
					obj1.name = "Advanced Settings";
					obj1.url = menulist[3].value + ".html";
					obj1.icon = "fa-chain";
					obj1.RightLevel = 2;
					obj1.isActive = false;
					tempChild.push(obj1);
				}


				if ((sessionStorage.getItem('$MODTYPE') != '6') && (sessionStorage.getItem('$user') == "Factory")) {
					obj1 = {};
					obj1.name = "Debug Channel";
					obj1.url = menulist[4].value + ".html",
						obj1.icon = "fa-cog";
					obj1.RightLevel = 2;
					obj1.isActive = false;
					tempChild.push(obj1);
				}

				if (sessionStorage.getItem('$user') == "Factory") {
					obj1 = {};
					obj1.name = "Channel BW Settings";
					obj1.url = menulist[24].value + ".html";
					obj1.icon = "fa-cog";
					obj1.RightLevel = 2;
					obj1.isActive = false;
					tempChild.push(obj1);

				}


				obj = {};
				obj.name = "Channel";
				obj.url = "#";
				obj.icon = "fa-heartbeat";
				obj.isActive = false;
				obj.RightLevel = 2;
				obj.children = tempChild;

				tempMenu.push(obj);

				//高级参数部分

				tempChild = [];

				obj1 = {};
				obj1.name = "Settings";
				obj1.url = menulist[5].value + ".html";
				obj1.icon = "fa-lightbulb-o";
				obj1.RightLevel = 2;
				obj1.isActive = false;
				tempChild.push(obj1);

				if (sessionStorage.getItem('$SysType') == "Malaysia") {
					obj1 = {};
					obj1.name = "GPS";
					obj1.url = menulist[28].value + ".html";
					obj1.icon = "fa-lightbulb-o";
					obj1.RightLevel = 2;
					obj1.isActive = false;
					tempChild.push(obj1);
				}



				if ((sessionStorage.getItem('$power') == "1") || (sessionStorage.getItem('$user') == "Factory")) {
					obj1 = {};
					obj1.name = "Password Change";
					obj1.url = menulist[17].value + ".html";
					obj1.icon = "fa-lightbulb-o";
					obj1.RightLevel = 2;
					obj1.isActive = false;
					tempChild.push(obj1);
				}
			} else {
				tempChild = [];

				obj1 = {};
				obj1.name = "Settings";
				obj1.url = "advSetting.html";
				obj1.icon = "fa-lightbulb-o";
				obj1.RightLevel = 2;
				obj1.isActive = false;
				tempChild.push(obj1);

			}

			obj = {};
			obj.name = "Advanced Parameters";
			obj.url = "#";
			obj.icon = "fa-dashboard";
			obj.isActive = false;
			obj.RightLevel = 2;
			obj.children = tempChild;
			tempMenu.push(obj);

			//告警页面
			tempChild = [];

			obj1 = {};
			obj1.name = "System Alarms";
			obj1.url = menulist[6].value + ".html";
			obj1.icon = "fa-briefcase";
			obj1.RightLevel = 2;
			obj1.isActive = false;
			tempChild.push(obj1);



			obj1 = {};
			obj1.name = "Module Alarms";
			obj1.url = menulist[7].value + ".html";
			obj1.icon = "fa-lightbulb-o";
			obj1.RightLevel = 2;
			obj1.isActive = false;
			tempChild.push(obj1);
			if (sessionStorage.getItem('$SysType') != "Malaysia") {
				obj1 = {};
				obj1.name = "External Alarms";
				obj1.url = menulist[18].value + ".html";
				obj1.icon = "fa-lightbulb-o";
				obj1.RightLevel = 2;
				obj1.isActive = false;
				tempChild.push(obj1);
			}
			// obj1 = {};
			// obj1.name = "Remote Alarms";
			// obj1.url = menulist[22].value+ ".html";
			// obj1.icon = "fa-cog";
			// obj1.RightLevel = 2;
			// obj1.isActive = false;
			// tempChild.push(obj1);


			// obj1 = {};
			// obj1.name = "Alarms Table";
			// obj1.url = menulist[19].value + ".html";
			// obj1.icon = "fa-lightbulb-o";
			// obj1.RightLevel = 3;
			// obj1.isActive = false;
			// tempChild.push(obj1);




			obj = {};
			obj.name = "Alarm";
			obj.url = "#";
			obj.icon = "fa-dashboard";
			obj.isActive = false;
			obj.RightLevel = 1;
			obj.children = tempChild;
			tempMenu.push(obj);
			//工厂参数
			if (sessionStorage.getItem('$SysType') != "Malaysia") {
				tempChild = [];
				if (!flag_Relay_das && !flag_DMR) {
					obj1 = {};
					obj1.name = "Freq Response";
					obj1.url = menulist[8].value + ".html";
					obj1.icon = "fa-cogs";
					obj1.RightLevel = 2;
					obj1.isActive = false;
					tempChild.push(obj1);


					obj1 = {};
					obj1.name = "Station Info";
					obj1.url = menulist[9].value + ".html";
					obj1.icon = "fa-lightbulb-o";
					obj1.RightLevel = 2;
					obj1.isActive = false;
					tempChild.push(obj1);
				}


				obj1 = {};
				obj1.name = "Page Settings";
				obj1.url = menulist[16].value + ".html";
				obj1.icon = "fa-lightbulb-o";
				obj1.RightLevel = 3;
				obj1.isActive = false;
				tempChild.push(obj1);

				obj = {};
				obj.name = "Factory";
				obj.url = "#";
				obj.icon = "fa-home";
				obj.isActive = false;
				obj.RightLevel = 3;
				obj.children = tempChild;
				tempMenu.push(obj);
			}
			//硬件配置


			tempChild = [];
			obj1 = {};
			obj1.name = "Basic Info";
			obj1.url = menulist[10].value + ".html";
			obj1.icon = "fa-info";
			obj1.RightLevel = 2;
			obj1.isActive = false;
			tempChild.push(obj1);

			if ((sessionStorage.getItem('$user') == "Factory")) {
				obj1 = {};
				obj1.name = "Hardware Initial";
				obj1.url = menulist[11].value + ".html";
				obj1.icon = "fa-legal";
				obj1.RightLevel = 2;
				obj1.isActive = false;
				tempChild.push(obj1);

			}




			obj1 = {};
			obj1.name = "Site band Control";
			obj1.url = menulist[23].value + ".html";
			obj1.icon = "fa-lightbulb-o";
			obj1.RightLevel = 3;
			obj1.isActive = false;
			tempChild.push(obj1);
			if (sessionStorage.getItem('$SysType') != "Malaysia") {
				if (flag_bandSelect10) {
					obj1 = {};
					obj1.name = "Module Info";
					obj1.url = menulist[25].value + ".html";
					obj1.icon = "fa-info";
					obj1.RightLevel = 3;
					obj1.isActive = false;
					tempChild.push(obj1);
				}


			}

			obj = {};
			obj.name = "Hardware";
			obj.url = "#";
			obj.icon = "fa-gears";
			obj.isActive = false;
			obj.RightLevel = 2;
			obj.children = tempChild;
			tempMenu.push(obj);


			//网络配置

			tempChild = [];
			obj1 = {};
			obj1.name = "Station Info";
			obj1.url = menulist[12].value + ".html";
			obj1.icon = "fa-info";
			obj1.RightLevel = 2;
			obj1.isActive = false;
			tempChild.push(obj1);


			obj1 = {};
			obj1.name = "Network";
			obj1.url = menulist[13].value + ".html";
			obj1.icon = "fa-legal";
			obj1.RightLevel = 2;
			obj1.isActive = false;
			tempChild.push(obj1);

			obj1 = {};
			obj1.name = "Wireless";
			obj1.url = menulist[14].value + ".html";
			obj1.icon = "fa-lightbulb-o";
			obj1.RightLevel = 2;
			obj1.isActive = false;
			tempChild.push(obj1);

			obj1 = {};
			obj1.name = "SNMP";
			obj1.url = menulist[15].value + ".html";
			obj1.icon = "fa-legal";
			obj1.RightLevel = 2;
			obj1.isActive = false;
			tempChild.push(obj1);


			obj1 = {};
			obj1.name = "VPN";
			obj1.url = menulist[29].value + ".html";
			obj1.icon = "fa-suitcase";
			obj1.RightLevel = 2;
			obj1.isActive = false;
			tempChild.push(obj1);


			obj = {};
			obj.name = "Network";
			obj.url = "#";
			obj.icon = "fa-feed";
			obj.isActive = false;
			obj.RightLevel = 2;
			obj.children = tempChild;
			tempMenu.push(obj);

			//日志

			if (sessionStorage.getItem('$SysType') != "Malaysia") {
				tempChild = [];

				obj1 = {};
				obj1.name = "Debug log";
				obj1.url = menulist[21].value + ".html";
				obj1.icon = "fa-lightbulb-o";
				obj1.RightLevel = 3;
				obj1.isActive = false;
				tempChild.push(obj1);



				obj = {};
				obj.name = "Sys log";
				obj.url = "#";
				obj.icon = "fa-info";
				obj.isActive = false;
				obj.RightLevel = 3;
				obj.children = tempChild;
				tempMenu.push(obj);
			}




			this.menuList = tempMenu;

			//面包屑 
			var uri = window.location.pathname;

			$.each(this.menuList, function (i, t) {
				if (uri.indexOf(t.url) > 0) {
					t.isActive = true;
					document.getElementById("head1").innerText = t.name;
					return false;
				}
				$.each(t.children, function (j, d) {
					if (uri.indexOf(d.url) > 0) {
						d.isActive = true;
						t.isActive = true;
						document.getElementById("head1").innerText = t.name;
						document.getElementById("head2").innerText = d.name;
						return false;
					}
				});
			});

		})
	},
	template: `<aside class="main-sidebar"> 
                 <section class="sidebar"> 
                        <ul id="sidebars" class="sidebar-menu" data-widget="tree"> 
                            <li class="header ">{{version}}</li> 
                            <li v-for="(item,index) in menuList" :key="index"  :class="[{active : item.isActive} ,item.url=='#' ? 'treeview' :'']"> 
                                 
                                <a  v-if="item.RightLevel<=isRight" :href="item.url"> 
                                    <i class="fa" :class="item.icon"></i> 
                                    <span>{{item.name}}</span> 
                                    <span v-if="item.url=='#'" class="pull-right-container"> 
                                        <i class="fa fa-angle-left pull-right"></i> 
                                    </span> 
                                </a> 
                                <ul v-if="item.children.length >0 && index==0 " class="treeview-menu"  > 
                                    <li v-for="c in item.children" :class="{active : c.isActive}"> 
                                        <a v-if="c.RightLevel<=isRight" :href="c.url"> 
                                            <i class="fa" :class="c.icon"></i>{{c.name}} 
                                        </a> 
                                    </li> 
                                </ul> 
                                <ul v-else-if="item.children.length >0 && index != 0" class="treeview-menu"  > 
                                    <li v-for="c in item.children" :class="{active : c.isActive}"> 
                                        <a v-if="c.RightLevel<=isRight" :href="c.url"> 
                                            <i class="fa" :class="c.icon"></i>{{c.name}} 
                                        </a> 
                                    </li> 
                                </ul> 
                            </li> 
                        </ul> 
                    </section> 
                </aside>`
});


new Vue({
	el: '#footer'
});
new Vue({
	el: '#left'
});
new Vue({
	el: '#header'
});
