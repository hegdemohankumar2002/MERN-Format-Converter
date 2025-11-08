# 🖼️ MERN HEIC Converter

## 📋 Overview
A comprehensive web application that provides seamless file conversion capabilities for various formats including images, and videos. Built with modern web technologies, this application offers both individual and batch processing capabilities with a user-friendly interface.

## ✨ Key Features

### 🔄 File Conversion Support
- **Image Conversions**: HEIC to JPG, JPG to PNG, PNG to JPG, RAW to JPG, SVG to JPG, JPG to SVG
- **Video Conversions**: HEVC to MP4, MP4 to MP3
- **YouTube Integration**: Download videos from YouTube URLs

### 👤 User Management
- **Authentication System**: Secure user registration and login
- **Admin Dashboard**: Administrative controls for managing users and conversions
- **User Dashboard**: Personal dashboard for tracking conversion history
- **Quota Management**: Track and manage user conversion limits

### 🎨 User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Progress**: Live progress tracking for file conversions
- **Batch Processing**: Convert multiple files simultaneously
- **Drag & Drop Interface**: Intuitive file upload experience
- **Download Management**: Organized download section with file history

### 🔧 Technical Features
- **Service Worker**: Offline capability and PWA support
- **File Validation**: Comprehensive file type and size validation
- **Error Handling**: Detailed error messages and recovery options
- **Security**: JWT-based authentication and secure file handling

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript support
- **React Router** for navigation
- **Context API** for state management
- **CSS3** with responsive design
- **Service Workers** for PWA functionality
- **Axios** for API communication

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Multer** for file upload handling
- **Python** for advanced file processing
- **FFmpeg** for video/audio processing

### File Processing
- **Python Scripts**: Advanced conversion algorithms
- **ImageMagick**: Image processing and conversion
- **FFmpeg**: Video and audio processing
- **LibreOffice**: Document format conversion

## 📁 Project Structure

```
mern_heic_converter/
├── client/                    # React frontend
│   ├── public/               # Static assets and PWA files
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Application pages
│   │   ├── context/         # React context providers
│   │   ├── styles/          # CSS stylesheets
│   │   └── assets/          # Images and icons
├── server/                   # Node.js backend
│   ├── config/              # Configuration files
│   ├── controllers/         # Route controllers
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API endpoints
│   ├── converter/           # Python conversion scripts
│   └── outputs/             # Processed files
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local or cloud instance)
- **Python** (v3.8 or higher)
- **FFmpeg** (for video processing)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mern_heic_converter
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   pip install -r converter/requirements.txt
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**
   Create a `.env` file in the server directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/mern_heic_converter
   JWT_SECRET=your_jwt_secret_key
   ```

### Development Setup

1. **Start MongoDB**
   ```bash
   mongod
   ```

2. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```

3. **Start the frontend development server**
   ```bash
   cd client
   npm start
   ```

4. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### File Conversion
- `POST /api/convert/heic-to-jpg` - Convert HEIC to JPG
- `POST /api/convert/batch` - Batch file conversion
- `GET /api/convert/history` - Get conversion history

### Admin Routes
- `GET /api/admin/users` - Get all users
- `GET /api/admin/conversions` - Get all conversions
- `PUT /api/admin/user/:id` - Update user details

## 🧪 Testing

### Frontend Testing
```bash
cd client
npm test
```

### Backend Testing
```bash
cd server
npm test
```

### Manual Testing Checklist
- [ ] User registration and login
- [ ] File upload functionality
- [ ] Individual file conversion
- [ ] Batch file processing
- [ ] Download functionality
- [ ] Admin dashboard access
- [ ] Responsive design on mobile devices
- [ ] Error handling and validation

## 🐛 Troubleshooting

### Common Issues

1. **Python Dependencies**
   ```bash
   # Install Python dependencies
   pip install -r server/converter/requirements.txt
   ```

2. **FFmpeg Installation**
   ```bash
   # Windows
   choco install ffmpeg
   
   # macOS
   brew install ffmpeg
   
   # Linux
   sudo apt-get install ffmpeg
   ```

3. **MongoDB Connection**
   - Ensure MongoDB is running on the specified port
   - Check connection string in environment variables

4. **Port Conflicts**
   - Default ports: 3000 (frontend), 5000 (backend)
   - Update ports in environment variables if needed

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Add tests** for new functionality
5. **Submit a pull request**

### Contribution Guidelines
- Follow the existing code style
- Write clear commit messages
- Update documentation for new features
- Ensure all tests pass before submitting

## 🙏 Acknowledgments

- **React Team** for the excellent frontend framework
- **Node.js Community** for the robust backend ecosystem
- **Python Community** for powerful file processing libraries
- **MongoDB Team** for the flexible database solution

## 📞 Support

For support, email [hegdemohankumar2002@gmail.com](mailto:hegdemohankumar2002@gmail.com)

---

**Made for you guys by our team**