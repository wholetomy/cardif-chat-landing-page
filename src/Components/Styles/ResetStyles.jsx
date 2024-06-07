import { createGlobalStyle } from 'styled-components';

const ResetStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Source Sans 3', sans-serif;
    }

    body,
    button,
    input,
    select,
    textarea {
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
    }

    a {
        text-decoration: none;
    }

    body {
        background-color: #c7c7cf;
    }
`;

export default ResetStyles;