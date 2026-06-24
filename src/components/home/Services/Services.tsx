"use client";

import { JSX } from "react";
import { ArrowRight } from "lucide-react";
import { SERVICESDATA } from "@/lib/ServicesData/ServicesData";
import ServiceCard from "./ServiceCard";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import SectionHeading from "@/components/ui/SectionHeading";

const SERVICES = SERVICESDATA.slice(0, 6);

export default function Services(): JSX.Element {
  return (
    <Box component="section" id="services" data-reveal sx={{ py: 10, position: "relative", overflow: "hidden" }}>
      <Box className="container mx-auto px-4">
        <SectionHeading
          eyebrow="What I deliver"
          title={
            <>
              Services <Box component="span" sx={{ color: "text.secondary" }}>&amp; capabilities.</Box>
            </>
          }
          description="Engineering-first solutions with clear outcomes—whether you need a product built, secured, scaled, or grown."
        />

        <Grid container spacing={3}>
          {SERVICES.map((service, index) => (
            <Grid key={service.title} size={{ xs: 12, md: 6, xl: 4 }}>
              <ServiceCard service={service} index={index} />
            </Grid>
          ))}
        </Grid>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ mt: 8, justifyContent: "center", alignItems: "center" }}
        >
          <Button
            variant="contained"
            href="/booking-meeting"
            component="a"
            endIcon={<ArrowRight size={16} />}
          >
            Discuss a project
          </Button>
          <Button
            variant="outlined"
            href="/services"
            component="a"
            endIcon={<ArrowRight size={16} />}
          >
            View all Services
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
