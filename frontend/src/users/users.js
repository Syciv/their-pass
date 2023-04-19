import React, {useEffect} from 'react';
import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import {connect, useDispatch} from 'react-redux';
import {useState} from 'react';
import {context, loadUsers, removeUser} from '../redux/actions';
import useStyles from "../style";
import {sortLogic, changeSort} from "../handles"

function Users(props) {

    const classes = useStyles();

    const [sorting, setSorting] = useState({field: 'name', increase: true});

    const handleRemoveClick = event => {
        props.removeUser(Number(event.target.id))
    }

    const dispatch = useDispatch();

    // Изменение параметров сортировки при нажатии на заголовок таблицы
    const handleClick = event => {
        changeSort(event, sorting, setSorting);
    }

    // Отсортированный список
    const usersSorted = props.users.sort((a, b) => sortLogic(a, b, sorting));

    // Формирование строк таблицы сотрудников
    const emplList = usersSorted.map(user => {
        return <tr className={classes.t_row} key={user.id}>
            <td width="5%">{user.id} </td>

            <td width="15%">{user.login}</td>
            <td width="15%">{user.name}</td>
            <td width="15%">{user.surname}</td>
            <td width="15%">{user.is_admin}</td>
            <td width="15%">
                <ButtonGroup>
                    <Button className={classes.button_com} onClick={() =>
                        window.location.href = "/users/" + user.id}>Изменить</Button>
                    <Button id={user.id} className={classes.button_delete} onClick={handleRemoveClick}>Удалить</Button>
                </ButtonGroup>
            </td>
        </tr>
    });
    return (
        <div>
            <Container className={classes.background_color}>
                <Button className={classes.button_com} onClick={() =>
                    window.location.href = "/users/new"}>Добавить пользоователя</Button>
                <Table className={classes.table} width={"100%"}>
                    <thead className={classes.t_head}>
                    <tr>
                        <th name="id" onClick={handleClick} width="5%">ID</th>
                        <th name="login" onClick={handleClick} width="15%">Логин</th>
                        <th name="name" onClick={handleClick} width="15%">Имя</th>
                        <th name="surname" onClick={handleClick} width="15%">Фамилия</th>
                        <th name="is_admin" onClick={handleClick} width="15%">Администратор</th>
                        <th width="15%">Действия</th>
                    </tr>
                    </thead>
                </Table>
                <div className={classes.scroll_table}>
                    <Table className={classes.table} width={"100%"}>
                        <tbody>
                        {emplList}
                        </tbody>
                    </Table>
                </div>
            </Container>
        </div>
    );
}

function mapStateToProps(state) {
    const {userReducer} = state;
    return {
        users: userReducer.users
    }
}

const mapDispatchToProps = {
    removeUser
}


export default connect(mapStateToProps, mapDispatchToProps)(Users);
