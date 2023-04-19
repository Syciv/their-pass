package com.example.theirpass.controller;

import lombok.Data;
import org.springframework.web.bind.annotation.RestController;

@Data
public class UserContextDto {

    private String login;
    private Boolean isAdmin;
}


