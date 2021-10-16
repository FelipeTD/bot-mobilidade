import styled from 'styled-components';
import { shade } from 'polished';

interface FormProps {
    hasError: boolean;
}

export const Title = styled.h1`
    font-size: 48px;
    color: #3A3A3A;
    margin-top: 10px;
`;

export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;

    a {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: #93A9B8;
        transition: color 0.2s;
        padding-right: 75px;

        &:hover {
            color: #666;
        }

        svg {
            margin-right: 2px;
        }
    }
`;

export const Menu = styled.form<FormProps>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 50px;
    
    button {
        width: 210px;
        height: 50px;
        background: #04d361;
        border-radius: 0 5px 5px 0;
        border: 0;
        color: #fff;
        font-weight: bold;
        transition: background-color 0.2s;

        &:hover {
            background: ${shade(0.2, '#04d361')};
        }
    }

    input {
        flex: 2;
        height: 50px;
        padding: 0 24px;
        border: 0;
        border-radius: 5px 0 0 5px;
        color: #3a3a3a;
        border: 1px solid #000;
        border-right: 0;
    }

    select {
        flex: 1;
        height: 50px;
        padding: 0 24px;
        border: 0;
        border-radius: 0 0 0 0;
        color: #3a3a3a;
        border: 1px solid #000;
        border-right: 0;
        border-left: 0;
    }
`;

export const Error = styled.span`
  display: block;
  color: #c53030;
  margin-top: 8px;
`;

export const Body = styled.div`
    margin-top: 40px;
    max-width: 900px;
`;

export const Dados = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    background: #fff;
`;

export const Line = styled.div`
    height: 20px;
    border: 0;
    border-radius: 5px 0 0 5px;
    color: #000;
    border: 2px solid #fff;
    border-right: 0;
`;