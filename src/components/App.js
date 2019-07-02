import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ButtonAppBar from './MenuAppBar'
// import { createMuiTheme } from '@material-ui/core/styles';

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       light: '#757ce8',
//       main: '#3f50b5',
//       dark: '#002884',
//       contrastText: '#fff',
//     },
//     secondary: {
//       light: '#ff7961',
//       main: '#f44336',
//       dark: '#ba000d',
//       contrastText: '#000',
//     },
//   },
// });

class App extends Component {
    render() {
        return (
            <div>
                <ButtonAppBar/> 
            </div>
        );
    }
}

export default App;