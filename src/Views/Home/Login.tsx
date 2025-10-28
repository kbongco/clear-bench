import Card from "../../Components/Card/Card";
import Input from "../../Components/Input/Input";

export default function Login() {
  const title = 'Login'
  const email = 'Email'
  const password = 'Password'
  const loginEmail = 'Login'
  const loginPassword = 'Password'

  const onChange = (e) => {
    console.log('test')
  }
  const description = (
    <div>
      <Input label={loginEmail} name={email} onChange={onChange} />
      <div>
        <Input label={loginPassword}  name={password} onChange={onChange} /> 
      </div>
    </div>
  );
  return ( 
    <>
      <div className='flex'>
        <Card title={title} description={description} footer='Test' />
      </div>
    </>
  )
}