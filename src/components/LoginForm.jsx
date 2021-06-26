import { useState } from "react";
import axios from "axios";

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        const authObject = {'Project-ID': "71f6ba26-7819-4060-838f-ae8369d8025f", 'User-Name': username, 'User-Secret': password}
        
        try {
            // username / password => give messages
            await axios.get('https://api.chatengine.io/chats', { headers: authObject })
            
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            window.location.reload();
        } catch (error) {
            // error -> try with new username...
            setError('Oops, incorect username/password')
        }

    }

    return (
        <div className='wrapper'>
            <div className='form'>
                <h1 className='title'> Pi Chat</h1>
                <form onSubmit={handleSubmit}>
                    <input className='input' placeholder='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)} required/>
                    <input className='input' placeholder='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>

                    <div align='center'>
                        <button type='submit' className='button'>
                            <span>Start Chatting</span>
                        </button>
                    </div>
                    <h2 className="error">{error}</h2>
                </form>
            </div>
        </div>
    )
}

export default LoginForm;