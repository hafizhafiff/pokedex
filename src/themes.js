import { createGlobalStyle } from "styled-components"

export const lightTheme = {
    backgroundColor : "#E4E4E4",
}
export const darkTheme = {
    backgroundColor: "#232323",
    border: "#FFFFFF",
    backgroundImage: 'url("pokenight.jpg")',
    cardBackgroundColor: '#9A9A9A',
    numbColor: '#FFFFFF ',
    shadowColor: '#00179F ',
    headerColor: '#E1E1E1 ',
    hovColor: '#FFEB00 ',
    toggColor: '#D3D3D2',


}

export const GlobalStyles = createGlobalStyle`

    body {
        background-image: ${props => props.theme.backgroundImage}
    }
    nav {
        background-image: ${props => props.theme.backgroundImage}
    }
    .bigbox {
        background-color: ${props => props.theme.backgroundColor}
    }
    .charcard {
        background-color: ${props => props.theme.cardBackgroundColor}
    }
    .charcard .charcontent {
        background-color: ${props => props.theme.cardBackgroundColor}
    }
    .charcard .charnumber {
        color: ${props => props.theme.numbColor}
    }
    .header {
        background-color: ${props => props.theme.headerColor}
    }
    .bigbox .nopoke {
        color: ${props => props.theme.headerColor}
    }
    nav ul li a {
        color: ${props => props.theme.numbColor}
    }
    nav ul li a:hover {
        color: ${props => props.theme.hovColor}
    }
    .menu-toggle span {
        background-color: ${props => props.theme.toggColor}
    }
`;