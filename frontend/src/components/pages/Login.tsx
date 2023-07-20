import { useEffect, useState } from "react";

const envUrl: string = process.env.REACT_APP_HOST_SERVER || 'http://localhost:8888';

const Login = () => {

  let fetching: boolean = true;
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [data, setData] = useState({main:"Nothing", token: ''});

  function SendForm(fetchObj: object = {method: 'GET'}, extraLink: string = ''): void {
    fetch( `${envUrl}/auth${extraLink}`, fetchObj )
    .then( resp => {
      return resp.json();
    })
    .then( json => {
      if (fetching) {
        setData( (obj) => { return {...obj, ...json}} );
      }
    })
    .catch( err => {});
  }

  useEffect( ()=>{
    SendForm();
    return () => {
      fetching = false;
    }
  }, [] );

  function signUp() {
    SendForm({
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(form)
    }, '/signup');
  }

  function Login() {
    SendForm({
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ email: form.email, password: form.password  })
    }, '/login');
  }

  function setFormData(oKey:string, oVal:string) {
    setForm( (obj) => {
      return {...obj, [oKey]: oVal}
    } );
  }

  return (
    <>
      <div className={'app-form'}>
        <label>Username</label>
        <input value={form.name} onChange={ (e) => { setFormData('name', e.target.value) } }/>
        <label>Email</label>
        <input value={form.email} onChange={ (e) => { setFormData('email', e.target.value) } }/>
        <label>Password</label>
        <input value={form.password} onChange={ (e) => { setFormData('password', e.target.value) } }/>
      </div>
      <button style={{marginBottom:'50px'}}
        onClick={ ()=>{ signUp(); } }
      >SignUp</button>
      <button style={{marginBottom:'50px'}}
        onClick={ ()=>{ Login(); } }
      >Login</button>

      <div className={'code-area'}>
        {data.main}
        <br />
        {data.token}
      </div>
    </>
  )
}

export default Login;