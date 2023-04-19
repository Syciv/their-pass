package com.example.theirpass.controller;

import com.example.theirpass.repository.AccessRepository;
import com.example.theirpass.service.AccountService;
import com.example.theirpass.tables.daos.AccountDao;
import com.example.theirpass.tables.pojos.Account;
import com.example.theirpass.tables.pojos.User;
import com.example.theirpass.tables.pojos.UserObjectAccess;
import com.example.theirpass.util.CryptUtil;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/account")
public class AccountController {

    private final AccountService accountService;

    private final AccessRepository accessRepository;

    private final AccountDao accountDao;

    @GetMapping(value = "/list")
    public List<Account> list(Principal principal) {
        User user = accessRepository.findUserByLogin(principal.getName());
        if(user.getIsAdmin()){
            return accountDao.findAll();
        }
        else {
            return accountService.list(user.getId());
        }
    }

    @GetMapping(value = "/available")
    public List<Account> list(@RequestParam(value = "userId") Long userId,
                              @RequestParam(value = "accessed") Boolean accessed) {
        return accountService.available(userId, accessed);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Account> get(@PathVariable Long id, Principal principal) {
        User user = accessRepository.findUserByLogin(principal.getName());
        if(user.getIsAdmin() || accessRepository.checkAccess(user.getId(), id)) {
            Account account = accountService.get(id);
            account.setPasswordEncrypted(CryptUtil.decrypt(account.getPasswordEncrypted(), CryptUtil.getAESKey(), CryptUtil.generateIv()));
            return ResponseEntity.ok(account);
        }
        else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
    }

    @PostMapping
    public void create(@RequestBody Account account) {
        String encryptedPassword = CryptUtil.encrypt(account.getPasswordEncrypted(), CryptUtil.getAESKey(), CryptUtil.generateIv());
        account.setPasswordEncrypted(encryptedPassword);
        accountService.create(account);
    }

    @DeleteMapping(value = "/{id}")
    public void delete(@PathVariable Long id) {
        accountService.delete(id);
    }

    @PostMapping(value = "/add-access")
    public void addAccess(@RequestBody UserObjectAccess userObjectAccess) {
        accountService.addAccess(userObjectAccess);
    }

    @DeleteMapping(value = "/remove-access")
    public void removeAccess(@RequestBody UserObjectAccess userObjectAccess) {
        accountService.removeAccess(userObjectAccess);
    }

}
