"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, ArrowUpRight } from "lucide-react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
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
  { icon: Mail, label: "Email", value: "hello@aburayhan.com", href: "mailto:hello@aburayhan.com" },
  { icon: Phone, label: "Phone", value: "+880 1621 807642", href: "tel:+8801621807642" },
  { icon: MapPin, label: "Location", value: "Dhaka, Bangladesh", href: null },
];

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    bgcolor: "rgba(2, 6, 23, 0.28)",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    "& fieldset": {
      borderColor: "rgba(148, 163, 184, 0.18)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(59, 130, 246, 0.35)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "primary.main",
      borderWidth: 1,
    },
    "&.Mui-error fieldset": {
      borderColor: "error.main",
    },
  },
  "& .MuiInputLabel-root": {
    color: "text.secondary",
    fontSize: "0.9rem",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "primary.main",
  },
  "& .MuiFormHelperText-root": {
    mx: 0,
    mt: 0.75,
  },
};

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
            sx={fieldSx}
          />
        );
      }}
    />
  );

  return (
    <Box component="section" id="contact" data-reveal sx={{ py: { xs: 8, md: 12 }, position: "relative" }}>
      <Box className="container mx-auto px-4">
        <Grid container spacing={{ xs: 5, lg: 8 }} sx={{ alignItems: "flex-start" }}>
          <Grid size={{ xs: 12, lg: 5 }}>
            <Stack spacing={4}>
              <SectionHeading
                align="left"
                eyebrow="Get In Touch"
                title={
                  <>
                    Let&apos;s Build <br />
                    <Box component="span" sx={{ color: "text.secondary" }}>
                      Something Great.
                    </Box>
                  </>
                }
                description="Have a project in mind? Or just want to say hello? I'm always open to new opportunities and collaborations."
              />

              <Stack spacing={2}>
                {contactItems.map((item) => (
                  <Box
                    key={item.label}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: "divider",
                      bgcolor: "rgba(15, 23, 42, 0.28)",
                      backdropFilter: "blur(10px)",
                      transition: "border-color 0.2s ease, transform 0.2s ease",
                      "&:hover": {
                        borderColor: "rgba(59, 130, 246, 0.3)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <Stack direction="row" spacing={2} sx={{ alignItems: "flex-start" }}>
                      <Box
                        sx={{
                          width: 42,
                          height: 42,
                          borderRadius: 1.5,
                          display: "grid",
                          placeItems: "center",
                          bgcolor: "rgba(59, 130, 246, 0.12)",
                          color: "primary.main",
                          flexShrink: 0,
                        }}
                      >
                        <item.icon size={18} />
                      </Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          variant="overline"
                          sx={{
                            display: "block",
                            color: "text.secondary",
                            fontWeight: 700,
                            letterSpacing: "0.14em",
                            lineHeight: 1.4,
                            mb: 0.5,
                          }}
                        >
                          {item.label}
                        </Typography>
                        {item.href ? (
                          <Typography
                            component="a"
                            href={item.href}
                            variant="body1"
                            sx={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 0.5,
                              color: "text.primary",
                              textDecoration: "none",
                              fontWeight: 600,
                              wordBreak: "break-word",
                              "&:hover": { color: "primary.main" },
                            }}
                          >
                            {item.value}
                            <ArrowUpRight size={14} />
                          </Typography>
                        ) : (
                          <Typography variant="body1" sx={{ fontWeight: 600, color: "text.primary" }}>
                            {item.value}
                          </Typography>
                        )}
                      </Box>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, lg: 7 }}>
            <Card
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "rgba(15, 23, 42, 0.35)",
                backdropFilter: "blur(16px)",
                boxShadow: "0 24px 60px rgba(2, 6, 23, 0.35)",
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4.5 } }}>
                <Stack spacing={0.75} sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    Send a message
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Fill out the form and I&apos;ll get back to you within 24 hours.
                  </Typography>
                </Stack>

                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                  <Stack spacing={2.25}>
                    {renderField("name", "Full Name", "John Doe")}
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, md: 6 }}>{renderField("email", "Email Address", "john@example.com")}</Grid>
                      <Grid size={{ xs: 12, md: 6 }}>{renderField("phone", "Phone Number", "+880 1xxx xxxxxx")}</Grid>
                    </Grid>
                    {renderField("subject", "Subject", "Project inquiry")}
                    {renderField("description", "Message", "I'd like to talk about...", { multiline: true, rows: 5 })}

                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      disabled={isSubmitting}
                      sx={{
                        mt: 0.5,
                        py: 1.5,
                        borderRadius: 2,
                        background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
                        "&:hover": {
                          background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
                        },
                      }}
                      endIcon={
                        isSubmitting ? (
                          <CircularProgress size={18} color="inherit" />
                        ) : (
                          <Send size={18} />
                        )
                      }
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>

                    {submitError ? <Alert severity="error">{submitError}</Alert> : null}
                    {isSuccess ? (
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                        <Alert severity="success">
                          Message sent successfully! Check your email for confirmation — I&apos;ll reply soon.
                        </Alert>
                      </motion.div>
                    ) : null}
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
