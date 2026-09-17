import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PortfolioProvider } from './context/PortfolioContext';
import { isAdminAuthenticated } from './lib/admin';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import OverviewPanel from './components/admin/OverviewPanel';
import ProfileEditor from './components/admin/ProfileEditor';
import AboutEditor from './components/admin/AboutEditor';
import EducationEditor from './components/admin/EducationEditor';
import SettingsEditor from './components/admin/SettingsEditor';
import PlaceholderPanel from './components/admin/PlaceholderPanel';
import CollectionEditor from './components/admin/CollectionEditor';
import MessagesEditor from './components/admin/MessagesEditor';
import MediaEditor from './components/admin/MediaEditor';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import useSmoothScroll from './hooks/useSmoothScroll';
import './index.css';

function PublicPortfolio() {
  useSmoothScroll();

  return (
    <>
      <CustomCursor />
      <LoadingScreen />
      <Navbar />
      <Hero />
      <About />
      <Education />
      <Skills />
      <Projects />
      <Certificates />
      <Experience />
      <Achievements />
      <Contact />
      <Footer />
    </>
  );
}

function AdminRouteGuard({ children }) {
  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

function App() {
  return (
    <PortfolioProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicPortfolio />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <AdminRouteGuard>
                <AdminDashboard />
              </AdminRouteGuard>
            }
          >
            <Route index element={<OverviewPanel />} />
            <Route path="profile" element={<ProfileEditor />} />
            <Route path="about" element={<AboutEditor />} />
            <Route path="education" element={<EducationEditor />} />
            <Route path="skills" element={<CollectionEditor title="Skills" section="skills" fields={[{ name: 'name', label: 'Skill name', required: true }, { name: 'category', label: 'Category', required: true }, { name: 'proficiency', label: 'Skill level' }, { name: 'experience', label: 'Experience' }, { name: 'icon', label: 'Icon name' }, { name: 'order', label: 'Display order', type: 'number' }]} />} />
            <Route path="projects" element={<CollectionEditor title="Projects" section="projects" fields={[{ name: 'title', label: 'Project name', required: true }, { name: 'category', label: 'Category' }, { name: 'shortDescription', label: 'Short description' }, { name: 'description', label: 'Description', type: 'textarea', required: true }, { name: 'technologies', label: 'Technologies', type: 'array' }, { name: 'githubUrl', label: 'GitHub URL', type: 'url' }, { name: 'demoUrl', label: 'Live demo URL', type: 'url' }, { name: 'image', label: 'Project image', type: 'file' }, { name: 'featured', label: 'Featured project', type: 'checkbox' }, { name: 'order', label: 'Display order', type: 'number' }]} />} />
            <Route path="certificates" element={<CollectionEditor title="Certificates" section="certificates" fields={[{ name: 'title', label: 'Certificate title', required: true }, { name: 'issuer', label: 'Issuing organization', required: true }, { name: 'issueDate', label: 'Issue date', type: 'date' }, { name: 'credentialId', label: 'Credential ID' }, { name: 'verificationUrl', label: 'Credential URL', type: 'url' }, { name: 'image', label: 'Image or PDF', type: 'file' }, { name: 'description', label: 'Description', type: 'textarea' }, { name: 'order', label: 'Display order', type: 'number' }]} />} />
            <Route path="achievements" element={<CollectionEditor title="Achievements" section="achievements" fields={[{ name: 'title', label: 'Achievement title', required: true }, { name: 'organization', label: 'Organization' }, { name: 'date', label: 'Date', type: 'date' }, { name: 'description', label: 'Description', type: 'textarea' }, { name: 'verificationUrl', label: 'External link', type: 'url' }, { name: 'image', label: 'Achievement image', type: 'file' }, { name: 'featured', label: 'Featured achievement', type: 'checkbox' }, { name: 'order', label: 'Display order', type: 'number' }]} />} />
            <Route path="experience" element={<CollectionEditor title="Experience" section="experience" fields={[{ name: 'company', label: 'Organization', required: true }, { name: 'title', label: 'Position', required: true }, { name: 'description', label: 'Description', type: 'textarea' }, { name: 'startDate', label: 'Start date', type: 'date' }, { name: 'endDate', label: 'End date', type: 'date' }, { name: 'current', label: 'Currently working', type: 'checkbox' }, { name: 'location', label: 'Location' }, { name: 'technologies', label: 'Technologies', type: 'array' }, { name: 'order', label: 'Display order', type: 'number' }]} />} />
            <Route path="social" element={<CollectionEditor title="Social Links" section="socialLinks" fields={[{ name: 'platform', label: 'Platform', required: true }, { name: 'url', label: 'URL', type: 'url', required: true }, { name: 'icon', label: 'Icon name' }, { name: 'order', label: 'Display order', type: 'number' }]} />} />
            <Route path="services" element={<CollectionEditor title="Services" section="services" fields={[{ name: 'title', label: 'Service title', required: true }, { name: 'description', label: 'Description', type: 'textarea' }, { name: 'icon', label: 'Icon name' }, { name: 'features', label: 'Features', type: 'array' }, { name: 'order', label: 'Display order', type: 'number' }]} />} />
            <Route path="resume" element={<PlaceholderPanel title="Resume" />} />
            <Route path="messages" element={<MessagesEditor />} />
            <Route path="media" element={<MediaEditor />} />
            <Route path="settings" element={<SettingsEditor />} />
            <Route path="admin-profile" element={<PlaceholderPanel title="Admin Profile" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PortfolioProvider>
  );
}

export default App;
