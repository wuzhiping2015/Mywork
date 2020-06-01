//系统制式--为了兼容DMR项目 没有时序概念设置
var systemType=new Array("tetra","Relay das","BroadBand","DMR","Multi Fequency","BroadBand_multi","SignalTouch","Malaysia");


// var App = Object.freeze({
//     name: 'bdbc',
//     version: '0.0.4',
//     sys:'',
// })
var App = {
    name: 'bdbc',
    version: '0.1.25',
    HomeMade:true,
}
var  flag_SignalTouch= sessionStorage.getItem('$SysType')=="SignalTouch"?true:false;

var  flag_MultFrequency= sessionStorage.getItem('$SysType')=="Multi Fequency"?true:false;
var  flag_BroadBand_multi= sessionStorage.getItem('$SysType')=="BroadBand_multi"?true:false;
var  flag_Relay_das= sessionStorage.getItem('$SysType')=="Relay das"?true:false;
var  flag_Malaysia= sessionStorage.getItem('$SysType')=="Malaysia"?true:false;

//var  flag_bandSelect=flag_BroadBand_multi|flag_MultFrequency;  //choose  the band of sys
var  flag_bandSelect=flag_BroadBand_multi||flag_MultFrequency||flag_Relay_das||flag_SignalTouch||flag_Malaysia;  



function GetEquipType(){//获取设备类型
    var adrs = ["1dd"];
    util.getMonitor(adrs, function (data) {
        $.each(data,function(idx, item){

            if (item.adr==0x1dd) 
            {
                  sessionStorage.setItem('$SysType', systemType[parseInt(item.value)]);


                  if(item.value=='0'||item.value=='3')
                  {
                    sessionStorage.setItem('$MODTYPE',3);
                  }
                  else if(item.value=='1')
                  {
                    sessionStorage.setItem('$MODTYPE',7);
                  }
                  else if(item.value=='6')
                  {
                    sessionStorage.setItem('$MODTYPE',6);
                  }
                  else
                  {
                    sessionStorage.setItem('$MODTYPE',11);
                  }

            }
        });
    });

};



//const MOD_TYPE =3;
const MONITOR_TYPE = 4;
var toast = new Vue({
    el: '#test'
});

$(function () {
    new Vue({
        el: '#comp-footer'
    });
    new Vue({
        el: '#comp-header',
        data: {
            logUserName: 'admin'
        },
        mounted: function () {
           if(sessionStorage.getItem('$power')=="1") {
            this.logUserName = "Admin" || "";
           }
           else if(sessionStorage.getItem('$power')=="2") {
            this.logUserName = "Technician" || "";
           }else{
                this.logUserName = sessionStorage.getItem('$user') || "";
           }      
        },
    });
    new Vue({
        el: '#comp-sidebar'
    });


});


