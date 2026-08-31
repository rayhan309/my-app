"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUpRight, Send } from "lucide-react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import SectionHeading from "@/components/ui/SectionHeading";

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  description: string;
  subject: string;
};

const contactItems = [
  { icon: Mail, label: "Email", value: "ihaveawonderfull@gmail.com", href: "mailto:ihaveawonderfull@gmail.com" },
  { icon: Phone, label: "Phone", value: "+880 1636 347617", href: "tel:+8801636347617" },
  { icon: MapPin, label: "Studio", value: "Dhaka, Bangladesh", href: null },
];

function showFieldError(
  field: keyof ContactFormData,
  errors: Partial<Record<keyof ContactFormData, { message?: string }>>,
  touched: Partial<Record<keyof ContactFormData, boolean>>,
  submitted: boolean
) {
  return Boolean(errors[field]) && (Boolean(touched[field]) || submitted);
}

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, touchedFields, isSubmitted },
  } = useForm<ContactFormData>({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      description: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setIsSuccess(false);

    try {
      const res = await fetch("/api/add-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { message?: string; success?: boolean };

      if (!res.ok || !json?.success) {
        throw new Error(json.message || "Failed to send message");
      }
      reset();
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 6000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Failed to send message");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (
    name: keyof ContactFormData,
    label: string,
    placeholder: string,
    options?: { multiline?: boolean; rows?: number }
  ) => (
    <Controller
      name={name}
      control={control}
      rules={
        name === "name"
          ? { required: "Name is required", minLength: { value: 2, message: "Min 2 characters" } }
          : name === "email"
            ? {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Enter a valid email",
                },
              }
            : name === "phone"
              ? { required: "Phone is required" }
              : name === "subject"
                ? { required: "Subject is required" }
                : {
                    required: "Message is required",
                    minLength: { value: 10, message: "Please add a bit more detail" },
                  }
      }
      render={({ field }) => {
        const hasError = showFieldError(name, errors, touchedFields, isSubmitted);
        return (
          <TextField
            {...field}
            label={label}
            placeholder={placeholder}
            multiline={options?.multiline}
            rows={options?.rows}
            error={hasError}
            helperText={hasError ? errors[name]?.message : " "}
          />
        );
      }}
    />
  );

  return (
    <Box component="section" id="contact" data-reveal sx={{ py: { xs: 10, md: 16 } }}>
      <Grid container spacing={{ xs: 6, lg: 10 }}>
          <Grid size={{ xs: 12, lg: 5 }}>
            <SectionHeading
              align="left"
              eyebrow="Contact"
              title="Let’s make the next thing carefully."
              description="A project, a collaboration, or a short hello—I read everything and usually reply within a day."
            />
            <Stack spacing={3} sx={{ mt: { xs: -2, md: -4 } }}>
              {contactItems.map((item) => (
                <Stack key={item.label} direction="row" spacing={2} sx={{ alignItems: "flex-start" }}>
                  <item.icon size={16} className="mt-1 text-primary" />
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ letterSpacing: "0.16em", textTransform: "uppercase", color: "text.secondary" }}
                    >
                      {item.label}
                    </Typography>
                    {item.href ? (
                      <Typography
                        component="a"
                        href={item.href}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          fontWeight: 500,
                          textDecoration: "none",
                          "&:hover": { color: "primary.main" },
                        }}
                      >
                        {item.value}
                        <ArrowUpRight size={14} />
                      </Typography>
                    ) : (
                      <Typography sx={{ fontWeight: 500 }}>{item.value}</Typography>
                    )}
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, lg: 7 }}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              sx={{
                border: 1,
                borderColor: "divider",
                borderRadius: 2,
                p: { xs: 3, md: 4.5 },
                bgcolor: "background.paper",
              }}
            >
              <Typography className="font-display" sx={{ fontSize: "1.75rem", mb: 0.5 }}>
                Write to me
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                I typically reply within 24 hours.
              </Typography>
              <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <Stack spacing={1.5}>
                  {renderField("name", "Full name", "Your name")}
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      {renderField("email", "Email", "you@studio.com")}
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      {renderField("phone", "Phone", "+880 1xxx xxxxxx")}
                    </Grid>
                  </Grid>
                  {renderField("subject", "Subject", "Project inquiry")}
                  {renderField("description", "Message", "What are we making?", {
                    multiline: true,
                    rows: 5,
                  })}
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isSubmitting}
                    sx={{ alignSelf: "flex-start", mt: 1 }}
                    endIcon={
                      isSubmitting ? <CircularProgress size={16} color="inherit" /> : <Send size={16} />
                    }
                  >
                    {isSubmitting ? "Sending..." : "Send message"}
                  </Button>
                  {submitError ? <Alert severity="error">{submitError}</Alert> : null}
                  {isSuccess ? (
                    <Alert severity="success">
                      Message sent. I&apos;ll reply soon.
                    </Alert>
                  ) : null}
                </Stack>
              </Box>
            </Box>
          </Grid>
        </Grid>
    </Box>
  );
}
