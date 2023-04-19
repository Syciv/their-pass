import React from 'react';
import {Link} from 'react-router-dom';
import {Button, ButtonGroup, Container, Form, FormGroup, Input, Label, Table} from 'reactstrap';
import {useState, useEffect} from 'react';
import {addAccount, addUser, editUser, loadAccounts} from '../redux/actions';
import {connect} from 'react-redux';
import useStyles from "../style";
import {submit, change, getEntity, sortLogic, getUserAccounts, addAccess, removeAccess} from '../handles'
import accountEdit from "../accounts/accountEdit";

function UserEdit(props) {

    const emptyUser = {
        name: '',
    };

    const emptyList = [];

    const [accounts, setAccounts] = useState(emptyList);

    const [accessedAccounts, setAccessedAccounts] = useState(emptyList);

    const [user, setUser] = useState(emptyUser);

    const classes = useStyles();

    // Получаем редактируемую учётную запись
    useEffect(() => {
        if (props.match.params.id !== 'new') {
            getEntity('user', props.match.params.id, setUser);
            getUserAccounts(props.match.params.id, false, setAccounts);
            getUserAccounts(props.match.params.id, true, setAccessedAccounts);
        }
    }, []);

    // Изменение инпутов
    const handleChange = event => {
        change(event, setUser, user)
    }

    const title = <h2 className={classes.label}>{user.id ? 'Редактировать пользователя' : 'Добавить пользователя'}</h2>;

    const accountAccessedList = accessedAccounts.map(account => {
        return <tr className={classes.t_row} key={account.id}>
            <td width="5%">{account.id}</td>
            <td width="15%">{account.login}</td>
            <td width="15%">{account.description}</td>
            <td width="15%">
                <Button className={classes.button_com} onClick={() => removeAccessFromUser(props.match.params.id, account.id)}>Убрать</Button>
            </td>
        </tr>
    });

    function removeAccessFromUser(id, id2) {
        removeAccess(id, id2);
        // Добавляем
        const r = accessedAccounts.filter((account) => account.id === id2)[0];
        setAccounts(prev => [...prev, r])
        // Убираем
        setAccessedAccounts(prev => prev.filter((account) => account.id !== id2));
    }

    function addAccessToUser(id, id2) {
        addAccess(id, id2);
        // Добавляем
        const r = accounts.filter((account) => account.id === id2)[0];
        setAccessedAccounts(prev => [...prev, r])
        // Убираем
        setAccounts(prev => prev.filter((account) => account.id !== id2));
    }

    const accountList = accounts.map(account => {
        return <tr className={classes.t_row} key={account.id}>
            <td width="5%">{account.id}</td>
            <td width="15%">{account.login}</td>
            <td width="15%">{account.description}</td>
            <td width="15%">
                <Button className={classes.button_com} onClick={() => addAccessToUser(props.match.params.id, account.id)}>Добавить</Button>
            </td>
        </tr>
    });



    function log() {
        console.log(accounts);
    }

    function handleClick() {

    }

    return <div className={classes.modal}>
        <Container align="center">
            <h1></h1>
            <Label className={classes.label}>{user.id ? 'Редактировать пользователя' : 'Добавить пользователя'}
                {props.match.params.id !== 'new' && ' ' + user.login + ' (' +user.name + ' ' + user.surname + ')'}</Label><br/>

            {props.match.params.id === 'new' &&
                <Form onSubmit={(event) => submit(event, props.editUser, props.addUser, user, 2)}>
                    <FormGroup>
                        <Label className={classes.label} for="login">Логин:</Label><br/>
                        <Input className={classes.input} type="text" name="login" id="login" value={user.login || ''}
                               onChange={handleChange} autoComplete="login" required/>
                    </FormGroup>
                    <FormGroup>
                        <Label className={classes.label} for="password">Логин:</Label><br/>
                        <Input className={classes.input} type="password" name="passwordHash" id="passwordHash" value={user.passwordHash || ''}
                               onChange={handleChange} autoComplete="passwordHash" required/>
                    </FormGroup>
                    <FormGroup>
                        <Label className={classes.label} for="name">Имя:</Label><br/>
                        <Input className={classes.input} type="text" name="name" id="name" value={user.name || ''}
                               onChange={handleChange} autoComplete="name" required/>
                    </FormGroup>
                    <FormGroup>
                        <Label className={classes.label} align="left" for="surname">Фамилия:</Label><br/>
                        <Input className={classes.input} type="text" name="surname" id="surname" value={user.surname}
                               onChange={handleChange} autoComplete="surname" required>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label className={classes.label} align="left" for="isAdmin">Администратор</Label><br/>
                        <Input type="radio" name="isAdmin" id="isAdmin1" onChange={handleChange} value="true"/>
                        <Label className={classes.label} align="left" for="isAdmin1">Да</Label><br/>
                        <Input type="radio" name="isAdmin" id="isAdmin2" onChange={handleChange} value="false"/>
                        <Label className={classes.label} align="left" for="isAdmin2">Нет</Label><br/>
                    </FormGroup>
                    <FormGroup>
                        <Button className={classes.button_com} type="submit">Сохранить</Button>{' '}
                        <Button className={classes.button_delete} tag={Link} to="/">Отменить</Button>
                    </FormGroup>
                </Form>
            }
            {props.match.params.id !== 'new' &&
                <div>
                    <h1></h1>
                    <Label className={classes.label}>Есть доступ</Label>
                    <h1></h1>

                    <Table className={classes.table} width="50%">
                        <thead className={classes.t_head}>
                        <tr>
                            <th name="id" onClick={handleClick} width="5%">ID</th>
                            <th name="login" onClick={handleClick} width="15%">Логин</th>
                            <th name="description" onClick={handleClick} width="15%">Ресурс</th>
                            <th width="15%">Действие</th>
                        </tr>
                        </thead>
                    </Table>
                    <div className={classes.scroll_table}>
                        <Table className={classes.table} width="50%">
                            <tbody>
                            {accountAccessedList}
                            </tbody>
                        </Table>
                    </div>
                    <h1></h1>
                    <Label className={classes.label}>Нет доступа</Label>
                    <h1></h1>
                    <Table className={classes.table} width="50%">
                        <thead className={classes.t_head}>
                        <tr>
                            <th name="id" onClick={handleClick} width="5%">ID</th>
                            <th name="login" onClick={handleClick} width="15%">Логин</th>
                            <th name="description" onClick={handleClick} width="15%">Ресурс</th>
                            <th width="15%">Действие</th>
                        </tr>
                        </thead>
                    </Table>
                    <div className={classes.scroll_table}>
                        <Table className={classes.table} width="50%">
                            <tbody>
                            {accountList}
                            </tbody>
                        </Table>
                    </div>
                </div>
            }
        </Container>
    </div>
}

function mapStateToProps(state) {
    const {userReducer, accountReducer, othersReducer} = state;
    console.log(othersReducer.filials);
    console.log(othersReducer.posts);
    return {
        accounts: accountReducer.accounts,
        users: userReducer.users
    }
}

const mapDispatchToProps = {
    addUser,
    editUser,
    loadAccounts
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
