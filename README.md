# MusicStream - Micro Frontend Music Library

A modern music streaming application built with React, featuring micro frontend architecture, role-based authentication, and comprehensive music library management.

## 🎵 Features

### Core Features
- **Music Library UI**: Clean, modern interface for browsing songs
- **Real Audio Playback**: Fully functional music player with play/pause, skip, and volume controls
- **Advanced Filtering**: Filter by album, artist, title, and genre using JavaScript's `map`, `filter`, and `reduce` methods  
- **Sorting & Grouping**: Sort by various fields and group songs by artist, album, genre, or year
- **Playlist Management**: Automatic playlist creation from filtered results
- **Progress Tracking**: Real-time playback progress with seek functionality
- **Micro Frontend Architecture**: Split into Main App (container) and Music Library (micro frontend)
- **Role-Based Authentication**: Admin and user roles with different permissions
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### Authentication & Authorization
- **Admin Role**: Can add and delete songs, full library management
- **User Role**: Can view, filter, and sort songs (read-only access)
- **JWT-based**: Mock JWT implementation with localStorage persistence

### Technical Features
- **HTML5 Audio Player**: Native browser audio playback with full controls
- **State Management**: Uses React Context API and useReducer for complex state
- **Persistent Storage**: Songs and authentication state saved to localStorage
- **Real-time Updates**: Live playback progress and queue management
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **Type Safety**: Full TypeScript implementation

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd music-stream-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

## 🔑 Demo Credentials

### Admin Account
- **Username**: `admin`
- **Password**: `admin123`
- **Permissions**: Can add, delete, and manage all songs

### User Account  
- **Username**: `user`
- **Password**: `user123`
- **Permissions**: Can view, filter, and sort songs only

## 🏗️ Micro Frontend Architecture

### Architecture Overview
This application demonstrates micro frontend principles by splitting functionality into independent, deployable units:

**Main Application (Container)**
- Handles authentication and user management
- Provides the application shell and navigation
- Loads and orchestrates micro frontends
- Manages shared state and routing

**Music Library Micro Frontend**
- Independent React application focused on music library functionality
- Handles song management, filtering, and display
- Can be developed, tested, and deployed separately
- Communicates with the main app through defined interfaces

### How It Works

1. **Module Federation Simulation**: While this demo uses React lazy loading to simulate micro frontends, the architecture is designed for real Module Federation with Webpack or Vite
   
2. **Independent Development**: Each micro frontend can be developed by separate teams with different release cycles

3. **Runtime Loading**: Micro frontends are loaded dynamically at runtime, enabling independent deployments

4. **Shared Dependencies**: Common libraries (React, UI components) can be shared between micro frontends

### Real-World Implementation
In production, you would:
- Deploy each micro frontend separately to different URLs
- Use Module Federation to load remote components
- Implement proper error boundaries and fallbacks  
- Set up independent CI/CD pipelines for each micro frontend

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: React Context API + useReducer
- **Authentication**: Mock JWT with localStorage
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Type Safety**: Full TypeScript coverage

## 🎨 Design System

The app features a modern, dark-themed design inspired by popular music streaming platforms:

- **Color Scheme**: Deep navy backgrounds with purple/blue accent gradients
- **Typography**: Clean, readable fonts optimized for music metadata
- **Layout**: Card-based design with smooth hover transitions
- **Responsive**: Mobile-first design that scales beautifully

## 📱 JavaScript Array Methods Usage

The application extensively uses JavaScript's built-in array methods:

### `filter()` Method
- **Song Filtering**: Filter songs by search terms, album, artist, and genre
- **Role-based UI**: Filter UI components based on user permissions
- **Data Validation**: Filter out invalid entries and duplicates

### `map()` Method  
- **UI Rendering**: Transform song data into React components
- **Data Transformation**: Convert raw song data into display format
- **Options Generation**: Create dropdown options from unique values

### `reduce()` Method
- **Grouping Logic**: Group songs by artist, album, genre, or year
- **Statistics Calculation**: Calculate total duration, song counts, and library stats
- **State Management**: Combine multiple filter conditions into single state

### Example Implementation
```javascript
// Filtering songs using multiple criteria
const filteredSongs = songs.filter(song => {
  const matchesSearch = !filters.search || 
    song.title.toLowerCase().includes(filters.search.toLowerCase()) ||
    song.artist.toLowerCase().includes(filters.search.toLowerCase());
  
  return matchesSearch && 
         (!filters.artist || song.artist === filters.artist) &&
         (!filters.album || song.album === filters.album);
});

// Grouping songs by artist using reduce
const groupedByArtist = songs.reduce((groups, song) => {
  const artist = song.artist;
  if (!groups[artist]) groups[artist] = [];
  groups[artist].push(song);
  return groups;
}, {});

// Calculating statistics with reduce
const stats = songs.reduce((acc, song) => ({
  totalDuration: acc.totalDuration + song.duration,
  genres: new Set([...acc.genres, song.genre])
}), { totalDuration: 0, genres: new Set() });
```

## 📊 Application State Management

### Context Providers
- **AuthContext**: Manages user authentication and role-based permissions
- **MusicLibraryContext**: Handles song data, filtering, sorting, and CRUD operations

### State Structure
```typescript
interface MusicLibraryState {
  songs: Song[];           // All songs in the library
  filteredSongs: Song[];   // Songs after applying filters/sort
  filters: FilterOptions;  // Current filter criteria
  sort: SortOptions;      // Current sorting configuration  
  groupBy: GroupByOptions; // Current grouping preference
  isLoading: boolean;     // Loading state for async operations
}
```

## 🔐 Authentication System

### JWT Implementation
- **Token Generation**: Mock JWT creation with user payload
- **Token Validation**: Automatic token validation on app load
- **Role Management**: Admin vs User permission handling
- **Session Persistence**: Secure token storage in localStorage

### Security Features
- Token expiration validation (24-hour default)
- Automatic logout on invalid/expired tokens
- Role-based UI rendering and API access control
- Input validation and sanitization

## 🎯 Future Enhancements

### Planned Features
- **Real Module Federation**: Implement actual Webpack Module Federation
- **Enhanced Playlist Management**: Create and save custom playlists
- **Advanced Search**: Full-text search with relevance scoring
- **File Upload**: Direct audio file upload and metadata extraction
- **Social Features**: Song sharing and collaborative playlists
- **Equalizer**: Audio enhancement and sound customization
- **Offline Mode**: Download songs for offline listening

### Deployment Strategy
- **Separate Deployments**: Independent deployment pipeline for each micro frontend
- **CDN Integration**: Asset optimization and global distribution
- **Environment Management**: Development, staging, and production environments
- **Monitoring**: Application performance and error tracking

## 📄 License

This project is created for educational purposes to demonstrate micro frontend architecture, React patterns, and modern web development practices.

---

**Built with ❤️ using React, TypeScript, and Micro Frontend Architecture**