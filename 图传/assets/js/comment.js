sessionStorage.setItem('$SysType', "Helios");
sessionStorage.setItem('$power', "12");
sessionStorage.setItem('$showload', 0); //显示激活
sessionStorage.setItem('$session', "helios"); //显示激活


var d = document.createElement('link');
d.setAttribute('rel', 'shortcut icon');
d.setAttribute('href', 'assets/images/helios.ico');
document.getElementsByTagName('head')[0].appendChild(d);

var loading = document.createElement("div");


window.onresize = function () {
    var CWidth = document.documentElement.clientWidth;
    if (1024 > CWidth) {
        //  toast.$alert('请保持系统窗体最大化,不要随意改变窗体大小！', '提示', {
        //  confirmButtonText: '确定',
        /*  callback: action => {
             toast.$message({
                 type: 'success',
                 message: `Welcome to helios image transfer system`
             });
             // window.location.reload();
         } */

        //  });
    }
    return false;
}

var toast = new Vue({
    el: ''
}); //引入VUE 对象方法

$(function () {
    /* new Vue({
        el: '#comp-footer'
    });*/
    new Vue({
        el: '#comp-header',
        data: function () {
            return {
                logUserName: ''
            }
        },
    });
    new Vue({
        el: '#comp-sidebar'
    });

    /*var h = $("#content-wrapper").height() - 650;
      $("#content-wrapper").height(h); */

    function translate(data) {
        // var value = sessionStorage.getItem("language");
        //	var value = data;
        if (data == "1") {
            sessionStorage.setItem("language", "0");
        } else {
            sessionStorage.setItem("language", "1");
        }
        window.location.reload(); //刷新当前页面.
    }

    //语言设置




});


