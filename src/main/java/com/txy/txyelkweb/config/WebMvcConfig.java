package com.txy.txyelkweb.config;
/**
 * Project Name: elk_web.
 * Package Name: com.txy.elk_web.config.
 * File Name: WebMvcConfig
 * Copyright (c) 2019, 南京天芯云数据服务有限公司.
 */

/**
 *
 * Class Name: WebMvcConfig
 * FQDN：com.txy.elk_web.config.WebMvcConfig
 * Author: 阿辉
 * Date: 2019/11/21 15:47
 * Description:
 *
 */


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


public class WebMvcConfig<Configuration> implements WebMvcConfigurer {
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("index");
        registry.addViewController("/index").setViewName("index");
    }
}
