import React, {useEffect} from 'react';
import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import {Link, useHistory} from 'react-router-dom';
import {connect, useDispatch} from 'react-redux';
import {useState} from 'react';
import {context, loadAccounts, loadUsers, removeAccount} from '../redux/actions';
import useStyles from "../style";
import {sortLogic, changeSort} from "../handles"

function Accounts(props) {

    const classes = useStyles();

    const [sorting, setSorting] = useState({field: 'priority', increase: true});

    let history = useHistory();

    // Изменение параметров сортировки при нажатии на заголовок таблицы
    const handleClick = event => {
        changeSort(event, sorting, setSorting);
    }

    // Отсортированный список
    const accountsSorted = props.accounts.sort((a, b) => sortLogic(a, b, sorting));

    function showPassword(id) {
        fetch('/their-pass/api/account/' + id, {
            method: 'GET'
        }).then(response =>
            response.json()
        ).then(response => navigator.clipboard.writeText(response.passwordEncrypted));
    }

    const accountList = accountsSorted.map(account => {
        return <tr className={classes.t_row} key={account.id}>
            <td width="5%">{account.id}</td>
            <td width="15%">{account.login}</td>
            <td width="15%">{account.description}</td>
            <td width="15%">
                <ButtonGroup>
                    {props.is_admin &&
                            <Button className={classes.button_delete}
                                    onClick={() => props.removeAccount(account.id)}>Удалить</Button>
                    }
                        <Button className={classes.button_com} onClick={() => showPassword(account.id)}>Скопировать
                            пароль</Button>
                </ButtonGroup>
            </td>

        </tr>
    });

    return (
        <div>
            <Container>
                <div>
                    {props.is_admin &&
                        <Button align="right" className={classes.button_com} onClick={() =>
                            window.location.href = "/accounts/new"}>Добавить учётную запись</Button>
                    }
                </div>
                <Table className={classes.table} width={"100%"}>
                    <thead className={classes.t_head}>
                    <tr>
                        <th name="id" onClick={handleClick} width="5%">ID</th>
                        <th name="login" onClick={handleClick} width="15%">Логин</th>
                        <th name="description" onClick={handleClick} width="15%">Сервис</th>
                        <th width="15%">Действия</th>
                    </tr>
                    </thead>
                </Table>
                <div className={classes.scroll_table}>
                    <Table className={classes.table} width={"100%"}>
                        <tbody>
                        {accountList}
                        </tbody>
                    </Table>
                </div>
            </Container>
        </div>

    );
}

function mapStateToProps(state) {
    const {accountReducer, userReducer} = state;
    return {
        is_admin: userReducer.is_admin,
        accounts: accountReducer.accounts
    }
}

const mapDispatchToProps = {
    removeAccount
}


export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