/**************** 侧导航 start****************/
Vue.component('el-main-sidebar', {
    data: function () {
        return {
            // version: "Version:" + App.version,
            // isRight: sessionStorage.getItem('$user') == "Factory" ? 3 : sessionStorage.getItem('$user') == "User" ? 1 : 2,
            //  isRelay: sessionStorage.getItem('$SysType') == "Relay das" ? true : false,
            //isRelay: true,
            isRight: 3,
            relayHtml: "Index1.html",
            //24
            menuList: [],

            a: "",
            b: "",
        }
    },
    created() {
        // console.log("创建完成：");
    },
    mounted: function () {
        //挂载完成：

        this.$nextTick(function () {

            let tempMenu = []; //主菜单
            var tempChild = []; //子菜单
            var obj = {}; //主菜单
            var obj1 = {}; //子菜单


            if (0 == sessionStorage.getItem("$showload")) {
                obj = {};
                obj.name = "Index";
                obj.url = "index.html";
                obj.icon = " iconfont icon-wifi";
                obj.isActive = false;
                obj.RightLevel = 1;
                obj.children = [];
                tempMenu.push(obj);
            }



            obj = {};
            obj.name = "Personal center";
            obj.url = "Personalcenter.html";
            obj.icon = " iconfont icon-wifi";
            obj.isActive = false;
            obj.RightLevel = 1;
            obj.children = [];
            tempMenu.push(obj);

            obj = {};
            obj.name = "Management";
            obj.url = "management.html";
            obj.icon = " iconfont icon-wifi";
            obj.isActive = false;
            obj.RightLevel = 1;
            obj.children = [];
            tempMenu.push(obj);

            obj = {};
            obj.name = "Ethernet";
            obj.url = "Ethernet.html";
            obj.icon = " iconfont icon-wifi";
            obj.isActive = false;
            obj.RightLevel = 1;
            obj.children = [];
            tempMenu.push(obj);



            obj = {};
            obj.name = "Security";
            obj.url = "security.html";
            obj.icon = " iconfont icon-wifi";
            obj.isActive = false;
            obj.RightLevel = 1;
            obj.children = [];
            tempMenu.push(obj);

            obj = {};
            obj.name = "Configuration";
            obj.url = "Configuration_TAB.html";
            obj.icon = " iconfont icon-wifi";
            obj.isActive = false;
            obj.RightLevel = 1;
            obj.children = [];
            tempMenu.push(obj);



            obj = {};
            obj.name = "Activation HBS";
            obj.url = "Activation_hbs.html";
            obj.icon = " iconfont icon-wifi";
            obj.isActive = false;
            obj.RightLevel = 1;
            obj.children = [];
            tempMenu.push(obj);

            obj = {};
            obj.name = "Performance";
            obj.url = "Performance.html";
            obj.icon = " iconfont icon-wifi";
            obj.isActive = false;
            obj.RightLevel = 1;
            obj.children = [];
            tempMenu.push(obj);



            /*  obj = {};
             obj.name = "Nomadic";
             obj.url = "nomadic.html";
             obj.icon = " iconfont icon-wifi";
             obj.isActive = false;
             obj.RightLevel = 1;
             obj.children = [];
             tempMenu.push(obj); */

            obj = {};
            obj.name = "Activation";
            obj.url = "Activation.html";
            obj.icon = " iconfont icon-wifi";
            obj.isActive = false;
            obj.RightLevel = 1;
            obj.children = [];
            tempMenu.push(obj);



            tempChild = [];
            /*  obj1 = {};
             obj1.name = "dome";
             obj1.url = "index5.html";
             obj1.icon = " iconfont icon-wifi";
             obj1.RightLevel = 2;
             obj1.isActive = false;
             tempChild.push(obj1);

             obj1 = {};
             obj1.name = "开发中...";
             obj1.url = "#";
             obj1.icon = " iconfont icon-wifi";
             obj1.RightLevel = 2;
             obj1.isActive = false;
             tempChild.push(obj1);



             obj = {};
             obj.name = "开发中...";
             obj.url = "#";
             obj.icon = " iconfont icon-wifi";
             obj.isActive = false;
             obj.RightLevel = 2;
             obj.children = tempChild;
             tempMenu.push(obj); */


            this.menuList = tempMenu;




            //面包屑 
            var uri = window.location.pathname;

            $.each(this.menuList, function (i, t) {
                if (uri.indexOf(t.url) > 0) {

                    //  document.getElementById("navBar").style.display = "block";
                    // $("#navBar").show();

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
                                        <li class="header ">欢迎使用智能图传系统</li> 
                                        <li v-for="(item,index) in menuList" :key="index"  :class="[{active : item.isActive} ,item.url=='#' ? 'treeview' :'']"> 
                                             
                                            <a  v-if="item.RightLevel<=isRight" :href="item.url"> 
                                                <i  :class="item.icon"></i> 
                                                <span>{{item.name}}</span> 
                                                <span v-if="item.url=='#'" class="pull-right-container"> 
                                                    <i class="fa-angle-left icon iconfont icon-arrow-right"></i> 
                                                </span> 
                                            </a> 
                                            <ul v-if="item.children.length >0 && index==0 " class="treeview-menu"  > 
                                                <li v-for="c in item.children" :class="{active : c.isActive}"> 
                                                    <a v-if="c.RightLevel<=isRight" :href="c.url"> 
                                                        <!--i class="fa" :class="c.icon"></i--> {{c.name}} 
                                                    </a> 
                                                </li> 
                                            </ul> 
                                            <ul v-else-if="item.children.length >0 && index != 0" class="treeview-menu"  > 
                                                <li v-for="c in item.children" :class="{active : c.isActive}"> 
                                                    <a v-if="c.RightLevel<=isRight" :href="c.url"> 
                                                    <!--i class="fa" :class="c.icon"></i--> {{c.name}} 
                                                    </a> 
                                                </li> 
                                            </ul> 
                                        </li> 
                                    </ul> 
                                </section> 
                            </aside>`
});
/**************** 侧导航 end****************/



/****************  头部 start****************/
Vue.component('el-main-header', {
    data: function () {
        return {
            couponList: [],
            couponSelected: '',
            couponShow: '',
            SysType: sessionStorage.getItem('$SysType'),
            logUserName: sessionStorage.getItem('$session')
        }
    },
    mounted: function () {
      /*   if (sessionStorage.getItem('$power') == "1") {
            this.logUserName = "Admin" || "";
        } else if (sessionStorage.getItem('$power') == "2") {
            this.logUserName = "Technician" || "";
            sessionStorage.setItem('$power', "Technician")
        } else {
            this.logUserName = sessionStorage.getItem('$user') || "";
        } */
    },
    props: ['loguser'],
    updated() {
        /*    Vue.couponShow */
    },
    methods: {
        quit() {
            window.location.href = "Login2.html";
        }

    },
    template: ` <header class="main-header">
    <a href="index.html" class="logo" title="Helios">
        <span class="logo-mini"><img src="assets/images/logo1.png" alt="whelios"  width="36"> </span>
        <span class="logo-lg"><img src="assets/images/logo.png" alt="whelios" > </span>
    </a>
    <div class="navbar navbar-static-top">
        <a href="javascript:void(0);" class="sidebar-toggle" data-toggle="push-menu" role="button">
            <span class="sr-only"></span>
        </a>
       
        <div class="avatar"><img src="assets/images/user-pic.png" alt=""> <span class="user-name">{{logUserName}}</span> 
                <em class="fa-angle-left icon iconfont icon-arrow-right"></em>

            <ul class="avatar-more">
                <li><a href="Personalcenter.html"><i class="icon-zej icon-gerenzhongxinxuanzhong"></i>个人中心</a></li>
                <li><a href="javascript:;" > <i class="icon-zej icon-wifi"></i>基础设置</a></li>
                <li @click="quit"><a href="javascript:;"><i class="icon-zej icon-tuichu"></i>退出登录</a></li>
            </ul>
        </div>
        <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">
                    <li class="dropdown messages-menu">
                        <a href="hsulist.html"  class="dropdown-toggle" title="hsulist.html">
                            <i class=" iconfont icon-xiaoxi" style="fontSize:14px;"></i>
                            <span class="label label-danger">2</span>
                        </a>
                    </li> 
                    <li class="dropdown messages-menu">
                        <a href="#" class="dropdown-toggle">
                        <i class=" iconfont icon-xiaoxi" style="fontSize:14px;"></i>
                            <span  class="label label-success">4</span>
                        </a>
                    </li>
                    <li class="dropdown notifications-menu">
                        <a href="#"  class="dropdown-toggle">
                        <i class=" iconfont icon-xiaoxi" style="fontSize:14px;"></i> 
                            <span class="label label-warning">10</span>
                        </a>
                    </li>
            </ul>
        </div>
    </div>
</header>`
});
/****************  头部 end****************/


function check_ev() {
    if (!window.sessionStorage) {
        alert("the browser version is too low");
        window.location.href = "login.html";
        return;
    }
    var url = window.location.href;
    var session = sessionStorage.getItem('$session');
    if (!session && url.indexOf('login.html') == -1) {
        alert("not authorized");
        window.location.href = "login.html";
        return;
    }
}

function ShowInvalidLoginMessage() {
    // 清除sessionstorage中的登录ID
    // 退到登陆界面
    window.location.href = "../login.html";
}
window.onload = function () {
    var url = window.location.href;
    if (url.indexOf('login.html') == -1) {
        setTimeout(function () {
            check_ev();

        }, 500)

        var maxTime = 600; // seconds
        var time = maxTime;

        document.body.addEventListener("mousemove", function () {
            time = maxTime; // reset
        }, false);

        var intervalId = setInterval(function () {
            time--;
            if (time <= 0) {
                ShowInvalidLoginMessage();
                clearInterval(intervalId);
            }
        }, 1000)
        // var login_user = sessionStorage.getItem('$user') || "";
        //   $("#txtLoginName").text("Hello," + login_user);
    };
};

/* 
$(function () {
    let toggle = 1;
    $(".sidebar-toggle").click(function () {
        if (toggle == 1) {
            console.log(1);
            $("body").addClass("sidebar-collapse");
            toggle -= 1;
        } else {
            console.log(2);
            $("body").removeClass("sidebar-collapse");
            toggle += 1;
        }
    });
}); */