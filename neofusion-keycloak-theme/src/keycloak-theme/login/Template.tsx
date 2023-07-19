// Copy pasted from: https://github.com/InseeFrLab/keycloakify/blob/main/src/login/Template.tsx

import { assert } from "keycloakify/tools/assert";
import { clsx } from "keycloakify/tools/clsx";
import { usePrepareTemplate } from "keycloakify/lib/usePrepareTemplate";
import { type TemplateProps } from "keycloakify/login/TemplateProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "./kcContext";
import type { I18n } from "./i18n";
import { Box, Container, Paper, Typography } from "@mui/material";

export default function Template(props: TemplateProps<KcContext, I18n>) {
  const {
    displayInfo = false,
    displayMessage = true,
    displayRequiredFields = false,
    displayWide = false,
    showAnotherWayIfPresent = true,
    headerNode,
    showUsernameNode = null,
    infoNode = null,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
    children,
  } = props;

  const { getClassName } = useGetClassName({ doUseDefaultCss, classes });

  const { msg, changeLocale, labelBySupportedLanguageTag, currentLanguageTag } =
    i18n;

  const {
    realm,
    locale,
    auth,
    url,
    message,
    isAppInitiatedAction,
    properties,
  } = kcContext;

  const { isReady } = usePrepareTemplate({
    doFetchDefaultThemeResources: doUseDefaultCss,
    url,
    stylesCommon: ["lib/zocial/zocial.css"],
    htmlClassName: getClassName("kcHtmlClass"),
    bodyClassName: undefined,
  });

  const displayLogo = properties?.displayLogo === "true" ? true : false;

  if (!isReady) {
    return null;
  }
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
      }}
    >
      {/* Logo is here */}
      {displayLogo && (
        <Box
          id="kc-header"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          className={getClassName("kcHeaderClass")}
        >
          <Box id="kc-header-wrapper">
            {/* you can replace this with an SVG and use displayNameHTML as alt or accessibility attribute */}
            {msg("loginTitleHtml", realm.displayNameHtml)}
          </Box>
        </Box>
      )}

      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "3rem 1.5rem",
          maxWidth: 800,
          width: "100%",
          alignSelf: "center",
        }}
        elevation={0}
      >
        <Box sx={{ maxWidth: 360, minHeight: 300 }}>
          <Box component="header" className={getClassName("kcFormHeaderClass")}>
            {realm.internationalizationEnabled &&
              (assert(locale !== undefined), true) &&
              locale.supported.length > 1 && (
                <div id="kc-locale" style={{ display: "none" }}>
                  <div
                    id="kc-locale-wrapper"
                    className={getClassName("kcLocaleWrapperClass")}
                  >
                    <div className="kc-dropdown" id="kc-locale-dropdown">
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <a href="#" id="kc-current-locale-link">
                        {labelBySupportedLanguageTag[currentLanguageTag]}
                      </a>
                      <ul>
                        {/* pretvoriti u options */}
                        {locale.supported.map(({ languageTag }) => (
                          <li key={languageTag} className="kc-dropdown-item">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a
                              href="#"
                              onClick={() => changeLocale(languageTag)}
                            >
                              {labelBySupportedLanguageTag[languageTag]}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            {!(
              auth !== undefined &&
              auth.showUsername &&
              !auth.showResetCredentials
            ) ? (
              displayRequiredFields ? (
                <Box className={getClassName("kcContentWrapperClass")}>
                  <Box
                    className={clsx(
                      getClassName("kcLabelWrapperClass"),
                      "subtitle"
                    )}
                  >
                    <Typography component="span" className="subtitle">
                      <Typography component="span" className="required">
                        *
                      </Typography>
                      {msg("requiredFields")}
                    </Typography>
                  </Box>
                  <Typography
                    component="h1"
                    sx={{
                      color: "#211F42",
                      fontWeight: 700,
                      fontSize: "1.5rem",
                      textAlign: "center",
                    }}
                    id="kc-page-title"
                  >
                    {headerNode}
                  </Typography>
                </Box>
              ) : (
                <Typography
                  component="h1"
                  sx={{
                    color: "#211F42",
                    fontWeight: 700,
                    fontSize: "1.5rem",
                    textAlign: "center",
                  }}
                  id="kc-page-title"
                >
                  {headerNode}
                </Typography>
              )
            ) : displayRequiredFields ? (
              <div className={getClassName("kcContentWrapperClass")}>
                <div
                  className={clsx(
                    getClassName("kcLabelWrapperClass"),
                    "subtitle"
                  )}
                >
                  <span className="subtitle">
                    <span className="required">*</span> {msg("requiredFields")}
                  </span>
                </div>
                <div className="col-md-10">
                  {showUsernameNode}
                  <div className={getClassName("kcFormGroupClass")}>
                    <div id="kc-username">
                      <label id="kc-attempted-username">
                        {auth?.attemptedUsername}
                      </label>
                      <a id="reset-login" href={url.loginRestartFlowUrl}>
                        <div className="kc-login-tooltip">
                          <i className={getClassName("kcResetFlowIcon")}></i>
                          <span className="kc-tooltip-text">
                            {msg("restartLoginTooltip")}
                          </span>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {showUsernameNode}
                <div className={getClassName("kcFormGroupClass")}>
                  <div id="kc-username">
                    <label id="kc-attempted-username">
                      {auth?.attemptedUsername}
                    </label>
                    <a id="reset-login" href={url.loginRestartFlowUrl}>
                      <div className="kc-login-tooltip">
                        <i className={getClassName("kcResetFlowIcon")}></i>
                        <span className="kc-tooltip-text">
                          {msg("restartLoginTooltip")}
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              </>
            )}
          </Box>
          <div id="kc-content">
            <div id="kc-content-wrapper">
              {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
              {/* MUI display warnings */}
              {displayMessage &&
                message !== undefined &&
                (message.type !== "warning" || !isAppInitiatedAction) && (
                  <div className={clsx("alert", `alert-${message.type}`)}>
                    {message.type === "success" && (
                      <span
                        className={getClassName("kcFeedbackSuccessIcon")}
                      ></span>
                    )}
                    {message.type === "warning" && (
                      <span
                        className={getClassName("kcFeedbackWarningIcon")}
                      ></span>
                    )}
                    {message.type === "error" && (
                      <span
                        className={getClassName("kcFeedbackErrorIcon")}
                      ></span>
                    )}
                    {message.type === "info" && (
                      <span
                        className={getClassName("kcFeedbackInfoIcon")}
                      ></span>
                    )}
                    <span
                      className="kc-feedback-text"
                      dangerouslySetInnerHTML={{
                        __html: message.summary,
                      }}
                    />
                  </div>
                )}
              {children}
              {auth !== undefined &&
                auth.showTryAnotherWayLink &&
                showAnotherWayIfPresent && (
                  <form
                    id="kc-select-try-another-way-form"
                    action={url.loginAction}
                    method="post"
                    className={clsx(
                      displayWide && getClassName("kcContentWrapperClass")
                    )}
                  >
                    <div
                      className={clsx(
                        displayWide && [
                          getClassName("kcFormSocialAccountContentClass"),
                          getClassName("kcFormSocialAccountClass"),
                        ]
                      )}
                    >
                      <div className={getClassName("kcFormGroupClass")}>
                        <input type="hidden" name="tryAnotherWay" value="on" />
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a
                          href="#"
                          id="try-another-way"
                          onClick={() => {
                            document.forms[
                              "kc-select-try-another-way-form" as never
                            ].submit();
                            return false;
                          }}
                        >
                          {msg("doTryAnotherWay")}
                        </a>
                      </div>
                    </div>
                  </form>
                )}
              {displayInfo && (
                <div id="kc-info" className={getClassName("kcSignUpClass")}>
                  <div
                    id="kc-info-wrapper"
                    className={getClassName("kcInfoAreaWrapperClass")}
                  >
                    {infoNode}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Box>
      </Paper>
    </Container>
  );
}
