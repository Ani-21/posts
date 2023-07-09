import { useMemo } from "react";
import { Route, Routes } from "react-router-dom";

import {
  CssBaseline,
  ThemeOptions,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { themeSettings } from "./theme";
import { useAppSelector } from "./store/hooks";
import { mode } from "./store/selectors";
import { PostsPage } from "./pages/postsPage";
import { PostPage } from "./pages/postPage";

function App() {
  const currentMode = useAppSelector(mode);

  const theme = useMemo(
    () => createTheme(themeSettings(currentMode) as ThemeOptions),
    [currentMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Routes>
          <Route path="/" element={<PostsPage />} />
          <Route path="/post/:id/:userId" element={<PostPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
