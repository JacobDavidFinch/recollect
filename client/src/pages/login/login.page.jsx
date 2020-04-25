import React from 'react';
import { Redirect } from 'react-router-dom';
import { useGlobalState } from '../../Context/globalContext';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from "react-facebook-login";


const Login = () => {
    
  const {state, dispatch} = useGlobalState();

  if(state.userName){
      return <Redirect to="/" />
  }
    // const [login, setLogin] = useState('')

    const responseGoogle = (response) => {
      console.log(response);
    }

    const responseFacebook = response => {
        console.log(response);
        dispatch({type: 'login', payload: {
            userName: response.email,
            domain: 'facebook',
            fullName: response.name,
            picture: response.picture.data.url
        }})
    
      };
    
      const componentClicked = () => console.log('clicked');

      
    
    return (
        <div>
                <FacebookLogin
                appId="1779964145491986"
                autoLoad={true}
                fields="name,email,picture"
                onClick={componentClicked}
                callback={responseFacebook}
            />
            <GoogleLogin
              clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
        </div>
    );
}

export default Login;