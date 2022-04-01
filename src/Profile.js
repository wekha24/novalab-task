import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import 'bootstrap/dist/css/bootstrap.min.css'



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  media: {
    height: '90vh',
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

export default function Profile() {
  const [people, setPeople] = useState([])
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const user = JSON.parse(localStorage.getItem('user'));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    axios.get("https://reqres.in/api/users?page=1")
        .then((res) => {
          setPeople(res.data.data)
        })
  },[])

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Profile
          </Typography>
            <div>
            <IconButton onClick={handleMenu} color="inherit">
              <Avatar src={user.avatar} />
            </IconButton>
            <Menu id="menu-appbar" 
              anchorEl={anchorEl} 
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography className="text-center" variant="h4">
          Welcome {user.fname} {user.lname}
          </Typography>
        </CardContent>
      </Card>
      <div className="container">
        <h1 className="text-center mt-3">Your Friends</h1>
        <div className="row">
          {people.map((item) => {
            return(
                <>
                  <div className="col-4 mt-3">
                    <Card sx={{ maxWidth: 345 }}>

                      <Avatar src={item.avatar} aria-label="recipe">
                      </Avatar>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          first name: {item.first_name}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                          last name: {item.last_name}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                          email: {item.email}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                         age: {item.id + 20}
                        </Typography>
                      </CardContent>

                    </Card>
                  </div>
                </>
            )
          })}
        </div>
      </div>
    </div>
  );
}