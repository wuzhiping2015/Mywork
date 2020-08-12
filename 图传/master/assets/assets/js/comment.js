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
let heliosUser = ["Factory", "Agent", "Admin", "Technician"];

sessionStorage.getItem("url", "Status");

/* sessionStorage.setItem("equipment", "au"); */

var util = {
    //告警
    warning: function (msg) {
        toast.$message({
            message: msg,
            showClose: true,
            type: 'warning'
        });
    },
    info: function (msg) {
        toast.$message({
            message: msg
        });
    },
    //成功
    success: function (msg) {
        toast.$message({
            message: msg,
            type: 'success',
            duration: 1500
        });
    },
    //错误
    error: function (msg) {
        toast.$message({
            message: msg,
            type: 'error',
            duration: 1800
        });
    },
    //版本
    copy: function () {
        var adr = [276, 292]; /* 152 状态 */
        var obj = {
            "data": adr.join(),
            "action": "READ"
        };
        var Version = "";
        var Clusterswitch = "";
        util.getattrajax(obj, function (data) {
            data.data.forEach(function (v, i, attr) {
                switch (v.adr) {
                    case 276:
                        Version = `Fujian Jing ao Communication Technology Co. LTD  M-DOTS &#8482; ` + v.value +
                            `&nbsp;&nbsp;<a href="http://www.heliostelecom.com/" title="Helios" target="_blank" class="icon iconfont icon-wangzhi heliosUrl"></a>`;
                        document.querySelector(".login-footer").innerHTML = Version;
                        break;
                    case 292:
                        Clusterswitch = v.value == "0" ? false : true;
                }
            });
            if (true == Clusterswitch) {
                $("#loginBtn").after(`<p class="btn-bottom"  id="loginCluter"> Cluster Management<i class="el-icon-arrow-right"></i></p>`);
                $("body").on("click", "#loginCluter", function () {
                    window.location.href = "Cluster.html";
                    sessionStorage.setItem("url", "Status");
                    sessionStorage.setItem("equipment", 'au');
                    sessionStorage.setItem('$session', 'Technician');
                });
            }
        });

    },
    //登录
    login: function (user, pwd) {
        var obj = {
            "data": [283].join(),
            "action": "READ"
        };
        var HeliosDev = false;
        var pwd1 = (heliosUser[0] == user) ? `3A7Q9644` : user;
        util.getattrajax(obj, function (data) {
            if (283 == data.data[0].adr) {
                if ("1" === data.data[0].value) {
                    HeliosDev = true;
                    util.GetHeliosDevMsg();
                    $.ajax({
                        url: "../cgi-bin/doaction.cgi",
                        data: {
                            "action": "USER_LOGIN",
                            "user": user,
                            "pwd": pwd1,
                        },
                        type: "post",
                        success: function (data, status) {
                            var data1 = JSON.parse(data);
                            var TagLen = (data1.data.indexOf(";"));
                            var sessionName = data1.data.slice(TagLen + 1, data1.data.length - 1);
                            sessionStorage.setItem('sessionName', sessionName);

                            if (data1.code == 1) {
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
                                //$(".el-input__inner").val("");
                                util.error(data.message);
                            }
                        }
                    });
                } else {
                    localStorage.removeItem("SETdisp");
                    $("#loginBtn").attr("disabled", "disabled").css({
                        "cursor": "no-drop",
                        "background": "#3c6485",
                        "color": "#c3bfbf"
                    }).html('<i class="el-icon-loading"></i> Into the system...');
                    util.error(`[Device is restarted and restored] It is expected to take 1 minute!`);
                    setTimeout(function () {
                        window.location.href = "login.html";
                    }, 4000);
                }
            }
        });
    },

    //读取
    getattrajax: function (attr, callback) {
        var p = new Promise(function (resolve, reject) {
            $.ajax({
                url: "../cgi-bin/doaction.cgi",
                data: attr,
                type: "get",
                success: function (data, status) {

                    var rsp = JSON.parse(data);
                    if (typeof rsp == "string") {
                        toast.$message.error("Error：" + attr.data);
                    } else {
                        callback(rsp);
                        resolve(rsp);
                        //window.location.href = "../login.html";
                    }
                },
                error: function (req, status, err) {
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
    postattrajax: function (attr, callback) {
        /* console.log(attr); */
        var p = new Promise(function (resolve, reject) {
            $.ajax({
                url: "../cgi-bin/doaction.cgi",
                data: attr,
                type: "post",
                dataType: "text",
                success: function (data, status) {
                    var rsp = JSON.parse(data);
                    if (rsp.code == 1) {
                        callback(rsp.code);
                        resolve(rsp.code);
                    } else {
                        callback(rsp);
                        resolve(rsp);
                    }
                },
                error: function (req, status, err) {
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
    postattrajax1: function (attr, callback) {
        /* console.log(attr); */
        var p = new Promise(function (resolve, reject) {
            $.ajax({
                url: "../cgi-bin/doaction.cgi",
                data: attr,
                type: "post",
                dataType: "text",
                success: function (data, status) {
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
                error: function (req, status, err) {
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
            Agentenable: false,
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
            obj.Agentenable = true;
        }
        if ("3" == value) {
            obj.agent = true;
            obj.enbale = true;
            obj.Agentenable = true;
        }
        return obj
    },

    ResTruefalseArray(name, adr, value) {
        let obj = {
            name: "",
            adr: "",
            agent: [],
            enbale: [],
            Agentenable: [],
        }
        obj.adr = adr;
        obj.name = name;
        for (var i = 0; i < value.length; i++) {
            if ("0" == value[i]) {
                obj.agent.push(false);
                obj.enbale.push(false);
                obj.Agentenable.push(false);
            }
            if ("1" == value[i]) {
                obj.agent.push(false);
                obj.enbale.push(true);
                obj.Agentenable.push(false);
            }
            if ("2" == value[i]) {
                obj.agent.push(true);
                obj.enbale.push(false);
                obj.Agentenable.push(true);
            }
            if ("3" == value[i]) {
                obj.agent.push(true);
                obj.enbale.push(true);
                obj.Agentenable.push(true);
            }
        }
        return obj;
    },

    //使能开关Array  读取
    HeliosEnable(name, adr, value) {
        let obj = {
            name: "",
            adr: "",
            value: [],
        }
        obj.adr = adr;
        obj.name = name;

        for (var i = 0; i < value.length; i++) {
            if ("0" == value[i]) {
                obj.value.push(false);
            }
            if ("1" == value[i]) {
                obj.value.push(true);
            }
        }
        return obj;
    },
    //使能开关Array  设置
    HeliosNumberRes(value) {
        let make = [];
        for (var i = 0; i < Helios.Roclength; i++) {
            if (value[i] == false) {
                make.push("0");
            } else if (value[i] == true) {
                make.push("1");
            }
        }
        return make.join();
    },

    //真假转换为数字
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
    resnumberArray(agent, enbale) {
        let make = [];
        for (var i = 0; i < Helios.Roclength; i++) {
            if (agent[i] == false && enbale[i] == false) {
                make.push("0");
            } else if (agent[i] == false && enbale[i] == true) {
                make.push("1");
            } else if (agent[i] == true && enbale[i] == false) {
                make.push("2");
            } else if (agent[i] == true && enbale[i] == true) {
                make.push("3");
            }
        }
        return make.join();
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
        return a.reduce(function (acc, c) {
            acc = 16 * acc + c;
            return acc + "";
        }, 0);
    },

    //除1000 UL Freq , DL Freq

    divide() {
        var argu = [];
        var utiltip = false;
        if (0 == arguments[1]) {
            arguments[0].forEach(function (v, i) {
                argu.push(v / 1000);
            });
            return argu;
        } else {
            arguments[0].find(function (v) {
                if (true != !isNaN(v)) {
                    utiltip = true;
                    return false;
                } else {
                    argu.push(v * 1000);
                }
            });
            if (true == utiltip) {
                toast.$message({
                    message: `Please enter the valid 【UL Freq】 OR 【DL Freq】 data`,
                    type: 'error',
                    duration: 2000
                });
                setTimeout(function () {;
                    window.location.href = "roc.html";
                }, 2000);
                return false;
            } else {
                if (true != utiltip) {

                    return argu.join();
                }
            }
        }
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
                    /*  default:
                          sessionStorage.setItem("equipment", "au");
                          devType = "au";
                          break; */
            }
            return devType;
        }
        util.getattrajax(obj, function (data) {
            let Data2 = [];
            data.data.forEach(function (v, i, attr) {
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

    //多用户操作 设备执行 
    SetHeliosDevMsg() {
        let MDOTS = JSON.parse(localStorage.getItem("MDOTS"));
        var obj = {
            "data": JSON.stringify(MDOTS),
            "action": "SET"
        }
        util.postattrajax(obj, function (data) {
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
    //权限数据长度
    HeliosDataLength() {
        let isshow = [];
        if (heliosUser[3] != $session) {
            for (var i = 0; i < arguments[0].length; i++) {
                if (arguments[0][i].Agentenable == true) {
                    /* continue; */
                    isshow.push(true);
                } else {
                    //isshow = false;
                    isshow.push(false);
                }
            }
        }
        return isshow;
    },

    HeliosDataLength1() {
        let isshow = false;
        if (heliosUser[0] != $session) {
            for (var i = 0; i < arguments[0].length; i++) {
                if (arguments[0][i] == true) {
                    isshow = (true);
                } else {
                    //isshow = false;
                }
            }
        }
        return isshow;
    },
}

util.GetHeliosDevMsg();

/****************  头部 start****************/
Vue.component('el-main-header', {
    data: function () {
        return {
            action: 0,
            url: sessionStorage.getItem(url),
            TopoNull: sessionStorage.getItem("TopoNull"),
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
                /* {
                    url: "Tools.html",
                    isActive: false,
                    name: "Tools"
                }, */
                {
                    url: "Report.html",
                    isActive: false,
                    name: "Report"
                },
                /*  {
                        url: "Factory.html",
                        isActive: false,
                        name: "Factory"
                    }, */

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
    mounted: function () {
        this.$nextTick(function () {
            if (1 == this.TopoNull) {
                //this.menuList.splice(-7, 1);
            }
            $.each(this.menuList, function (i, t) {
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

        if (heliosUser[0] == $session) {
            this.menuList.splice(7, 0, {
                url: "Factory.html",
                isActive: false,
                name: "Factory"
            });
        }

    },
    methods: {
        //退出
        quit() {
            let data = [];
            var $Tit = "";
            var $Tit1 = `Out of the M - DOTS `;
            var $Txt = `Determine whether to exit or not`;
            var obj = {
                adr: 83,
                value: "0",
            };
            const h = this.$createElement;
            this.$msgbox({
                title: $Tit1,
                message: h('p', null, [
                    h('span', null,
                        $Tit
                    ),
                    h('p', {
                        style: 'color: teal'
                    }, $Txt)
                ]),
                showCancelButton: true,
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        instance.confirmButtonLoading = true;
                        instance.confirmButtonText = 'The execution of...';
                        setTimeout(() => {
                                done();
                                setTimeout(() => {
                                    instance.confirmButtonLoading = false;
                                    data.push(obj);
                                    var obj1 = {
                                        "data": JSON.stringify(data),
                                        "action": "SET"
                                    }
                                    util.postattrajax1(obj1, function (data) {
                                        if ("success" != data) {
                                            toast.$message({
                                                message: ' Error:' + data.message,
                                                type: 'error',
                                                showClose: true,
                                                offset: 80
                                            });
                                        } else {
                                            /* 
                                             */
                                            $.ajax({
                                                url: "../cgi-bin/doaction.cgi",
                                                data: {
                                                    "action": "USER_LOGOUT",
                                                    "user": $session,
                                                },
                                                type: "post",
                                                success: function (data, status) {
                                                    var data1 = JSON.parse(data);
                                                    if (data1.code == 1) {
                                                        setTimeout(() => {
                                                            sessionStorage.removeItem("$session");
                                                            sessionStorage.removeItem("url");
                                                            sessionStorage.removeItem("equipment");
                                                            sessionStorage.removeItem("AlarmData");
                                                            sessionStorage.removeItem("TopoNull");
                                                            localStorage.removeItem("MDOTS");
                                                            localStorage.removeItem("code");
                                                            localStorage.removeItem("SETdisp");
                                                            localStorage.removeItem("HeliosDev");
                                                            window.location.href = "login.html";
                                                        }, 0);
                                                    } else {
                                                        //$(".el-input__inner").val("");
                                                        util.error(data.message);
                                                    }
                                                }
                                            });
                                        }
                                    });
                                }, 100);
                            },
                            1000);
                    } else {
                        done();
                        //console.log(2);
                    }
                }
            }).then(action => {
                /* this.$message({
                    type: 'success',
                    message: "The update is successful"
                }); */
            }).catch(() => {
                console.log(1);
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
                    <li><a  href="Equipment.html"><i class="fa fa-fwicon iconfont icon-guangxianxiangduanzi"></i> Equipment</a></li>
                    <li @click="quit"><a href="javascript:;"><i class="fa fa-fw icon iconfont icon-tuichu"></i>Safety Exit</a></li>
                </ul>
            </div>
            <div class="tagerLink">
                 <ul>
                    <li v-for="(v,i) in menuList" > 
                     <a :href="v.url" :class="{active:v.isActive}" v-if="v.name!='Network'">{{v.name}} </a>
                    
                     <a :href="v.url" :class="{active:v.isActive}" v-if="v.name=='Network'">{{v.name}}
                        <em class="el-icon-arrow-down el-icon--right" ></em> 
                     </a>
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
        data: function () {
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
    data: function () {
        return {
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            tagname: (tagname == "au" ? "MU" : tagname.toUpperCase()) + " - " + this.MDOTStype(),
            menu: [],
        }
    },

    beforeMount() {
        this.MDOTStype();
        var vue = this;

        var g_sitesNode = {
            "sites": [],
            "menu": []
        };

        function RouteLayer(route) {
            let cnt = 0;
            let routeArr = route.split('');
            for (let i = 0; i < 8; i++) {
                if (routeArr[i] != "0") {
                    cnt += 1;
                } else {
                    break;
                }
            }
            return cnt;
        }

        function DeviceDataPoll(site_no, devices, deviceList) {
            for (let i = 0; i < devices.length; i++) {
                let devObj = {};
                devObj = {
                    "site_no": site_no,
                    "route": devices[i].route,
                    "routeLayer": RouteLayer(devices[i].route),
                    "device_id": devices[i].device_id,
                    "equipid": devices[i].device_id,
                    "label": util.hex2int(devices[i].device_id),
                    "DEVtype": devices[i].type,
                    "children": [],
                }

                deviceList.push(devObj);
            }
        }

        function SitesDataPoll(sites, siteList) {
            for (let i = 0; i < sites.length; i++) {
                let devObj = {};
                devObj.site_no = sites[i].site_no;
                devObj.device_id = "0";
                devObj.equipid = "0";
                devObj.label = util.hex2int(sites[i].site_no);
                devObj.DEVtype = "AU";
                devObj.route = "0";
                devObj.routeLayer = 0;
                devObj.devices = [];
                devObj.children = [];
                siteList.push(devObj);
                //远端机处理
                let devices = (sites[i].device);

                DeviceDataPoll(devObj.site_no, devices, devObj.devices);
            }
        }

        function SetDeviceType(typeStr) {
            console.log(typeStr);
            let type = '0';
            switch (typeStr) {
                case "AU":
                    type = '0';
                    break;
                case "EU":
                    type = '1';
                    break;
                case "RU":
                    type = '3';
                    break;
            }
            return type;
        }

        function FindTopoParentMenu(devices, device) {
            let parentLayer = device.routeLayer - 1;
            let subRoute = device.route.substring(0, parentLayer);
            let subPRout;

            for (let i = 0; i < devices.length; i++) {
                subPRout = devices[i].route.substring(0, parentLayer);
                if (parentLayer == devices[i].routeLayer && subRoute == subPRout) {
                    return devices[i].children;
                }
            }

            return null;
        }

        function DevicesMenu(devices, menu) {
            let route, routeArr;
            let node;
            for (let i = 0; i < devices.length; i++) {
                route = devices[i].route.toString();
                routeArr = route.split('');
                if (1 == devices[i].routeLayer) {
                    devices[i].type = SetDeviceType(devices[i].DEVtype);
                    menu.push(devices[i]);
                } else {
                    parentMenu = FindTopoParentMenu(devices, devices[i]);
                    devices[i].type = SetDeviceType(devices[i].DEVtype);

                    if (null == parentMenu) continue;

                    parentMenu.push(devices[i]);
                }
            }
        }

        function SitesMenu(sites, menu) {
            for (let i = 0; i < sites.length; i++) {
                sites[i].type = SetDeviceType("AU");
                menu.push(sites[i]);
                DevicesMenu(sites[i].devices, sites[i].children);
            }
        }
        $.ajax({
            type: "GET",
            url: "topology.json?verisn=" + Math.ceil(Math.random() * 1010),
            dataType: "json",
            success: function (data1) {
                if (undefined == data1.sites.length) {
                    //sessionStorage.setItem('TopoNull', 1);
                    return false;
                } else {
                    SitesDataPoll(data1.sites, g_sitesNode.sites);
                    SitesMenu(g_sitesNode.sites, g_sitesNode.menu);
                    console.log(g_sitesNode.menu);

                    vue.menu = g_sitesNode.menu;
                }
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
                    value: util.hex2int((data.site_no + ""))
                },
                {
                    adr: 83,
                    value: util.hex2int((data.equipid + ""))
                }
            ];

            console.log(obj);

            var MDOTS = {
                "data": JSON.stringify(obj),
                "action": "SET"
            }
            localStorage.setItem("MDOTS", JSON.stringify(obj));
            util.postattrajax(MDOTS, function (data1) {
                if (1 != data1) {
                    toast.$message({
                        message: ' Error:' + data1.message,
                        type: 'error',
                        showClose: true,
                        offset: 80
                    });
                    return false;
                } else {
                    setTimeout(function () {
                        window.location.href = "Status.html";
                    }, 100);
                }
            });
            //  util.EquipmentID();
        },

        MDOTStype() {
            let MDOTDATA;
            let MDOTS = JSON.parse(localStorage.getItem("MDOTS"));
            MDOTS.forEach(function (v, i, attr) {
                switch (v.adr) {
                    case 83:
                        MDOTDATA = (v.value);
                        break;
                }
            });
            return MDOTDATA;
        },

    },
    /* sidebar   menu*/
    template: ` <div class="main-sidebar">
         <div class="box-header with-border">
            <h3 class="box-title"><i class="icon iconfont icon-caijishebeixinxichaxun"></i> {{tagname}}  {{siteno}} </h3>
         </div>
         
        <div class="sidebar">  
            <el-tree :data="menu" default-expand-all  :props="defaultProps" @node-click="handleNodeClick">
                     <span class="custom-tree-node" slot-scope="{ node, data }">
                     <i v-if="data.type=='0' ? true :false" class="icon iconfont icon-zhuji"></i> 
                     <i v-else-if="data.type=='1' ? true :false" class="icon iconfont icon-luyouqi1"></i> 
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

        },
        methods: {


        }
    })
}
/**************** 侧导航 end****************/



//DEVICE 菜单
Vue.component("device", {
    data: function () {
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
            //util.SetHeliosDevMsg();
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
        this.$nextTick(function () {
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
            /*  $.each(this.menuList, function(i, t) {
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
    sessionStorage.removeItem("$session");
    sessionStorage.removeItem("sessionName");
    sessionStorage.removeItem("url");
    sessionStorage.removeItem("equipment");
    sessionStorage.removeItem("AlarmData");
    sessionStorage.removeItem("TopoNull");
    localStorage.removeItem("MDOTS");
    localStorage.removeItem("code");
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

function getOnline() {
    var sessionName = sessionStorage.getItem('sessionName');
    $.ajax({
        url: "../cgi-bin/doaction.cgi",
        data: {
            "action": "GetOnline",
            "session": sessionName,
        },
        type: "post",
        success: function (data, status) {
            var data1 = JSON.parse(data);
            if (data1.code == 1) {} else {
                toast.$notify({
                    title: ' M-DOTS  Restarts',
                    message: 'Restart the device and it will exit the system',
                    type: 'warning',
                    duration: 2000
                });
                setTimeout(function () {
                    ShowInvalidLoginMessage();
                }, 2000);

            }
        }
    });
}

window.onload = function () {
    var url = window.location.href;
    if (url.indexOf('login.html') == -1) {
        setTimeout(function () {
            check_ev();
            getOnline();
        }, 0)
        var maxTime = 500; // seconds
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
        }, 1000);

    };
};