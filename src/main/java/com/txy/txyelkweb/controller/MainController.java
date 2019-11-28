package com.txy.txyelkweb.controller;
/**
 * Project Name: txy-elk-web.
 * Package Name: com.txy.txyelkweb.controller.
 * File Name: MainController
 * Copyright (c) 2019, 南京天芯云数据服务有限公司.
 */

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * Class Name: MainController
 * FQDN：com.txy.txyelkweb.controller.MainController
 * Author: 阿辉
 * Date: 2019/11/21 16:03
 * Description:
 *
 */

@Controller
public class MainController {

    @PostMapping("/searchIPStatus")
    @ResponseBody
    public String searchIPAddress(@RequestParam("IPaddress") String IPAddress){
        System.out.println( IPAddress );
        return "normal";
    }

}
