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

	},
	mounted: function () {
		$("#sidebars").tree();
		this.$nextTick(function () {
			var menulist = JSON.parse(sessionStorage.getItem('$Menulist'));
			var uri = window.location.pathname;


		});

	},

	template: `<aside class="main-sidebar">
			<section class="sidebar" style="height: auto;">
			  <ul class="sidebar-menu tree" data-widget="tree" id="sidebars">
				<li class="header">MAIN NAVIGATION</li>
				<li class="treeview">
				  <a href="#">
					<i class="fa fa-files-o"></i>
					<span>Hello HELIOS</span>
					<span class="pull-right-container">
					  <span class="label label-primary pull-right">4</span>
					</span>
				  </a>
				  <ul class="treeview-menu">
						 <li><a href="domedata.html"><i class="fa fa-circle-o"></i>页面模板</a></li>
						 <li><a href="advParas2.html"><i class="fa fa-circle-o"></i>数据模板</a></li>
						<li><a href="dome.html"><i class="fa fa-circle-o"></i>dome</a></li>
					
					    <li><a href="templat.html"><i class="fa fa-circle-o"></i>template</a></li>
					    <li><a href="dome3.html"><i class="fa fa-circle-o"></i>dome3</a></li>
					    <li><a href="channelinfo1.html"><i class="fa fa-circle-o"></i>channelinfo1</a></li>
		                <li><a href="advUser1.html"><i class="fa fa-circle-o"></i>advUser</a></li>
						<li><a href="ChannelBWSetting1.html"><i class="fa fa-circle-o"></i>ChannelBWSetting</a></li>
						<li><a href="sysAlarm1.html"><i class="fa fa-circle-o"></i>sysAlarm1</a></li>
						<li><a href="NetworkStationInfo1.html"><i class="fa fa-circle-o"></i>NetworkStationInfo</a></li>
						
				  </ul>
				</li>

				<li class="treeview">
				<a href="#">
				  <i class="fa fa-files-o"></i>
				  <span>Network</span>
				</a>
				<ul class="treeview-menu">
				   <li class="active"><a href="elemetntemp.html"><i class="fa fa-info"></i> **Element  模板</a></li>
					<li class="active"><a href="NetworkStationInfo2.html"><i class="fa fa-info"></i>NetworkStationInfo2 模板</a></li>
					<li class="active"><a href="NetworkSet2.html"><i class="fa fa-info"></i> NetworkSet2 模板2</a></li>
					<li class="active"><a href="NetworkWireless2.html"><i class="fa fa-info"></i> NetworkWireless </a></li>
					<li class="active"><a href="NetworkSnmp2.html"><i class="fa fa-info"></i>NetworkSnmp</a></li>
					
				</ul>
			  </li>


				<li>
				  <a href="index1.html" tarage="_blank">
					 <i class="fa fa-th"></i> <span>index1</span>
					 <span class="pull-right-container">
					  <small class="label pull-right bg-green">new</small>
					</span>
				  </a>
					<a href="#">
						<i class="fa fa-th"></i> <span>Widgets</span>
						<span class="pull-right-container">
						  <small class="label pull-right bg-green">new</small>
						</span>
						  </a>
						<a href="#">
							<i class="fa fa-th"></i> <span>Widgets</span>
							<span class="pull-right-container">
							  <small class="label pull-right bg-green">new</small>
							</span>
					  </a>
				</li>
				<li class="treeview">
				  <a href="#">
					<i class="fa fa-pie-chart"></i>
					<span>Charts</span>
					<span class="pull-right-container">
					  <i class="fa fa-angle-left pull-right"></i>
					</span>
				  </a>
				  <ul class="treeview-menu" style="display: none;">
					<li><a href="#chartjs.html"><i class="fa fa-circle-o"></i> ChartJS</a></li>
					<li><a href="#morris.html"><i class="fa fa-circle-o"></i> Morris</a></li>
					<li><a href="#flot.html"><i class="fa fa-circle-o"></i> Flot</a></li>
					<li><a href="#inline.html"><i class="fa fa-circle-o"></i> Inline charts</a></li>
				  </ul>
				</li>
				
				<li class="header">LABELS</li>
				<li><a href="#"><i class="fa fa-circle-o text-aqua"></i> <span>Information</span></a></li>
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
