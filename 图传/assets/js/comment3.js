function changeSrc1() {
    document.getElementById("iframe1").setAttribute("src", "1.html");
}

function changeSrc2() {
    document.getElementById("iframe1").setAttribute("src", "2.html");
}

Vue.component("slidebar", {
    data: function () {
        return {
            values: 0,
            menuList: [{
                    name: 'AAA',
                    url: 'aa.html'
                },
                {
                    name: 'BBB',
                    url: 'bb.html'
                },
                {
                    name: 'template',
                    url: 'template.html'
                }
            ],
            children:[{
                RightLevel: 2,
                icon: "fa-cog",
                isActive: false,
                name: "template",
                url: "template.html",
            },
            {
                RightLevel: 2,
                icon: "fa-cog",
                isActive: false,
                name: "AAA",
                url: "aa.html",
            },
            {
                RightLevel: 2,
                icon: "fa-cog",
                isActive: false,
                name: "BBB",
                url: "bb.html",
            }],
            isActive:true,
        }
    },
    mounted: function () {

        this.$nextTick(function () {
            //面包屑 
            var uri = window.location.pathname;
            console.log(uri);

            console.log(this.menuList);
        

            $.each(this.menuList, function (i, t) {
               
                console.log(t);
                if (uri.indexOf(t.url) > 0) {
                    t.isActive = true;
                    document.getElementById("head1").innerText = t.name;
                    return false;
                }


/* 
                $.each(this.children, function (j, d) {
                    if (uri.indexOf(d.url) > 0) {
                        d.isActive = true;
                        t.isActive = true;
                        document.getElementById("head1").innerText = t.name;
                        document.getElementById("head2").innerText = d.name;
                        return false;
                    }
                }); */
            });

        })
    },
    template: `<el-menu default-active="1" class="el-menu-vertical-demo">
          <el-submenu index="1">
              <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>导航111</span>
              </template>
              <ul>
                  <li class="el-menu-item"  v-for="(item,index) in menuList" >
                       <a :href="item.url">{{item.name}}</a>
                  </li>
              </ul>
          </el-submenu>
          <el-menu-item index="3">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
          </el-menu-item>
      </el-menu>`


    /*  `<el-menu default-active="1" class="el-menu-vertical-demo">
          <el-submenu index="1">
              <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>导航111</span>
              </template>
              <ul>
                  <li class="el-menu-item"  v-for="(item,index) in NavList" >
                       <a :href="item.url">{{item.name}}</a>
                  </li>
              </ul>
          </el-submenu>
          <el-menu-item index="3">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
          </el-menu-item>
      </el-menu>` */

});