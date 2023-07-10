import type { KcContext } from "keycloakify/login/kcContext";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { I18n } from "keycloakify/login/i18n";

export default function LoginIdpLinkEmail(props: PageProps<Extract<KcContext, { pageId: "login-idp-link-email.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, realm, brokerContext, idpAlias } = kcContext;

    const { msg } = i18n;

    return (
        <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} headerNode={msg("emailLinkIdpTitle", idpAlias)}>
            <p id="instruction1" className="instruction">
                {msg("emailLinkIdp1", idpAlias, brokerContext.username, realm.displayName)}
            </p>
            <p id="instruction2" className="instruction">
                {msg("emailLinkIdp2")} <a href={url.loginAction}>{msg("doClickHere")}</a> {msg("emailLinkIdp3")}
            </p>
            <p id="instruction3" className="instruction">
                {msg("emailLinkIdp4")} <a href={url.loginAction}>{msg("doClickHere")}</a> {msg("emailLinkIdp5")}
            </p>
        </Template>
    );
}
