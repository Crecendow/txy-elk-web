package com.txy.txyelkweb.controller;
/**
 * Project Name: txy-elk-web.
 * Package Name: com.txy.txyelkweb.controller.
 * File Name: MainController
 * Copyright (c) 2019, 南京天芯云数据服务有限公司.
 */

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Random;

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

    private final static Logger logger = LoggerFactory.getLogger(MainController.class);
    private final String SUCCESS_CODE = "500";
    private final String FAIL_CODE = "200";
    private final String INSERT_SUCCESS_CODE = "501";


    @PostMapping("/changeIPAddress")
    @ResponseBody
    public String changeIPAddress(@RequestParam("IPAddress") String IPAddress){

        logger.info( IPAddress );
//        System.out.println( IPAddress );


        /**
         * 1、向数据库存入这一条ipAddress
         */
        return INSERT_SUCCESS_CODE;
    }


    @GetMapping("/searchIPAddress")
    @ResponseBody
    public String searchIPAddress(@RequestParam("hostValue") String hostValue ){

        //        以下是查询的代码，查询结果返回一个值，这边用随机数是单还是双来模拟。
        Random r=new Random();
         int testCode = r.nextInt(100);
        if( (testCode%2) == 1){
            return  SUCCESS_CODE;
        }else {
            return FAIL_CODE;
        }
    }

}
