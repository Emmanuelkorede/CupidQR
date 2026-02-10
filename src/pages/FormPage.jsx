import { useState, useEffect } from "react";
import { supabase } from "../superbase-client" ;
import { useNavigate } from "react-router-dom";
import { FaPaperPlane, FaImage, FaMagic } from "react-icons/fa"; 
import { Navbar } from "../component/navbar";
import '../styles/Formpage.css' ;

function Form() {
    const [senderName, setSenderName] = useState('');
    const [message, setMessage] = useState('');
    const [letterImage, setLetterImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null); 
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const uploadImage = async (file) => {
        const filePath = `${Date.now()}-${file.name}`;
        
        const { error } = await supabase.storage
            .from('letters-images')
            .upload(filePath, file);

        if (error) {
            console.log('Error uploading image:', error);
            return null;
        }

        const { data } = supabase.storage
            .from('letters-images')
            .getPublicUrl(filePath);

        return data.publicUrl;
    };

    const handleGeneration = async () => {
        if (!senderName || !message) {
            alert("Please fill in your name and message! 💖");
            return;
        }

        setLoading(true);
        let imageUrl = null;

        if (letterImage) {
            imageUrl = await uploadImage(letterImage);
            if (!imageUrl) {
                alert("Image upload failed. Please try again.");
                setLoading(false);
                return;
            }
        }

        const { data, error } = await supabase
            .from('letters')
            .insert([{
                sender_name: senderName,
                message: message,
                image_url: imageUrl
            }])
            .select();

        if (error) {
            console.log('Error saving letter:', error);
            alert("Something went wrong! 😢");
        } else {
            console.log('Success:', data);
            const newId = data[0].id;
            navigate(`/letter/${newId}`);
        }
        setLoading(false);
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setLetterImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    return (
        <> 
        <Navbar />
        <div className="page-container">
            <div className="form-card">
                <h1 className="form-title">Create Your Valentine 💘</h1>
                
                <div className="input-group">
                    <label>From:</label>
                    <input
                        type="text"
                        onChange={(e) => setSenderName(e.target.value)}
                        value={senderName}
                        placeholder="Your Name..."
                        className="text-input"
                    />
                </div>

                <div className="input-group">
                    <label>Message:</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write something sweet..."
                        className="text-area"
                    />
                </div>

                <div className="input-group file-group">
                    <label htmlFor="file-upload" className="file-label">
                        <FaImage style={{ marginRight: '8px' }} />
                        {letterImage ? "Change Photo" : "Add a Photo (Optional)"}
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="file-input"
                    />
                </div>

                
                {previewUrl && (
                    <div className="image-preview-container">
                        <p>Preview:</p>
                        <img src={previewUrl} alt="Upload Preview" className="image-preview" />
                    </div>
                )}

                <button onClick={handleGeneration} disabled={loading} className="generate-btn">
                    {loading ? "Creating Magic..." : (
                        <>
                            Generate Card <FaMagic style={{ marginLeft: '8px' }} />
                        </>
                    )}
                </button>
            </div>
        </div>
        </>
    );
}

export default Form;