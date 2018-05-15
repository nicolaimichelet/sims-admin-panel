import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { lightGreen600, lightGreen400, lightGreen300, lightGreen200, lightGreen900, lightGreen700, red700, grey300, grey500} from 'material-ui/styles/colors';

export const DEFAULT_API="http://localhost:3000/api/";

export const OAUTH_DEFAULT = {
  response_type: process.env.AUTH_RESPONSE_TYPE,
  automaticSlientRenew: true
}


export const THEME = getMuiTheme({
  raisedButton: {
    primaryColor: lightGreen400,
    secondaryColor: red700,
    fontFamily: 'roboto',
    fontWeight: '300',
  },
  textField: {
    focusColor: lightGreen300,
  },
  toggle: {
    thumbOnColor: lightGreen400,
    trackOnColor: lightGreen200,
    thumbOffColor: lightGreen400,
    trackOffColor: grey300,
  },
  datePicker: {
    selectColor: lightGreen600,
    color: lightGreen600,
    headerColor: lightGreen300,
  },
  flatButton: {
    primaryTextColor: lightGreen700,
    fontFamily: 'roboto',
    fontWeight: '300',
  },
  palette: {
    primaryColor: lightGreen300,
    primary2Color: lightGreen900,
    accent1Color: lightGreen400,
    accent2Color: lightGreen900,
    disabledColor: grey500,
    //textColor: grey50,
  },
});
