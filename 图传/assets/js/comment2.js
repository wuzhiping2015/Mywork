sessionStorage.setItem('$SysType', "Helios");
sessionStorage.setItem('$power', "12");


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

    var h = $("#content-wrapper").height() - 650;
    $("#content-wrapper").height(h);







    //语言设置

    $("#chinge").click(function () {
        translate(1);
    });
    $("#english").click(function () {
        translate(0);
    });
    /*  var script = document.createElement("script");
     script.type = "text/javascript";
       script.src = "assets/js/changeEnglish.js"; 
    script.src = " https://trampolim.com.br/assets/Polyglot-Language-Switcher-master/js/jquery.polyglot.language.switcher.js";

    document.getElementsByTagName('head')[0].appendChild(script);


     var value = sessionStorage.getItem("language");
     document.onreadystatechange = function () {
         if (document.readyState == 'complete') {
             if (value === "1") {
                Microsoft.Translator.Widget.Translate('zh-CHS', 'en', onProgress, onError, onComplete, onRestoreOriginal, 2000);
             }
         }
     }

     function onProgress(value) {}

     function onError(error) {}

     function onComplete() {
         $("#WidgetFloaterPanels").hide();
     }

     function onRestoreOriginal() {} */

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
        $('#sidebars').tree();
        this.$nextTick(function () {
            var menulist = [{
                adr: 1,
                value: "MenuName"
            }, {
                adr: 2,
                value: "index"
            }, {
                adr: 3,
                value: "channelinfo"
            }, {
                adr: 4,
                value: "channeladv"
            }];

            let tempMenu = [];
            var tempChild = [];
            var obj = {};
            var obj1 = {};

            //首页
            /*  tempChild = [];
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
             obj.name = "Index3";
             obj.url = "index.html";
             // obj.url="#";
             obj.icon = "fa-dashboard";
             obj.isActive = true;
             obj.RightLevel = 1;
             obj.children = tempChild;
             tempMenu.push(obj); */


            obj = {};
            obj.name = "Index";
            obj.url = "index.html";
            obj.icon = " iconfont icon-jizhanxinhao";
            obj.isActive = false;
            obj.RightLevel = 1;
            obj.children = [];
            tempMenu.push(obj);

            obj = {};
            obj.name = "Configuration TAB";
            obj.url = "Configuration_TAB.html";
            obj.icon = " iconfont icon-jizhanxinhao";
            obj.isActive = false;
            obj.RightLevel = 1;
            obj.children = [];
            tempMenu.push(obj);

            obj = {};
            obj.name = "Management";
            obj.url = "management.html";
            obj.icon = " iconfont icon-jizhanxinhao";
            obj.isActive = false;
            obj.RightLevel = 1;
            obj.children = [];
            tempMenu.push(obj);

            obj = {};
            obj.name = "Security";
            obj.url = "security.html";
            obj.icon = " iconfont icon-jizhanxinhao";
            obj.isActive = false;
            obj.RightLevel = 1;
            obj.children = [];
            tempMenu.push(obj);




            obj = {};
            obj.name = "Personal center";
            obj.url = "Personalcenter.html";
            obj.icon = " iconfont icon-jizhanxinhao";
            obj.isActive = false;
            obj.RightLevel = 1;
            obj.children = [];
            tempMenu.push(obj);












            /*    obj = {};
                 obj.name = "Activation HBS";
                 obj.url = "Activation_hbs.html";
                 obj.icon = "fa-dashboard";
                 obj.isActive = false;
                 obj.RightLevel = 1;
                 obj.children = [];
                 tempMenu.push(obj); */

            //Configure
            tempChild = [];

            obj1 = {};
            obj1.name = "dome5";
            obj1.url = "index5.html";
            obj1.icon = " iconfont icon-jizhanxinhao";
            obj1.RightLevel = 2;
            obj1.isActive = false;
            tempChild.push(obj1);

            /*  obj1 = {};
             obj1.name = "dome3 ";
             obj1.url = "index3.html";
             obj1.icon = "fa-cog";
             obj1.RightLevel = 2;
             obj1.isActive = false;
             tempChild.push(obj1); */

            obj = {};
            obj.name = "Configure";
            obj.url = "#";
            obj.icon = " iconfont icon-jizhanxinhao";
            obj.isActive = false;
            obj.RightLevel = 2;
            obj.children = tempChild;
            tempMenu.push(obj);




            //开发中

            tempChild = [];
            obj1 = {};
            obj1.name = "开发中...";
            obj1.url = "qqq.html";
            obj1.icon = " iconfont icon-jizhanxinhao";
            obj1.RightLevel = 2;
            obj1.isActive = false;
            tempChild.push(obj1);


            obj1 = {};
            obj1.name = "开发中...";
            obj1.url = "BB.html";
            obj1.icon = " iconfont icon-jizhanxinhao";
            obj1.RightLevel = 2;
            obj1.isActive = false;
            tempChild.push(obj1);
            obj1 = {};
            obj1.name = "开发中...";
            obj1.url = "cc.html";
            obj1.icon = " iconfont icon-jizhanxinhao";
            obj1.RightLevel = 2;
            obj1.isActive = false;
            tempChild.push(obj1);

            obj = {};
            obj.name = "开发中...";
            obj.url = "#";
            obj.icon = " iconfont icon-jizhanxinhao";
            obj.isActive = false;
            obj.RightLevel = 2;
            obj.children = tempChild;
            tempMenu.push(obj);




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
                                        <li class="header ">欢迎使用智能图传系统</li> 
                                        <li v-for="(item,index) in menuList" :key="index"  :class="[{active : item.isActive} ,item.url=='#' ? 'treeview' :'']"> 
                                             
                                            <a  v-if="item.RightLevel<=isRight" :href="item.url"> 
                                                <i class="" :class="item.icon" style="font-size:17px;"></i> 
                                                <span>{{item.name}}</span> 
                                                <span v-if="item.url=='#'" class="pull-right-container"> 
                                                    <i class="fa fa-angle-left pull-right"></i> 
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
            logUserName: sessionStorage.getItem('$power'),
            SysType: sessionStorage.getItem('$SysType'),
            logUserName: 'admin'
        }
    },
    mounted: function () {
        if (sessionStorage.getItem('$power') == "1") {
            this.logUserName = "Admin" || "";
        } else if (sessionStorage.getItem('$power') == "2") {
            this.logUserName = "Technician" || "";
            sessionStorage.setItem('$power', "Technician")
        } else {
            this.logUserName = sessionStorage.getItem('$user') || "";
        }
        console.log(sessionStorage.getItem('$power'));
    },

    props: ['loguser'],

    updated() {
        /*    Vue.couponShow */
    },
    methods: {
        quit() {
            window.location.href = "Login.html";
        }
        /*     SelectBandValue: function (couponSelected) {
                var vm = this;
                var count = 0;
                var temp = vm.couponSelected;
                var id1 = 0;
                var params12 = [{
                    "adr": "1ef",
                    "value": temp.toString()
                }];

                setTimeout(function () {
                    util.postMonitor(params12, function (e) {
                        id1 = vm.couponList[parseInt(vm.couponSelected)].band;
                        type1 = vm.couponList[parseInt(vm.couponSelected)].type;
                        count = vm.couponList[parseInt(vm.couponSelected)].count;
                        sessionStorage.setItem('$bandNum', id1);
                        sessionStorage.setItem('$MODTYPE', type1);
                        sessionStorage.setItem('$Count', count);
                    }).then(function () {
                        history.go(0);
                    });
                }, 100);

            } */
    },
    template: ` <header class="main-header">
    <a href="index.html" class="logo">
        <span class="logo-mini"><img src="assets/images/Helios2.png" alt="whelios"> </span>
        <span class="logo-lg"><img src="assets/images/Helios1.png" alt="whelios"> </span>
    </a>
    <nav class="navbar navbar-static-top">
        <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
            <span class="sr-only"></span>
        </a>
        <div class="navbar-custom-menu"> </div>
        <div class="avatar"><img src="assets/images/user-pic.png" alt=""> <span
                class="user-name">Helios</span> <em class="fa fa-fw fa-caret-down icon-input-triangle icon-input-triangle"></em>
            <ul class="avatar-more">
                <li><a href="javascript:;" id="chinge"><i class="icon-zej icon-user"></i>个人中心</a></li>
                <li><a href="javascript:;" id="english" i18n="i18n.successful-case"><i
                            class="icon-zej icon-headphones"></i>消息提醒</a></li>
                <li @click="quit"><a href="javascript:;"><i class="icon-zej icon-off"></i>退出登录</a></li>
            </ul>
        </div>
        <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">
                <li class="dropdown messages-menu"><a href="#" data-toggle="dropdown"
                        class="dropdown-toggle"><i class="iconfont icon-xinhaota" style="fontSize:16px;"></i> <span
                            class="label label-danger">2</span></a></li>
                <li class="dropdown messages-menu"><a href="#" data-toggle="dropdown"
                        class="dropdown-toggle"><i class="fa fa-envelope-o"></i> <span
                            class="label label-success">4</span></a></li>
                <li class="dropdown notifications-menu"><a href="#" data-toggle="dropdown"
                        class="dropdown-toggle"><i class="fa fa-bell-o"></i> <span
                            class="label label-warning">10</span></a></li>
            </ul>
        </div>
    </nav>
</header>`
});
/****************  头部 end****************/