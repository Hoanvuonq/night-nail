/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Cho phép ảnh từ Unsplash
        port: '',
        pathname: '/**',
      },
      // Nếu sau này bạn dùng ảnh từ host khác (ví dụ AWS S3, Cloudinary) thì thêm vào đây
    ],
  },
};

module.exports = nextConfig;