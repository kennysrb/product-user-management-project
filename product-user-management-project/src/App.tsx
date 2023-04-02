import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { Header } from "./components/Header";
import { useStore } from "./store";
import { Button } from "@mui/material";
import styles from "./App.module.scss";
import { useNavigate } from "react-router";

function App() {
  const [user, setUser] = useState({});

  const {
    profileStore: { profile, setProfile },
  } = useStore();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.access_token) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setProfile(res.data);
          setTimeout(() => {
            navigate("/Products");
          }, 1200);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <>
      <Header />
      <div className={styles.WelcomePageContent}>
        {profile ? (
          <h3>
            {profile.given_name}, welcome to Product User Management Project!
          </h3>
        ) : (
          <Button className={styles.LoginLogout} onClick={() => login()}>
            Sign in with Google
            <img
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt="google"
              className={styles.GoogleIcon}
            />
          </Button>
        )}
      </div>
    </>
  );
}
export default observer(App);