var util = {
    warning: function (msg) {
        toast.$message({
            message: msg,
            showClose: true,
            type: 'warning'
        });English
    },
    info: function (msg) {
        toast.$message({
            message: msg
        });
    },
    success: function (msg) {
        toast.$message({
            message: msg,
            type: 'success'
        });
    },
    error: function (msg) {
        toast.$message({
            message: msg,
            showClose: true,
            type: 'error'
        });
    },
    GetMasterXY:function(Flag,SN1,x,y,callback)
    {
        var mods = JSON.parse(sessionStorage.getItem('$mod_arrs'));
        var xy=new Array(2);
        xy[0]=x;
        xy[1]=y;
        var t, b, l, i, m;
        var e;
        $.each(mods, function (idx, item) {
            if (item.type == 4 || item.type == 5) {
                b = item.band;
                l = item.link;
                i = item.id;
                m = item.mimo;
                t = item.type;
                e=  item.equipid;

                return false;
            }
        });
        $.ajax({
            url: "../cgi-bin/doaction.cgi",
            data: JSON.stringify({
                "action": "GetSql",
                "xyParam": xy.join(','),
                "Flag":Flag,
                "SN": SN1,
                "type": t,
                "band": b,
                "link": l,
                "mimo": m,
                "id": i,
                "equipid": e,
            }),
            type: "post",
            success: function (data, status) {
                var rsp = JSON.parse(data);
                if (rsp.status == 'success') {
                    // sessionStorage.setItem('$user', user);
                    // sessionStorage.setItem('$session', rsp.data);
                    // sessionStorage.setItem('$power', rsp.power);
                    // GetEquipType();
                    // getMenu(); 
                  
                    callback(rsp.data); 
                } else {
                    util.error(rsp.data);
                }
            }
        });

    },
    login: function (user, pwd) {
        var mods = JSON.parse(sessionStorage.getItem('$mod_arrs'));
        var t, b, l, i, m;
        var e;
        $.each(mods, function (idx, item) {
            if (item.type == 4 || item.type == 5) {
                b = item.band;
                l = item.link;
                i = item.id;
                m = item.mimo;
                t = item.type;
                e=  item.equipid;

                return false;
            }
        });

        $.ajax({
            url: "../cgi-bin/doaction.cgi",
            data: JSON.stringify({
                "action": "login",
                "username": user,
                "password": pwd,
                "type": t,
                "band": b,
                "link": l,
                "mimo": m,
                "id": i,
                "equipid": e,
            }),
            type: "post",
            success: function (data, status) {
                var rsp = JSON.parse(data);
                if (rsp.status == 'success') {
                    sessionStorage.setItem('$user', user);
                    sessionStorage.setItem('$session', rsp.data);
                    sessionStorage.setItem('$power', rsp.power);
                    GetEquipType();
                    getMenu(); 
                  
                } else {
                    util.success(rsp.data);
                }
            }
        });
    },
    ChangeUser: function (user, pwd,power,callback) {
        var mods = JSON.parse(sessionStorage.getItem('$mod_arrs'));
        var t, b, l, i, m , e;
        $.each(mods, function (idx, item) {
            if (item.type == 4 || item.type == 5) {
                b = item.band;
                l = item.link;
                i = item.id;
                m = item.mimo;
                t = item.type;
                e=  item.equipid;
                return false;
            }
        });

        $.ajax({
            url: "../cgi-bin/doaction.cgi",
            data: JSON.stringify({
                "action": "ChangeUser",
                "username": user,
                "password": pwd,
                "power": power,
                "type": t,
                "band": b,
                "link": l,
                "mimo": m,
                "id": i,
                "equipid": e,
            }),
            type: "post",
            success: function (data, status) {
                var rsp = JSON.parse(data);
                if (rsp.status == 'success') {
                    //sessionStorage.setItem('$user', user);
                    // sessionStorage.setItem('$session', rsp.data);
                    //getMenu();
                    callback(rsp.data); 
                } else {
                    util.error(rsp.data);
                }
            }
        });
    },
    wait:function(data){
        var p = new Promise(function(resolve,reject){
            setTimeout(function(){
                resolve("1");
            },300);
        });
        return p;
    },
    Equipments: function (callback) {
        var mods = JSON.parse(sessionStorage.getItem('$mod_arrs'));
        var t, b, l, i, m;
        $.each(mods, function (idx, item) {
            if (item.type == 4 || item.type == 5) {
                b = item.band;
                l = item.link;
                i = item.id;
                m = item.mimo;
                t = item.type;
                return false;
            }
        });
        var p = new Promise(function (resolve, reject) {

        $.ajax({
            url: "../cgi-bin/doaction.cgi",
            data: JSON.stringify({
                "action": "EquipmentsGet",
                "type": t,
                "band": b,
                "link": l,
                "mimo": m,
                "id": i,

            }),
            type: "GET",
            success: function (data, status) {
                var rsp = JSON.parse(data);
                if (rsp.status == 'success') {
                    if (callback != null) {
                        callback(rsp.data);
                    }
                    resolve(rsp.data);
                } else {
                    util.error(rsp.data);
                }
            },
            error: function (req, status, err) {
                reject(err);
            }
        });
     });

    return p;
    },

    RestoreUser: function (callback) {
        var mods = JSON.parse(sessionStorage.getItem('$mod_arrs'));
        var t, b, l, i, m ,e ;
        $.each(mods, function (idx, item) {
            if (item.type == 4 || item.type == 5) {
                b = item.band;
                l = item.link;
                i = item.id;
                m = item.mimo;
                t = item.type;
                e = item.equipid;
                return false;
            }
        });

        $.ajax({
            url: "../cgi-bin/doaction.cgi",
            data: JSON.stringify({
                "action": "RestoreUser",
                "type": t,
                "band": b,
                "link": l,
                "mimo": m,
                "id": i,
                "equipid":e,
            }),
            type: "post",
            success: function (data, status) {
                var rsp = JSON.parse(data);
                if (rsp.status == 'success') {
                    callback(rsp.data); 
                } else {
                    util.error(rsp.data);
                }
            }
        });
    },
    getMany: function (addrs, callback, type, link) {
        var obj = get_parma_frame(type, link);
        obj.params = addrs;
        var p = new Promise(function (resolve, reject) {
            $.ajax({
                url: "../cgi-bin/doaction.cgi",
                data: JSON.stringify(obj),
                type: "get",
                //async: false,
                success: function (data, status) {
                    var rsp = JSON.parse(data);
                    if (rsp.status == 'success') {
                        callback(rsp.data);
                        resolve(rsp.data);
                    } else {
                        if (rsp.data == "401") {
                            alert("not authorized");
                            window.location.href = "../login.html";
                        } else {
                            util.error(rsp.data);
                        }
                    }
                },
                error: function (req, status, err) {
                    reject(err);
                }
            });
        });

        return p;
    },
    postMany: function (params, callback, type, link) {
        var obj = get_parma_frame(type, link);
        obj.action = "set";
        obj.params = params;
        var p = new Promise(function (resolve, reject) {
            $.ajax({
                url: "../cgi-bin/doaction.cgi",
                data: JSON.stringify(obj),
                type: "post",
                success: function (data, status) {
                    var rsp = JSON.parse(data);
                    if (rsp.status == 'success') {
                        if (callback != null) {
                            callback(rsp.data);
                        }
                        resolve(rsp.data);
                    } else {
                        if (rsp.data == "401") {
                            alert("not authorized");
                            window.location.href = "../login.html";
                        } else {
                            util.error(rsp.data);
                        }
                    }
                },
                error: function (req, status, err) {
                    reject(err);
                }
            });
        });
        return p;
    },
    noWarnSend:function(addrs, type, link){
        var obj = get_parma_frame(type, link);
        obj.params = addrs;
        obj.action="set"
        $.ajax({
            url: "../cgi-bin/doaction.cgi",
            data: JSON.stringify(obj),
            type: "post",
            success: function (data, status) {
            }
        });
    },
    recycleGet: function (addrs, interval, count, callback, type, link) {
        var obj = get_parma_frame(type, link);
        obj.params = addrs;
        if (!interval) {
            interval = 3000;
        }
        setTimeout(() => {
            $.ajax({
                url: "../cgi-bin/doaction.cgi",
                data: JSON.stringify(obj),
                type: "get",
                success: function (data, status) {
                    var rsp = JSON.parse(data);
                    if (rsp.status == 'success') {
                        callback(rsp);
                    } else {
                        if (rsp.data == "401") {
                            alert("not authorized");
                            window.location.href = "../login.html";
                        } else {
                            if (count <= 0) {
                                var obj = {};
                                obj.status = 'error';
                                obj.data = 'get data failed';
                                callback(obj);
                            } else { 
                              util.recycleGet(addrs, interval, count - 1, callback, type, link);
                            }
                        }
                    }
                }
            });
        }, interval);
    },
    getMonitor: function (addrs, callback) {
        return this.getMany(addrs, callback, "monitor");
    },
    postMonitor: function (params, callback) {
        return this.postMany(params, callback, "monitor");
    },
    setmodadr: function (band, link, id, mimo) {
        var active_mod = JSON.parse(sessionStorage.getItem('$active_mod'));
        active_mod.band = band;
        active_mod.link = link;
        active_mod.id = id;
        active_mod.mimo = mimo;
        sessionStorage.setItem('$active_mod', JSON.stringify(active_mod));
        util.success('change module address success');
    },
    getmods: function (E_Id,callback) {
        $.ajax({
            url: '../cgi-bin/doaction.cgi',
            data: JSON.stringify({
                "action": "getmodinfo",
                "equipid":E_Id,
                "params": []
            }),
            type: "post",
            success: function (data, status) {
                
                var rsp = JSON.parse(data);
                if (rsp.status == 'success') {
                    if(E_Id!=0)
                    {
                        sessionStorage.setItem('$mod_arrs1', JSON.stringify(rsp.data));
                    }
                    else
                    {
                        sessionStorage.setItem('$mod_arrs', JSON.stringify(rsp.data));
                    }
                    callback(rsp.data);

                    
                }
            }
        });
    },
    bind_mod_adrs: function (vm) {
        var mod_arrs = JSON.parse(sessionStorage.getItem('$mod_arrs'));
        var active_mod = JSON.parse(sessionStorage.getItem('$active_mod'));
        $.each(mod_arrs, function (idx, item) {
            if (vm.mod_bands.includes(item.band) == false) {
                vm.mod_bands.push(item.band);
            }
            if (item.band == active_mod.band) {
                if (vm.mod_links.includes(item.link) == false) {
                    vm.mod_links.push(item.link);
                }
                if (vm.mod_ids.includes(item.id) == false) {
                    vm.mod_ids.push(item.id);
                }
            }
        });
        vm.band_selected = active_mod.band;
        vm.link_selected = active_mod.link;
        vm.id_selected = active_mod.id;
    },
    change_mod_adrs: function (vm) {
        var mod_arrs = JSON.parse(sessionStorage.getItem('$mod_arrs'));
        vm.mod_links = [];
        vm.mod_ids = [];
        $.each(mod_arrs, function (idx, item) {
            if (item.band == vm.band_selected) {
                if (vm.mod_links.includes(item.link) == false) {
                    vm.mod_links.push(item.link);
                }
                if (vm.mod_ids.includes(item.id) == false) {
                    vm.mod_ids.push(item.id);
                }
            }
        });
        vm.link_selected = vm.mod_links[0];
        vm.id_selected = vm.mod_ids[0];
    },
    round: function (value, decimals) {
        decimals = decimals || 2;
        return Number.parseFloat(value).toFixed(decimals);
    },
    isShow: function () {
        var user = sessionStorage.getItem('$user') || "";
        if (user == "Factory") {
            return true;
        } else {
            return false
        }
    },
    ReadMenu:function (addrs, callback, type, link) {
        var obj = get_parma_frame(type, link);
        obj.action = "GetMenu";
        var p = new Promise(function (resolve, reject) {
            $.ajax({
                url: "../cgi-bin/doaction.cgi",
                data: JSON.stringify(obj),
                type: "get",
                //async: false,
                success: function (data, status) {
                    var rsp = JSON.parse(data);
                    if (rsp.status == 'success') {
                        sessionStorage.setItem('$Menulist', JSON.stringify(rsp.data));
                        callback(rsp.data);
                        resolve();
                    } else {
                        if (rsp.data == "401") {
                            alert("not authorized");
                            window.location.href = "../login.html";
                        } else {
                            util.error(rsp.data);
                        }
                    }
                },
                error: function (req, status, err) {
                    reject(err);
                }
            });
        });

        return p;
    },
    postMenu:function (params, callback, type, link) {
        var obj = get_parma_frame(type, link);
        obj.action = "SetMenu";
        obj.params = params;
        var p = new Promise(function (resolve, reject) {
            $.ajax({
                url: "../cgi-bin/doaction.cgi",
                data: JSON.stringify(obj),
                type: "post",
                success: function (data, status) {
                    var rsp = JSON.parse(data);
                    if (rsp.status == 'success') {
                        if (callback != null) {
                            callback(rsp.data);
                        }
                        resolve(rsp.data);
                    } else {
                        if (rsp.data == "401") {
                            alert("not authorized");
                            window.location.href = "../login.html";
                        } else {
                            util.error(rsp.data);
                        }
                    }
                },
                error: function (req, status, err) {
                    reject(err);
                }
            });
        });
        return p;
    },
    get_modules: function(module_type_num,module_link,module_bank,addrs, callback){
        var session = sessionStorage.getItem('$session');
        var mods = JSON.parse(sessionStorage.getItem('$mod_arrs'));
        var obj = {
            "action": "get",
            "session": session,
            "type": module_type_num,
            "link": module_link,
            "band": module_bank,
            "mimo": 0,
            "id": 0,
            "equipid":0,
            "params": []
        };
    
    
            obj.params = addrs;
            var p = new Promise(function (resolve, reject) {
                $.ajax({
                    url: "../cgi-bin/doaction.cgi",
                    data: JSON.stringify(obj),
                    type: "get",
                    //async: false,
                    success: function (data, status) {
                        var rsp = JSON.parse(data);
                        if (rsp.status == 'success') {
                            callback(rsp.data);
                            resolve();
                        } else {
                            if (rsp.data == "401") {
                                alert("not authorized");
                                window.location.href = "../login.html";
                            } else {
                                util.error(rsp.data);
                            }
                        }
                    },
                    error: function (req, status, err) {
                        reject(err);
                    }
                });
            });
    
            return p;
    },
    postMany_bandinfo: function (params, callback,BandOrder) {
        var obj = get_BandInfo_obj(BandOrder);
        obj.action = "set";
        obj.params = params;
        var p = new Promise(function (resolve, reject) {
            $.ajax({
                url: "../cgi-bin/doaction.cgi",
                data: JSON.stringify(obj),
                type: "post",
                success: function (data, status) {
                    var rsp = JSON.parse(data);
                    if (rsp.status == 'success') {
                        if (callback != null) {
                            callback(rsp.data);
                        }
                        resolve(rsp.data);
                    } else {
                        if (rsp.data == "401") {
                            alert("not authorized");
                            window.location.href = "../login.html";
                        } else {
                            util.error(rsp.data);
                        }
                    }
                },
                error: function (req, status, err) {
                    reject(err);
                }
            });
        });
        return p;
    },
    postMany_Id_bandinfo: function (params, callback,BandOrder,id) {
        var obj = get_BandInfo_obj(BandOrder);
        obj.equipid=id;
        obj.action = "set";
        obj.params = params;
        var p = new Promise(function (resolve, reject) {
            $.ajax({
                url: "../cgi-bin/doaction.cgi",
                data: JSON.stringify(obj),
                type: "post",
                success: function (data, status) {
                    var rsp = JSON.parse(data);
                    if (rsp.status == 'success') {
                        if (callback != null) {
                            callback(rsp.data);
                        }
                        resolve(rsp.data);
                    } else {
                        if (rsp.data == "401") {
                            alert("not authorized");
                            window.location.href = "../login.html";
                        } else {
                            util.error(rsp.data);
                        }
                    }
                },
                error: function (req, status, err) {
                    reject(err);
                }
            });
        });
        return p;
    },
    //
    getMany_bandinfo: function (addrs, callback,BandOrder) {
        var obj = get_BandInfo_obj(BandOrder);
        obj.params = addrs;
        
        var p = new Promise(function (resolve, reject) {
            $.ajax({
                url: "../cgi-bin/doaction.cgi",
                data: JSON.stringify(obj),
                type: "get",
                //async: false,
                success: function (data, status) {
                    var rsp = JSON.parse(data);
                    if (rsp.status == 'success') {

                        callback(rsp.data);
                        resolve();
                    } else {
                        if (rsp.data == "401") {
                            alert("not authorized");
                            window.location.href = "../login.html";
                        } else {
                            util.error(rsp.data);
                        }
                    }
                },
                error: function (req, status, err) {
                    reject(err);
                }
            });
        });

        return p;
    },

   
};
function get_BandInfo_obj(BandNum) {
    var session = sessionStorage.getItem('$session');
    var mods = JSON.parse(sessionStorage.getItem('$mod_arrs1'));

    var obj = {
        "action": "get",
        "session": session,
        "type": 0,
        "band": 0,
        "link": 0,
        "mimo": 0,
        "id": 0,
        "equipid":0,
        "params": []
    };

    $.each(mods, function (idx, item) {
        if (item.band == BandNum) {
            obj.band = BandNum;
            obj.link = item.link;
            obj.mimo = item.mimo;
            obj.type = item.type;
            obj.id = item.id;
            obj.equipid = item.equipid;
        }
    });
    return obj;
}
function getMenu () {
    //登入获取menu数据
    var session = sessionStorage.getItem('$session');
    var mods = JSON.parse(sessionStorage.getItem('$mod_arrs'));
    var t, b, l, i, m ,e ;
    $.each(mods, function (idx, item) {
        if (item.type == 4 || item.type == 5) {
            b = item.band;
            l = item.link;
            i = item.id;
            m = item.mimo;
            t = item.type;
            e = item.equipid;
            return false;
        }
    });
    var p = new Promise(function (resolve, reject) {
        $.ajax({
            url: "../cgi-bin/doaction.cgi",
            data: JSON.stringify({
                "action": "GetMenu",
                "session": session,
            }),
            type: "get",
            //async: false,
            success: function (data, status) {
                var str_reload;
                var rsp = JSON.parse(data);
                if (rsp.status == 'success') {
                   //处理获取的菜单问题
                   sessionStorage.setItem('$Menulist', JSON.stringify(rsp.data));
                   if(sessionStorage.getItem('$SysType')=="Relay das"?true:false)
                   {
                        str_reload="/pages/Index1.html";
                        window.location.replace(str_reload);
                   }else
                   {
                    str_reload="/pages/"+rsp.data[1].value+".html";
                    window.location.replace(str_reload);
                   }
                  
                } else {
                    util.error(rsp.data);
                }
            },

        });
    });
    return p;
}

