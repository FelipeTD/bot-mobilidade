import styled from 'styled-components';

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

export const Repositories = styled.div`
    margin-top: 40px;
    max-width: 900px;

    a {
        background: #FFF;
        border-radius: 5px;
        width: 100%;
        padding: 24px;
        display: block;
        text-decoration: none;
        display: flex;
        align-items: center;
        transition: transform 0.2s;

        & + a {
            margin-top: 16px;
        }

        &:hover {
            transform: translateX(10px);
        }

        img {
            width: 64px;
            height: 64px;
            border-radius: 50%;
        }

        div {
            margin-left: 16px;
            flex: 1;

            strong {
                font-size: 20px;
                color: #3D3D4D;
            }

            p {
                font-size: 18px;
                color: #A8A8B3;
                margin-top: 4px;
            }
        }

        svg {
            margin-left: auto;
            color: #CBCBD6;
        }
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