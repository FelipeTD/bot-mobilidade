import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface FormProps {
    hasError: boolean;
}

export const Title = styled.h1`
    font-size: 48px;
    color: #3A3A3A;
    margin-top: 10px;
`;

export const Form = styled.form<FormProps>`
    margin-top: 40px;
    max-width: 900px;
    display: flex;

    input {
        flex: 1;
        height: 50px;
        padding: 0 24px;
        border: 0;
        border-radius: 5px 0 0 5px;
        color: #3A3A3A; 
        border: 2px solid #FFF;
        border-right: 0;

        ${(props) => props.hasError && css`
            border-color: #C53030;
        `}

        &::placeholder {
            color: #A8A8B3;
        }
    }

    button {
        width: 210px;
        height: 50px;
        background: #04D361;
        border-radius: 0 5px 5px 0;
        border: 0;
        color: #FFF;
        font-weight: bold;
        transition: background-color 0.2s;

        &:hover {
            background: ${shade(0.2, '#04D361')}
        }
    }
`;

export const Error = styled.span`
    display: block;
    color: #C53030;
    margin-top: 8px;
`;