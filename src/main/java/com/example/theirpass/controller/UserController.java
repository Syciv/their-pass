package com.example.theirpass.controller;

import com.example.theirpass.service.UserService;
import com.example.theirpass.tables.pojos.User;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @GetMapping(value = "/list")
    public List<User> list(){
        return userService.list();
    }

    @GetMapping(value = "/{id}")
    public User get(@PathVariable Long id){
        return userService.get(id);
    }

    @PostMapping
    public void create(@RequestBody User user){
        userService.create(user);
    }

    @DeleteMapping
    public void delete(@RequestBody Long id){
        userService.delete(id);
    }


}
