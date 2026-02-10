import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { supabase } from "../superbase-client";
import QRCode from "react-qr-code";
import { FaDownload, FaHeart, FaArrowLeft, FaCheckCircle, FaInstagram, FaTiktok, FaMagic , FaWhatsapp } from "react-icons/fa";
import { Navbar } from "../component/navbar";
import '../styles/LetterPage.css';

function LetterPage() {
    const { id } = useParams();
    const location = useLocation();
    
    const [letter, setLetter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Check if the user is the creator (passed from the Form page)
    // To make this work, update your Form navigate to: navigate(`/letter/${id}`, { state: { fromForm: true } })
    const isCreator = location.state?.fromForm || false;

    const downloadQRCode = () => {
        const svg = document.querySelector("#qr-code-area svg");
        if (!svg) return;

        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            
            const pngFile = canvas.toDataURL("image/png");
            const downloadLink = document.createElement("a");
            downloadLink.download = `Valentine-QR-${letter.sender_name}.png`;
            downloadLink.href = `${pngFile}`;
            downloadLink.click();

            setTimeout(() => {
                setShowSuccessModal(true);
            }, 1000); 
        };
        
        img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
    };

    useEffect(() => {
        const fetchLetter = async () => {
            const { data, error } = await supabase
                .from('letters')
                .select('*')
                .eq('id', id)
                .single();
            
            if (error) console.error(error);
            setLetter(data);
            setLoading(false);
        };
        fetchLetter();
    }, [id]);

    if (loading) return <div className="loading-state">Loading your love letter... 💌</div>;
    if (!letter) return <div className="error-state">Letter not found! 💔</div>;

    return (
        <> 
            {/* 1. Only show Navbar to the Creator */}
            {isCreator && <Navbar />}

            <div className={`letter-page-container ${!isCreator ? 'viewer-mode' : ''}`}>
                
                {/* 2. Show Back Link only to Creator */}
                {isCreator && (
                    <Link to="/" className="back-link">
                        <FaArrowLeft /> Edit or Make New
                    </Link>
                )}

                {/* 3. Tiny Branding for Viewer (since Navbar is hidden) */}
                {!isCreator && (
                    <div className="viewer-brand">
                        <FaHeart /> CupidQR
                    </div>
                )}

                <div className="content-wrapper">
                    <div className="letter-card">
                        <div className="card-header">
                            <span className="label">To My Valentine</span>
                            <h2 className="sender-name">From: {letter.sender_name}</h2>
                        </div>

                        <div className="divider">
                            <FaHeart className="heart-icon" />
                        </div>

                        <p className="message-body">{letter.message}</p>
                        
                        {letter.image_url && (
                            <div className="image-frame">
                                <img src={letter.image_url} alt="Valentine Memory" className="letter-image" />
                            </div>
                        )}
                    </div>

                    {/* 4. Creator View: Show QR and Download */}
                    {isCreator && (
                        <div className="qr-section">
                            <div className="qr-frame" id="qr-code-area">
                                <QRCode 
                                    value={window.location.href} 
                                    size={180} 
                                    fgColor="#000000"
                                    bgColor="#ffffff"
                                />
                            </div>
                            
                            <button onClick={downloadQRCode} className="download-btn">
                                Download QR Image <FaDownload />
                            </button>
                            
                            <p className="save-hint">Save this image to send to your Valentine!</p>
                        </div>
                    )}

                    {/* 5. Viewer View: Show "Create Your Own" button instead of QR */}
                    {!isCreator && (
                        <div className="viewer-actions">
                            <p className="viewer-hint">Want to send a letter like this?</p>
                            <Link to="/" className="create-own-btn">
                                Create Your Own CupidQR <FaMagic />
                            </Link>
                        </div>
                    )}
                </div>

                {/* 6. Success Modal for Creator */}
                {showSuccessModal && (
                    <div className="modal-overlay" onClick={() => setShowSuccessModal(false)}>
                        <div className="modal-content success-popup" onClick={(e) => e.stopPropagation()}>
                            <div className="success-icon"><FaCheckCircle /></div>
                            <h2>QR Code Saved! 💖</h2>
                            <p>Your Valentine's surprise is ready. Support the developer by following below!</p>
                            
                            <div className="support-section">
                                <p className="support-label">Follow Job Emmanuel:</p>
                                <div className="social-row">
                                    <a href="https://instagram.com/job.emmanuel.dev" target="_blank" rel="noreferrer" className="social-btn insta">
                                        <FaInstagram /> Instagram
                                    </a>
                                    <a href="https://tiktok.com/@job.emmanuel.dev" target="_blank" rel="noreferrer" className="social-btn tiktok">
                                        <FaTiktok /> TikTok
                                    </a>
                                    <a href="https://wa.me/2349122865246" target="_blank" rel="noreferrer" className="social-btn whatsapp">
                                        <FaWhatsapp /> WhatsApp
                                    </a>
                                </div>
                            </div>

                            <button className="close-popup-btn" onClick={() => setShowSuccessModal(false)}>
                                Done
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default LetterPage;