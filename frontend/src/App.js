import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import UserEdit from './users/userEdit';
import AccountEdit from './accounts/accountEdit';
import Home from './home.js'
import {connect} from 'react-redux';
import {loadUsers, loadAccounts, loadFilials, loadPosts} from './redux/actions';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import useStyles from "./style";
import Login from "./login/login";


function App(props) {

    const classes = useStyles()

    document.title = 'TheirPass'
    return (
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={Home}/>
                    <Route exact={true} path='/login' component={Login}/>
                    <Route path='/:tab' exact={true} component={Home}/>
                    <Route path='/users/:id' component={UserEdit}/>
                    <Route path='/accounts/:id' component={AccountEdit}/>
                </Switch>
            </Router>
    )
}

function mapStateToProps(state) {
    const {userReducer, accountReducer, othersReducer} = state;
    return {
        users: userReducer.users,
        accounts: accountReducer.accounts
    }
}

export default connect(mapStateToProps)(App);
