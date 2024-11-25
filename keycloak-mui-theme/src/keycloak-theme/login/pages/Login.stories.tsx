import { ComponentStory, ComponentMeta } from "@storybook/react";
import { createPageStory } from "../createPageStory";

const { PageStory } = createPageStory({
  pageId: "login.ftl",
});

export default {
  title: "login/Login",
  component: PageStory,
} as ComponentMeta<typeof PageStory>;

export const Default: ComponentStory<typeof PageStory> = () => <PageStory />;

export const WithoutPasswordField: ComponentStory<typeof PageStory> = () => (
  <PageStory
    kcContext={{
      realm: { password: false },
      properties: { displayLogo: "false" },
    }}
  />
);

export const WithoutRegistration: ComponentStory<typeof PageStory> = () => (
  <PageStory
    kcContext={{
      realm: { registrationAllowed: false },
      properties: { displayLogo: "false" },
    }}
  />
);

export const WithoutRememberMe: ComponentStory<typeof PageStory> = () => (
  <PageStory
    kcContext={{
      realm: { rememberMe: false },
      properties: { displayLogo: "false" },
    }}
  />
);

export const WithoutPasswordReset: ComponentStory<typeof PageStory> = () => (
  <PageStory
    kcContext={{
      realm: { resetPasswordAllowed: false },
      properties: { displayLogo: "false" },
    }}
  />
);

export const WithEmailAsUsername: ComponentStory<typeof PageStory> = () => (
  <PageStory
    kcContext={{
      realm: { loginWithEmailAllowed: false },
      properties: { displayLogo: "false" },
    }}
  />
);

export const WithPresetUsername: ComponentStory<typeof PageStory> = () => (
  <PageStory
    kcContext={{
      login: { username: "max.mustermann@mail.com" },
      properties: { displayLogo: "false" },
    }}
  />
);

export const WithImmutablePresetUsername: ComponentStory<
  typeof PageStory
> = () => (
  <PageStory
    kcContext={{
      login: { username: "max.mustermann@mail.com" },
      usernameEditDisabled: true,
      properties: { displayLogo: "false" },
    }}
  />
);

export const WithSocialProviders: ComponentStory<typeof PageStory> = () => (
  <PageStory
    kcContext={{
      social: {
        displayInfo: true,
        providers: [
          {
            loginUrl: "google",
            alias: "google",
            providerId: "google",
            displayName: "Google",
          },
          {
            loginUrl: "microsoft",
            alias: "microsoft",
            providerId: "microsoft",
            displayName: "Microsoft",
          },
          {
            loginUrl: "facebook",
            alias: "facebook",
            providerId: "facebook",
            displayName: "Facebook",
          },
          {
            loginUrl: "instagram",
            alias: "instagram",
            providerId: "instagram",
            displayName: "Instagram",
          },
          {
            loginUrl: "twitter",
            alias: "twitter",
            providerId: "twitter",
            displayName: "Twitter",
          },
          {
            loginUrl: "linkedin",
            alias: "linkedin",
            providerId: "linkedin",
            displayName: "LinkedIn",
          },
          {
            loginUrl: "stackoverflow",
            alias: "stackoverflow",
            providerId: "stackoverflow",
            displayName: "Stackoverflow",
          },
          {
            loginUrl: "github",
            alias: "github",
            providerId: "github",
            displayName: "Github",
          },
          {
            loginUrl: "gitlab",
            alias: "gitlab",
            providerId: "gitlab",
            displayName: "Gitlab",
          },
          {
            loginUrl: "bitbucket",
            alias: "bitbucket",
            providerId: "bitbucket",
            displayName: "Bitbucket",
          },
          {
            loginUrl: "paypal",
            alias: "paypal",
            providerId: "paypal",
            displayName: "PayPal",
          },
          {
            loginUrl: "openshift",
            alias: "openshift",
            providerId: "openshift",
            displayName: "OpenShift",
          },
        ],
      },
      properties: { displayLogo: "false" },
    }}
  />
);
