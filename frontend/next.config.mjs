import path from "node:path";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = "luminapath-ai-platform";

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: path.resolve(process.cwd(), "..")
  },
  output: isGithubPages ? "export" : undefined,
  trailingSlash: isGithubPages,
  basePath: isGithubPages ? `/${repoName}` : undefined,
  assetPrefix: isGithubPages ? `/${repoName}/` : undefined,
  images: {
    unoptimized: isGithubPages,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      }
    ]
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "recharts"]
  }
};

export default nextConfig;
