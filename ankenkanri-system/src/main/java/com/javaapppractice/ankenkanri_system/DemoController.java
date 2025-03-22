package com.javaapppractice.ankenkanri_system;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;

public class DemoController {
    @RequestMapping("/index")
    public String index(){
        return "index";
    }
}
