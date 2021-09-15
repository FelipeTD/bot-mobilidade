import { createGlobalStyle } from 'styled-components';

import mobilidadeBackground from '../assets/mobile.jpg';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    body {
        background: #F0F0F5 url(${mobilidadeBackground}) no-repeat 78% top;
        -webkit-font-smooth: antialiased;
    }

    body, input, button {
        font: 16px Roboto, sans-serif;
    }

    #root {
        max-width: 1000px;
        margin: 0 auto;
        padding: 40px 20px;
    }

    button {
        cursor: pointer;
    }
`;