function get_parma_frame(type, link) {
    var obj = {};
    if (type == null) {
        obj = get_digit_obj();
    } else if (type == 'pa') {
        if (link == 'dl') {
            obj = get_pa_dl_obj();
        } else if (link == 'ul') {
            obj = get_pa_ul_obj();
        }
    } else if (type == 'monitor') {
        obj = get_monitor_obj();
    } else {
        obj=get_modules_obj(type,link);
    }
    return obj;
}

function get_digit_obj() {
    var session = sessionStorage.getItem('$session');
    var mods = JSON.parse(sessionStorage.getItem('$mod_arrs'));
    var obj = {
        "action": "get",
        "session": session,
        "type": parseInt(sessionStorage.getItem('$MODTYPE')),
        "band": 0,
        "link": 0,
        "mimo": 0,
        "id": 0,
        "equipid":0,
        "params": []
    };
    $.each(mods, function (idx, item) {
        if (item.type == parseInt(sessionStorage.getItem('$MODTYPE'))) {
            if(flag_bandSelect)
            {
                obj.band = parseInt(sessionStorage.getItem('$bandNum'));
                
            }
            else
            {
                obj.band = item.band;
            }
            obj.type=item.type;
            obj.link = item.link;
            obj.mimo = item.mimo;
            obj.id = item.id;
            obj.equipid = item.equipid;
            return false
        }
    });
    return obj;
}

