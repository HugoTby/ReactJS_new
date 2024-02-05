import React, { useState } from 'react';

const Composant = ({ couleur }) => {
    const [login, setLogin] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState("Ceci est un formulaire");

    const handleLoginChange = (event) => {
        setLogin(event.target.value);
    };

    const handleMotDePasseChange = (event) => {
        setMotDePasse(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const validation = await validerConnexion(login, motDePasse);
            setMessage(validation ? 'Connexion réussie!' : 'Login ou mot de passe incorrect.');
        } catch (error) {
            console.error('Erreur lors de la validation de la connexion:', error);
            setMessage('Erreur lors de la validation de la connexion.');
        }
    };

    const validerConnexion = async (login, motDePasse) => {
        const url = 'http://192.168.65.105:3001/validation'; // Utilisez la route de validation
    
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login, motDePasse }),
        });
    
        if (!response.ok) {
            throw new Error('Erreur lors de la requête vers le serveur.');
        }
    
        const data = await response.json();
        return data.validation; // Assurez-vous que votre serveur renvoie un objet avec une propriété 'validation'
    };
    
    const handleTitleChange = (newTitle) => {
        setTitle(newTitle);
    };

    return (
        <div style={{ textAlign: 'center', maxWidth: '300px', margin: 'auto', paddingTop: '50px', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ color: couleur }}>{title}</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Login:</label>
                    <input type="text" value={login} onChange={handleLoginChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
                        placeholder="Entrez votre login"
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Mot de passe:</label>
                    <input type="password" value={motDePasse} onChange={handleMotDePasseChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
                        placeholder="Entrez votre mot de passe"
                    />
                </div>
                <div>
                    <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        Se connecter
                    </button>
                </div>
            </form>
            <p style={{ marginTop: '20px', color: message === 'Connexion réussie!' ? 'green' : 'red' }}>
                {message}
            </p>
        </div>
    );

};

export default Composant;