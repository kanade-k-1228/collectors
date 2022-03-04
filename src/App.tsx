import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SignIn } from "./Components/Auth/SignIn";
import SignUp from "./Components/Auth/SignUp";
import { CollectionHome } from "./Components/Collection/CollectionHome";
import { UserPage } from "./Components/UserPage/UserPage";
import { SwitchByAuth } from "./Logic/Auth";
import { theme } from "./Logic/theme";

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route
            path="/"
            element={<SwitchByAuth withAuth={<Navigate to="user" />} withoutAuth={<Navigate to="signin" />} />}
          />
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/user/:userId" element={<UserPage />} />
          <Route path="/user/:userId/collection/:collectionId" element={<CollectionHome />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}
