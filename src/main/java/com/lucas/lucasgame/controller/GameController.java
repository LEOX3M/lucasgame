package com.lucas.lucasgame.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class GameController {

    @GetMapping("/lucas")
    public String index() {
        return "index"; 
    }
}
