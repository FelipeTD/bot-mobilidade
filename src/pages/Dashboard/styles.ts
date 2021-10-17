import styled, { css } from 'styled-components';

interface LineProps {
    posicao: string;
}

export const Title = styled.h1`
    font-size: 48px;
    color: #3A3A3A;
    margin-top: 10px;
`;

export const Menu = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;


    a {
        text-decoration: none;
        text-align: center;
        padding: 24px;
        background: #054F77;
        color: #FFF;
        border-radius: 5px;
        width: 20%;

    }
`;

export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: #93A9B8;
        transition: color 0.2s;
        padding-right: 75px;
        border: 0;

        &:hover {
            color: #666;
        }
    }
`;

export const Divisor = styled.div`
    border-top: 1px solid #000;
    margin-top: 40px;
`;

export const SubTitle = styled.div`
    margin-top: 40px;
    font-size: 30px;
`;

export const Body = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 30px;
`;

export const Column = styled.div`
    width: 100%;
`;

export const Line = styled.div<LineProps>`
    height: 30px;

    ${props =>
        props.posicao === "right" &&
        css`
            text-align: right;
        `
    }

    ${props =>
        props.posicao === "center" &&
        css`
            text-align: center;
        `
    }
`;

export const DateForm = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
    
    section {
        .arc_view-days-of-month .arc_view_cell .arc_view_cell_value {
            border-radius: 50%;
        }
    }
    
`;