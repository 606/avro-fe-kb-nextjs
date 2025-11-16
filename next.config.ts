import type { NextConfig } from "next";

const repoName = "avro-fe-kb-nextjs";
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGithubPages ? `/${repoName}` : undefined,
  assetPrefix: isGithubPages ? `/${repoName}` : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
