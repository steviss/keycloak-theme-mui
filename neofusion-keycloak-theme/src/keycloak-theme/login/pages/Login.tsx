import { useState, FormEventHandler } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { useConstCallback } from "keycloakify/tools/useConstCallback";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Typography,
} from "@mui/material";
import { InputField } from "keycloak-theme/login/pages/components/atoms/InputField";

export default function Login(
  props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { getClassName } = useGetClassName({
    doUseDefaultCss,
    classes,
  });

  const {
    social,
    realm,
    url,
    usernameEditDisabled,
    login,
    auth,
    registrationDisabled,
  } = kcContext;

  const { msg, msgStr } = i18n;

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

  const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();

    setIsLoginButtonDisabled(true);

    const formElement = e.target as HTMLFormElement;

    //NOTE: Even if we login with email Keycloak expect username and password in
    //the POST request.
    formElement
      .querySelector("input[name='email']")
      ?.setAttribute("name", "username");

    formElement.submit();
  });

  const label = !realm.loginWithEmailAllowed
    ? "username"
    : realm.registrationEmailAsUsername
    ? "email"
    : "usernameOrEmail";

  const autoCompleteHelper: typeof label =
    label === "usernameOrEmail" ? "username" : label;

  const showNode =
    realm.password && realm.registrationAllowed && !registrationDisabled;

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      displayInfo={social.displayInfo}
      displayWide={realm.password && social.providers !== undefined}
      headerNode={msg("doLogIn")}
    >
      <Box sx={{ maxWidth: 360, minHeight: 300 }} id="kc-form">
        <div id="kc-form-wrapper">
          {showNode && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
                marginTop: "0.5rem",
              }}
              id="kc-registration"
            >
              <Typography
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: 400, //per Figma it should be 500, looked too thick in browser
                  color: "#211F42",
                }}
                component="span"
              >
                {msg("dontHaveAnAccount")}{" "}
                <Link
                  sx={{
                    color: "#51AF4E",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    fontWeight: 700,
                    letterSpacing: "0.42px",
                    fontSize: "0.875rem",
                  }}
                  tabIndex={6}
                  href={url.registrationUrl}
                >
                  {msg("doSignUp")}
                </Link>
              </Typography>
            </Box>
          )}
          {realm.password && (
            <form
              id="kc-form-login"
              onSubmit={onSubmit}
              action={url.loginAction}
              method="post"
            >
              <InputField
                sx={{
                  marginBottom: "1rem",
                }}
                label={msg(label)}
                tabIndex={1}
                id={autoCompleteHelper}
                //NOTE: This is used by Google Chrome auto fill so we use it to tell
                //the browser how to pre fill the form but before submit we put it back
                //to username because it is what keycloak expects.
                name={autoCompleteHelper}
                defaultValue={login.username ?? ""}
                type="text"
                {...(usernameEditDisabled
                  ? { disabled: true }
                  : {
                      autoFocus: true,
                      autoComplete: "off",
                    })}
              />
              <InputField
                sx={{
                  marginBottom: "1rem",
                }}
                label={msg("password")}
                id="password"
                name="password"
                type="password"
                autoComplete="off"
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "1.5rem",
                }}
              >
                {realm.rememberMe && !usernameEditDisabled && (
                  <Box sx={{ marginBottom: "0.5rem" }}>
                    <FormControlLabel
                      sx={{
                        color: "#929292",
                        "&.Mui-checked": {
                          color: "#211F42",
                        },
                      }}
                      tabIndex={3}
                      id="rememberMe"
                      name="rememberMe"
                      {...(login.rememberMe && {
                        checked: true,
                      })}
                      control={
                        <Checkbox
                          sx={{
                            color: "#929292",
                            "&.Mui-checked": {
                              color: "#51AF4E",
                              "& + .MuiTypography-root": {
                                color: "#211F42",
                              },
                            },
                          }}
                        />
                      }
                      label={msg("rememberMe")}
                    />
                  </Box>
                )}
                {realm.resetPasswordAllowed && (
                  <Link
                    sx={{
                      fontSize: "0.875rem",
                      lineHeight: "24px",
                      letterSpacing: "0.15px",
                      fontWeight: 500, //per Figma it should be 600, looked too thick in browser
                      textDecoration: "none",
                    }}
                    tabIndex={5}
                    href={url.loginResetCredentialsUrl}
                  >
                    {msg("doForgotPassword")}
                  </Link>
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <input
                  type="hidden"
                  id="id-hidden-input"
                  name="credentialId"
                  {...(auth?.selectedCredential !== undefined
                    ? {
                        value: auth.selectedCredential,
                      }
                    : {})}
                />
                <Button
                  tabIndex={4}
                  name="login"
                  id="kc-login"
                  type="submit"
                  disabled={isLoginButtonDisabled}
                >
                  {msgStr("doContinue")}
                </Button>
              </Box>
            </form>
          )}
        </div>
        {realm.password && social.providers !== undefined && (
          <div
            id="kc-social-providers"
            className={clsx(
              getClassName("kcFormSocialAccountContentClass"),
              getClassName("kcFormSocialAccountClass")
            )}
          >
            {/* https://www.figma.com/file/K9A98FzxECw7urVqhdPwwB/Trading-Platform-Working?mode=dev */}
            {/* https://www.figma.com/file/K9A98FzxECw7urVqhdPwwB/Trading-Platform-Working?type=design&node-id=159-63927&mode=design&t=THlTrRRxLZ6XSW7F-0 */}
            <ul
              className={clsx(
                getClassName("kcFormSocialAccountListClass"),
                social.providers.length > 4 &&
                  getClassName("kcFormSocialAccountDoubleListClass")
              )}
            >
              {social.providers.map((p) => (
                <li
                  key={p.providerId}
                  className={getClassName("kcFormSocialAccountListLinkClass")}
                >
                  <a
                    href={p.loginUrl}
                    id={`zocial-${p.alias}`}
                    className={clsx("zocial", p.providerId)}
                  >
                    <span>{p.displayName}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Box>
    </Template>
  );
}
