/**
 * Created by Administrator on 14-4-10.
 */


define(function(require, exports, module){
    var template = '<div class="main-container"><div class="main-content"><div class="row"><div class="col-sm-10 col-sm-offset-1"><div class="login-container"><div class="center"><h1><i class="icon-leaf green"></i><span class="red">Ace</span><span class="white">Application</span></h1><h4 class="blue">&copy; Company Name</h4></div><div class="space-6"></div><div class="position-relative"><div id="login-box" class="login-box visible widget-box no-border"><div class="widget-body"><div class="widget-main"><h4 class="header blue lighter bigger"><i class="icon-coffee green"></i>Please Enter Your Information</h4><div class="space-6"></div><form><fieldset><label class="block clearfix"><span class="block input-icon input-icon-right"><input type="text" class="form-control" placeholder="Username" /><i class="icon-user"></i></span></label><label class="block clearfix"><span class="block input-icon input-icon-right"><input type="password" class="form-control" placeholder="Password" /><i class="icon-lock"></i></span></label><div class="space"></div><div class="clearfix"><label class="inline"><input type="checkbox" class="ace" /><span class="lbl"> Remember Me</span></label><button type="button" class="width-35 pull-right btn btn-sm btn-primary"><i class="icon-key"></i>Login</button></div><div class="space-4"></div></fieldset></form><div class="social-or-login center"><span class="bigger-110">Or Login Using</span></div><div class="social-login center"><a class="btn btn-primary"><i class="icon-facebook"></i></a><a class="btn btn-info"><i class="icon-twitter"></i></a><a class="btn btn-danger"><i class="icon-google-plus"></i></a></div></div><div class="toolbar clearfix"><div><a href="#" id="show-forgot-box" class="forgot-password-link"><i class="icon-arrow-left"></i>I forgot my password</a></div><div><a href="#" id="show-signup-box" class="user-signup-link">I want to register<i class="icon-arrow-right"></i></a></div></div></div></div><div id="forgot-box" class="forgot-box widget-box no-border"><div class="widget-body"><div class="widget-main"><h4 class="header red lighter bigger"><i class="icon-key"></i>Retrieve Password</h4><div class="space-6"></div><p>Enter your email and to receive instructions</p><form><fieldset><label class="block clearfix"><span class="block input-icon input-icon-right"><input type="email" class="form-control" placeholder="Email" /><i class="icon-envelope"></i></span></label><div class="clearfix"><button type="button" class="width-35 pull-right btn btn-sm btn-danger"><i class="icon-lightbulb"></i>Send Me!</button></div></fieldset></form></div><div class="toolbar center"><a href="#" id="back-login-box-1" class="back-to-login-link">Back to login<i class="icon-arrow-right"></i></a></div></div></div><div id="signup-box" class="signup-box widget-box no-border"><div class="widget-body"><div class="widget-main"><h4 class="header green lighter bigger"><i class="icon-group blue"></i>New User Registration</h4><div class="space-6"></div><p> Enter your details to begin: </p><form><fieldset><label class="block clearfix"><span class="block input-icon input-icon-right"><input type="email" class="form-control" placeholder="Email" /><i class="icon-envelope"></i></span></label><label class="block clearfix"><span class="block input-icon input-icon-right"><input type="text" class="form-control" placeholder="Username" /><i class="icon-user"></i></span></label><label class="block clearfix"><span class="block input-icon input-icon-right"><input type="password" class="form-control" placeholder="Password" /><i class="icon-lock"></i></span></label><label class="block clearfix"><span class="block input-icon input-icon-right"><input type="password" class="form-control" placeholder="Repeat password" /><i class="icon-retweet"></i></span></label><label class="block"><input type="checkbox" class="ace" /><span class="lbl">I accept the<a href="#">User Agreement</a></span></label><div class="space-24"></div><div class="clearfix"><button type="reset" class="width-30 pull-left btn btn-sm"><i class="icon-refresh"></i>Reset</button><button type="button" class="width-65 pull-right btn btn-sm btn-success">Register<i class="icon-arrow-right icon-on-right"></i></button></div></fieldset></form></div><div class="toolbar center"><a href="#" id="back-login-box-2" class="back-to-login-link"><i class="icon-arrow-left"></i>Back to login</a></div></div></div></div></div></div></div></div></div>';

    var Login = function Login(){
        return new Login.fn.init();
    }
    Login.fn = Login.prototype = {
        init: function(){
            return this;
        },
        build:function(){
            $("body").addClass("login-layout");
            $("body").append(template);

            $("#show-forgot-box").bind("click",function(){
                jQuery('.widget-box.visible').removeClass('visible');
                jQuery('#forgot-box').addClass('visible');
            });

            $("#show-signup-box").bind("click",function(){
                jQuery('.widget-box.visible').removeClass('visible');
                jQuery('#signup-box').addClass('visible');
            });

            $("#back-login-box-1").bind("click",function(){
                jQuery('.widget-box.visible').removeClass('visible');
                jQuery('#login-box').addClass('visible');
            });

            $("#back-login-box-2").bind("click",function(){
                jQuery('.widget-box.visible').removeClass('visible');
                jQuery('#login-box').addClass('visible');
            });
        },
        remove:function(){
            $("body").removeClass("login-layout");
            $(".main-container").remove();
        }
    }
    Login.fn.init.prototype = Login.fn;
    module.exports = Login;
});
