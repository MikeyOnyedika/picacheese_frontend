/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "picacheese-backend.onrender.com",
                port: "",
                pathname: "/**",
            }
        ]
    }
}

module.exports = nextConfig
