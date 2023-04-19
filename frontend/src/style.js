import { createUseStyles } from "react-jss";

const def = {
  border: 0,
  color: "white",
  fontWeight: 500,
  textDecoration: 'none',
  transition: '0.3s',
  fontFamily: 'Segoe UI',
  "&:hover": {
      backgroundColor: "#8183CD"
  }
}

const button = {
  ...def,
  border: 0,
  borderRadius: 4,
  margin: 4,
  cursor: 'pointer',
  fontSize:15,
  padding: 7
}

const tab = {
  ...def,
  width: '10%',
  fontSize: 15,
  padding: 5
}

const useStyles = createUseStyles({
  tab_nonactive: {
    ...tab,
    backgroundColor:  "#6153a4"
  },

  tab_active: {
    ...tab,
    backgroundColor:  "#240251"
  },

  button_com: {
    ...button,
    backgroundColor:  "#240251"
  },

  button_delete: {
    ...button,
    backgroundColor: "#514ED9"
  },

  label: {
    fontSize: 28,
    fontWeight: 500,
    color: '#141D41',
    margin: "2em"
  },

  input: {
    borderRadius: 4,
    padding: 5,
    fontSize:20,
    boxSizing: 'border-box',
    margin: 8,
    width: '20%'
  },

  table: {
    // width:'100%',
    textAlign: 'center',
    fontSize: 15,
    border: '1px solid #eeeeee',
    borderSpacing: '0px 15px',
    borderCollapse: 'collapse',
    backgroundColor: '#CBD0E8',
    color: '#141D41'
  },

  t_head:{
    fontWeight: 500,
	  padding: 5,
    fontSize:20,
    height: 40,
	  background: '#CBD0E8',
	  border: '1px solid #141D41',
    cursor: 'pointer',
  },

  t_row: {
    fontSize:20,
    height: 40,
    border: '1px solid #141D41',
  },

  cont: {
    margin: 15,
    textAlign: 'left',
  },

  bottomborder: {
    borderBottomWidth: 3,
    borderBottomStyle: 'solid',
    borderBottomColor: '#2b2b31'
  },

  scroll_table: {
    overflowY: 'auto',
    maxHeight:'700px',
    width: '100%'
  },

  container_back: {
    backgroundColor: '#2b2b31'
  }
});

export default useStyles;
