import nextPwa from "next-pwa";

const withPWA = nextPwa({
  dest: "public",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 기존 Next.js 설정
};

export default withPWA(nextConfig);
