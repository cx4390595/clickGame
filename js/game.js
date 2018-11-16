/**
 * Created by hh on 2018/9/28
 */
$(function () {
    function ClickGame(speed, num) {
        this.gAreaW = $(".gameArea_wrapper").width() - 36; //游戏区域宽度
        this.gAreaH = $(".gameArea_wrapper").height(); //游戏区域高度
        this.scoreArr = ["-15", "15", "15", "10", "10", "15"]; //分数集合
        this.priceArr = [];//奖品盒子集合
        this.speedInit = 10;//下落初始速度
        this.speed = speed / 2;//下落速度
        this.mm = 10;//倒计时时间
        this.num = num - 1;//生产速度 num为1,2,3,4,5
        this.timeOutProduct //生产数量定时器
        this.timeOutDrop//下落定时器
        this.count = 0; //计数器
        this.init()//初始化
        this.priceMove();//运动

    }

    /*初始化*/
    ClickGame.prototype.init = function () {
        this.priceArrInit();
        this.priceClick();
        this.countDownInit()//倒计时


    };
    /*奖品生成数量*/
    ClickGame.prototype.priceArrInit = function () {
        var productNum = [2500, 2000, 1500, 1000, 100];//产生速度
        var pArr = ""
        var pRandom_1 = Math.random() * this.gAreaW;                            //随机数(游戏区域宽度)
        var iRandom = Math.floor(Math.random() * this.scoreArr.length);          //5种奖品 随机数

        //商铺图标logo随机生成
        var logoRandom = Math.floor(Math.random() * 16);
        if (iRandom === 5) {
            pArr = $(`<div class="price_arr price_5" style="background-image: url('images/logo/${logoRandom}.png')"> </div>`); //创建奖品盒子
        } else {
            pArr = $("<div class='price_arr price_" + iRandom + "'></div>"); //创建奖品盒子
        }


        pArr.speed = (Math.random() * this.speedInit);                          //记录速度
        var That = this;
        That.timeOutProduct = setTimeout(function () {
            pArr.css({"left": pRandom_1,});
            $(".gameArea_wrapper").append(pArr);
            That.priceArr.push(pArr)
            That.priceArrInit()
        }, productNum[this.num])

    };
    /*下落*/
    ClickGame.prototype.priceMove = function () {
        var That = this;
        for (var i = 0; i < That.priceArr.length; i++) {
            this.priceArr[i].css("top", this.priceArr[i].speed);
            this.priceArr[i].speed = this.priceArr[i].speed + this.speed
            if (this.priceArr[i].position().top > this.gAreaH) {
                this.priceArr[i].remove()
            }
        }
        this.timeOutDrop = setTimeout(function () {
            That.priceMove()
        }, 1000 / 60)
    };
    /*倒计时&&游戏结束*/
    ClickGame.prototype.countDownInit = function () {
        var mm = this.mm;
        var That = this
        var timeI = setInterval(function () {
            if (mm > 0) {
                mm--;
                $(".mm").text(mm)
                $(".count").text(That.count)
            } else {
                alert("游戏结束")
                $(".star_btn").css("pointer-events", "normal")
                $(".gameArea_wrapper").html("");
                clearTimeout(timeI)
                clearTimeout(That.timeOutDrop)
                clearTimeout(That.timeOutProduct)
            }
        }, 1000)
    };
    /*点击*/
    ClickGame.prototype.priceClick = function () {
        var That = this
        var flag = false
        $(".gameArea_wrapper").on("touchstart", ".price_arr", function () {
            var This = $(this)
            if ($(this).hasClass("price_0")) {
                That.count += That.scoreArr[0] * 1
                document.getElementById('boom').play()

                // $(this).remove()
            } else if ($(this).hasClass("price_1")) {
                That.count += That.scoreArr[1] * 1
                document.getElementById('audio01').play()

                // $(this).remove()
            } else if ($(this).hasClass("price_2")) {
                That.count += That.scoreArr[2] * 1
                document.getElementById('audio01').play()

                // $(this).remove()
            } else if ($(this).hasClass("price_3")) {
                That.count += That.scoreArr[3] * 1
                document.getElementById('audio01').play()

                // $(this).remove()
            } else if ($(this).hasClass("price_4")) {
                That.count += That.scoreArr[4] * 1
                document.getElementById('audio01').play()

                // $(this).remove()
            } else if ($(this).hasClass("price_5")) {
                That.count += That.scoreArr[5] * 1
                document.getElementById('audio01').play()

            }
                This.remove()

            // time.call(document.querySelector(".gameArea_wrapper"))
        })
    };
    /*点击开始*/
    var timeI
    $(".star_btn").on("click", function () {
        $(".star_btn").css("pointer-events", "none")
        var i = 0;
        $(".time_tips").show();
        timeI = setInterval(function () {
            if (i < 4) {
                $(".time_tips").find(" img[class^='time']").hide()
                $(".time_tips").find(".time_" + i).show()
                i++
            } else {
                $(".time_tips").hide();
                clearInterval(timeI)
            }
        }, 1000);

        setTimeout(function () {
            var game = new ClickGame(5, 5)
        }, 5000)

    })
})