function get_pa_dl_obj() {
    var session = sessionStorage.getItem('$session');
    var mods = JSON.parse(sessionStorage.getItem('$mod_arrs'));
    var obj = {
        "action": "get",
        "session": session,
        "type": 1,
        "link": 2,
        "band": 0,
        "mimo": 0,
        "id": 0,
        "equipid":0,
        "params": []
    };
    $.each(mods, function (idx, item) {
        if (item.type == 1 && item.link == 2) {
            //obj.band = item.band;
            //obj.band = parseInt(sessionStorage.getItem('$bandNum'));
            if(flag_bandSelect)
            {
                obj.band = parseInt(sessionStorage.getItem('$bandNum'));
                
            }
            else
            {
                obj.band = item.band;
            }
            
            obj.mimo = item.mimo;
            obj.id = item.id;
            obj.equipid = item.equipid;
            return false
        }
    });
    return obj;
}

function get_pa_ul_obj() {
    var session = sessionStorage.getItem('$session');
    var mods = JSON.parse(sessionStorage.getItem('$mod_arrs'));
    var obj = {
        "action": "get",
        "session": session,
        "type": 1,
        "link": 1,
        "band": 0,
        "mimo": 0,
        "id": 0,
        "equipid":0,
        "params": []
    };
    $.each(mods, function (idx, item) {
        if (item.type == 1 && item.link == 1) {
            
            if(flag_bandSelect)
            {
                obj.band = parseInt(sessionStorage.getItem('$bandNum'));
            }
            else{
                obj.band = item.band;
            }
            
            obj.mimo = item.mimo;
            obj.id = item.id;
            obj.equipid = item.equipid;
            return false
        }
    });
    return obj;
}

