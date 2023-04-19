package com.example.theirpass.service;

import com.example.theirpass.repository.AccessRepository;
import com.example.theirpass.tables.daos.AccountDao;
import com.example.theirpass.tables.daos.UserDao;
import com.example.theirpass.tables.daos.UserObjectAccessDao;
import com.example.theirpass.tables.pojos.Account;
import com.example.theirpass.tables.pojos.User;
import com.example.theirpass.tables.pojos.UserObjectAccess;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
@AllArgsConstructor
public class AccountService {

    private final AccountDao accountDao;

    private final UserObjectAccessDao userObjectAccessDao;

    private final AccessRepository accessRepository;


    public List<Account> list(Long userId){
        return accessRepository.fetchPermitted(userId);
    }

    public Account get(Long id){
        return accountDao.fetchOneById(id);
    }

    public void create(Account user){
        accountDao.insert(user);
    }

    public void delete(Long id){
        accountDao.deleteById(id);
    }

    public void addAccess(UserObjectAccess userObjectAccess) {
        userObjectAccessDao.insert(userObjectAccess);
    }

    public void deleteAccess(UserObjectAccess userObjectAccess) {
        userObjectAccessDao.delete(userObjectAccess);
    }

    public List<Account> available(Long userId, Boolean accessed) {
        return accessRepository.fetchAvailable(userId, accessed);
    }

    public void removeAccess(UserObjectAccess userObjectAccess) {
        accessRepository.deleteAccess(userObjectAccess.getUserId(), userObjectAccess.getObjectId());
    }
}
