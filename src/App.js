import React from 'react'
import './App.css';
import Header from './Header';
import RenderTable from './RenderTable';
import { Route, Switch } from 'react-router-dom'
import Inbox from './Inbox'
import System from './System'
import Account from './Account'
import { ThemeProvider, Typography, createMuiTheme, Paper } from '@material-ui/core'
import { Switch as Elements } from '@material-ui/core'
import { green, purple } from '@material-ui/core/colors';

function App() {
  const [darkMode, setDarkMode] = React.useState(false)

  // const Switcher = Elements.Switch
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: darkMode ? green : purple
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <Paper style={{ height: '100vh' }} className="App">
        <Header />
        <div style={{ paddingTop: 100 }} >
          <Switch>
            <Route exact from='/inbox' render={props => <Inbox {...props} />} />
            <Route exact from='/system' render={props => <System {...props} />} />
            <Route exact from='/' render={props => <RenderTable {...props} />} />
            <Route exact from='/account' render={props => <Account {...props} />} />
          </Switch>
        </div>
        <div style={{position:'absolute', bottom: 10}} >
          <Typography>
            Change App Theme
          </Typography>
          <Elements checked={darkMode} style={{ height: 50 }} onChange={() => setDarkMode(!darkMode)} />
        </div>
      </Paper>
    </ThemeProvider>
  );
}
export default App;