function get_monitor_obj() {
    var session = sessionStorage.getItem('$session');
    var mods = JSON.parse(sessionStorage.getItem('$mod_arrs'));
    var obj = {
        "action": "get",
        "session": session,
        "type": MONITOR_TYPE,
        "link": 0,
        "band": 0,
        "mimo": 0,
        "id": 0,
        "equipid":0,
        "params": []
    };
    $.each(mods, function (idx, item) {
        if (item.type == MONITOR_TYPE) {
            obj.band = item.band;
           // obj.band = parseInt(sessionStorage.getItem('$bandNum'));
            obj.mimo = item.mimo;
            obj.link = item.link;
            obj.id = item.id;
            obj.equipid = item.equipid;
            return false
        }
    });
    return obj;
}

function isEmpty(obj) {
    if (obj == null || obj.trim() == "" || typeof obj == "undefined") {
        return true;
    } else {
        return false;
    }
}

function check_ev() {
    if (!window.sessionStorage) {
        alert("the browser version is too low");
        window.location.href = "../login.html";
        return;
    }
    var url = window.location.href;
    var session = sessionStorage.getItem('$session');
    if (!session && url.indexOf('login.html') == -1) {
        alert("not authorized");
        window.location.href = "../login.html";
        return;
    }
}
function ShowInvalidLoginMessage() {
    // 清除sessionstorage中的登录ID
    // 退到登陆界面
    window.location.href="../login.html";
}

