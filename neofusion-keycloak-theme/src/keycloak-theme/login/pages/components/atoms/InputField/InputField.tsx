import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { InputFieldProps } from "keycloak-theme/login/pages/components/atoms/InputField/InputField.interface";
import { FC, useState, useMemo, MouseEvent } from "react";

const InputField: FC<InputFieldProps> = ({ type, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const passwordField = useMemo(() => type === "password", [type]);

  const fieldType = useMemo(
    () => (passwordField ? (showPassword ? "text" : "password") : type),
    [showPassword, type]
  );

  return (
    <TextField
      {...props}
      type={fieldType}
      variant="outlined"
      InputProps={{
        endAdornment: passwordField && (
          <InputAdornment position="end">
            <IconButton
              sx={{ margin: "0.5rem", marginRight: "0", padding: "0.5rem" }}
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default InputField;
