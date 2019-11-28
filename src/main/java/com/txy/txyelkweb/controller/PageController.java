package com.txy.txyelkweb.controller;
/**
 * Project Name: txy-elk-web.
 * Package Name: com.txy.txyelkweb.controller.
 * File Name: PageController
 * Copyright (c) 2019, 南京天芯云数据服务有限公司.
 */

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 *
 * Class Name: PageController
 * FQDN：com.txy.txyelkweb.controller.PageController
 * Author: 阿辉
 * Date: 2019/11/21 20:57
 * Description:
 *
 */


@Controller
public class PageController {


    @GetMapping("/info1")
    public String getInfo1(){
        return "info/info1.html";
    }

    @GetMapping("/info2")
    public String getInfo2(){
        return "info/info2.html";
    }

    @GetMapping("/info3")
    public String getInfo3(){
        return "info/info3.html";
    }

    @GetMapping("/info4")
    public String getInfo4(){
        return "info/info4.html";
    }

    @GetMapping("/info5")
    public String getInfo5(){
        return "info/info5.html";
    }

    @GetMapping("/info6")
    public String getInfo6(){
        return "info/info6.html";
    }

    @GetMapping("/bpmn")
    public String getBpmn(){
        return "info/bpmn.html";
    }

    @GetMapping("/edit")
    public String getEditPage(){
        return "info/operation/edit.html";
    }

    @GetMapping("/login")
    public String getLogin(){
        return "user/login.html";
    }


}
