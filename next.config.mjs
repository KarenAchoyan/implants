/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: "http://127.0.0.1:8000/api",
    IMAGE_URL: "http://127.0.0.1:8000/storage/",
    IMAGE_URL2: "https://poels.dahk.am/",
  },

};

export default nextConfig;
