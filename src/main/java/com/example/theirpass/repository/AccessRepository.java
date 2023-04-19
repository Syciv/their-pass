package com.example.theirpass.repository;

import com.example.theirpass.tables.pojos.Account;
import com.example.theirpass.tables.pojos.User;
import lombok.AllArgsConstructor;
import org.jooq.DSLContext;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.example.theirpass.Tables.*;
import static org.jooq.impl.DSL.select;
import static org.jooq.impl.DSL.user;

@Repository
@AllArgsConstructor
public class AccessRepository {

    private final DSLContext dslContext;

    public Boolean checkAccess(Long userId, Long accountId) {
        return dslContext
                .fetchExists(
                        select()
                                .from(USER_OBJECT_ACCESS)
                                .where(USER_OBJECT_ACCESS.USER_ID.eq(userId)
                                        .and(USER_OBJECT_ACCESS.OBJECT_ID.eq(accountId)))
                );
    }

    public User findUserByLogin(String login) {
        return dslContext
                .selectFrom(USER)
                .where(USER.LOGIN.eq(login))
                .fetchOneInto(User.class);
    }

    public List<Account> fetchPermitted(Long userId) {
        return dslContext
                .select(ACCOUNT.fields())
                .from(ACCOUNT)
                .join(USER_OBJECT_ACCESS)
                .on(ACCOUNT.ID.eq(USER_OBJECT_ACCESS.OBJECT_ID)
                        .and(USER_OBJECT_ACCESS.USER_ID.eq(userId)))
                .fetchInto(Account.class);
    }

    public List<Account> fetchAvailable(Long userId, Boolean accessed) {
        return dslContext
                .select(ACCOUNT.fields())
                .distinctOn(ACCOUNT.ID)
                .from(ACCOUNT)
                .leftJoin(USER_OBJECT_ACCESS)
                .on(ACCOUNT.ID.eq(USER_OBJECT_ACCESS.OBJECT_ID)
                        .and(USER_OBJECT_ACCESS.USER_ID.eq(userId)))
                .where(accessed ? USER_OBJECT_ACCESS.USER_ID.isNotNull() : USER_OBJECT_ACCESS.USER_ID.isNull())
                .fetchInto(Account.class);
    }

    public void deleteAccess(Long userId, Long objectId) {
        dslContext
                .deleteFrom(USER_OBJECT_ACCESS)
                .where(USER_OBJECT_ACCESS.USER_ID.eq(userId),
                        USER_OBJECT_ACCESS.OBJECT_ID.eq(objectId))
                .execute();
    }
}
