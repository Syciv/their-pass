package com.example.theirpass.service;

import com.example.theirpass.controller.UserContextDto;
import com.example.theirpass.repository.AccessRepository;
import com.example.theirpass.tables.daos.UserDao;
import com.example.theirpass.tables.pojos.User;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService {

    private final UserDao userDao;

    private final AccessRepository accessRepository;

    private final PasswordEncoder passwordEncoder;

    public List<User> list(){
        return userDao.findAll();
    }

    public User get(Long id){
        return userDao.fetchOneById(id);
    }

    public void create(User user){
        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
        userDao.insert(user);
    }

    public void delete(Long id){
        userDao.deleteById(id);
    }

    public UserContextDto getContext(String name) {
        User user = accessRepository.findUserByLogin(name);
        UserContextDto userContextDto = new UserContextDto();
        userContextDto.setLogin(name);
        userContextDto.setIsAdmin(user.getIsAdmin());
        return userContextDto;
    }
}
