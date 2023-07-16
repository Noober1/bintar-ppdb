import Alert from "@mui/material/Alert";
import Box, { BoxProps } from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import Divider from "@mui/material/Divider";
import React from "react";
import { FormikErrors } from "formik";
import useMediaQuery from "@/hooks/useMediaQuery";
import DashboardContentLayout from "./DashboardContentLayout";

interface FormLayoutProps extends Omit<BoxProps, "onSubmit"> {
  title: string;
  alert: React.ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  backButtonUrl: string;
  isSubmitting: boolean;
  errors: FormikErrors<any>;
  submitButtonLabel: string;
  submitButtonDisable?: boolean;
}

const FormLayout = ({
  children,
  className,
  title,
  alert,
  onSubmit,
  isSubmitting,
  submitButtonLabel,
  submitButtonDisable,
  backButtonUrl,
  errors,
  ...props
}: FormLayoutProps) => {
  return (
    <DashboardContentLayout title={title} backButtonUrl={backButtonUrl}>
      <Paper
        sx={(theme) => ({
          padding: "10px",
          [theme.breakpoints.up("md")]: {
            padding: "15px",
          },
        })}
      >
        <Alert severity="info" className="mb-4">
          {alert}
        </Alert>
        <form onSubmit={onSubmit}>
          <Box
            className={
              className ??
              "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-2"
            }
            {...props}
          >
            {children}
          </Box>
          <Divider
            sx={{
              marginTop: 2,
            }}
            role="presentation"
          >
            <LoadingButton
              size="large"
              variant="contained"
              type={!isSubmitting ? "submit" : "button"}
              loading={isSubmitting}
              disabled={submitButtonDisable || Object.keys(errors).length > 0}
              loadingPosition="start"
              startIcon={<SaveIcon />}
            >
              {submitButtonLabel}
            </LoadingButton>
          </Divider>
        </form>
      </Paper>
    </DashboardContentLayout>
  );
};

export default FormLayout;
