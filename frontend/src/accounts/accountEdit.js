import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import {useState, useEffect} from 'react';
import {addAccount, editAccount} from '../redux/actions';
import {connect} from 'react-redux';
import useStyles from "../style";
import {submit, change, getEntity} from '../handles'


function AccountEdit(props) {

    const emptyAccount = {
        description: '',
        priority: '1',
        userid: ''
    };

    const [account, setAccount] = useState(emptyAccount);

    const classes = useStyles();

    // Получаем редактируемую учётную запись
    useEffect(() => {
        if (props.match.params.id !== 'new') {
            getEntity('accounts', props.match.params.id, setAccount);
        }
    }, []);

    //Изменение инпутов
    const handleChange = event => {
        change(event, setAccount, account)
    }

    const title = <h2>{account.id ? 'Редактировать учётную запись' : 'Добавить учётную запись'}</h2>;

    const defaultOption = props.match.params.id === 'new' ?
        <option value='' disabled selected>Выберите исполнителя</option> : ''

    return <div>
        <Container align="center">
            {title}
            <Form onSubmit={(event) => submit(event, props.editAccount, props.addAccount, account, 1)}>
                <FormGroup>
                    <Label className={classes.label} for="description">Ресурс:</Label><br/>
                    <Input className={classes.input} type="textarea" name="description" id="description"
                           value={account.description || ''}
                           onChange={handleChange} autoComplete="description" required/>
                </FormGroup>
                <FormGroup>
                    <Label className={classes.label} for="login">Логин:</Label><br/>
                    <Input className={classes.input} type="text" name="login" id="login" value={account.login}
                           onChange={handleChange} autoComplete="login"/>
                </FormGroup>
                <FormGroup>
                    <Label className={classes.label} for="password">Пароль:</Label><br/>
                    <Input className={classes.input} type="text" name="password" id="password" autoComplete="password"
                           onChange={handleChange} required>
                        {defaultOption}
                        {props.users.map(e => {
                                return (
                                    <option key={e.id} value={e.id}>
                                        {e.name}
                                    </option>)
                            }
                        )};
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Button className={classes.button_com} type="submit">Сохранить</Button>{' '}
                    <Button className={classes.button_delete} tag={Link} to="/?tab=1">Отменить</Button>
                </FormGroup>
            </Form>
        </Container>
    </div>
}

function mapStateToProps(state) {
    const {userReducer} = state;
    return {
        users: userReducer.users
    }
}

const mapDispatchToProps = {
    addAccount,
    editAccount
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountEdit);
