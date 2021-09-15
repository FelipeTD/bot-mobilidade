import React, { useState, FormEvent, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import { Title, Form, Error } from './styles';

interface ResponseLogin {
    status: string;
    token: string;
}

const Login: React.FC = () => {
    const history = useHistory();

    const [newUser, setNewUser] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [inputError, setInputError] = useState('');

    useEffect(() => {
        const storageToken = localStorage.getItem('@BotMobilidade:token');

        if (storageToken) {
            history.push('/');
        } else {
            history.push('login');
        }
    }, [history]);

    async function handleLogin(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();

        if (!newUser || !newPassword) {
            console.log("entrou aqui");
            if (!newUser && !newPassword) {
                setInputError('Digite o usuário e a senha');
            } else if (!newUser) {
                setInputError('Digite o usuário');
            } else {
                setInputError('Digite a senha');
            }
            
            return;
        }

        try {
            const response = await api.post(`/login`, {
                usuario: newUser,
                senha: newPassword
            });

            const data: ResponseLogin = response.data;

            if (data.status === "400") {
                setInputError('Usuário ou senha incorretos'); 
                return;  
            }

            localStorage.setItem('@BotMobilidade:token', data.token);
            setNewUser('');
            setNewPassword('');
            setInputError('');
            history.push('/');
        } catch (err) {
            setInputError('Erro ao realizar login');
        }
    }

    return (
        <>
            <img src={logoImg} alt="Bot Mobilidade" />
            <Title>Login</Title>

            <Form hasError={!!inputError} onSubmit={handleLogin}>
                <input
                    value={ newUser }
                    onChange={ e => setNewUser(e.target.value) }
                    placeholder="Usuário" 
                />
                <input 
                    type='password'
                    value={ newPassword }
                    onChange={ e => setNewPassword(e.target.value) }
                    placeholder="Senha"
                />
                <button type="submit">Login</button>
            </Form>

            { inputError && (
                <Error>{inputError}</Error>
            )}
        </>
    );
};

export default Login;