import { useNavigate } from 'react-router-dom';
import { FaPenFancy, FaQrcode, FaHeart } from 'react-icons/fa'; 
import { Navbar } from '../component/navbar';
import '../styles/Homepage.css'; 
function HomePage() {
    const navigate = useNavigate();

    return (
        <>
        <Navbar />
        <div className="home-container">
            <header className="hero">
                <div className="floating-heart heart-1"><FaHeart /></div>
                <div className="floating-heart heart-2"><FaHeart /></div>
                
                <h1 className="hero-title">
                    Make this Valentine's <br />
                    <span className="highlight">Unforgettable</span>
                </h1>
                
                <p className="hero-subtitle">
                    Create a digital love letter, customize it with photos, 
                    and turn it into a QR code that lasts forever.
                </p>

                <button className="cta-button" onClick={() => navigate('/form')}>
                    Create Your Letter <FaHeart className="btn-icon" />
                </button>
            </header>

            <section className="steps-section">
                <h2 className="section-title">How It Works</h2>
                <div className="steps-grid">  
                    <div className="step-card">
                        <div className="icon-box">
                            <FaPenFancy />
                        </div>
                        <h3>1. Write</h3>
                        <p>Pour your heart out and upload a special memory.</p>
                    </div>

                    <div className="step-card">
                        <div className="icon-box">
                            <FaQrcode />
                        </div>
                        <h3>2. Generate</h3>
                        <p>Get a unique QR code styled just for your Valentine.</p>
                    </div>

                    <div className="step-card">
                        <div className="icon-box">
                            <FaHeart />
                        </div>
                        <h3>3. Share</h3>
                        <p>Send the code or print it on a card for a surprise!</p>
                    </div>
                </div>
            </section>
        </div>
        </>
    );
    
}

export default HomePage;