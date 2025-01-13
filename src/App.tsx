import React, { useState, useEffect } from "react";
import { lightTheme, darkTheme } from "./styles/theme";
import useDarkMode from "./hooks/useDarkMode";
import Container from "./layouts/Container.style";
import logo from "./assets/icons/logo.png";
import Button from "./components/Button.style";
import GlobalStyle from "./styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import WorldMap from "./components/WorldMap";
import Main from "./layouts/Main.style";

const App: React.FC = () => {
  const isDarkMode = useDarkMode();

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Container>
        <header>
          <a href="/">
            <img src={logo} width="96" height="96" alt="logo" />
          </a>
        </header>
        <Main>
          <Button>View Table</Button>
          <WorldMap width={1200} height={750} />
        </Main>
      </Container>
    </ThemeProvider>
  );
};

export default App;
