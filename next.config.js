/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'],
    },
    env: {
        PAYSTACK_PUBLIC_KEY: process.env.PAYSTACK_PUBLIC_KEY,
    },
    // Optimize for South Africa low-bandwidth conditions
    compress: true,
};

module.exports = nextConfig;
