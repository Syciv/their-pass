import Users from './users/users';
import {Button, Container} from 'reactstrap';
import Accounts from './accounts/accounts';
import {useState, useEffect} from 'react';
import useStyles from "./style";
import {useLocation} from "react-router-dom";
import {connect, useDispatch} from "react-redux";
import {context, loadAccounts, loadUsers, logout, removeUser} from "./redux/actions";

function Home(props) {
    const dispatch = useDispatch();
    console.log("PROPS")
    console.log(props.is_admin)
    useEffect(() => {
        dispatch(context());
        console.log(props.is_admin)
        dispatch(loadUsers());
        dispatch(loadAccounts());
    }, []);

    // Вкладки для переключения
    const tabs = [
        {title: 'Учётные записи', component: <Accounts/>},
        {title: 'Пользователи', component: <Users/>}
    ];

    const classes = useStyles();

    const search = useLocation().search;
    const tab = new URLSearchParams(search).get('tab');
    const [activeTab, setActiveTab] = useState(tab ? Number(tab) : 0);

    // Смена вкладки
    const openTab = event => {
        setActiveTab(Number(event.target.id));
    }

    const TabContent = ({title, component}) => (
        <div>
            <h3 className={classes.label}>{title}</h3>
            {component}
        </div>
    );

    return <div>
        <Container >
            <div className={classes.bottomborder}>
                <Button id={0} onClick={openTab}
                        className={0 === activeTab ? classes.tab_active : classes.tab_nonactive}>
                    Учётные записи
                </Button>
                {props.is_admin &&
                    <Button id={1} onClick={openTab}
                            className={1 === activeTab ? classes.tab_active : classes.tab_nonactive}>
                        Пользователи
                    </Button>
                }
                <div align={"right"}>
                    <Button align="right" className={classes.button_com} onClick={dispatch(logout)}>Выход</Button>
                </div>
            </div>

            {<TabContent {...tabs[activeTab]} />}
        </Container>
    </div>
}

function mapStateToProps(state) {
    const {userReducer} = state;
    return {
        is_admin: userReducer.is_admin
    }
}

const mapDispatchToProps = {}


export default connect(mapStateToProps, mapDispatchToProps)(Home);

// export default Home;
