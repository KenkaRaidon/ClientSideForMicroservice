package com.example.microcaller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController {
    @RequestMapping("/customer")
    public String customer(){
        return "customer";
    }

    @RequestMapping("/films")
    public String films(){
        return "films";
    }
}
