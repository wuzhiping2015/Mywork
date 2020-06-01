

// *************************************  comfooter
Vue.component("comfooter",{
	data:{
	  //var r=App.version;
		//return {}
	},
	template:'<footer class="main-footer" ><div class="pull-right hidden-xs">'+
			'<b>wwwwwwwwwwwwwwwwwww</b> 2.4.0'+
			'</div>'+
			'<strong>Copyright &copy; 2014-2016 <a href="https://adminlte.io">Almsaeed Studio</a>.</strong> All rights'+
			'reserved </footer>'
});

Vue.component("commLeft",{
	data:{
	  //var r=App.version;
		//return {}
	},
	template:'<div class="main-sidebar" style="color:red">1111111111</div>'
				
	
});

$(function(){
	new Vue({
		el:"#footer,#commLeft",
		data:{
			
		},
		mounted:function(){
			
		}
	});
	
	new Vue({
		el:"",
		data:{
			
		},
		mounted:function(){
			
		}
	});
	
});