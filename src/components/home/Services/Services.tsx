"use client";

import { JSX } from "react";
import { ArrowRight } from "lucide-react";
import { SERVICESDATA } from "@/lib/ServicesData/ServicesData";
import ServiceCard from "./ServiceCard";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SectionHeading from "@/components/ui/SectionHeading";

const SERVICES = SERVICESDATA.slice(0, 6);

export default function Services(): JSX.Element {
  return (
    <Box component="section" id="services" data-reveal sx={{ py: { xs: 10, md: 16 } }}>
      <SectionHeading
          eyebrow="Services"
          title="What I take on."
          description="Engineering-led work with a clear outcome—whether you need a product built, secured, scaled, or grown."
        />

        <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ mt: 10, alignItems: "center" }}
        >
          <Button
            variant="contained"
            href="/booking-meeting"
            component="a"
            endIcon={<ArrowRight size={16} />}
          >
            Discuss a project
          </Button>
          <Button variant="outlined" href="/services" component="a">
            All services
          </Button>
        </Stack>
    </Box>
  );
}
