import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // KEEP ALL YOUR EXISTING CONFIGURATION HERE
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);