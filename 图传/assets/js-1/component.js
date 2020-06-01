var flag;
var flag_Relay_das = sessionStorage.getItem('$SysType') == "Relay das" ? true : false;
var flag_DMR = sessionStorage.getItem('$SysType') == "DMR" ? true : false;

var flag_BroadBand_multi = sessionStorage.getItem('$SysType') == "BroadBand_multi" ? true : false;
var flag_bandSelect10 = flag_BroadBand_multi || flag_Relay_das;



Vue.component('el-main-sidebar', {

    data: function () {
        return {
            version: "Version:" + App.version,
            isRight: sessionStorage.getItem('$user') == "Factory" ? 3 : sessionStorage.getItem('$user') == "User" ? 1 : 2,
            isRelay: sessionStorage.getItem('$SysType') == "Relay das" ? true : false,
            //isRelay: true,
            relayHtml: "Index1.html",
            //24
            menuList: [],

            a: "",
            b: "",
        }
    },
    created() {
        console.log("创建完成：");
        console.log(this.$data);
    },
    mounted: function () {
        $('#sidebars').tree();



        this.$nextTick(function () {


            var menulist = JSON.parse(sessionStorage.getItem('$Menulist'));

            console.log(menulist);


            let tempMenu = [];
            var tempChild = [];
            var obj = {};
            var obj1 = {};

            console.log(tempMenu);




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

            } else {
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
                    if (sessionStorage.getItem('$SysType') == "SignalTouch") {
                        if (sessionStorage.getItem('$user') == "Factory") {
                            obj1 = {};
                            obj1.name = "Advanced Settings";
                            obj1.url = menulist[3].value + ".html";
                            obj1.icon = "fa-chain";
                            obj1.RightLevel = 2;
                            obj1.isActive = false;
                            tempChild.push(obj1);
                        }

                    } else {
                        obj1 = {};
                        obj1.name = "Advanced Settings";
                        obj1.url = menulist[3].value + ".html";
                        obj1.icon = "fa-chain";
                        obj1.RightLevel = 2;
                        obj1.isActive = false;
                        tempChild.push(obj1);
                    }

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

                if (sessionStorage.getItem('$SysType') == "Malaysia" || sessionStorage.getItem('$SysType') == "SignalTouch") {
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
            console.log(uri);
            $.each(this.menuList, function (i, t) {

                console.log(t);

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


Vue.component('el-main-footer', {
    data: function () {
        var ver = App.version;
        return {}
    },
    template: ` <footer class="main-footer" style="font-size:11px"> 
                    <div class="pull-right hidden-xs"> 
                        ver:0.1.25
                    </div> 
                    <strong>Copyright &copy; 2018 
                    <a href="#">Helios Technology. </a></strong> All rights reserved. 
                </footer>`
});


Vue.component('el-main-header', {
    data: function () {

        return {
            couponList: [],
            couponSelected: '',
            couponShow: '',
        }
    },
    props: ['loguser'],
    mounted: function () {
        var list = [];
        var arr = [];
        var bandid = 0;
        var selectValue;
        var count = 0;
        var bandname_arrs = new Array(12);
        var obj;
        var band_list = new Array();
        var type_list = new Array();
        var flag1 = 0;
        var flag = 0;
        var vm = this;
        var params = ["1e1", "1e2", "1e3", "1e4", "1e5", "1e6", "1e7", "1e8", "1e9", "1ea", "1eb", "1ec", "12b"];

        util.getmods(0, function (data) {
            $.each(data, function (i, t) {

                if (sessionStorage.getItem('$SysType') == "Relay das") {
                    if (t.type == 7) {
                        band_list.push(t.band);
                        type_list.push(t.type);
                        params.push("1ef");
                    }
                } else if (sessionStorage.getItem('$SysType') == "BroadBand_multi") {
                    if (t.type == 3) {
                        band_list.push(t.band);
                        type_list.push(t.type);

                    } else if (t.type == 11) {
                        band_list.push(t.band);
                        type_list.push(t.type);
                    }
                    params.push("1ef");
                } else if (sessionStorage.getItem('$SysType') == "SignalTouch") {
                    if (t.type == 6) {
                        band_list.push(t.band);
                        type_list.push(t.type);
                    }
                    params.push("1ef");
                } else if (sessionStorage.getItem('$SysType') == "Malaysia") {
                    if (t.type == 1) {
                        band_list.push(t.band);
                        type_list.push(t.type);

                    }
                    params.push("1ef");
                } else {
                    if (t.type == 1) {
                        band_list.push(t.band);
                        type_list.push(t.type);
                    }
                }

            });

            util.getMonitor(params, function (data) {

                $.each(data, function (i, t) {
                    if (t.adr == 0x12b) {
                        arr = t.value.split(',');
                        for (var i = 0; i < 12; i++) {

                            if (arr[i] != 0) {
                                obj = {};
                                obj.id = count++;
                                obj.name = arr[i];

                                for (var j = 0; j < band_list.length; j++) {
                                    obj.status = true;
                                    obj.count = i;
                                    obj.type = type_list[j];
                                    obj.band = band_list[j];

                                    if (arr[i] == band_list[j]) {
                                        break;
                                    } else
                                        obj.status = false;


                                }
                                if (bandname_arrs[i] != "") {
                                    obj.name = bandname_arrs[i];
                                }



                                list.push(obj);
                            }

                        }
                        vm.couponList = list;
                    } else if (t.adr == 0x1e1) {
                        bandname_arrs[0] = t.value;
                    } else if (t.adr == 0x1e2) {
                        bandname_arrs[1] = t.value;
                    } else if (t.adr == 0x1e3) {
                        bandname_arrs[2] = t.value;
                    } else if (t.adr == 0x1e4) {
                        bandname_arrs[3] = t.value;
                    } else if (t.adr == 0x1e5) {
                        bandname_arrs[4] = t.value;
                    } else if (t.adr == 0x1e6) {
                        bandname_arrs[5] = t.value;
                    } else if (t.adr == 0x1e7) {
                        bandname_arrs[6] = t.value;
                    } else if (t.adr == 0x1e8) {
                        bandname_arrs[7] = t.value;
                    } else if (t.adr == 0x1e9) {
                        bandname_arrs[8] = t.value;
                    } else if (t.adr == 0x1ea) {
                        bandname_arrs[9] = t.value;
                    } else if (t.adr == 0x1eb) {
                        bandname_arrs[10] = t.value;
                    } else if (t.adr == 0x1ec) {
                        bandname_arrs[11] = t.value;
                    } else if (t.adr == 0x1ef) {
                        vm.couponSelected = parseInt(t.value);
                        // sessionStorage.setItem('$bandNum', band_list[parseInt(t.value)]);
                        bandid = arr[parseInt(t.value)];
                        sessionStorage.setItem('$bandNum', bandid);
                        var bandItem = list.find(function (item) {
                            return item.band == bandid
                        });
                        //var type2 = bandItem.type;

                        sessionStorage.setItem('$MODTYPE', bandItem.type);
                        sessionStorage.setItem('$Count', bandItem.count);
                    }

                });

            });
        });
        var flag = sessionStorage.getItem('$SysType') == "Relay das" ? true : false;
        var flag1 = sessionStorage.getItem('$SysType') == "Multi Fequency" ? true : false;
        var flag2 = sessionStorage.getItem('$SysType') == "BroadBand_multi" ? true : false;
        var flag3 = sessionStorage.getItem('$SysType') == "SignalTouch" ? true : false;
        var flag4 = sessionStorage.getItem('$SysType') == "Malaysia" ? true : false;

        vm.couponShow = flag | flag1 | flag2 | flag3 | flag4;
    },
    updated() {
        Vue.couponShow
    },
    methods: {
        SelectBandValue: function (couponSelected) {
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

        }
    },
    template: `<header class="main-header"> 
                <a href="#" class="logo"> 
                    <span class="logo-mini"> 
                        <b><img src="../images/logo-icon.png" /></b> 
                    </span> 
                    <span class="logo-lg"> 
                        <b><img  width="150px" height="40px" src="../images/Helios.png" /></b> 
                    </span> 
                </a> 
               
                <nav class="navbar navbar-static-top" role="navigation"> 
                    <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button"> 
                        <span class="sr-only">Toggle navigation</span> 
                    </a> 
                   
                    
                    <div class="navbar-custom-menu"> 
                    <ul class="nav navbar-nav" v-show="couponShow" > 
                     <li class="dropdown user user-menu"> 
                         <a href="#" class="dropdown-toggle" data-toggle="dropdown"> 
                            Bands:

                         <el-select v-model="couponSelected"  placeholder="please choose" @change="SelectBandValue(couponSelected)" size="mini">
                            <el-option
                              v-for="item in couponList"
                              :label="item.name"
                              :value="item.id">
                              <span style="float: left">{{ item.name }}</span>
                              <span v-if="item.status" style="float: right;" class="label label-success">&nbsp;</span>
                              <span v-else style="float: right; " class="label label-danger">&nbsp;</span>
                            </el-option>
                          </el-select>
                        </a> 
                        </li> 
                    </ul> 
                        <ul class="nav navbar-nav"> 
                            <li class="dropdown user user-menu"> 
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown"> 
                                    <span class="hidden-xs">{{loguser}}</span> 
                                </a> 
                            </li> 
                            <li> 
                                <a href="../login.html">Logout 
                                </a> 
                            </li> 
                        </ul> 
                    </div> 
                </nav> 
        </header>`
});