function getOnline () {
    //登入获取menu数据
    var session = sessionStorage.getItem('$session');
    var mods = JSON.parse(sessionStorage.getItem('$mod_arrs'));
    var t, b, l, i, m;
    $.each(mods, function (idx, item) {
        if (item.type == 4 || item.type == 5) {
            b = item.band;
            l = item.link;
            i = item.id;
            m = item.mimo;
            t = item.type;
            return false;
        }
    });
    var p = new Promise(function (resolve, reject) {
        $.ajax({
            url: "../cgi-bin/doaction.cgi",
            data: JSON.stringify({
                "action": "GetOnline",
                "session": session,
            }),
            type: "get",
            //async: false,
            success: function (data, status) {
                var rsp = JSON.parse(data);
                if (rsp.status == 'success') {
                } else {
                   // util.error(rsp.data);
                   //window.location="../login.html";
                   if (confirm(" Device reboot will return to the login page") == true) {
                    window.location="../login.html";
                   }
                }
            },

        });
    });
    return p;
}
window.onload = function () {
    var url = window.location.href;
    if (url.indexOf('login.html') == -1) {

        
        setTimeout(function() {
            check_ev();
            getOnline();
        }, 500)

        var maxTime = 600; // seconds
        var time = maxTime;
    
        document.body.addEventListener("mousemove", function() {
            time = maxTime; // reset
        }, false);
    
        var intervalId = setInterval(function() {
            time--;
            if(time <= 0) {
                ShowInvalidLoginMessage();
                clearInterval(intervalId);
            }
        }, 1000)
 
    // var login_user = sessionStorage.getItem('$user') || "";
     //   $("#txtLoginName").text("Hello," + login_user);
    };
};
